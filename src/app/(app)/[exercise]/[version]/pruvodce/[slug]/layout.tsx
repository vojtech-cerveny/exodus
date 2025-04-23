type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{
    exercise: string;
    version: string;
    slug: string;
  }>;
};

export default async function ArticleLayout({ children }: LayoutProps) {
  return <div>{children}</div>;
}
