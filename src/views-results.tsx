import { useMemo } from "react";
import { ChevronRight, TrendingUp } from "lucide-react";
import { modules } from "./course";
import { flashcards } from "./reference";
import { DAY_MS, daysAgoKey, localDayKey, type ReviewSchedule, type View } from "./lib";
import { masteryState, type HistoryEntry, type ProgressMap, type ReviewMap } from "./state";
import { BarList, ChartCard, ColumnChart, Heatmap, Radial, StackedBar, TrendChart } from "./charts";
import { IllusEmptyResults } from "./illustrations";
import { EmptyState, PageIntro } from "./components";

const stageColour = (n: number) => `var(--accent-${n})`;

export function Results({
  progress,
  reviews,
  history,
  studyDays,
  practiceBest,
  navigate,
}: {
  progress: ProgressMap;
  reviews: ReviewMap;
  history: HistoryEntry[];
  studyDays: string[];
  practiceBest: number;
  navigate: (view: View) => void;
}) {
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

  /* Where the effort is going: attempts per stage. */
  const effort = modules
    .filter((m) => (progress[m.id]?.attempts ?? 0) > 0)
    .map((m) => {
      const attempts = progress[m.id]?.attempts ?? 0;
      const scenarioAttempts = Object.values(progress[m.id]?.scenarioAttempts ?? {}).reduce((a, b) => a + b, 0);
      const total = attempts + scenarioAttempts;
      return {
        label: `${m.number}. ${m.title}`,
        value: total,
        colour: stageColour(m.number),
        detail: `${total} attempt${total === 1 ? "" : "s"}`,
      };
    })
    .sort((a, b) => b.value - a.value);
  const effortMax = Math.max(1, ...effort.map((e) => e.value));

  /* Score trend across every scored attempt, oldest first. */
  const trend = useMemo(
    () =>
      [...history]
        .sort((a, b) => a.at - b.at)
        .slice(-24)
        .map((entry) => ({
          at: entry.at,
          score: entry.score,
          label: `${entry.kind === "quiz" ? modules.find((m) => m.id === entry.moduleId)?.title ?? "Quiz" : entry.kind === "practice" ? "Mixed practice" : "Diagnostic"} — ${new Date(entry.at).toLocaleDateString("en-AU", { day: "numeric", month: "short" })}`,
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
    const unseen = flashcards.filter((card) => !reviews[card.id]).length;
    buckets[0].value += unseen;
    return buckets;
  }, [reviews]);

  /* Card maturity — how much of the deck has actually stuck. */
  const maturity = useMemo(() => {
    let unseen = 0;
    let learning = 0;
    let young = 0;
    let mature = 0;
    flashcards.forEach((card) => {
      const schedule = reviews[card.id] as ReviewSchedule | undefined;
      if (!schedule) unseen += 1;
      else if (schedule.interval < 1) learning += 1;
      else if (schedule.interval < 21) young += 1;
      else mature += 1;
    });
    return [
      { label: "Not started", value: unseen, colour: "var(--line-strong)" },
      { label: "Relearning", value: learning, colour: "var(--warning)" },
      { label: "Young", value: young, colour: "var(--accent-5)" },
      { label: "Mature", value: mature, colour: "var(--success)" },
    ].filter((item) => item.value > 0);
  }, [reviews]);

  /* Twelve-week study heatmap, weeks as columns. */
  const heatmap = useMemo(() => {
    const days = Array.from({ length: 84 }, (_, index) => {
      const offset = 83 - index;
      const key = daysAgoKey(offset);
      const date = new Date();
      date.setDate(date.getDate() - offset);
      return {
        key,
        label: `${date.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" })} — ${studyDays.includes(key) ? "studied" : "no session"}`,
        active: studyDays.includes(key),
      };
    });
    const weeks: (typeof days)[] = [];
    for (let index = 0; index < days.length; index += 7) weeks.push(days.slice(index, index + 7));
    return weeks;
  }, [studyDays]);

  const currentStreak = useMemo(() => {
    let streak = 0;
    for (let offset = 0; offset < 400; offset += 1) {
      if (studyDays.includes(daysAgoKey(offset))) streak += 1;
      else if (offset > 0) break;
    }
    return streak;
  }, [studyDays]);

  const quizEntries = history.filter((entry) => entry.kind !== "diagnostic");
  const lifetimeCorrect = quizEntries.reduce((sum, entry) => sum + entry.correct, 0);
  const lifetimeTotal = quizEntries.reduce((sum, entry) => sum + entry.total, 0);
  const lifetimeAccuracy = lifetimeTotal ? Math.round((lifetimeCorrect / lifetimeTotal) * 100) : 0;
  const dueNow = forecast[0].value;

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
                <span>Lifetime accuracy</span>
                <small>{lifetimeCorrect} correct of {lifetimeTotal} answered</small>
              </div>
              <div>
                <strong>{history.length}</strong>
                <span>Scored attempts</span>
                <small>Quizzes, practice sets and diagnostics</small>
              </div>
              <div>
                <strong>{currentStreak}</strong>
                <span>Day streak</span>
                <small>{studyDays.length} study days recorded overall</small>
              </div>
              <div>
                <strong>{practiceBest || "—"}{practiceBest ? "%" : ""}</strong>
                <span>Best mixed practice</span>
                <small>Interleaved questions across all stages</small>
              </div>
            </div>
          </section>

          <div className="chart-grid">
            <ChartCard
              title="Score trend"
              hint="Every scored attempt in order. Mixed practice dipping below your quiz scores is normal — interleaving is harder."
              empty={trend.length < 2 ? "Two scored attempts are needed before a trend means anything." : undefined}
            >
              <TrendChart points={trend} ariaLabel="Score for each attempt over time" />
            </ChartCard>

            <ChartCard
              title="Review forecast"
              hint="Cards falling due over the next fortnight. Flat bars mean a sustainable schedule; a spike means a heavy day."
            >
              <ColumnChart
                columns={forecast}
                ariaLabel="Flashcards due each day over the next fourteen days"
                highlightFirst
              />
              <p className="chart-footnote">
                {dueNow > 0 ? (
                  <>
                    <strong>{dueNow}</strong> due now.{" "}
                    <button className="text-button" onClick={() => navigate("review")}>
                      Start review <ChevronRight size={15} aria-hidden="true" />
                    </button>
                  </>
                ) : (
                  "Nothing due right now."
                )}
              </p>
            </ChartCard>

            <ChartCard
              title="Accuracy by stage"
              hint="Your best knowledge-check score for each stage. Anything under 75% has not met the recall requirement."
              empty={accuracy.length === 0 ? "Complete a knowledge check to populate this." : undefined}
            >
              <BarList series={accuracy} ariaLabel="Best knowledge check score for each stage" />
            </ChartCard>

            <ChartCard
              title="Where the effort went"
              hint="Total attempts per stage, quizzes and scenarios combined. The longest bar is the idea that fought back hardest."
              empty={effort.length === 0 ? "No attempts recorded yet." : undefined}
            >
              <BarList series={effort} max={effortMax} suffix="" ariaLabel="Attempts per stage" />
            </ChartCard>

            <ChartCard
              title="Is it sticking?"
              hint="Flashcards by review interval. Mature means an interval of three weeks or more — that is durable recall, not cramming."
            >
              <StackedBar series={maturity} ariaLabel="Flashcards by maturity" />
            </ChartCard>

            <ChartCard title="Study rhythm" hint="Last twelve weeks. Spaced sessions beat one long reread.">
              <Heatmap weeks={heatmap} ariaLabel="Study activity over the last twelve weeks" />
            </ChartCard>
          </div>

          <section className="results-note">
            <TrendingUp size={22} aria-hidden="true" />
            <div>
              <h2>Reading these honestly</h2>
              <p>
                A high accuracy bar next to a low maturity split means you can recognise the answers but have not yet
                held them over time. That is the gap spaced review closes — and it is exactly the difference between
                remembering the slide and being able to use the idea in a meeting six weeks from now.
              </p>
            </div>
          </section>
        </>
      )}
    </div>
  );
}

export { localDayKey };
