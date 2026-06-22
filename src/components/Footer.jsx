import { siteInfo } from "../data/site.js";
import WarningBox from "./WarningBox.jsx";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:px-8">
        <WarningBox compact />
        <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500 dark:text-slate-400">
          <p>{siteInfo.subjectName} — {siteInfo.department}</p>
          <p>{siteInfo.team}</p>
        </div>
      </div>
    </footer>
  );
}
