import { useEffect, useState } from "react";
import { isLectureCompleted } from "../utils/progress.js";
import { Icon } from "./icons.jsx";
import React from "react";
export default function LectureCard({ lecture }) {
  const [completed, setCompleted] = useState(false);
  useEffect(() => {
    const update = () => setCompleted(isLectureCompleted(lecture.id));
    update();
    window.addEventListener("lecture-progress-updated", update);
    return () => window.removeEventListener("lecture-progress-updated", update);
  }, [lecture.id]);

  return (
    <article className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900 print-card">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold text-teal-700 dark:text-teal-300">محاضرة {lecture.number}</p>
          <h3 className="mt-2 text-xl font-black leading-8">{lecture.title}</h3>
        </div>
        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${completed ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300" : "bg-slate-100 text-slate-500 dark:bg-slate-800"}`}>
          {completed ? <Icon name="check" /> : lecture.number}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {lecture.topics.slice(0, 5).map((topic) => <span key={topic} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-300">{topic}</span>)}
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/60"><span className="block text-slate-500 dark:text-slate-400">الصعوبة</span><strong>{lecture.difficulty}</strong></div>
        <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/60"><span className="block text-slate-500 dark:text-slate-400">الوقت</span><strong>{lecture.estimatedTime}</strong></div>
      </div>
      {lecture.sourceStatus?.includes("placeholder") && <p className="mt-4 rounded-2xl bg-amber-50 px-3 py-2 text-sm font-bold text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">يحتاج تعبئة المحتوى الحقيقي</p>}
      <a href={`#/lecture/${lecture.id}`} className="mt-auto inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 font-black text-white transition hover:bg-teal-700 dark:bg-white dark:text-slate-950 dark:hover:bg-teal-200">افتح المحاضرة</a>
    </article>
  );
}
