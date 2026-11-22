import type { Metadata } from "next";
import { LoginForm } from "@/components/internal/login-form";

export const metadata: Metadata = {
  title: "Gerbang Internal",
};

export default async function InternalLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ setup?: string }>;
}) {
  const { setup } = await searchParams;
  return <LoginForm setup={setup === "1"} />;
}
