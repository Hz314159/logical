import { useEffect, useState } from "react";
import { lectures } from "../data/lectures.js";
import { siteInfo } from "../data/site.js";
import { readProgress } from "../utils/progress.js";
import { Icon } from "./icons.jsx";
import React from "react";
const links = [
  { href: "#/", label: "الرئيسية" },
  { href: "#/study-guide", label: "طريقة الدراسة" },
  { href: "#/code", label: "الأكواد والأمثلة" }
];

export default function Navbar({ darkMode, onToggleDarkMode }) {
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(0);
  useEffect(() => {
    const update = () => {
      const progress = readProgress();
      setCompleted(lectures.filter((lecture) => progress[lecture.id]?.completed).length);
    };
    update();
    window.addEventListener("lecture-progress-updated", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("lecture-progress-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);
  const percent = Math.round((completed / lectures.length) * 100);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80 no-print">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-soft"><Icon name="book" /></span>
          <span>
            <span className="block text-base font-black">{siteInfo.subjectName}</span>
            <span className="block text-xs text-slate-500 dark:text-slate-400">{siteInfo.team}</span>
          </span>
        </a>
        <div className="hidden items-center gap-2 lg:flex">
          {links.map((link) => <a key={link.href} href={link.href} className="rounded-2xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-slate-900">{link.label}</a>)}
          <a href="#lectures" className="rounded-2xl px-4 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-teal-700 dark:text-slate-300 dark:hover:bg-slate-900">المحاضرات</a>
        </div>
        <div className="hidden min-w-44 items-center gap-3 md:flex">
          <div className="w-full">
            <div className="mb-1 flex justify-between text-xs text-slate-500 dark:text-slate-400"><span>التقدم</span><span>{percent}%</span></div>
            <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-2 rounded-full bg-teal-600 transition-all" style={{ width: `${percent}%` }} /></div>
          </div>
          <button type="button" onClick={onToggleDarkMode} className="rounded-2xl border border-slate-200 p-2 transition hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900" aria-label="تبديل الوضع الداكن"><Icon name={darkMode ? "sun" : "moon"} /></button>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" onClick={onToggleDarkMode} className="rounded-2xl border border-slate-200 p-2 dark:border-slate-800" aria-label="تبديل الوضع الداكن"><Icon name={darkMode ? "sun" : "moon"} /></button>
          <button type="button" onClick={() => setOpen(!open)} className="rounded-2xl border border-slate-200 p-2 dark:border-slate-800" aria-label="فتح القائمة"><Icon name={open ? "close" : "menu"} /></button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {[...links, { href: "#lectures", label: "المحاضرات" }].map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-bold hover:bg-slate-100 dark:hover:bg-slate-900">{link.label}</a>)}
          </div>
        </div>
      )}
    </header>
  );
}
