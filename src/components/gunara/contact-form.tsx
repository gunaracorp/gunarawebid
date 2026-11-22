"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";

const KEBUTUHAN = [
  "Asesmen Kematangan UMEA™",
  "Implementasi G-DOS",
  "Arsitektur Web UWA-7",
  "Perizinan & Kepatuhan Usaha",
  "Lainnya / Belum yakin",
] as const;

type Status = "idle" | "mengirim" | "sukses" | "gagal";

/** Form kontak publik — mengirim ke /api/kontak, tersimpan di dashboard internal. */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [pesan, setPesan] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const honeypot = String(fd.get("website") ?? "");
    if (honeypot) {
      // Bot terdeteksi — pura-pura sukses tanpa menyimpan apa pun.
      setStatus("sukses");
      setPesan("Terima kasih. Pesan Anda telah diterima.");
      return;
    }

    setStatus("mengirim");
    try {
      const res = await fetch("/api/kontak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nama: String(fd.get("nama") ?? "").trim(),
          email: String(fd.get("email") ?? "").trim(),
          organisasi: String(fd.get("organisasi") ?? "").trim(),
          kebutuhan: String(fd.get("kebutuhan") ?? ""),
          pesan: String(fd.get("pesan") ?? "").trim(),
        }),
      });
      const json = (await res.json()) as { ok: boolean; pesan?: string; simpan?: boolean };
      if (!res.ok || !json.ok) throw new Error(json.pesan ?? "Gagal mengirim pesan.");
      setStatus("sukses");
      setPesan(
        json.simpan === false
          ? "Pesan Anda diterima, namun penyimpanan sementara tidak tersedia. Silakan hubungi lewat kanal ekosistem di atas."
          : "Terima kasih. Pesan Anda masuk ke pusat kendali dan akan dijawab dari jalur yang tepat."
      );
      form.reset();
    } catch (err) {
      setStatus("gagal");
      setPesan(err instanceof Error ? err.message : "Terjadi kesalahan. Coba lagi.");
    }
  }

  const labelCls = "block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground";
  const inputCls =
    "mt-2 min-h-11 w-full rounded-xl border border-input bg-background px-4 text-sm shadow-sm transition-colors placeholder:text-muted-foreground/60 focus-visible:outline-2 focus-visible:outline-[var(--gn-amber-500)]";

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-border bg-card p-7 shadow-xl shadow-black/5 sm:p-9"
      aria-labelledby="judul-form-kontak"
    >
      <p id="judul-form-kontak" className="kicker">
        Formulir · Gerbang Pertama
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold">
        Ceritakan sistem yang sedang Anda bangun
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Semakin jelas titik awal Anda, semakin tepat arsitektur yang kami usulkan.
      </p>

      {/* Honeypot anti-bot — tersembunyi dari manusia */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="nama" className={labelCls}>
            Nama *
          </label>
          <input id="nama" name="nama" required maxLength={120} className={inputCls} placeholder="Nama lengkap" />
        </div>
        <div>
          <label htmlFor="email" className={labelCls}>
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={160}
            className={inputCls}
            placeholder="nama@perusahaan.id"
          />
        </div>
        <div>
          <label htmlFor="organisasi" className={labelCls}>
            Organisasi
          </label>
          <input
            id="organisasi"
            name="organisasi"
            maxLength={160}
            className={inputCls}
            placeholder="Opsional — nama usaha / komunitas"
          />
        </div>
        <div>
          <label htmlFor="kebutuhan" className={labelCls}>
            Jalur Layanan *
          </label>
          <select id="kebutuhan" name="kebutuhan" required className={inputCls} defaultValue={KEBUTUHAN[4]}>
            {KEBUTUHAN.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="pesan" className={labelCls}>
          Pesan *
        </label>
        <textarea
          id="pesan"
          name="pesan"
          required
          minLength={10}
          maxLength={4000}
          rows={5}
          className={`${inputCls} resize-y`}
          placeholder="Kondisi organisasi Anda saat ini, apa yang ingin dicapai, dan batasan yang ada."
        />
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "mengirim"}
          className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--gn-amber-500)] px-8 py-3.5 text-sm font-bold text-[var(--gn-navy-900)] shadow-xl shadow-amber-500/25 transition-transform hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "mengirim" ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
          ) : (
            <Send className="h-4 w-4" aria-hidden />
          )}
          {status === "mengirim" ? "Mengirim…" : "Kirim ke Pusat Kendali"}
        </button>
        <p className="text-xs text-muted-foreground">
          Data Anda hanya dibaca oleh pemilik gunara.web.id — tidak dibagikan, tidak diindeks.
        </p>
      </div>

      {status === "sukses" ? (
        <p
          role="status"
          className="mt-6 flex items-start gap-2.5 rounded-xl border border-[var(--gn-amber-500)]/50 bg-[var(--gn-amber-tint)] px-4 py-3 text-sm text-[var(--gn-amber-800)] dark:bg-[var(--gn-amber-500)]/10 dark:text-[var(--gn-amber-300)]"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {pesan}
        </p>
      ) : null}
      {status === "gagal" ? (
        <p
          role="alert"
          className="mt-6 flex items-start gap-2.5 rounded-xl border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {pesan}
        </p>
      ) : null}
    </form>
  );
}
