import { siteInfo } from "../data/site.js";

export default function WarningBox({ compact = false }) {
  return (
    <div className={`rounded-3xl border border-amber-300/80 bg-amber-50 p-5 text-amber-950 shadow-sm dark:border-amber-400/30 dark:bg-amber-950/40 dark:text-amber-100 ${compact ? "text-sm" : ""}`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-amber-200 text-lg font-black dark:bg-amber-500/20">!</div>
        <p className="leading-8">{siteInfo.aiDisclaimer}</p>
      </div>
    </div>
  );
}
