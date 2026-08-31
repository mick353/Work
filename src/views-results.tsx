import { CONTENT_REVIEWED, diagnosticQuestions, flashcards, manifest, modules, practiceQuestions } from "./content";
import { useMemo, useState } from "react";
import { ChevronRight, Printer, TrendingUp } from "lucide-react";
import type { Question } from "./package-model";
import { DAY_MS, daysAgoKey, type ReviewSchedule, type View } from "./lib";
import { MASTERY_QUIZ_THRESHOLD, masteryState, type HistoryEntry, type ItemStatMap, type ProgressMap, type ReviewMap } from "./state";
import { BarList, ChartCard, ColumnChart, Radial, StackedBar, TrendChart } from "./charts";
import { IllusEmptyResults } from "./illustrations";
import { EmptyState, PageIntro } from "./components";

const stageColour = (n: number) => `var(--accent-${n})`;

export function Results({
  progress,
  reviews,
  history,
  itemStats,
  studyDays,
  practiceBest,
  navigate,
}: {
  progress: ProgressMap;
  reviews: ReviewMap;
  history: HistoryEntry[];
  itemStats: ItemStatMap;
  studyDays: string[];
  practiceBest: number;
  navigate: (view: View) => void;
}) {
  const [showAllRevisit, setShowAllRevisit] = useState(false);
  const mastered = modules.filter((m) => masteryState(progress[m.id], m.scenarios.length).mastered).length;
  const completion = Math.round((mastered / modules.length) * 100);

  /* Accuracy per stage, from the best recorded quiz score. */
  const accuracy = modules
    .filter((m) => (progress[m.id]?.quizScore ?? 0) > 0)
    .map((m) => ({
      label: `${m.number}. ${m.title}`,
      value: progress[m.id]?.quizScore ?? 0,
      colour: stageColour(m.number),
    }));

  /* Counts every scored activity, including practice that is not stage-owned. */
  const activity = useMemo(() => {
    const stageChecks = history.filter((entry) => entry.kind === "quiz").length;
    const mixedPractice = history.filter((entry) => entry.kind === "practice").length;
    const diagnostics = history.filter((entry) => entry.kind === "diagnostic").length;
    const scenarios = modules.reduce(
      (sum, module) => sum + Object.values(progress[module.id]?.scenarioAttempts ?? {}).reduce((a, b) => a + b, 0),
      0,
    );
    return [
      { label: "Stage knowledge checks", value: stageChecks, colour: "var(--accent-1)", detail: `${stageChecks} completed` },
      { label: "Decision scenarios", value: scenarios, colour: "var(--accent-3)", detail: `${scenarios} answered` },
      { label: "Mixed practice sets", value: mixedPractice, colour: "var(--accent-5)", detail: `${mixedPractice} completed` },
      { label: "Diagnostics", value: diagnostics, colour: "var(--accent-7)", detail: `${diagnostics} completed` },
    ];
  }, [history, progress]);
  const activityMax = Math.max(1, ...activity.map((item) => item.value));

  /* Score trend across every scored attempt, oldest first. */
  const trend = useMemo(
    () =>
      [...history]
        .sort((a, b) => a.at - b.at)
        .slice(-24)
        .map((entry) => ({
          at: entry.at,
          score: entry.score,
          label: `${entry.kind === "quiz" ? modules.find((m) => m.id === entry.moduleId)?.title ?? "Stage knowledge check" : entry.kind === "practice" ? "Mixed practice" : "Diagnostic"} — ${new Date(entry.at).toLocaleString("en-AU", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" })}`,
        })),
    [history],
  );

  /* Review forecast for the next fortnight. */
  const forecast = useMemo(() => {
    const now = Date.now();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const buckets = Array.from({ length: 14 }, (_, index) => {
      const day = new Date(startOfToday.getTime() + index * DAY_MS);
      return {
        label: index === 0 ? "Now" : day.toLocaleDateString("en-AU", { weekday: "narrow" }),
        title:
          index === 0
            ? "Due now"
            : day.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" }),
        value: 0,
      };
    });
    flashcards.forEach((card) => {
      const schedule = reviews[card.id] as ReviewSchedule | undefined;
      if (!schedule) return;
      if (schedule.due <= now) {
        buckets[0].value += 1;
        return;
      }
      const offset = Math.floor((schedule.due - startOfToday.getTime()) / DAY_MS);
      if (offset >= 0 && offset < 14) buckets[offset].value += 1;
    });
    return buckets;
  }, [reviews]);

  const notStartedCards = useMemo(
    () => flashcards.filter((card) => !reviews[card.id]).length,
    [reviews],
  );

  /* Practical queue state, without treating a long interval as course completion. */
  const reviewStatus = useMemo(() => {
    const now = Date.now();
    let notStarted = 0;
    let due = 0;
    let comingUp = 0;
    let later = 0;
    flashcards.forEach((card) => {
      const schedule = reviews[card.id] as ReviewSchedule | undefined;
      if (!schedule) notStarted += 1;
      else if (schedule.due <= now) due += 1;
      else if (schedule.due <= now + 7 * DAY_MS) comingUp += 1;
      else later += 1;
    });
    return [
      { label: "Not started", value: notStarted, colour: "var(--line-strong)" },
      { label: "Due now", value: due, colour: "var(--warning)" },
      { label: "Returns within 7 days", value: comingUp, colour: "var(--accent-5)" },
      { label: "Returns later", value: later, colour: "var(--success)" },
    ];
  }, [reviews]);

  /* A readable activity history: actual dates instead of an unlabelled grid. */
  const studyActivity = useMemo(() => {
    const unique = [...new Set(studyDays)].sort((a, b) => b.localeCompare(a));
    const recent = unique.slice(0, 6).map((key) => {
      const date = new Date(`${key}T12:00:00`);
      const relative = key === daysAgoKey(0) ? "Today" : key === daysAgoKey(1) ? "Yesterday" : "Study day";
      return {
        key,
        relative,
        date: date.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long", year: "numeric" }),
      };
    });
    return { total: unique.length, recent, earlier: Math.max(0, unique.length - recent.length) };
  }, [studyDays]);

  /**
   * Item calibration.
   *
   * A bank can be designed well and still be uncalibrated. An item everyone
   * gets right teaches nothing; one everyone gets wrong is usually ambiguous
   * rather than hard. Neither is visible from a score, so this reports the
   * items themselves — the only view in the app about the questions rather
   * than about the learner.
   */
  const itemView = useMemo(() => {
    const all = new Map<string, Question>();
    for (const question of [...practiceQuestions, ...diagnosticQuestions]) all.set(question.id, question);

    const rows = Object.entries(itemStats)
      .map(([id, stat]) => {
        const question = all.get(id);
        if (!question || stat.seen === 0) return null;
        return {
          id,
          prompt: question.prompt,
          moduleId: question.moduleId,
          seen: stat.seen,
          correct: stat.correct,
          accuracy: Math.round((stat.correct / stat.seen) * 100),
        };
      })
      .filter((row): row is NonNullable<typeof row> => row !== null);

    const revisit = rows
      .filter((row) => row.accuracy < 100)
      .sort((a, b) => a.accuracy - b.accuracy || b.seen - a.seen);
    return {
      answered: rows.length,
      revisit,
      consistentlyCorrect: rows.filter((row) => row.accuracy === 100).length,
    };
  }, [itemStats]);

  const quizEntries = history.filter((entry) => entry.kind !== "diagnostic");
  const lifetimeCorrect = quizEntries.reduce((sum, entry) => sum + entry.correct, 0);
  const lifetimeTotal = quizEntries.reduce((sum, entry) => sum + entry.total, 0);
  const lifetimeAccuracy = lifetimeTotal ? Math.round((lifetimeCorrect / lifetimeTotal) * 100) : 0;
  const dueNow = forecast[0].value;
  const visibleRevisit = showAllRevisit ? itemView.revisit : itemView.revisit.slice(0, 5);
  const nextStage = modules.find((module) => !masteryState(progress[module.id], module.scenarios.length).mastered);
  const nextAction = dueNow > 0
    ? { label: `Review ${dueNow} due card${dueNow === 1 ? "" : "s"}`, view: "review" as View }
    : nextStage
      ? { label: `Continue Stage ${nextStage.number}`, view: `module:${nextStage.id}` as View }
      : { label: "Start mixed practice", view: "practice" as View };
  const evidenceSummary = lifetimeTotal < 20
    ? `This is an early snapshot based on ${lifetimeTotal} practice answer${lifetimeTotal === 1 ? "" : "s"}. Use it to choose the next activity, not as a final judgement of your ability.`
    : `This summary is based on ${lifetimeTotal} practice answers recorded in this browser. Repeated results are more useful than any single score.`;

  /**
   * A record of completion.
   *
   * Internal training generally has to be evidenced to somebody — a manager, a
   * capability plan, a performance conversation — and the only export was a
   * JSON backup, which is a machine file rather than something a person can
   * show. This is the human-readable version.
   *
   * Deliberately NOT styled as a certificate and deliberately not called one.
   * Nothing here is issued or verified by anyone: it is a statement of what
   * this browser recorded, and it says so on its face. Dressing self-reported
   * local data as a credential would be misleading anywhere, and more so on
   * departmental material.
   */
  const record = useMemo(() => {
    const rows = modules.map((module) => {
      const entry = progress[module.id];
      const state = masteryState(entry, module.scenarios.length);
      const last = [...history]
        .filter((item) => item.moduleId === module.id)
        .sort((a, b) => b.at - a.at)[0];
      return {
        number: module.number,
        title: module.title,
        mastered: state.mastered,
        score: entry?.quizScore ?? 0,
        attempts: entry?.attempts ?? 0,
        scenarios: `${(entry?.scenariosCorrect ?? []).filter(Boolean).length}/${module.scenarios.length}`,
        on: last ? new Date(last.at).toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" }) : "—",
      };
    });
    const diagnostic = [...history].filter((item) => item.kind === "diagnostic").sort((a, b) => b.at - a.at)[0];
    const first = [...history].sort((a, b) => a.at - b.at)[0];
    return {
      rows,
      masteredCount: rows.filter((row) => row.mastered).length,
      diagnostic,
      started: first ? new Date(first.at).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }) : null,
      answered: quizEntries.reduce((sum, entry) => sum + entry.total, 0),
    };
  }, [progress, history, quizEntries]);

  const nothingYet = history.length === 0 && Object.keys(progress).length === 0;

  return (
    <div className="page results-page">
      <PageIntro
        eyebrow="Results"
        title="What the evidence says about your learning"
        body="Best scores, where the effort is going, whether it is sticking, and what is due next. Everything here is computed from your own attempts on this device."
      />

      {nothingYet ? (
        <EmptyState
          illustration={<IllusEmptyResults />}
          title="No attempts recorded yet"
          body="Complete a knowledge check or a practice set and this page fills with your accuracy, trend and review forecast."
          action={
            <button className="primary" onClick={() => navigate("path")}>
              Start Stage 1 <ChevronRight size={18} aria-hidden="true" />
            </button>
          }
        />
      ) : (
        <>
          <section className="results-headline">
            <Radial
              value={completion}
              label="Mastered"
              caption={`${mastered} of ${modules.length} stages complete`}
              colour="var(--accent-3)"
            />
            <div className="results-stats">
              <div>
                <strong>{lifetimeAccuracy || "—"}{lifetimeAccuracy ? "%" : ""}</strong>
                <span>Practice accuracy</span>
                <small>{lifetimeCorrect} correct of {lifetimeTotal} answered in stage and mixed practice</small>
              </div>
              <div>
                <strong>{history.length}</strong>
                <span>Scored attempts</span>
                <small>Quizzes, practice sets and diagnostics</small>
              </div>
              <div>
                <strong>{studyActivity.total}</strong>
                <span>Study days</span>
                <small>Distinct dates recorded on this device—not a target or streak</small>
              </div>
              <div>
                <strong>{practiceBest || "—"}{practiceBest ? "%" : ""}</strong>
                <span>Best mixed practice</span>
                <small>Interleaved questions across all stages</small>
              </div>
            </div>
          </section>

          <section className="results-guidance" aria-labelledby="results-guidance-title">
            <TrendingUp size={24} aria-hidden="true" />
            <div>
              <span className="eyebrow">Your useful next step</span>
              <h2 id="results-guidance-title">What these results mean right now</h2>
              <p>{evidenceSummary}</p>
              <p>You can complete the course in one day or spread it out. Flashcard return dates are optional follow-up practice, not deadlines and not part of the stage-completion rule.</p>
            </div>
            <div className="guidance-summary">
              <span><strong>{itemView.revisit.length}</strong> question{itemView.revisit.length === 1 ? "" : "s"} to revisit</span>
              <span><strong>{dueNow}</strong> review card{dueNow === 1 ? "" : "s"} due now</span>
              <button type="button" className="primary" onClick={() => navigate(nextAction.view)}>{nextAction.label}<ChevronRight size={17} aria-hidden="true" /></button>
            </div>
          </section>

          <div className="chart-grid">
            <ChartCard
              title="Score trend"
              hint="Your scored activities in order. The list underneath identifies the activity behind each recent score."
              empty={trend.length < 2 ? "Two scored attempts are needed before a trend means anything." : undefined}
            >
              <TrendChart points={trend} ariaLabel="Score for each attempt over time" />
              <ol className="recent-attempts" aria-label="Most recent scored activities">
                {trend.slice(-5).reverse().map((entry) => <li key={`${entry.at}-${entry.label}`}><span>{entry.label}</span><strong>{entry.score}%</strong></li>)}
              </ol>
            </ChartCard>

            <ChartCard
              title="Review forecast"
              hint="Optional flashcard return dates created by your ratings—not course deadlines. Review when useful; continue the course at your own pace."
            >
              <ColumnChart
                columns={forecast}
                ariaLabel="Flashcards due each day over the next fourteen days"
                highlightFirst
              />
              <p className="chart-footnote">
                {dueNow > 0 ? (
                  <>
                    <strong>{dueNow}</strong> due for review now.{" "}
                    <button className="text-button" onClick={() => navigate("review")}>
                      Start review <ChevronRight size={15} aria-hidden="true" />
                    </button>
                  </>
                ) : (
                  "Nothing due for review right now."
                )}
                {notStartedCards > 0 && <> <span>{notStartedCards} card{notStartedCards === 1 ? "" : "s"} not started; they become available as you work through the lessons.</span></>}
              </p>
            </ChartCard>

            <ChartCard
              title="Accuracy by stage"
              hint="Your best knowledge-check score for each stage. Anything under 75% has not met the recall requirement."
              empty={accuracy.length === 0 ? "No stage knowledge check has been completed yet. Diagnostic and mixed-practice scores appear in the trend and activity panels instead." : undefined}
            >
              <BarList series={accuracy} ariaLabel="Best knowledge check score for each stage" />
            </ChartCard>

            <ChartCard
              title="Questions to revisit"
              hint="Questions missed at least once. One miss is an early signal; repeated misses are stronger. This is your revision list, not a judgement on the item."
              empty={
                itemView.revisit.length === 0
                  ? itemView.answered === 0
                    ? "No questions answered yet."
                    : "Nothing currently needs another look. Questions you miss will appear here."
                  : undefined
              }
            >
              {itemView.revisit.length > 0 && (
                <>
                  <ul className="item-stats">
                    {visibleRevisit.map((row) => (
                      <li key={row.id}>
                        <span className="item-accuracy" data-band={row.accuracy < 50 ? "low" : row.accuracy < 80 ? "mid" : "high"}>
                          {row.accuracy}%
                        </span>
                        <span className="item-prompt">{row.prompt}</span>
                        <span className="item-seen">
                          {row.correct} of {row.seen} correct · Stage {modules.find((m) => m.id === row.moduleId)?.number ?? "—"}
                          <button type="button" className="text-button" onClick={() => navigate(`module:${row.moduleId}`)}>Review this stage</button>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="item-note">
                    {itemView.consistentlyCorrect} answered question{itemView.consistentlyCorrect === 1 ? " has" : "s have"} been correct every time so far.
                  </p>
                  {itemView.revisit.length > 5 && <button type="button" className="secondary item-expand" onClick={() => setShowAllRevisit((current) => !current)}>{showAllRevisit ? "Show first 5" : `Show all ${itemView.revisit.length}`}</button>}
                </>
              )}
            </ChartCard>

            <ChartCard
              title="What you have completed"
              hint="Counts every scored activity recorded in this browser, including mixed practice and diagnostics."
            >
              <BarList series={activity} max={activityMax} suffix="" ariaLabel="Completed learning activities by type" />
            </ChartCard>

            <ChartCard
              title="Flashcard review status"
              hint="Cards not started, due now, returning within seven days or scheduled later. Later reviews are optional reinforcement, not completion requirements."
            >
              <StackedBar series={reviewStatus} ariaLabel="Flashcards by current review status" />
            </ChartCard>

            <ChartCard title="Study activity" hint="The actual dates on which this browser recorded learning. This is history, not a target—you may finish in one day or return over time.">
              <div className="study-day-summary"><strong>{studyActivity.total}</strong><span>study day{studyActivity.total === 1 ? "" : "s"} recorded</span></div>
              <ul className="study-date-list">
                {studyActivity.recent.map((day) => <li key={day.key}><strong>{day.relative}</strong><span>{day.date}</span></li>)}
              </ul>
              {studyActivity.earlier > 0 && <p className="chart-footnote">Plus {studyActivity.earlier} earlier study day{studyActivity.earlier === 1 ? "" : "s"}.</p>}
            </ChartCard>
          </div>

          <section className="record-panel">
            <div className="record-actions no-print">
              <div>
                <span className="eyebrow">Record of completion</span>
                <h2>Something you can show someone</h2>
                <p>
                  A plain statement of what this browser recorded. It is not a certificate and nobody has verified it —
                  print it or save it as PDF for a capability plan or a performance conversation, alongside the capstone
                  brief you wrote.
                </p>
              </div>
              <button className="primary" onClick={() => window.print()}>
                <Printer size={18} aria-hidden="true" /> Print the record
              </button>
            </div>

            <div className="record-sheet">
              <header>
                <span>{manifest.title} · {manifest.publisher}</span>
                <h3>Record of completion</h3>
                <p>
                  Self-recorded in a single browser. Not a certification, not issued or verified by the department, and
                  not evidence of assessment by anyone other than the learner.
                </p>
              </header>

              <dl className="record-summary">
                <div>
                  <dt>Stages demonstrated</dt>
                  <dd>{record.masteredCount} of {modules.length}</dd>
                </div>
                <div>
                  <dt>Questions answered</dt>
                  <dd>{record.answered}</dd>
                </div>
                <div>
                  <dt>Practice accuracy</dt>
                  <dd>{lifetimeAccuracy || "—"}{lifetimeAccuracy ? "%" : ""}</dd>
                </div>
                <div>
                  <dt>Study days recorded</dt>
                  <dd>{studyDays.length}</dd>
                </div>
                <div>
                  <dt>First recorded attempt</dt>
                  <dd>{record.started ?? "—"}</dd>
                </div>
                <div>
                  <dt>Record produced</dt>
                  <dd>{new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</dd>
                </div>
              </dl>

              <table className="record-table">
                <caption>Per-stage outcome. Mastery requires the lesson read, {MASTERY_QUIZ_THRESHOLD}% on the knowledge check, and both decision scenarios correct.</caption>
                <thead>
                  <tr>
                    <th scope="col">Stage</th>
                    <th scope="col">Best check</th>
                    <th scope="col">Attempts</th>
                    <th scope="col">Scenarios</th>
                    <th scope="col">Last attempt</th>
                    <th scope="col">Demonstrated</th>
                  </tr>
                </thead>
                <tbody>
                  {record.rows.map((row) => (
                    <tr key={row.number}>
                      <th scope="row">{row.number}. {row.title}</th>
                      <td>{row.score ? `${row.score}%` : "—"}</td>
                      <td>{row.attempts || "—"}</td>
                      <td>{row.scenarios}</td>
                      <td>{row.on}</td>
                      <td>{row.mastered ? "Yes" : "Not yet"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {record.diagnostic && (
                <p className="record-note">
                  Most recent diagnostic: {record.diagnostic.correct} of {record.diagnostic.total} correct
                  ({record.diagnostic.score}%), {new Date(record.diagnostic.at).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}.
                </p>
              )}
              <p className="record-foot">
                Content reviewed {CONTENT_REVIEWED}. Built from <em>{manifest.source}</em>
                {manifest.sourceAuthor ? `, by ${manifest.sourceAuthor}` : ""}.
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
