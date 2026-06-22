const STORAGE_KEY = "logic-programming-study-progress";

export function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function writeProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function isLectureCompleted(id) {
  return Boolean(readProgress()[id]);
}

export function setLectureCompleted(id, completed) {
  const progress = readProgress();
  if (completed) progress[id] = { completed: true, completedAt: new Date().toISOString() };
  else delete progress[id];
  writeProgress(progress);
  window.dispatchEvent(new Event("lecture-progress-updated"));
}
