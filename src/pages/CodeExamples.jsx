import { lectures } from "../data/lectures.js";
import CodeBlock from "../components/CodeBlock.jsx";
import React from "react";
export default function CodeExamples() {
  const examples = lectures.flatMap((lecture) => (lecture.codeExamples ?? []).map((example) => ({ ...example, lectureTitle: lecture.title, lectureId: lecture.id })));
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <a href="#/" className="text-sm font-bold text-teal-700 dark:text-teal-300">← الرئيسية</a>
      <div className="mt-6 rounded-3xl bg-slate-950 p-8 text-white">
        <p className="text-teal-200">Code / examples</p>
        <h1 className="mt-2 text-4xl font-black">الأكواد والأمثلة</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-300">هذا القسم يجمع الأكواد وSyntax من كل المحاضرات في مكان واحد، مع زر نسخ وشرح سطر بسطر وأخطاء شائعة.</p>
      </div>
      <div className="mt-8 grid gap-6">
        {examples.map((example) => (
          <section key={`${example.lectureId}-${example.title}`} className="grid gap-3">
            <a href={`#/lecture/${example.lectureId}`} className="font-black text-teal-700 hover:underline dark:text-teal-300">{example.lectureTitle}</a>
            <CodeBlock example={example} />
          </section>
        ))}
        {examples.length === 0 && <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">لا توجد أكواد مضافة بعد. أضف codeExamples داخل src/data/lectures.js.</div>}
      </div>
    </main>
  );
}
