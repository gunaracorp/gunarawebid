"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole, ShieldAlert, Terminal } from "lucide-react";
import { GunaraMonogram } from "@/components/gunara/site-header";

/** Gerbang masuk G-DOS — satu kunci, disimpan di env INTERNAL_ACCESS_KEY. */
export function LoginForm({ setup }: { setup: boolean }) {
  const router = useRouter();
  const [key, setKey] = useState("");
  const [status, setStatus] = useState<"idle" | "cek" | "salah" | "setup">(
    setup ? "setup" : "idle"
  );
  const [gagal, setGagal] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("cek");
    setGagal("");
    try {
      const res = await fetch("/api/internal/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const json = (await res.json()) as { ok: boolean; pesan?: string };
      if (!res.ok || !json.ok) {
        setGagal(json.pesan ?? "Kunci tidak cocok.");
        setStatus("salah");
        return;
      }
      router.replace("/internal");
      router.refresh();
    } catch {
      setGagal("Sistem tidak merespons. Coba lagi.");
      setStatus("salah");
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      <div className="bg-blueprint bg-blueprint-fade absolute inset-0" aria-hidden />
      <div className="glow-amber absolute left-1/2 top-1/3 h-[420px] w-[620px] -translate-x-1/2 opacity-60" aria-hidden />

      <div className="relative w-full max-w-md rounded-3xl border border-[#1b3455] bg-[#0a1628]/90 p-8 shadow-2xl shadow-black/50 backdrop-blur">
        <div className="flex items-center justify-between border-b border-[#1b3455] pb-5">
          <div className="flex items-center gap-3">
            <GunaraMonogram />
            <div>
              <p className="font-display text-base font-bold tracking-[0.18em]">GUNARA</p>
              <p className="font-mono text-[10px] tracking-[0.22em] text-[#5c87b8]">
                INTERNAL · G-DOS GATE
              </p>
            </div>
          </div>
          <span className="flex items-center gap-2 rounded-full border border-[#1b3455] px-3 py-1.5 font-mono text-[10px] text-[#a9bcd6]">
            <LockKeyhole className="h-3.5 w-3.5 text-[var(--gn-amber-400)]" aria-hidden />
            TERKUNCI
          </span>
        </div>

        <h1 className="mt-6 font-display text-xl font-bold">Identifikasi Arsitek</h1>
        <p className="mt-2 text-sm leading-relaxed text-[#a9bcd6]">
          Area ini memuat dokumen rahasia dan detail identitas yang tidak diterbitkan di situs
          publik. Masukkan kunci internal untuk melanjutkan.
        </p>

        {status === "setup" ? (
          <p className="mt-5 flex items-start gap-2.5 rounded-xl border border-[var(--gn-amber-500)]/50 bg-[var(--gn-amber-500)]/10 px-4 py-3 text-xs leading-relaxed text-[var(--gn-amber-300)]">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
            Sistem belum dikonfigurasi: pasang environment variable{" "}
            <code className="mx-1 rounded bg-black/40 px-1.5 py-0.5 font-mono">
              INTERNAL_ACCESS_KEY
            </code>{" "}
            di .env.local (lokal) atau Project Settings → Environment Variables (Vercel), lalu
            jalankan ulang.
          </p>
        ) : null}

        <form onSubmit={onSubmit} className="mt-6">
          <label htmlFor="kunci" className="block text-xs font-semibold uppercase tracking-[0.14em] text-[#5c87b8]">
            Kunci Internal
          </label>
          <div className="mt-2 flex gap-2.5">
            <div className="relative flex-1">
              <Terminal className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5c87b8]" aria-hidden />
              <input
                id="kunci"
                name="kunci"
                type="password"
                required
                autoComplete="current-password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="••••••••••••"
                className="min-h-12 w-full rounded-xl border border-[#1b3455] bg-[#060d1f] pl-11 pr-4 font-mono text-sm tracking-[0.2em] text-[#e6eef8] placeholder:tracking-normal placeholder:text-[#5c87b8]/60 focus:border-[var(--gn-amber-500)] focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={status === "cek"}
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[var(--gn-amber-500)] px-6 text-sm font-bold text-[var(--gn-navy-900)] shadow-lg shadow-amber-500/20 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === "cek" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
              Masuk
            </button>
          </div>
        </form>

        {status === "salah" ? (
          <p role="alert" className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-xs text-red-300">
            {gagal}
          </p>
        ) : null}

        <p className="mt-8 border-t border-[#1b3455] pt-5 text-center font-mono text-[10px] leading-relaxed tracking-[0.18em] text-[#5c87b8]">
          AREA TERBATAS · TIDAK DIINDEKS · SESI 12 JAM
        </p>
      </div>
    </div>
  );
}
