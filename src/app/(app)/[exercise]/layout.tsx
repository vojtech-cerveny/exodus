import Breadcrumb from "@/components/navigation/breadcrumb";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 pb-8">
      <Breadcrumb pages={[{ path: "/exodus", title: "Exodus" }]} />
      {children}
    </div>
  );
}
