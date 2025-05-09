type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    exercise: string;
    version: string;
  }>;
};

export default async function ArticleLayout({ children, params }: LayoutProps) {
  return <div>{children}</div>;
}
