import { siteInfo } from "../data/site.js";
import WarningBox from "./WarningBox.jsx";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-teal-900 via-slate-950 to-slate-900 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -right-16 top-10 h-64 w-64 rounded-full bg-teal-400 blur-3xl" />
        <div className="absolute -left-20 bottom-10 h-72 w-72 rounded-full bg-emerald-300 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-teal-100">{siteInfo.department}</div>
          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">{siteInfo.subjectName}</h1>
          <p className="mt-4 max-w-2xl text-xl leading-9 text-slate-200">{siteInfo.shortDescription}</p>
          <p className="mt-3 max-w-2xl leading-8 text-teal-100">{siteInfo.subjectClarification}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#lectures" className="rounded-2xl bg-teal-500 px-5 py-3 font-black text-white shadow-soft transition hover:bg-teal-400">ابدأ من المحاضرات</a>
            <a href="#/study-guide" className="rounded-2xl border border-white/20 bg-white/10 px-5 py-3 font-black text-white transition hover:bg-white/20">كيف أدرس من الموقع؟</a>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-soft backdrop-blur">
            <p className="text-sm text-teal-100">الفريق</p>
            <p className="mt-1 text-2xl font-black">{siteInfo.team}</p>
          </div>
          <WarningBox />
        </div>
      </div>
    </section>
  );
}
