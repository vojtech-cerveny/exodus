export default async function ArticleLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {/* <Breadcrumb pages={[{ path: "/pruvodce", title: "Průvodce" }]} /> */}
      {children}
    </div>
  );
}
