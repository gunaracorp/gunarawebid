"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Bar progres membaca halaman — garis amber 3px di tepi atas viewport.
 *  Warna mengikuti pasangan tanda tangan Gunara (amber di atas abyss, 9.01:1 AAA). */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-[var(--gn-amber-600)] via-[var(--gn-amber-500)] to-[var(--gn-amber-300)]"
      style={{ scaleX }}
    />
  );
}
