import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  Printer,
  RefreshCw,
} from "lucide-react";
import { modules, quizPoolFor, totalMinutes, type Module, type Question } from "./course";
import { caseStudies, contrasts, diagnosticQuestions, supplementaryQuestions } from "./reference";
import { SlideRangeLink } from "./slide-viewer";
import { daysAgoKey, estimateHours, scrollToSection, shuffle, type View } from "./lib";
import { sectionsToRevisit } from "./recall";
import {
  emptyModuleProgress,
  masteryState,
  MASTERY_QUIZ_THRESHOLD,
  type HistoryEntry,
  type ModuleProgress,
  type ProgressMap,
} from "./state";
import { LessonBody, Feedback, LessonTableView, PageIntro, ProgressBar, QuestionCard, SourceChips } from "./components";
import { stageIllustrations } from "./illustrations";

/** Questions per stage attempt, sampled from that stage's pool of 8-9. */
const QUIZ_LENGTH = 5;

/**
 * Counted, not typed. The home page states this figure, and a hardcoded one
 * silently becomes a lie the next time the bank grows — which is exactly how
 * the README ended up claiming 68 questions against an actual 122.
 */
const QUESTION_COUNT =
  modules.reduce((total, module) => total + module.questions.length + module.scenarios.length, 0) +
  supplementaryQuestions.length +
  diagnosticQuestions.length;

/** Stable per-section anchor, so the contents list and the re-teach panel agree. */
const sectionId = (moduleId: string, index: number) => `s-${moduleId}-${index + 1}`;

type Navigate = (view: View) => void;

