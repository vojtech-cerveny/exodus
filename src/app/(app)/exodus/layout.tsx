import Breadcrumb from "@/components/navigation/breadcrumb";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 pb-8">
      <Breadcrumb pages={[{ path: "/exodus/2024", title: "Dny Exodus90" }]} />
      {children}
    </div>
  );
}
