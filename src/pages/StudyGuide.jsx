import { studyMethod } from "../data/site.js";
import WarningBox from "../components/WarningBox.jsx";
import React from "react";
export default function StudyGuide() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <a href="#/" className="text-sm font-bold text-teal-700 dark:text-teal-300">← الرئيسية</a>
      <div className="mt-6 rounded-3xl bg-slate-950 p-8 text-white">
        <p className="text-teal-200">Study Guide</p>
        <h1 className="mt-2 text-4xl font-black">كيف تدرس من هذا الموقع؟</h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-300">الهدف ليس قراءة ملخص عشوائي. الهدف هو تحويل كل محاضرة إلى مسار امتحاني: فكرة أصلية، شرح مبسط، مثال، خطأ شائع، سؤال متوقع، ثم اختبار.</p>
      </div>
      <div className="mt-6"><WarningBox compact /></div>
      <section className="mt-8 grid gap-5 md:grid-cols-2">
        {studyMethod.map((item, index) => (
          <article key={item.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 font-black text-white">{index + 1}</span>
            <h2 className="mt-4 text-2xl font-black">{item.title}</h2>
            <p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">{item.body}</p>
          </article>
        ))}
      </section>
      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-black">قالب إدخال محتوى محاضرة جديدة</h2>
        <p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">افتح الملف التالي وأضف كائناً جديداً داخل المصفوفة:</p>
        <pre className="code-ltr mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm leading-7 text-teal-100">{`src/data/lectures.js

{
  id: "lecture-8-your-title",
  number: 8,
  title: "عنوان المحاضرة",
  topics: ["Topic 1", "Topic 2"],
  explanation: [
    {
      title: "عنوان السلايد أو الفقرة",
      original: "النص الأصلي يقول: ...",
      simple: "الشرح المبسّط: ...",
      why: "لماذا هذا مهم؟ ...",
      commonMistake: "خطأ شائع: ...",
      examNote: "ملاحظة امتحانية: ..."
    }
  ],
  quiz: [
    {
      question: "السؤال",
      options: ["A", "B", "C", "D"],
      correctIndex: 0,
      explanation: "سبب الإجابة"
    }
  ]
}`}</pre>
      </section>
    </main>
  );
}
