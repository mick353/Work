import { findModule, flashcards, practiceQuestions } from "./content";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Brain, ChevronRight, RefreshCw, Trophy } from "lucide-react";
import { type PracticeQuestion, type Question } from "./course";
import { FLASHCARD_KIND_LABEL, type Flashcard } from "./reference";
import { describeInterval, formatDue, shuffle, type Rating, type ReviewSchedule } from "./lib";
import type { HistoryEntry, ReviewMap } from "./state";
import { Feedback, PageIntro, ProgressBar, QuestionCard } from "./components";
import { IllusEmptyQueue } from "./illustrations";

const SESSION_SIZE = 8;
const PRACTICE_SIZE = 10;

const RATINGS: { key: Rating; label: string; hint: string; shortcut: string }[] = [
  { key: "again", label: "Again", hint: "10 minutes", shortcut: "1" },
  { key: "hard", label: "Hard", hint: "Short interval", shortcut: "2" },
  { key: "good", label: "Good", hint: "Normal interval", shortcut: "3" },
  { key: "easy", label: "Easy", hint: "Long interval", shortcut: "4" },
];

/**
 * Draw a practice set spread across stages.
 *
 * A flat shuffle over the whole bank can return ten questions from one stage,
 * which is a legitimate random outcome and a poor practice set: interleaving
 * across topics is what makes mixed practice worth more than re-reading one.
 *
 * Round-robin over shuffled per-stage queues, so the set covers as many stages
 * as it has room for and takes a second from a stage only once every stage has
 * had a first. Stage order is shuffled too, so a short set is not always drawn
 * from the earliest stages.
 */
export function spreadAcrossStages<T extends { moduleId: string }>(pool: T[], limit: number): T[] {
  const byStage = new Map<string, T[]>();
  for (const item of pool) {
    const list = byStage.get(item.moduleId);
    if (list) list.push(item);
    else byStage.set(item.moduleId, [item]);
  }
  const queues = shuffle([...byStage.values()]).map((list) => shuffle(list));
  const picked: T[] = [];
  for (let round = 0; picked.length < limit; round += 1) {
    let addedThisRound = false;
    for (const queue of queues) {
      if (picked.length >= limit) break;
      const next = queue[round];
      if (!next) continue;
      picked.push(next);
      addedThisRound = true;
    }
    if (!addedThisRound) break;   // every queue exhausted
  }
  return picked;
}

export function selectDueCards(cards: Flashcard[], reviews: ReviewMap, now: number, limit: number) {
  const scheduled = cards
    .filter((card) => reviews[card.id] && reviews[card.id].due <= now)
    .sort((a, b) => reviews[a.id].due - reviews[b.id].due);
  const fresh = cards.filter((card) => !reviews[card.id]);
  return [...scheduled, ...fresh].slice(0, limit);
}

