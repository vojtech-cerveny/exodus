import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excessus",
  description: "Best website ever",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">{children}</div>;
}
