import Breadcrumb from "../../components/breadcrumb";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumb pages={[{ path: "/days", title: "Dny Exodus90" }]} />
      {children}
    </div>
  );
}
