export default function CheatSheet({ cheatSheet }) {
  const blocks = [
    ["أهم النقاط", cheatSheet.importantPoints],
    ["Keywords", cheatSheet.keywords],
    ["Mini examples", cheatSheet.miniExamples],
    ["Warnings", cheatSheet.warnings],
    ["مرشح للامتحان", cheatSheet.likelyExam]
  ];
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
      {blocks.map(([title, items]) => (
        <div key={title} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 print-card">
          <h4 className="font-black text-teal-700 dark:text-teal-300">{title}</h4>
          <ul className="mt-3 list-disc space-y-2 pr-5 text-sm leading-7">{items.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      ))}
    </div>
  );
}
