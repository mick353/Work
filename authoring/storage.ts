import type { AuthoringDraft } from "./draft";

const DATABASE = "product-practice-course-workshop";
const STORE = "drafts";
const CURRENT = "current";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB is unavailable."));
      return;
    }
    const request = window.indexedDB.open(DATABASE, 1);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
    };
    request.onerror = () => reject(request.error ?? new Error("Browser storage could not be opened."));
    request.onsuccess = () => resolve(request.result);
  });
}

export async function readBrowserDraft(): Promise<unknown | undefined> {
  const database = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(STORE, "readonly");
      const request = transaction.objectStore(STORE).get(CURRENT);
      request.onsuccess = () => resolve(request.result as unknown | undefined);
      request.onerror = () => reject(request.error ?? new Error("Browser draft could not be read."));
    });
  } finally {
    database.close();
  }
}

export async function writeBrowserDraft(draft: AuthoringDraft): Promise<void> {
  const database = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE, "readwrite");
      transaction.objectStore(STORE).put(draft, CURRENT);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error("Browser draft could not be saved."));
      transaction.onabort = () => reject(transaction.error ?? new Error("Browser draft save was interrupted."));
    });
  } finally {
    database.close();
  }
}

export async function clearBrowserDraft(): Promise<void> {
  const database = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE, "readwrite");
      transaction.objectStore(STORE).delete(CURRENT);
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error ?? new Error("Browser draft could not be cleared."));
    });
  } finally {
    database.close();
  }
}
