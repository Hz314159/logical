import { useState } from "react";
import { Icon } from "./icons.jsx";
import React from "react";
export default function CodeBlock({ example }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(example.code);
    } catch {
      const area = document.createElement("textarea");
      area.value = example.code;
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-950 shadow-sm dark:border-slate-800 print-card">
      <div className="flex items-center justify-between gap-3 border-b border-slate-800 bg-slate-900 px-4 py-3 text-white">
        <div><p className="font-black">{example.title}</p><p className="text-xs text-slate-400">{example.language}</p></div>
        <button type="button" onClick={copy} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-2 text-sm font-bold transition hover:bg-white/20 no-print"><Icon name="copy" className="h-4 w-4" />{copied ? "تم النسخ" : "نسخ"}</button>
      </div>
      <pre className="code-ltr overflow-x-auto p-4 text-sm leading-7 text-teal-100"><code>{example.code}</code></pre>
      <div className="grid gap-4 bg-white p-4 text-slate-900 dark:bg-slate-900 dark:text-slate-100 lg:grid-cols-2">
        <div>
          <h4 className="font-black">شرح سطر بسطر</h4>
          <ol className="mt-3 list-decimal space-y-2 pr-5 text-sm leading-7">{example.explanationLines.map((line) => <li key={line}>{line}</li>)}</ol>
        </div>
        <div className="grid gap-3">
          <Info title="أخطاء شائعة" items={example.commonMistakes} />
          <div className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-950/60"><h4 className="font-black">Expected output</h4><p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{example.output}</p></div>
          <div className="rounded-2xl bg-teal-50 p-4 dark:bg-teal-500/10"><h4 className="font-black text-teal-800 dark:text-teal-200">When to use this pattern</h4><p className="mt-2 text-sm leading-7 text-teal-900 dark:text-teal-100">{example.useWhen}</p></div>
        </div>
      </div>
    </div>
  );
}
function Info({ title, items }) {
  return <div className="rounded-2xl bg-amber-50 p-4 text-amber-950 dark:bg-amber-500/10 dark:text-amber-100"><h4 className="font-black">{title}</h4><ul className="mt-2 list-disc space-y-1 pr-5 text-sm leading-7">{items.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}
