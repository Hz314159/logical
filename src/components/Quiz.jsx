import { useMemo, useState } from "react";
import React from "react";
export default function Quiz({ questions }) {
  const [answers, setAnswers] = useState({});
  const score = useMemo(() => questions.reduce((sum, q, i) => sum + (answers[i] === q.correctIndex ? 1 : 0), 0), [answers, questions]);

  return (
    <div className="grid gap-4">
      <div className="rounded-3xl bg-slate-50 p-4 dark:bg-slate-950/60">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-black">النتيجة الحالية: {score} / {questions.length}</p>
          <button type="button" onClick={() => setAnswers({})} className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold hover:bg-white dark:border-slate-800 dark:hover:bg-slate-900 no-print">إعادة الاختبار</button>
        </div>
      </div>
      {questions.map((question, qi) => {
        const selected = answers[qi];
        const answered = selected !== undefined;
        return (
          <div key={question.question} className="rounded-3xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <h4 className="font-black leading-8">{qi + 1}. {question.question}</h4>
            <div className="mt-4 grid gap-2">
              {question.options.map((option, oi) => {
                const isCorrect = oi === question.correctIndex;
                const isSelected = selected === oi;
                const stateClass = !answered
                  ? "border-slate-200 bg-slate-50 hover:border-teal-400 dark:border-slate-800 dark:bg-slate-950"
                  : isCorrect
                    ? "border-emerald-400 bg-emerald-50 text-emerald-900 dark:bg-emerald-500/15 dark:text-emerald-100"
                    : isSelected
                      ? "border-rose-400 bg-rose-50 text-rose-900 dark:bg-rose-500/15 dark:text-rose-100"
                      : "border-slate-200 bg-slate-50 opacity-70 dark:border-slate-800 dark:bg-slate-950";
                return <button type="button" key={option} onClick={() => setAnswers((current) => ({ ...current, [qi]: oi }))} className={`rounded-2xl border px-4 py-3 text-right text-sm font-bold transition ${stateClass}`}>{option}</button>;
              })}
            </div>
            {answered && <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm leading-7 dark:bg-slate-950/60"><strong>{selected === question.correctIndex ? "صحيح." : "غير صحيح."}</strong> {question.explanation}</div>}
          </div>
        );
      })}
    </div>
  );
}
