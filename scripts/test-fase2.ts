/**
 * Unit test Fase 2 — parser rich text inline. Jalankan: bun scripts/test-fase2.ts
 */
import {
  amanHref,
  makeLink,
  parseInline,
  stripInline,
  tokenAktif,
  wrapToken,
} from "../src/lib/cms/rich-text";

let lulus = 0;
let gagal = 0;

function uji(nama: string, kondisi: boolean, detail?: unknown) {
  if (kondisi) {
    lulus++;
  } else {
    gagal++;
    console.error(`✗ ${nama}`, JSON.stringify(detail));
  }
}

// 1. Tebal & miring
uji("bold", JSON.stringify(parseInline("a **b** c")) ===
  JSON.stringify([{ t: "text", s: "a " }, { t: "bold", s: "b" }, { t: "text", s: " c" }]),
  parseInline("a **b** c"));

uji("italic", parseInline("a *b* c")[1]?.t === "italic", parseInline("a *b* c"));

// 2. Semua token (spasi antar token = segmen teks)
const semua = parseInline("**b** *i* ~~s~~ `c` ==m==");
uji("lima token", semua.filter((x) => x.t !== "text").map((x) => x.t).join(",") === "bold,italic,strike,code,mark", semua);

// 3. Tautan
const lk = parseInline("lihat [docs](https://gunara.web.id) ya");
uji("link", lk[1]?.t === "link" && (lk[1] as { href: string }).href === "https://gunara.web.id", lk);

// 4. Tautan relatif & mailto lolos, javascript ditolak
uji("relatif", amanHref("/blog/cms") === "/blog/cms");
uji("mailto", amanHref("mailto:a@b.co")?.startsWith("mailto") === true);
uji("javascript ditolak", amanHref("javascript:alert(1)") === null);
uji("data ditolak", amanHref("data:text/html,x") === null);
const jahat = parseInline("[x](javascript:alert(1))");
uji(
  "link jahat tak ter-render",
  jahat.every((s) => s.t !== "link") && !jahat.some((s) => s.t === "link"),
  jahat
);

// 5. Injeksi HTML tidak dirender — tetap segmen teks polos
const inj = parseInline("<script>alert(1)</script>");
uji("html tetap teks", inj[0]?.t === "text" && inj[0].s.includes("<script>"), inj);

// 6. stripInline
uji("strip bold", stripInline("a **b** c") === "a b c");
uji("strip link", stripInline("lihat [docs](https://x.co) ya") === "lihat docs ya", stripInline("lihat [docs](https://x.co) ya"));
uji("strip semua", stripInline("**b** *i* ~~s~~ `c` ==m==") === "b i s c m");

// 7. wrapToken: bungkus seleksi
const w1 = wrapToken("halo dunia", 5, 10, "bold");
uji("wrap bold", w1.text === "halo **dunia**" && w1.start === 7 && w1.end === 12, w1);

// 8. wrapToken: toggle-off
const w2 = wrapToken("halo **dunia**", 7, 12, "bold");
uji("toggle-off bold", w2.text === "halo dunia" && w2.start === 5 && w2.end === 10, w2);

// 9. wrapToken: seleksi kosong
const w3 = wrapToken("abc", 1, 1, "code");
uji("kosong sisip kode", w3.text === "a``bc" && w3.start === 2 && w3.end === 2, w3);

// 10. tokenAktif
uji("aktif bold", tokenAktif("x **y** z", 4, 5).has("bold"));
uji("tidak aktif", !tokenAktif("x **y** z", 2, 3).has("bold"));

// 11. makeLink + guard
const mk = makeLink("kunjungi situs", 9, 14, "https://gunara.web.id");
uji("makeLink", mk?.text === "kunjungi [situs](https://gunara.web.id)", mk);
uji("makeLink jahat null", makeLink("a", 0, 1, "javascript:x") === null);

// 12. token di tengah kalimat kompleks
const cmp = "Metodologi **UMEA** dan *G-DOS* untuk [11 situs](/ekosistem).";
const seg = parseInline(cmp);
uji("kompleks token lengkap", seg.filter((x) => x.t !== "text").map((x) => x.t).join(",") === "bold,italic,link", seg);
uji("strip kompleks", stripInline(cmp) === "Metodologi UMEA dan G-DOS untuk 11 situs.", stripInline(cmp));

// 13. baris baru tidak digabung token
uji("newline aman", parseInline("**a**\n*b*").filter((x) => x.t !== "text").map((x) => x.t).join(",") === "bold,italic", parseInline("**a**\n*b*"));

// 14. teks polos tanpa token
uji("polos", JSON.stringify(parseInline("teks biasa")) === JSON.stringify([{ t: "text", s: "teks biasa" }]));

console.log(`\nHASIL: ${lulus} lulus, ${gagal} gagal`);
if (gagal > 0) process.exit(1);
