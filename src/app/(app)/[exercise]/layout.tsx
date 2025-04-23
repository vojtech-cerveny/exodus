export default function RootLayout({ children }: { children: React.ReactNode; breadcrumbs: React.ReactNode }) {
  return <div className="mb-4 pb-8">{children}</div>;
}
