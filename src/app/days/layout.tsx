import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excessus",
  description: "Best website ever",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="">{children}</div>;
}
