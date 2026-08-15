import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  FileText,
  RefreshCw,
} from "lucide-react";
import { modules, quizPoolFor, totalMinutes, type Module } from "./course";
import { diagnosticQuestions } from "./reference";
import { daysAgoKey, formatMinutes, shuffle, type View } from "./lib";
import {
  emptyModuleProgress,
  masteryState,
  MASTERY_QUIZ_THRESHOLD,
  type HistoryEntry,
  type ModuleProgress,
  type ProgressMap,
} from "./state";
import { Feedback, LessonTableView, PageIntro, ProgressBar, QuestionCard, SourceChips } from "./components";
import { stageIllustrations } from "./illustrations";

/** Questions per stage attempt, sampled from that stage's pool of 8-9. */
const QUIZ_LENGTH = 5;

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

  return (
    <div className="page dashboard-page">
      <section className="hero">
        <div>
          <span className="eyebrow">Your product-management apprenticeship</span>
          <h1>Learn the judgement behind the frameworks.</h1>
          <p>
            This course turns the 98-slide DEWR presentation into a practice system: understand the idea, retrieve it
            from memory, apply it to a service decision, then review it later.
          </p>
          <p className="commitment">
            Nine stages, about {formatMinutes(totalMinutes)} of lesson time plus review. It is designed to be spread
            across two to four weeks — spaced sessions beat one long sitting.
          </p>
          <div className="button-row">
            <button className="primary" onClick={() => navigate(`module:${nextModule.id}`)}>
              Continue with Stage {nextModule.number}
              <ChevronRight size={18} aria-hidden="true" />
            </button>
            <button className="secondary" onClick={() => navigate("diagnostic")}>
              Take the diagnostic
            </button>
          </div>
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
        Total lesson time {formatMinutes(totalMinutes)} across {modules.length} stages, plus spaced review.
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
                  <span>Deck slides {module.slides}</span>
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
  onQuizScored: (entry: Omit<HistoryEntry, "at">) => void;
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

  const submitQuiz = () => {
    const correct = quizQuestions.filter((question) => answers[question.id] === question.answer).length;
    const score = Math.round((correct / quizQuestions.length) * 100);
    update({ quizScore: Math.max(progress.quizScore, score), attempts: progress.attempts + 1 });
    onQuizScored({ kind: "quiz", moduleId: module.id, score, correct, total: quizQuestions.length });
    setQuizSubmitted(true);
  };

  const retryQuiz = () => {
    setAnswers({});
    setQuizSubmitted(false);
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
          Stage {String(module.number).padStart(2, "0")}
        </div>
        <div>
          <div className="path-meta">
            <span>
              <Clock3 size={14} aria-hidden="true" /> {module.minutes} minutes
            </span>
            <span>
              <FileText size={14} aria-hidden="true" /> Deck slides {module.slides}
            </span>
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

      <div className="lesson-sections">
        {module.sections.map((section, index) => (
          <section key={section.heading} className="lesson-section">
            <div className="section-count" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
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
          <QuestionCard
            key={question.id}
            question={question}
            number={index + 1}
            total={quizQuestions.length}
            salt={salt}
            selected={answers[question.id] ?? null}
            onSelect={(choice) => setAnswers((current) => ({ ...current, [question.id]: choice }))}
            submitted={quizSubmitted}
          />
        ))}
        {!quizSubmitted ? (
          <button
            className="primary"
            disabled={quizQuestions.some((question) => answers[question.id] === undefined)}
            onClick={submitQuiz}
          >
            Check my recall
          </button>
        ) : (
          <div className="quiz-result" role="status" aria-live="polite">
            <strong>
              You scored {lastQuizScore}% this attempt. Best {progress.quizScore}%.
            </strong>
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

      <section className="source-note">
        <span className="eyebrow">Sources used in this stage</span>
        <SourceChips ids={allSourceIds} />
      </section>

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

const DIAGNOSTIC_LENGTH = 9;

export function Diagnostic({
  navigate,
  salt,
  onComplete,
}: {
  navigate: Navigate;
  salt: string;
  onComplete: (entry: Omit<HistoryEntry, "at">) => void;
}) {
  const [seed, setSeed] = useState(0);
  const questions = useMemo(
    () => shuffle(diagnosticQuestions).slice(0, DIAGNOSTIC_LENGTH),
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

  const restart = () => {
    setAnswers({});
    setComplete(false);
    setSeed((value) => value + 1);
  };

  return (
    <div className="page narrow-page">
      <PageIntro
        eyebrow="Five-minute diagnostic"
        title="Find the first weak link"
        body="This is not a grade. It samples nine questions from a pool that is separate from the course quizzes, so a good score here means the ideas transfer rather than that you remember the wording."
      />
      {!complete ? (
        <section className="knowledge-check diagnostic-list">
          {questions.map((question, index) => (
            <QuestionCard
              key={question.id}
              question={question}
              number={index + 1}
              total={questions.length}
              salt={salt}
              selected={answers[question.id] ?? null}
              onSelect={(choice) => setAnswers((current) => ({ ...current, [question.id]: choice }))}
              submitted={false}
            />
          ))}
          <button
            className="primary"
            disabled={Object.keys(answers).length !== questions.length}
            onClick={() => {
              setComplete(true);
              onComplete({
                kind: "diagnostic",
                score: Math.round((correct / questions.length) * 100),
                correct,
                total: questions.length,
              });
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            Show recommendation
          </button>
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
