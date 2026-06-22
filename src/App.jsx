import { useEffect, useMemo, useState } from "react";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Home from "./pages/Home.jsx";
import StudyGuide from "./pages/StudyGuide.jsx";
import CodeExamples from "./pages/CodeExamples.jsx";
import LecturePage from "./components/LecturePage.jsx";
import { getLectureById } from "./data/lectures.js";
import React from "react";
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const onHashChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHashRoute();
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem("study-guide-theme");
    if (stored) return stored === "dark";
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("study-guide-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const page = useMemo(() => {
    if (hash.startsWith("#/lecture/")) {
      const lecture = getLectureById(hash.replace("#/lecture/", ""));
      return lecture ? <LecturePage lecture={lecture} /> : <NotFound />;
    }
    if (hash === "#/study-guide") return <StudyGuide />;
    if (hash === "#/code") return <CodeExamples />;
    return <Home />;
  }, [hash]);

  return (
    <>
      <Navbar darkMode={darkMode} onToggleDarkMode={() => setDarkMode((v) => !v)} />
      {page}
      <Footer />
      <BackToTop />
    </>
  );
}

function NotFound() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-3xl font-black">المحاضرة غير موجودة</h1>
        <a href="#/" className="mt-5 inline-flex rounded-2xl bg-teal-700 px-4 py-3 font-black text-white">العودة للرئيسية</a>
      </div>
    </main>
  );
}
