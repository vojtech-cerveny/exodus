import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exodus90 - Týdenní setkání",
  description: "Najdi zpět cestu k Bohu a k sobě samému.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <div className="pb-6 md:pb-6">{children}</div>;
}