export function Dashboard({
  completion,
  mastered,
  quizAverage,
  dueCount,
  nextModule,
  progress,
  studyDays,
  navigate,
}: {
  completion: number;
  mastered: number;
  quizAverage: number;
  dueCount: number;
  nextModule: Module;
  progress: ProgressMap;
  studyDays: string[];
  navigate: Navigate;
}) {
  const recentDays = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => {
        const offset = 13 - index;
        const key = daysAgoKey(offset);
        const date = new Date();
        date.setDate(date.getDate() - offset);
        return {
          key,
          label: date.toLocaleDateString("en-AU", { weekday: "narrow" }),
          full: date.toLocaleDateString("en-AU", { weekday: "long", day: "numeric", month: "long" }),
          active: studyDays.includes(key),
        };
      }),
    [studyDays],
  );

  const started = Object.keys(progress).length > 0 || studyDays.length > 1;

  return (
    <div className="page dashboard-page">
      {/*
        The home page has to answer "what is this?" before it answers "what
        next?". It previously opened on the tagline "Learn the judgement behind
        the frameworks" — true, but it never named the training, so anyone
        arriving cold had to infer what they had opened.
      */}
      <section className="hero">
        <div>
          <span className="eyebrow">Internal training · DEWR Digital Experience and Solutions</span>
          <h1>Product Management Fundamentals</h1>
          <p className="hero-lead">
            A nine-stage course in product management for Australian Government service delivery. It takes the
            98-slide departmental deck and turns it into something you practise rather than sit through: understand
            the idea, retrieve it from memory, apply it to a real service decision, then review it later.
          </p>
          <ul className="hero-facts">
            <li>
              <strong>{modules.length} stages</strong>
              <span>From need to measured value</span>
            </li>
            <li>
              <strong>{estimateHours(totalMinutes).replace("about ", "~")}</strong>
              <span>Reading, in total</span>
            </li>
            <li>
              <strong>{QUESTION_COUNT} questions</strong>
              <span>With feedback on every option</span>
            </li>
            <li>
              <strong>Works offline</strong>
              <span>Progress stays on your device</span>
            </li>
          </ul>
          <div className="button-row">
            <button className="primary" onClick={() => navigate(`module:${nextModule.id}`)}>
              {started ? `Continue with Stage ${nextModule.number}` : "Start Stage 1"}
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <button className="secondary" onClick={() => navigate("diagnostic")}>
              {started ? "Take the diagnostic" : "Not sure where to start? Take the diagnostic"}
            </button>
          </div>
          <p className="commitment">
            Built for an hour here and there. Nothing needs finishing in a sitting, and the review queue picks up
            wherever you left off.
          </p>
        </div>
        <div className="hero-index">
          <span>Mastery</span>
          <strong>{completion}%</strong>
          <ProgressBar value={completion} label="Overall course mastery" />
          <small>
            {mastered} of {modules.length} stages demonstrated
          </small>
        </div>
      </section>

      <section className="metric-strip" aria-label="Learning statistics">
        <div>
          <strong>
            {mastered}/{modules.length}
          </strong>
          <span>Stages mastered</span>
        </div>
        <div>
          <strong>
            {quizAverage || "—"}
            {quizAverage ? "%" : ""}
          </strong>
          <span>Quiz average</span>
        </div>
        <div>
          <strong>{dueCount}</strong>
          <span>Cards ready today</span>
        </div>
        <div>
          <strong>{studyDays.length}</strong>
          <span>Study days recorded</span>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="study-plan">
          <header className="section-heading">
            <div>
              <span className="eyebrow">Today's deliberate practice</span>
              <h2>Three useful moves</h2>
            </div>
            <Clock3 size={22} aria-hidden="true" />
          </header>
          <ol className="plan-list">
            <li>
              <span aria-hidden="true">01</span>
              <div>
                <strong>Retrieve</strong>
                <p>Clear the due review queue before rereading anything.</p>
              </div>
              <button onClick={() => navigate("review")}>Start review</button>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <div>
                <strong>Build the model</strong>
                <p>Complete the next lesson and explain its core idea in your own words.</p>
              </div>
              <button onClick={() => navigate(`module:${nextModule.id}`)}>Open stage</button>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <div>
                <strong>Transfer</strong>
                <p>Answer mixed scenarios so the idea works outside the slide where you first saw it.</p>
              </div>
              <button onClick={() => navigate("practice")}>Practise</button>
            </li>
          </ol>
        </section>

        <section className="study-rhythm">
          <span className="eyebrow">Last 14 days</span>
          <h2>Study rhythm</h2>
          <ul className="day-grid" aria-label="Study activity over the last fourteen days">
            {recentDays.map((day) => (
              <li key={day.key}>
                <i className={day.active ? "active" : ""} aria-hidden="true" />
                <span aria-hidden="true">{day.label}</span>
                <span className="visually-hidden">{day.full}: {day.active ? "studied" : "no session"}</span>
              </li>
            ))}
          </ul>
          <p>
            Short, spaced sessions beat one long reread. The review queue adapts to the confidence rating you give each
            card.
          </p>
          <button className="text-button" onClick={() => navigate("sources")}>
            Why the learning design works <ChevronRight size={16} aria-hidden="true" />
          </button>
        </section>
      </div>

      <section className="course-rail">
        <div className="section-heading">
          <div>
            <span className="eyebrow">The complete reasoning chain</span>
            <h2>From user need to measured value</h2>
          </div>
          <button className="text-button" onClick={() => navigate("path")}>
            View full path <ChevronRight size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="rail-track">
          {modules.map((module) => {
            const done = masteryState(progress[module.id], module.scenarios.length).mastered;
            return (
              <button
                key={module.id}
                className={done ? "done" : ""}
                data-stage={module.number}
                onClick={() => navigate(`module:${module.id}`)}
              >
                <span aria-hidden="true">{done ? <Check size={15} /> : module.number}</span>
                <strong>{module.title}</strong>
                {done && <span className="visually-hidden">(mastered)</span>}
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export function LearningPath({ progress, navigate }: { progress: ProgressMap; navigate: Navigate }) {
  return (
    <div className="page">
      <PageIntro
        eyebrow="Nine-stage curriculum"
        title="Build the whole product-management chain"
        body={`Each stage names a capability, not just a topic. Mastery requires reading the lesson, scoring at least ${MASTERY_QUIZ_THRESHOLD}% on the knowledge check, and answering both decision scenarios correctly.`}
      />
      <p className="path-total">
        {estimateHours(totalMinutes).replace("about", "About")} across {modules.length} stages. Take one at a time — each is a self-contained hour or less.
      </p>
      <div className="path-list">
        {modules.map((module) => {
          const item = progress[module.id] ?? emptyModuleProgress();
          const state = masteryState(item, module.scenarios.length);
          return (
            <article key={module.id} className="path-item" data-stage={module.number}>
              <div className={`path-number ${state.mastered ? "done" : ""}`} aria-hidden="true">
                {state.mastered ? <Check size={20} /> : String(module.number).padStart(2, "0")}
              </div>
              <div className="path-copy">
                <div className="path-meta">
                  <span>{module.minutes} min</span>
                  <SlideRangeLink range={module.slides} />
                  {state.mastered && <span className="mastered-label">Mastered</span>}
                </div>
                <h2>
                  <span className="visually-hidden">Stage {module.number}: </span>
                  {module.title}
                </h2>
                <p>{module.subtitle}</p>
                <ul className="mini-progress">
                  <li className={state.learn ? "done" : ""}>Learn{state.learn && <span className="visually-hidden"> — complete</span>}</li>
                  <li className={state.recall ? "done" : ""}>Recall{state.recall && <span className="visually-hidden"> — complete</span>}</li>
                  <li className={state.apply ? "done" : ""}>Apply{state.apply && <span className="visually-hidden"> — complete</span>}</li>
                </ul>
              </div>
              <button className="secondary" onClick={() => navigate(`module:${module.id}`)}>
                {state.mastered ? "Revisit" : "Open stage"}
                <ChevronRight size={17} aria-hidden="true" />
                <span className="visually-hidden"> stage {module.number}, {module.title}</span>
              </button>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function ModuleView({
  module,
  progress,
  update,
  navigate,
  salt,
  onQuizScored,
}: {
  module: Module;
  progress: ModuleProgress;
  update: (changes: Partial<ModuleProgress>) => void;
  navigate: Navigate;
  salt: string;
  onQuizScored: (entry: Omit<HistoryEntry, "at">, missed?: Question[]) => number;
}) {
  // Each attempt draws a fresh sample from the stage's pool, so retaking is a
  // new test rather than a memory check of the same five items.
  const [quizAttempt, setQuizAttempt] = useState(0);
  const quizPool = useMemo(() => quizPoolFor(module.id), [module.id]);
  const quizQuestions = useMemo(
    () => shuffle(quizPool).slice(0, Math.min(QUIZ_LENGTH, quizPool.length)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [module.id, quizAttempt],
  );
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [scenarioAnswers, setScenarioAnswers] = useState<Record<string, number>>({});
  const [scenariosChecked, setScenariosChecked] = useState<Record<string, boolean>>({});

  const state = masteryState(progress, module.scenarios.length);

  const quizAnswered = quizQuestions.filter((question) => answers[question.id] !== undefined).length;
  const [quizChased, setQuizChased] = useState(false);
  const [resurfaced, setResurfaced] = useState(0);
  const [revisit, setRevisit] = useState<string[]>([]);

  const submitQuiz = () => {
    // Point at the first gap rather than refusing to act. Same rule as the
    // diagnostic: the button must always do something the learner can use.
    const firstGap = quizQuestions.findIndex((question) => answers[question.id] === undefined);
    if (firstGap !== -1) {
      setQuizChased(true);
      const slot = document.getElementById(`quiz-q${firstGap + 1}`);
      slot?.scrollIntoView({ behavior: "smooth", block: "center" });
      slot?.querySelector<HTMLElement>("input, button")?.focus({ preventScroll: true });
      return;
    }
    const correct = quizQuestions.filter((question) => answers[question.id] === question.answer).length;
    const score = Math.round((correct / quizQuestions.length) * 100);
    update({ quizScore: Math.max(progress.quizScore, score), attempts: progress.attempts + 1 });
    const missed = quizQuestions.filter((question) => answers[question.id] !== question.answer);
    setResurfaced(onQuizScored({ kind: "quiz", moduleId: module.id, score, correct, total: quizQuestions.length }, missed));
    setRevisit(sectionsToRevisit(module, missed));
    setQuizSubmitted(true);
  };

  const retryQuiz = () => {
    setAnswers({});
    setQuizSubmitted(false);
    setQuizChased(false);
    setRevisit([]);
    setQuizAttempt((n) => n + 1);
  };

  const checkScenario = (scenarioId: string, answer: number) => {
    setScenariosChecked((current) => ({ ...current, [scenarioId]: true }));
    const scenario = module.scenarios.find((item) => item.id === scenarioId);
    if (!scenario) return;
    const attempts = { ...progress.scenarioAttempts, [scenarioId]: (progress.scenarioAttempts[scenarioId] ?? 0) + 1 };
    const solved = answer === scenario.answer && !progress.scenariosCorrect.includes(scenarioId);
    update({
      scenarioAttempts: attempts,
      ...(solved ? { scenariosCorrect: [...progress.scenariosCorrect, scenarioId] } : {}),
    });
  };

  const retryScenario = (scenarioId: string) => {
    setScenariosChecked((current) => ({ ...current, [scenarioId]: false }));
    setScenarioAnswers((current) => {
      const next = { ...current };
      delete next[scenarioId];
      return next;
    });
  };

  const scenarioAttemptTotal = module.scenarios.reduce(
    (sum, scenario) => sum + (progress.scenarioAttempts[scenario.id] ?? 0),
    0,
  );

  const lastQuizScore = quizSubmitted
    ? Math.round(
        (quizQuestions.filter((question) => answers[question.id] === question.answer).length /
          quizQuestions.length) *
          100,
      )
    : null;

  const StageIllustration = stageIllustrations[module.id];
  // Stages that appear in a worked case get a direct pointer to it, so the
  // abstraction and the worked instance are one click apart.
  const workedIn = caseStudies.filter((c) => c.steps.some((step) => step.moduleId === module.id));
  const stageContrasts = contrasts.filter((c) => c.moduleId === module.id);
  const allSourceIds = [...new Set(module.sections.flatMap((section) => section.sourceIds ?? []))];
  const next = modules.find((item) => item.number === module.number + 1);

  return (
    // data-stage drives the accent colour for everything inside this page.
    <div className="page module-page" data-stage={module.number}>
      <button className="back-button" onClick={() => navigate("path")}>
        <ArrowLeft size={17} aria-hidden="true" /> Learning path
      </button>

      <header className="module-hero">
        <div className="module-index" aria-hidden="true">
          {String(module.number).padStart(2, "0")}
        </div>
        <div>
          <div className="path-meta">
            <span>
              <Clock3 size={14} aria-hidden="true" /> {module.minutes} minutes
            </span>
            <SlideRangeLink range={module.slides} />
          </div>
          <h1>
            <span className="visually-hidden">Stage {module.number}: </span>
            {module.title}
          </h1>
          <p className="module-subtitle">{module.subtitle}</p>
          <div className="outcome-box">
            <strong>Capability outcome</strong>
            <span>{module.outcome}</span>
          </div>
        </div>
      </header>

      {StageIllustration && (
        <figure className="stage-illustration">
          <StageIllustration />
        </figure>
      )}

      <section className="core-idea" aria-label="The core idea of this stage">
        <span className="eyebrow">The idea to keep</span>
        <blockquote>{module.coreIdea}</blockquote>
      </section>

      {/*
        In-page contents. A stage is now eight or nine sections including a
        300-word worked-reasoning passage, which is a long scroll with no way
        to see the shape of it or come back to one part.
      */}
      <nav className="stage-contents" aria-label="Sections in this stage">
        <span className="eyebrow">In this stage</span>
        <ol>
          {module.sections.map((section, index) => (
            <li key={section.heading}>
              <button onClick={() => scrollToSection(sectionId(module.id, index))}>{section.heading}</button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="lesson-sections">
        {module.sections.map((section, index) => (
          <section key={section.heading} id={sectionId(module.id, index)} className="lesson-section">
            <div className="section-count" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h2>{section.heading}</h2>
              <LessonBody text={section.body} />
              {section.bullets && (
                <ul>
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
              {section.table && <LessonTableView table={section.table} />}
              {section.example && (
                <div className="worked-example">
                  <strong>Worked example</strong>
                  <p>{section.example}</p>
                </div>
              )}
              {section.sourceIds && section.sourceIds.length > 0 && (
                <div className="section-sources">
                  <span className="section-sources-label">Sources for this section</span>
                  <SourceChips ids={section.sourceIds} />
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {stageContrasts.length > 0 && (
        <section className="contrast-panel">
          <span className="eyebrow">In practice</span>
          <h2>What good looks like, and what usually happens</h2>
          <p className="contrast-intro">
            Agreeing with a principle is easy. The right-hand column is what most teams are actually doing, and the
            tell is how you check which one you are in this week.
          </p>
          {stageContrasts.map((item) => (
            <article key={item.good} className="contrast">
              <div className="contrast-pair">
                <div className="contrast-good">
                  <span>Good</span>
                  <p>{item.good}</p>
                </div>
                <div className="contrast-usual">
                  <span>Usually</span>
                  <p>{item.usual}</p>
                </div>
              </div>
              <p className="contrast-tell"><strong>The tell:</strong> {item.tell}</p>
            </article>
          ))}
        </section>
      )}

      <section className="reflection-panel">
        <span className="eyebrow">Retrieval pause</span>
        <h2>Explain the core idea without copying it</h2>
        <p>Imagine a colleague asks why this stage changes a product decision. Write two or three sentences from memory.</p>
        <label>
          <span className="visually-hidden">Your explanation of this stage's core idea</span>
          <textarea
            value={progress.reflection}
            onChange={(event) => update({ reflection: event.target.value })}
            placeholder="In my own words…"
            rows={5}
          />
        </label>
        <label className="completion-check">
          <input
            type="checkbox"
            checked={progress.lessonRead}
            onChange={(event) => update({ lessonRead: event.target.checked })}
          />
          <span>I can explain the lesson without relying on the slide wording.</span>
        </label>
      </section>

      <section className="knowledge-check">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Active recall</span>
            <h2>Knowledge check</h2>
          </div>
          <span className="score-pill">
            Best {progress.quizScore || 0}%
            {progress.attempts > 0 && <span className="attempts"> · {progress.attempts} attempt{progress.attempts === 1 ? "" : "s"}</span>}
          </span>
        </div>
        <p className="check-note">
          {MASTERY_QUIZ_THRESHOLD}% or better completes the Recall requirement. Each attempt draws{" "}
          {quizQuestions.length} questions at random from {quizPool.length} for this stage, and answer order is
          shuffled — so retaking is a fresh test, not a memory check.
        </p>
        {quizQuestions.map((question, index) => (
          <div
            key={question.id}
            id={`quiz-q${index + 1}`}
            className={`diagnostic-slot ${
              quizChased && !quizSubmitted && answers[question.id] === undefined ? "unanswered" : ""
            }`}
          >
            <QuestionCard
              question={question}
              number={index + 1}
              total={quizQuestions.length}
              salt={salt}
              selected={answers[question.id] ?? null}
              onSelect={(choice) => setAnswers((current) => ({ ...current, [question.id]: choice }))}
              submitted={quizSubmitted}
            />
          </div>
        ))}
        {!quizSubmitted ? (
          /*
            Always enabled. The diagnostic had the identical construction —
            `disabled` until every question was answered, with opacity as the
            only signal — and it read as a broken button. A click that explains
            itself beats a click that is silently swallowed.
          */
          <div className="diagnostic-submit">
            <button className="primary" onClick={submitQuiz}>
              Check my recall
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <p className="diagnostic-progress" role="status" aria-live="polite">
              {quizAnswered === quizQuestions.length
                ? `All ${quizQuestions.length} answered.`
                : `${quizAnswered} of ${quizQuestions.length} answered${
                    quizChased ? ` — ${quizQuestions.length - quizAnswered} still to go, highlighted above.` : "."
                  }`}
            </p>
          </div>
        ) : (
          <div className="quiz-result" role="status" aria-live="polite">
            <strong>
              You scored {lastQuizScore}% this attempt. Best {progress.quizScore}%.
            </strong>
            {resurfaced > 0 && (
              <p className="resurfaced-note">
                {resurfaced} card{resurfaced === 1 ? "" : "s"} covering what you missed{" "}
                {resurfaced === 1 ? "has" : "have"} been added to your review queue.
              </p>
            )}
            {/*
              Failing used to produce a score and nothing else — reread the
              whole stage, which is the least efficient response and the one
              most likely to end the session. Name the sections instead.
            */}
            {revisit.length > 0 && (
              <div className="revisit-panel">
                <span className="eyebrow">Worth rereading</span>
                <ul>
                  {revisit.map((heading) => {
                    const index = module.sections.findIndex((s) => s.heading === heading);
                    return (
                      <li key={heading}>
                        <button onClick={() => scrollToSection(sectionId(module.id, index))}>{heading}</button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <button className="secondary" onClick={retryQuiz}>
              <RefreshCw size={16} aria-hidden="true" /> Try these again
            </button>
          </div>
        )}
      </section>

      <section className="scenario-panel">
        <span className="eyebrow">Decision scenarios</span>
        <h2>Apply the judgement</h2>
        <p>
          Both scenarios must be answered correctly to complete the Apply requirement.{" "}
          {progress.scenariosCorrect.length}/{module.scenarios.length} correct so far.
        </p>
        {module.scenarios.map((scenario, index) => (
          <div key={scenario.id}>
            <QuestionCard
              question={scenario}
              context={scenario.context}
              number={index + 1}
              total={module.scenarios.length}
              salt={salt}
              selected={scenarioAnswers[scenario.id] ?? null}
              onSelect={(choice) => {
                setScenarioAnswers((current) => ({ ...current, [scenario.id]: choice }));
                checkScenario(scenario.id, choice);
              }}
              submitted={Boolean(scenariosChecked[scenario.id])}
            />
            {scenariosChecked[scenario.id] && (
              <div className="scenario-retry">
                <span>
                  {progress.scenarioAttempts[scenario.id] ?? 1} attempt
                  {(progress.scenarioAttempts[scenario.id] ?? 1) === 1 ? "" : "s"}
                </span>
                <button className="secondary" onClick={() => retryScenario(scenario.id)}>
                  <RefreshCw size={16} aria-hidden="true" /> Try this scenario again
                </button>
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="assignment-panel">
        <span className="eyebrow">Apply it to your work</span>
        <h2>{module.assignment.title}</h2>
        <p>{module.assignment.instruction}</p>
        {module.assignment.prompts.map((prompt, index) => (
          <label key={prompt}>
            <span>{prompt}</span>
            <textarea
              rows={3}
              value={progress.assignment[index] ?? ""}
              onChange={(event) => {
                const nextAnswers = [...progress.assignment];
                nextAnswers[index] = event.target.value;
                update({ assignment: nextAnswers });
              }}
            />
          </label>
        ))}
      </section>

      {workedIn.length > 0 && (
        <aside className="worked-pointer">
          <div>
            <span className="eyebrow">See it applied</span>
            <p>
              This stage is worked end to end in{" "}
              {workedIn.map((c, i) => (
                <span key={c.id}>
                  {i > 0 && (i === workedIn.length - 1 ? " and " : ", ")}
                  <strong>{c.title}</strong>
                </span>
              ))}
              , with the real artefacts the team produced.
            </p>
          </div>
          <button className="secondary" onClick={() => navigate("cases")}>
            Open worked cases
            <ChevronRight size={17} aria-hidden="true" />
          </button>
        </aside>
      )}

      <section className="source-note">
        <span className="eyebrow">Sources used in this stage</span>
        <SourceChips ids={allSourceIds} />
      </section>

      {/* One-page summary. Hidden on screen; in print it replaces the page.
          Deliberately the four things worth having at a desk: the core idea,
          the capability outcome, the contrasts with their tells, and the
          artefact prompts. Not the lesson prose — that is for reading, not
          for pinning up. */}
      <section className="stage-print-summary" aria-hidden="true">
        {/* h2, not h1: the visible stage heading already owns the h1 on this
            page, and two of them breaks the document outline. */}
        <header>
          <span>Stage {module.number} · Product Practice</span>
          <h2>{module.title}</h2>
          <p>{module.subtitle}</p>
        </header>
        <div className="print-core">
          <strong>The idea to keep</strong>
          <p>{module.coreIdea}</p>
        </div>
        <div className="print-outcome">
          <strong>You should be able to</strong>
          <p>{module.outcome}</p>
        </div>
        {stageContrasts.length > 0 && (
          <div className="print-contrasts">
            <strong>Check yourself</strong>
            <table>
              <thead>
                <tr><th>Good</th><th>Usually</th><th>The tell</th></tr>
              </thead>
              <tbody>
                {stageContrasts.map((item) => (
                  <tr key={item.good}>
                    <td>{item.good}</td>
                    <td>{item.usual}</td>
                    <td>{item.tell}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <footer>
          Product Practice — internal learning aid, not an official Australian Government publication.
        </footer>
      </section>

      <div className="stage-actions">
        <button className="secondary" onClick={() => window.print()}>
          <Printer size={17} aria-hidden="true" /> Print a one-page summary
        </button>
        <span>Core idea, outcome and the checks — without the lesson prose.</span>
      </div>

      <footer className="module-footer">
        <div>
          <strong>Stage status</strong>
          <span>
            {state.mastered
              ? `Mastered — lesson, recall and application complete. Quiz best ${progress.quizScore}% over ${progress.attempts} attempt${progress.attempts === 1 ? "" : "s"}; scenarios solved in ${scenarioAttemptTotal} attempt${scenarioAttemptTotal === 1 ? "" : "s"}.`
              : `Outstanding: ${[!state.learn && "Learn", !state.recall && "Recall", !state.apply && "Apply"]
                  .filter(Boolean)
                  .join(", ")}.`}
          </span>
        </div>
        {next ? (
          <button className="primary" onClick={() => navigate(`module:${next.id}`)}>
            Next: {next.title}
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        ) : (
          <button className="primary" onClick={() => navigate("capstone")}>
            Open the capstone
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        )}
      </footer>
    </div>
  );
}

/**
 * The diagnostic samples ONE question per stage rather than nine at random
 * from the pool. Random sampling could miss stages entirely, which matters
 * because the result recommends a starting stage — a recommendation drawn from
 * a set that never tested half the curriculum is not worth much.
 */
function sampleDiagnostic() {
  return modules
    .map((module) => {
      const forStage = diagnosticQuestions.filter((question) => question.moduleId === module.id);
      return shuffle(forStage)[0];
    })
    .filter(Boolean);
}

export function Diagnostic({
  navigate,
  salt,
  onComplete,
}: {
  navigate: Navigate;
  salt: string;
  onComplete: (entry: Omit<HistoryEntry, "at">, missed?: Question[]) => number;
}) {
  const [seed, setSeed] = useState(0);
  const questions = useMemo(
    sampleDiagnostic,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [seed],
  );
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [complete, setComplete] = useState(false);

  const correct = questions.filter((question) => answers[question.id] === question.answer).length;

  // Recommend the earliest stage with a wrong answer, so the learner starts at
  // the first break in the chain rather than the most-missed topic.
  const missedModuleIds = questions
    .filter((question) => answers[question.id] !== question.answer)
    .map((question) => question.moduleId);
  const recommendation =
    modules.find((module) => missedModuleIds.includes(module.id)) ?? modules[modules.length - 1];
  const allCorrect = missedModuleIds.length === 0;

  const answered = questions.filter((question) => answers[question.id] !== undefined).length;

  /** Set once you have tried to submit with gaps, so the gaps get marked. */
  const [chased, setChased] = useState(false);
  const [resurfacedCards, setResurfacedCards] = useState(0);

  const submit = () => {
    const firstGap = questions.findIndex((question) => answers[question.id] === undefined);
    if (firstGap !== -1) {
      setChased(true);
      const slot = document.getElementById(`diagnostic-q${firstGap + 1}`);
      slot?.scrollIntoView({ behavior: "smooth", block: "center" });
      // Move focus as well as the viewport, so this works for a keyboard or
      // screen-reader user rather than only for a sighted mouse user.
      slot?.querySelector<HTMLElement>("input, button")?.focus({ preventScroll: true });
      return;
    }
    setComplete(true);
    const missed = questions.filter((question) => answers[question.id] !== question.answer);
    setResurfacedCards(onComplete({
      kind: "diagnostic",
      score: Math.round((correct / questions.length) * 100),
      correct,
      total: questions.length,
    }, missed));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const restart = () => {
    setAnswers({});
    setComplete(false);
    setChased(false);
    setSeed((value) => value + 1);
  };

  return (
    <div className="page narrow-page">
      <PageIntro
        eyebrow="Five-minute diagnostic"
        title="Find the first weak link"
        body={`This is not a grade. It draws one question per stage from a ${diagnosticQuestions.length}-item pool kept separate from the course quizzes, so every stage is tested and a good score means the ideas transfer rather than that you remember the wording.`}
      />
      {!complete ? (
        <section className="knowledge-check diagnostic-list">
          {questions.map((question, index) => (
            <div
              key={question.id}
              id={`diagnostic-q${index + 1}`}
              className={`diagnostic-slot ${chased && answers[question.id] === undefined ? "unanswered" : ""}`}
            >
              <QuestionCard
                question={question}
                number={index + 1}
                total={questions.length}
                salt={salt}
                selected={answers[question.id] ?? null}
                onSelect={(choice) => setAnswers((current) => ({ ...current, [question.id]: choice }))}
                submitted={false}
              />
            </div>
          ))}

          {/*
            The button used to be `disabled` until all nine were answered, with
            nothing but opacity to say so. Nine questions is a long scroll, so
            missing one is easy — and the result was a solid-looking primary
            button that did nothing when clicked, with no clue which question
            was outstanding.

            It is always enabled now. If anything is missing, the click takes
            you to the first gap and marks the rest, which is what you actually
            wanted the button to tell you.
          */}
          <div className="diagnostic-submit">
            <button className="primary" onClick={submit}>
              Show recommendation
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <p className="diagnostic-progress" role="status" aria-live="polite">
              {answered === questions.length
                ? `All ${questions.length} answered.`
                : `${answered} of ${questions.length} answered${
                    chased ? ` — ${questions.length - answered} still to go, highlighted above.` : "."
                  }`}
            </p>
          </div>
        </section>
      ) : (
        <>
          <section className="diagnostic-result" role="status" aria-live="polite">
            <span className="result-score">
              {correct}/{questions.length}
            </span>
            <div>
              <span className="eyebrow">Recommended starting point</span>
              <h2>
                Stage {recommendation.number}: {recommendation.title}
              </h2>
              <p>
                {allCorrect
                  ? "You answered every question correctly. Start at the integration stage and use the capstone to pressure-test the whole chain."
                  : recommendation.outcome}
              </p>
              {resurfacedCards > 0 && (
                <p className="resurfaced-note">
                  {resurfacedCards} card{resurfacedCards === 1 ? "" : "s"} covering what you missed{" "}
                  {resurfacedCards === 1 ? "has" : "have"} been added to your review queue.
                </p>
              )}
              <div className="button-row">
                <button className="primary" onClick={() => navigate(`module:${recommendation.id}`)}>
                  Begin here
                  <ChevronRight size={18} aria-hidden="true" />
                </button>
                <button className="secondary" onClick={restart}>
                  <RefreshCw size={16} aria-hidden="true" /> New set
                </button>
              </div>
            </div>
          </section>
          <section className="diagnostic-review">
            <h2>Review your answers</h2>
            {questions.map((question) => (
              <article key={question.id} className="diagnostic-review-item">
                <h3>{question.prompt}</h3>
                <Feedback correct={answers[question.id] === question.answer} rationale={question.rationale} />
              </article>
            ))}
          </section>
        </>
      )}
    </div>
  );
}
