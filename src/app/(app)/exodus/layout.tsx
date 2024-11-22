import Breadcrumb from "../../../components/navigation/breadcrumb";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-8">
      <Breadcrumb pages={[{ path: "/exodus/dny", title: "Dny Exodus90" }]} />
      {children}
    </div>
  );
}
