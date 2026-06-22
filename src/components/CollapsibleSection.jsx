export default function CollapsibleSection({ title, subtitle, children, defaultOpen = true, id }) {
  return (
    <details id={id} open={defaultOpen} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 print-card">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
        <span><span className="block text-xl font-black">{title}</span>{subtitle && <span className="mt-1 block text-sm leading-7 text-slate-500 dark:text-slate-400">{subtitle}</span>}</span>
        <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-lg font-black transition group-open:rotate-45 dark:bg-slate-800">+</span>
      </summary>
      <div className="mt-5">{children}</div>
    </details>
  );
}
