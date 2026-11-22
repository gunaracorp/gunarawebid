"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/** Tombol kembali ke atas dengan ring progres scroll melingkar.
 *  Muncul setelah pengguna melewati ~1,5 layar; menghormati reduced-motion. */
export function BackToTop() {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      const p = max > 0 ? el.scrollTop / max : 0;
      setProgress(p);
      setVisible(el.scrollTop > 900);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const R = 20;
  const CIRC = 2 * Math.PI * R;

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
      }
      aria-label="Kembali ke bagian atas halaman"
      title="Kembali ke atas"
      className={`fixed bottom-6 right-6 z-50 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#254872] bg-[#060d1f]/90 text-[#e6eef8] shadow-xl shadow-black/30 backdrop-blur transition-all duration-300 hover:border-[var(--gn-amber-500)] hover:text-[var(--gn-amber-400)] focus-visible:outline-2 focus-visible:outline-[var(--gn-amber-500)] ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {/* Ring progres scroll */}
      <svg
        viewBox="0 0 48 48"
        className="absolute inset-0 h-full w-full -rotate-90"
        aria-hidden
      >
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="#1b3455"
          strokeWidth="2.5"
        />
        <circle
          cx="24"
          cy="24"
          r={R}
          fill="none"
          stroke="var(--gn-amber-500)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - progress)}
        />
      </svg>
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
