export default function Roadmap({ lectures }) {
  return (
    <section id="roadmap" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div><p className="font-bold text-teal-700 dark:text-teal-300">Roadmap</p><h2 className="mt-2 text-3xl font-black">خريطة المحاضرات</h2></div>
        <a href="#lectures" className="hidden rounded-2xl border border-slate-200 px-4 py-2 font-bold hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900 sm:inline-flex">عرض الكل</a>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {lectures.map((lecture, index) => (
          <a key={lecture.id} href={`#/lecture/${lecture.id}`} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-300 hover:shadow-soft dark:border-slate-800 dark:bg-slate-900 dark:hover:border-teal-700">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-700 font-black text-white">{String(index + 1).padStart(2, "0")}</div>
              <div className="min-w-0">
                <h3 className="text-lg font-black group-hover:text-teal-700 dark:group-hover:text-teal-300">{lecture.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{lecture.topics.slice(0, 4).join(" • ")}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold">
                  <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{lecture.difficulty}</span>
                  <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{lecture.estimatedTime}</span>
                  <span className="rounded-full bg-teal-50 px-3 py-1 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">افتح المحاضرة</span>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
