import type { Metadata } from "next";
import { MediaLibraryScreen } from "@/components/cms/media-library";

export const metadata: Metadata = {
  title: "CMS — Pustaka Media",
};

export const dynamic = "force-dynamic";

export default function PustakaMediaPage() {
  return <MediaLibraryScreen />;
}
