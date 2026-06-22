import { useMemo, useState } from "react";
import { allTopics, lectures } from "../data/lectures.js";
import Hero from "../components/Hero.jsx";
import Roadmap from "../components/Roadmap.jsx";
import LectureCard from "../components/LectureCard.jsx";
import SearchFilter from "../components/SearchFilter.jsx";
import WarningBox from "../components/WarningBox.jsx";
import React from "react";
export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const difficulties = useMemo(() => Array.from(new Set(lectures.map((lecture) => lecture.difficulty))), []);
  const filteredLectures = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lectures.filter((lecture) => {
      const text = [lecture.title, lecture.sourceFile, lecture.difficulty, lecture.estimatedTime, ...lecture.topics].join(" ").toLowerCase();
      return (!q || text.includes(q)) && (!selectedTopic || lecture.topics.includes(selectedTopic)) && (!selectedDifficulty || lecture.difficulty === selectedDifficulty);
    });
  }, [query, selectedTopic, selectedDifficulty]);
  const codeCount = lectures.reduce((sum, lecture) => sum + (lecture.codeExamples?.length ?? 0), 0);

  return (
    <main>
      <Hero />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Stat title="عدد المحاضرات" value={lectures.length} />
          <Stat title="Topics" value={allTopics.length} />
          <Stat title="أمثلة Code" value={codeCount} />
        </div>
      </section>
      <Roadmap lectures={lectures} />
      <section id="lectures" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="font-bold text-teal-700 dark:text-teal-300">Lectures</p>
          <h2 className="mt-2 text-3xl font-black">كل المحاضرات</h2>
          <p className="mt-3 max-w-3xl leading-8 text-slate-600 dark:text-slate-300">
            المحاضرة الرابعة معبأة كنموذج كامل. بقية المحاضرات تحتوي Placeholder واضح لتلصق المحتوى الحقيقي من ملفاتك داخل
            <span className="code-ltr mx-2 inline-block rounded-lg bg-slate-100 px-2 py-1 text-sm dark:bg-slate-800">src/data/lectures.js</span>
          </p>
        </div>
        <SearchFilter query={query} onQueryChange={setQuery} selectedTopic={selectedTopic} onTopicChange={setSelectedTopic} selectedDifficulty={selectedDifficulty} onDifficultyChange={setSelectedDifficulty} topics={allTopics} difficulties={difficulties} />
        <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredLectures.map((lecture) => <LectureCard key={lecture.id} lecture={lecture} />)}
        </div>
        {filteredLectures.length === 0 && <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">لا توجد محاضرات مطابقة للبحث الحالي.</div>}
      </section>
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          <Box title="قسم الأكواد والأمثلة" tag="Code / examples" text="أي كود أو Syntax مثل M Language أو Excel formulas يظهر داخل CodeBlock قابل للنسخ مع شرح سطر بسطر وأخطاء شائعة وExpected output." href="#/code" action="افتح قسم الأكواد" />
          <Box title="كيف تستخدم الموقع؟" tag="Study guide" text="صفحة مخصصة تشرح ترتيب الدراسة، طريقة حل MCQ، وكيفية استخدام Cheat Sheet قبل الامتحان." href="#/study-guide" action="افتح دليل الدراسة" outline />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8"><WarningBox /></section>
    </main>
  );
}
function Stat({ title, value }) {
  return <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><p className="text-sm text-slate-500 dark:text-slate-400">{title}</p><p className="mt-2 text-4xl font-black text-teal-700 dark:text-teal-300">{value}</p></div>;
}
function Box({ title, tag, text, href, action, outline }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="font-bold text-teal-700 dark:text-teal-300">{tag}</p>
      <h2 className="mt-2 text-2xl font-black">{title}</h2>
      <p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">{text}</p>
      <a href={href} className={`mt-5 inline-flex rounded-2xl px-4 py-3 font-black ${outline ? "border border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-950" : "bg-teal-700 text-white hover:bg-teal-600"}`}>{action}</a>
    </div>
  );
}
