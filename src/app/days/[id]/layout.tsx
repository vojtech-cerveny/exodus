import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Excessus - Den",
  description: "Najdi zpět cestu k Bohu a k sobě samému.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="pb-6 md:pb-0">{children}</div>;
}
