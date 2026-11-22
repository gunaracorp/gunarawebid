/** Chrome area terautentikasi: topbar internal + konten + palet perintah ⌘K. */
import { InternalTopbar } from "@/components/internal/internal-topbar";
import { CommandPalette } from "@/components/cms/command-palette";

export default function InternalPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <InternalTopbar />
      <CommandPalette />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">{children}</div>
      </main>
      <footer className="mt-auto border-t border-[#1b3455]">
        <p className="mx-auto max-w-7xl px-4 py-5 font-mono text-[10px] tracking-[0.18em] text-[#5c87b8] sm:px-6 lg:px-8">
          G-DOS INTERNAL · DOKUMEN RAHASIA GUNARA · SESI TERENKRIPSI HTTPS · v1.2.0.4
        </p>
      </footer>
    </div>
  );
}
