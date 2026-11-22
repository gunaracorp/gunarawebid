/* Screenshot halaman publik blog untuk pemeriksaan visual Fase 1. */
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const shots = [
    ["http://localhost:3000/blog", "/tmp/render/blog-index.png"],
    ["http://localhost:3000/blog/gunara-cms-mesin-konten-100-langkah-di-depan-wordpress", "/tmp/render/blog-artikel.png"],
  ];
  for (const [url, out] of shots) {
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    await page.screenshot({ path: out, fullPage: false });
    console.log("shot:", out);
  }
  // halaman artikel: scroll bawah (blok khusus)
  await page.goto("http://localhost:3000/blog/gunara-cms-mesin-konten-100-langkah-di-depan-wordpress", { waitUntil: "networkidle" });
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(600);
  await page.screenshot({ path: "/tmp/render/blog-artikel-blok.png", fullPage: false });
  console.log("shot: /tmp/render/blog-artikel-blok.png");
  await browser.close();
})().catch((e) => {
  console.error("GAGAL:", e.message);
  process.exit(1);
});
