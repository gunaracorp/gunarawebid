import { SiteHeader } from "@/components/gunara/site-header";
import { SiteFooter } from "@/components/gunara/site-footer";
import { Hero } from "@/components/gunara/hero";
import { Philosophy } from "@/components/gunara/philosophy";
import { Methodology } from "@/components/gunara/methodology";
import { Ecosystem } from "@/components/gunara/ecosystem";
import { BrandSystem } from "@/components/gunara/brand-system";
import { ContactCta } from "@/components/gunara/contact-cta";
import { ScrollProgress } from "@/components/gunara/scroll-progress";
import { BackToTop } from "@/components/gunara/back-to-top";

/**
 * gunara.web.id — Personal Command Center of Gugun Gunara.
 * Arsitektur halaman mengikuti UWA-7: semantic HTML (header/main/section/footer),
 * hierarki heading logis, anchor yang bisa di-crawl, dan aksesibilitas AA/AAA.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollProgress />
      <SiteHeader />
      <main id="konten-utama" className="flex-1">
        <Hero />
        <Philosophy />
        <Methodology />
        <Ecosystem />
        <BrandSystem />
        <ContactCta />
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
