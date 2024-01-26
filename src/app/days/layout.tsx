import type { Metadata } from "next";
import Breadcrumb from "../../components/breadcrumb";

export const metadata: Metadata = {
  title: "Excessus",
  description: "Best website ever",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumb pages={[{ path: "/days", title: "Dny Exodus90" }]} />
      {children}
    </div>
  );
}
