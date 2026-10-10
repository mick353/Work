/**
 * Deterministic, offline regression suite for the trainer-feedback API.
 * Uses a stubbed KV namespace; never reads the real review key or trainer data.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";

const source = await readFile(new URL("../infrastructure/trainer-feedback/worker.js", import.meta.url), "utf8");
const publishedForm = await readFile(new URL("../public/trainer-feedback/index.html", import.meta.url), "utf8");
const deployedForm = await readFile(new URL("../docs/trainer-feedback/index.html", import.meta.url), "utf8");
const ownerReview = await readFile(new URL("../public/trainer-feedback/review.html", import.meta.url), "utf8");
const deployedReview = await readFile(new URL("../docs/trainer-feedback/review.html", import.meta.url), "utf8");
const origin = "https://mick353.github.io";
const api = "https://product-practice-trainer-feedback.gobbos-sportsbet.workers.dev";

function buildMock() {
  const store = new Map([["config:review-key", "local-test-only-not-a-live-secret"]]);
  const kv = {
    async get(key, type) {
      const raw = store.get(key);
      return type === "json" ? (raw ? JSON.parse(raw) : null) : (raw ?? null);
    },
    async put(key, value) { store.set(key, value); },
    async list({ prefix = "" } = {}) {
      const names = [...store.keys()].filter((k) => k.startsWith(prefix)).sort();
      return { keys: names.map((name) => ({ name })), list_complete: true };
    },
  };
  let handler;
  runInNewContext(source, {
    addEventListener(event, callback) {
      assert.equal(event, "fetch");
      handler = callback;
    },
    URL, Response, crypto: globalThis.crypto, FB_STORE: kv,
  }, { filename: "infrastructure/trainer-feedback/worker.js", timeout: 5000 });
  assert.equal(typeof handler, "function");
  async function send(path, { method = "GET", body, token, site = origin, json = true } = {}) {
    const headers = { Origin: site };
    if (body !== undefined && json) headers["Content-Type"] = "application/json";
    if (token !== undefined) headers.Authorization = "Bearer " + token;
    const request = new Request(api + path, {
      method,
      headers,
      body: body === undefined ? undefined : (json ? JSON.stringify(body) : String(body)),
    });
    let promise;
    handler({ request, respondWith(v) { promise = v; } });
    const response = await promise;
    return { status: response.status, body: await response.json(), headers: response.headers };
  }
  return { store, send };
}
function valid() {
  return {
    courseReference: "TEST-CI-ONLY",
    submissionId: crypto.randomUUID(),
    feedbackStage: "During course creation",
    courseProgress: "Planning/setup",
    authoringTime: "Under 1 hour",
    previewTime: "Not yet reached",
    assistanceLevel: "None - independent",
    easeRating: "4 - Easy",
    independentNext: "Too early to tell",
    featuresUsed: ["Lessons"],
    problemsSeen: ["No problems"],
    biggestImprovement: "=HYPERLINK(\"https://example.invalid\",\"test\")",
  };
}
test("public source and deployed feedback pages match", () => {
  assert.equal(publishedForm, deployedForm);
  assert.equal(ownerReview, deployedReview);
  assert.match(publishedForm, /Select all reported issues/);
  assert.match(publishedForm, /const submissionId=crypto\.randomUUID\(\)/);
  assert.match(ownerReview, /csv/);
  assert.doesNotMatch(source + publishedForm + ownerReview, /local-test-only-not-a-live-secret/);
});
test("successful submission, one stored row and idempotent network retry", async () => {
  const { store, send } = buildMock();
  const data = valid();
  const first = await send("/submit", { method: "POST", body: data });
  assert.equal(first.status, 201);
  assert.equal(first.body.ok, true);
  const again = await send("/submit", { method: "POST", body: data });
  assert.equal(again.status, 200);
  assert.equal(again.body.receipt, first.body.receipt);
  assert.equal(again.body.alreadyRecorded, true);
  assert.equal([...store.keys()].filter((key) => key.startsWith("response:")).length, 1);
  const results = await send("/results", { token: "local-test-only-not-a-live-secret" });
  assert.equal(results.status, 200);
  assert.equal(results.body.count, 1);
  assert.deepEqual(Array.from(results.body.records[0].featuresUsed), ["Lessons"]);
});
test("required answers, scalar and multi-choice validation", async () => {
  const { send } = buildMock();
  const check = async (change) => {
    const r = await send("/submit", { method: "POST", body: { ...valid(), ...change } });
    assert.equal(r.status, 400, JSON.stringify(change));
  };
  await check({ courseReference: "" });
  await check({ courseReference: 42 });
  await check({ feedbackStage: "" });
  await check({ authoringTime: "" });
  await check({ previewTime: "" });
  await check({ assistanceLevel: "" });
  await check({ easeRating: "" });
  await check({ independentNext: "" });
  await check({ featuresUsed: "Lessons" });
  await check({ featuresUsed: ["Lessons", "Lessons"] });
  await check({ problemsSeen: ["No problems", "Slow or freezing"] });
  await check({ mainObstacle: "x".repeat(1401) });
  await check({ submissionId: "not-a-uuid" });
});
test("review requires correct key and rejects non-site origin", async () => {
  const { send } = buildMock();
  assert.equal((await send("/results")).status, 401);
  assert.equal((await send("/results", { token: "wrong" })).status, 401);
  assert.equal((await send("/results", { token: "local-test-only-not-a-live-secret", site: "https://random.example" })).status, 403);
  assert.equal((await send("/submit", { method: "POST", body: valid(), site: "https://random.example" })).status, 403);
  const health = await send("/health", { site: "https://random.example" });
  assert.equal(health.status, 200);
  assert.equal(health.body.ok, true);
});
test("empty and malformed data are rejected without writing a response", async () => {
  const { send, store } = buildMock();
  assert.equal((await send("/submit", { method: "POST", body: [] })).status, 400);
  assert.equal((await send("/submit", { method: "POST", body: "invalid", json: false })).status, 415);
  assert.equal([...store.keys()].filter((key) => key.startsWith("response:")).length, 0);
});