export function Review({
  reviews,
  onRate,
  navigate,
}: {
  reviews: ReviewMap;
  onRate: (card: Flashcard, rating: Rating) => void;
  navigate: (view: string) => void;
}) {
  const [sessionSeed, setSessionSeed] = useState(0);
  // The queue is snapshotted per session so rating a card cannot reshuffle the
  // list mid-review. `sessionSeed` lets the learner pull a fresh batch when the
  // current one is finished, instead of being told the queue is clear when it
  // is not — which is what the previous build did once eight cards were done.
  const queue = useMemo(
    () => selectDueCards(flashcards, reviews, Date.now(), SESSION_SIZE),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sessionSeed],
  );
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const card = queue[index];

  const rate = useCallback(
    (rating: Rating) => {
      if (!card) return;
      onRate(card, rating);
      setRevealed(false);
      setIndex((current) => current + 1);
    },
    [card, onRate],
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;
      if (!card) return;
      if (!revealed && (event.key === " " || event.key === "Enter")) {
        event.preventDefault();
        setRevealed(true);
        return;
      }
      if (revealed) {
        const match = RATINGS.find((rating) => rating.shortcut === event.key);
        if (match) {
          event.preventDefault();
          rate(match.key);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [card, revealed, rate]);

  const remainingDue = useMemo(() => {
    const now = Date.now();
    return flashcards.filter((item) => !reviews[item.id] || reviews[item.id].due <= now).length;
  }, [reviews]);

  const startNextBatch = () => {
    setIndex(0);
    setRevealed(false);
    setSessionSeed((value) => value + 1);
  };

  if (!card) {
    const upcoming = Object.entries(reviews)
      .map(([, schedule]) => schedule as ReviewSchedule)
      .sort((a, b) => a.due - b.due)[0];
    const finishedSome = index > 0;

    return (
      <div className="page narrow-page">
        <figure className="empty-illus">
          <IllusEmptyQueue />
        </figure>
        <PageIntro
          eyebrow="Spaced review"
          title={finishedSome ? "Batch complete" : "Review queue clear"}
          body={
            remainingDue > 0
              ? `${remainingDue} card${remainingDue === 1 ? " is" : "s are"} still due. Reviewing in batches keeps sessions short — pull the next batch when you are ready.`
              : upcoming
                ? `Your next scheduled card is due ${formatDue(upcoming.due)}.`
                : "Complete a lesson, then return here to strengthen the concepts over time."
          }
        />
        <div className="button-row">
          {remainingDue > 0 && (
            <button className="primary" onClick={startNextBatch}>
              Review {Math.min(remainingDue, SESSION_SIZE)} more
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          )}
          <button className={remainingDue > 0 ? "secondary" : "primary"} onClick={() => navigate("path")}>
            Choose a lesson
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  const moduleTitle = findModule(card.moduleId)?.title ?? "";
  const completed = Math.min(index, queue.length);

  return (
    <div className="page narrow-page review-page">
      <PageIntro
        eyebrow="Spaced retrieval"
        title="Recall before you reveal"
        body="Say the answer aloud or write it down. Recognition feels fluent; retrieval builds durable access."
      />
      <div className="review-status">
        <span>{completed} reviewed</span>
        <ProgressBar value={(completed / queue.length) * 100} label="Progress through this review batch" />
        <span>{queue.length - index} remaining</span>
      </div>

      <article className={`flashcard ${revealed ? "revealed" : ""}`} aria-live="polite">
        <div className="flashcard-meta">
          <span>{moduleTitle}</span>
          <span className="card-kind">{FLASHCARD_KIND_LABEL[card.kind]}</span>
          <span>{describeInterval(reviews[card.id])}</span>
        </div>
        <div className="flashcard-face">
          <span className="eyebrow">Prompt</span>
          <h2>{card.front}</h2>
        </div>
        {revealed && (
          <div className="flashcard-answer">
            <span className="eyebrow">Answer</span>
            <p>{card.back}</p>
          </div>
        )}
      </article>

      {!revealed ? (
        <button className="primary wide-button" onClick={() => setRevealed(true)}>
          Reveal answer <kbd>space</kbd>
        </button>
      ) : (
        <div className="rating-grid" role="group" aria-label="Rate your recall of this card">
          {RATINGS.map((rating) => (
            <button key={rating.key} onClick={() => rate(rating.key)}>
              <strong>{rating.label}</strong>
              <span>{rating.hint}</span>
              <kbd>{rating.shortcut}</kbd>
            </button>
          ))}
        </div>
      )}
      <p className="keyboard-hint">
        Keyboard: space or enter reveals, then 1–4 rates. Ratings set when the card returns.
      </p>
    </div>
  );
}

export function Practice({
  best,
  setBest,
  salt,
  onComplete,
}: {
  best: number;
  setBest: (score: number) => void;
  salt: string;
  onComplete: (
    entry: Omit<HistoryEntry, "at">,
    missed?: Question[],
    answered?: { id: string; correct: boolean }[],
  ) => number;
}) {
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [results, setResults] = useState<{ question: PracticeQuestion; correct: boolean }[]>([]);
  const [finished, setFinished] = useState(false);
  const [resurfaced, setResurfaced] = useState(0);

  const start = () => {
    setQuestions(spreadAcrossStages(practiceQuestions, PRACTICE_SIZE));
    setIndex(0);
    setSelected(null);
    setResults([]);
    setFinished(false);
  };

  if (!questions.length) {
    return (
      <div className="page narrow-page">
        <PageIntro
          eyebrow="Interleaved practice"
          title="Make the frameworks compete"
          body={`Ten questions drawn at random from ${practiceQuestions.length} across strategy, discovery, measurement, delivery, roles and government. Choosing between similar ideas builds discrimination — which is why the questions are mixed rather than grouped by stage.`}
        />
        <div className="practice-launch">
          <Brain size={42} aria-hidden="true" />
          <div>
            <strong>Best score</strong>
            <span>{best ? `${best}%` : "No attempt yet"}</span>
          </div>
          <button className="primary" onClick={start}>
            Start ten questions
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const score = Math.round((results.filter((item) => item.correct).length / questions.length) * 100);
    return (
      <div className="page narrow-page">
        <section className="practice-result" role="status" aria-live="polite">
          <Trophy size={44} aria-hidden="true" />
          <span className="eyebrow">Practice complete</span>
          <h1>{score}%</h1>
          <p>
            {score >= 80
              ? "Strong transfer. Revisit any rationale you could not have explained yourself before reading it."
              : "The mixed context exposed useful gaps. Review the relevant stages, then try another set."}
          </p>
          {resurfaced > 0 && (
            <p className="resurfaced-note">
              {resurfaced} card{resurfaced === 1 ? "" : "s"} covering what you missed{" "}
              {resurfaced === 1 ? "has" : "have"} been added to your review queue.
            </p>
          )}
          <div className="button-row">
            <button className="primary" onClick={start}>
              <RefreshCw size={17} aria-hidden="true" /> New set
            </button>
            <button className="secondary" onClick={() => setQuestions([])}>
              Back
            </button>
          </div>
        </section>

        <section className="practice-review">
          <h2>What you missed</h2>
          {results.filter((item) => !item.correct).length === 0 ? (
            <p>Nothing — every answer was correct.</p>
          ) : (
            results
              .filter((item) => !item.correct)
              .map(({ question }) => (
                <article key={question.id} className="practice-review-item">
                  <span className="eyebrow">{findModule(question.moduleId)?.title}</span>
                  <h3>{question.prompt}</h3>
                  <Feedback correct={false} rationale={question.rationale} />
                </article>
              ))
          )}
        </section>
      </div>
    );
  }

  const question = questions[index];
  const checked = selected !== null;
  const correct = selected === question.answer;

  const next = () => {
    const nextResults = [...results, { question, correct }];
    setResults(nextResults);
    if (index === questions.length - 1) {
      const correctCount = nextResults.filter((item) => item.correct).length;
      const score = Math.round((correctCount / questions.length) * 100);
      if (score > best) setBest(score);
      const missed = nextResults.filter((item) => !item.correct).map((item) => item.question);
      const answered = nextResults.map((item) => ({ id: item.question.id, correct: item.correct }));
      setResurfaced(
        onComplete({ kind: "practice", score, correct: correctCount, total: questions.length }, missed, answered),
      );
      setFinished(true);
    } else {
      setIndex((current) => current + 1);
      setSelected(null);
    }
  };

  return (
    <div className="page narrow-page practice-page">
      <div className="review-status">
        <span>
          Question {index + 1} of {questions.length}
        </span>
        <ProgressBar value={((index + 1) / questions.length) * 100} label="Progress through this practice set" />
        <span>{findModule(question.moduleId)?.title}</span>
      </div>

      <QuestionCard
        question={question}
        context={question.context}
        salt={salt}
        selected={selected}
        onSelect={setSelected}
        submitted={checked}
        size="large"
      />

      {checked && (
        <button className="primary" onClick={next}>
          {index === questions.length - 1 ? "Finish" : "Next question"}
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
