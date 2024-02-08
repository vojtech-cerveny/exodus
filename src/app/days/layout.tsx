import Breadcrumb from "../../components/breadcrumb";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-8">
      <Breadcrumb pages={[{ path: "/days", title: "Dny Exodus90" }]} />
      {children}
    </div>
  );
}
