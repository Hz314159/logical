import { useEffect, useState } from "react";
import { Icon } from "./icons.jsx";
import React from "react";
export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 550);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="fixed bottom-5 left-5 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-700 text-white shadow-soft transition hover:bg-teal-600 no-print" aria-label="العودة للأعلى">
      <Icon name="top" />
    </button>
  );
}
