import Breadcrumb from "../../components/breadcrumb";

export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Breadcrumb pages={[{ path: "/articles", title: "Články" }]} />
      {children}
    </div>
  );
}
