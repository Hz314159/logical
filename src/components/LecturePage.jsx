import { useEffect, useState } from "react";
import { lectures } from "../data/lectures.js";
import { isLectureCompleted, setLectureCompleted } from "../utils/progress.js";
import WarningBox from "./WarningBox.jsx";
import CollapsibleSection from "./CollapsibleSection.jsx";
import CodeBlock from "./CodeBlock.jsx";
import Quiz from "./Quiz.jsx";
import CheatSheet from "./CheatSheet.jsx";
import React from "react";
export default function LecturePage({ lecture }) {
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    setCompleted(isLectureCompleted(lecture.id));
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [lecture.id]);

  const toggleCompleted = () => {
    const next = !completed;
    setCompleted(next);
    setLectureCompleted(lecture.id, next);
  };

  const currentIndex = lectures.findIndex((item) => item.id === lecture.id);
  const previous = lectures[currentIndex - 1];
  const next = lectures[currentIndex + 1];

  return (
    <main>
      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <a href="#/" className="text-sm font-bold text-teal-200 hover:text-white">← العودة للرئيسية</a>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div>
              <p className="text-teal-200">محاضرة {lecture.number}</p>
              <h1 className="mt-2 text-3xl font-black leading-tight sm:text-5xl">{lecture.title}</h1>
              <p className="mt-4 leading-8 text-slate-300">المصدر: {lecture.sourceFile}</p>
              <div className="mt-5 flex flex-wrap gap-2">{lecture.topics.map((topic) => <span key={topic} className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-teal-100">{topic}</span>)}</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <p className="font-black">حالة الدراسة</p>
              <p className="mt-2 text-sm leading-7 text-slate-300">علّم المحاضرة كمكتملة عندما تنهي الملخص والاختبار.</p>
              <button type="button" onClick={toggleCompleted} className={`mt-4 w-full rounded-2xl px-4 py-3 font-black transition ${completed ? "bg-emerald-400 text-emerald-950 hover:bg-emerald-300" : "bg-white text-slate-950 hover:bg-teal-100"}`}>
                {completed ? "مكتملة ✓" : "تحديد كمكتملة"}
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <WarningBox compact />

        <CollapsibleSection title="A. Lecture overview" subtitle="أهداف المحاضرة، المتطلبات، المصطلحات الأساسية">
          <div className="grid gap-4 lg:grid-cols-2">
            <InfoList title="Main objectives" items={lecture.objectives} />
            <InfoList title="Prerequisites" items={lecture.prerequisites} />
            <InfoList title="Key terms" items={lecture.keyTerms} />
            <InfoList title="What you should understand after finishing" items={lecture.afterCompletion} />
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="B. Original lecture explanation" subtitle="شرح كل Topic بنفس ترتيب المحاضرة">
          <div className="grid gap-5">
            {lecture.explanation.map((topic) => (
              <article key={topic.id} id={topic.id} className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950/60 print-card">
                <h3 className="text-2xl font-black text-teal-800 dark:text-teal-200">{topic.title}</h3>
                <div className="mt-4 grid gap-4">
                  <Block label="النص الأصلي يقول:" body={topic.original.replace(/^النص الأصلي يقول:\s*/, "")} />
                  <Block label="الشرح المبسّط:" body={topic.simple.replace(/^الشرح المبسّط:\s*/, "")} />
                  {topic.examples?.length > 0 && <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><h4 className="font-black">أمثلة</h4><ul className="mt-2 list-disc space-y-1 pr-5 leading-8">{topic.examples.map((example) => <li key={example}>{example}</li>)}</ul></div>}
                  <div className="grid gap-3 md:grid-cols-3">
                    <MiniNote title="لماذا هذا مهم؟" body={topic.why} />
                    {topic.commonMistake && <MiniNote title="خطأ شائع" body={topic.commonMistake} tone="rose" />}
                    {topic.examNote && <MiniNote title="ملاحظة امتحانية" body={topic.examNote} tone="amber" />}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="C. Detailed examples" subtitle="شرح المشكلة، الخطوات، النتيجة، والمخططات إن وجدت">
          <div className="grid gap-4">
            {lecture.examples.map((example) => (
              <article key={example.title} className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 print-card">
                <h3 className="text-xl font-black text-teal-700 dark:text-teal-300">{example.title}</h3>
                <p className="mt-3 leading-8"><strong>المشكلة:</strong> {example.problem}</p>
                <ol className="mt-3 list-decimal space-y-2 pr-6 leading-8">{example.steps.map((step) => <li key={step}>{step}</li>)}</ol>
                <p className="mt-3 leading-8"><strong>النتيجة:</strong> {example.result}</p>
                {example.diagramDescription && <p className="mt-3 rounded-2xl bg-slate-50 p-4 leading-8 dark:bg-slate-950/60"><strong>وصف المخطط:</strong> {example.diagramDescription}</p>}
                {example.examTrap && <p className="mt-3 rounded-2xl bg-amber-50 p-4 leading-8 text-amber-950 dark:bg-amber-500/10 dark:text-amber-100"><strong>فخ امتحاني:</strong> {example.examTrap}</p>}
              </article>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="D. Organized summary" subtitle="تعريفات، قواعد، جداول، مقارنات، أخطاء وملاحظات امتحانية">
          <div className="grid gap-4">
            <InfoList title="Definitions" items={lecture.summary.definitions.map((item) => `${item.term}: ${item.meaning}`)} />
            <InfoList title="Rules" items={lecture.summary.rules} />
            {lecture.summary.tables.map((table) => <SummaryTable key={table.title} table={table} />)}
            <InfoList title="Important formulas or syntax" items={lecture.summary.formulas} code />
            <InfoList title="Common mistakes" items={lecture.summary.commonMistakes} />
            <InfoList title="Exam notes" items={lecture.summary.examNotes} />
          </div>
        </CollapsibleSection>

        {lecture.codeExamples?.length > 0 && (
          <CollapsibleSection title="Code / examples" subtitle="Code block، Copy button، شرح سطر بسطر، Output، Common mistakes">
            <div className="grid gap-5">{lecture.codeExamples.map((example) => <CodeBlock key={example.title} example={example} />)}</div>
          </CollapsibleSection>
        )}

        <CollapsibleSection title="E. Interactive MCQ quiz" subtitle="10 أسئلة على الأقل للمحاضرة النموذجية">
          <Quiz questions={lecture.quiz} />
        </CollapsibleSection>

        <CollapsibleSection title="F. Theoretical exam questions" subtitle="Short answer، Explain، Compare، What is the output">
          <div className="grid gap-4">
            {lecture.theoreticalQuestions.map((item) => (
              <article key={item.question} className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-black text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">{item.type}</span>
                <h3 className="mt-3 font-black leading-8">{item.question}</h3>
                <p className="mt-3 rounded-2xl bg-slate-50 p-4 leading-8 dark:bg-slate-950/60"><strong>الإجابة النموذجية:</strong> {item.answer}</p>
              </article>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="G. Practical exercises" subtitle="تمارين إضافية واضحة أنها مولدة بالذكاء الاصطناعي">
          <div className="grid gap-4 md:grid-cols-2">
            {lecture.practicalExercises.map((exercise) => (
              <article key={exercise.title} className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-black text-amber-700 dark:bg-amber-500/10 dark:text-amber-200">تمرين إضافي من إعداد الذكاء الاصطناعي</span>
                <h3 className="mt-3 font-black leading-8">{exercise.title.replace("تمرين إضافي من إعداد الذكاء الاصطناعي: ", "")}</h3>
                <p className="mt-2 leading-8">{exercise.task}</p>
                {exercise.hint && <p className="mt-3 rounded-2xl bg-slate-50 p-4 text-sm leading-7 dark:bg-slate-950/60"><strong>تلميح:</strong> {exercise.hint}</p>}
              </article>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="H. Cheat sheet" subtitle="ورقة مراجعة سريعة قبل الامتحان">
          <CheatSheet cheatSheet={lecture.cheatSheet} />
        </CollapsibleSection>

        <div className="flex flex-wrap items-center justify-between gap-3 no-print">
          {previous ? <a href={`#/lecture/${previous.id}`} className="rounded-2xl border border-slate-200 px-4 py-3 font-black hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900">المحاضرة السابقة</a> : <span />}
          {next ? <a href={`#/lecture/${next.id}`} className="rounded-2xl bg-teal-700 px-4 py-3 font-black text-white hover:bg-teal-600">المحاضرة التالية</a> : <a href="#/" className="rounded-2xl bg-teal-700 px-4 py-3 font-black text-white hover:bg-teal-600">إنهاء والعودة</a>}
        </div>
      </div>
    </main>
  );
}

function InfoList({ title, items, code = false }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 print-card">
      <h3 className="font-black text-teal-700 dark:text-teal-300">{title}</h3>
      <ul className={`mt-3 list-disc space-y-2 pr-5 leading-8 ${code ? "code-ltr text-left font-mono text-sm" : ""}`}>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}

function SummaryTable({ table }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800">
      <h3 className="bg-slate-100 px-4 py-3 font-black dark:bg-slate-900">{table.title}</h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse bg-white text-right text-sm dark:bg-slate-950">
          <thead><tr>{table.headers.map((header) => <th key={header} className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">{header}</th>)}</tr></thead>
          <tbody>{table.rows.map((row) => <tr key={row.join("-")} className="border-b border-slate-100 last:border-0 dark:border-slate-800">{row.map((cell) => <td key={cell} className="px-4 py-3 leading-7">{cell}</td>)}</tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

function Block({ label, body }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"><h4 className="font-black">{label}</h4><p className="mt-2 leading-8 text-slate-700 dark:text-slate-300">{body}</p></div>;
}

function MiniNote({ title, body, tone = "teal" }) {
  const tones = {
    teal: "bg-teal-50 text-teal-950 dark:bg-teal-500/10 dark:text-teal-100",
    rose: "bg-rose-50 text-rose-950 dark:bg-rose-500/10 dark:text-rose-100",
    amber: "bg-amber-50 text-amber-950 dark:bg-amber-500/10 dark:text-amber-100"
  };
  return <div className={`rounded-2xl p-4 ${tones[tone]}`}><h4 className="font-black">{title}</h4><p className="mt-2 text-sm leading-7">{body}</p></div>;
}
