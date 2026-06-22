import { Icon } from "./icons.jsx";

export default function SearchFilter({ query, onQueryChange, selectedTopic, onTopicChange, selectedDifficulty, onDifficultyChange, topics, difficulties }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 no-print">
      <div className="grid gap-3 md:grid-cols-[1fr_220px_180px]">
        <label className="relative block">
          <span className="sr-only">بحث</span>
          <Icon name="search" className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input value={query} onChange={(e) => onQueryChange(e.target.value)} placeholder="ابحث عن محاضرة أو Topic مثل Power Query..." className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pr-12 pl-4 outline-none transition focus:border-teal-500 focus:bg-white dark:border-slate-700 dark:bg-slate-950 dark:focus:bg-slate-900" />
        </label>
        <select value={selectedTopic} onChange={(e) => onTopicChange(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-500 dark:border-slate-700 dark:bg-slate-950">
          <option value="">كل المواضيع</option>
          {topics.map((topic) => <option key={topic} value={topic}>{topic}</option>)}
        </select>
        <select value={selectedDifficulty} onChange={(e) => onDifficultyChange(e.target.value)} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-teal-500 dark:border-slate-700 dark:bg-slate-950">
          <option value="">كل المستويات</option>
          {difficulties.map((difficulty) => <option key={difficulty} value={difficulty}>{difficulty}</option>)}
        </select>
      </div>
    </div>
  );
}
