import { ArticleMDX } from '@/components/article-formatter';
import { promises as fs } from 'fs';
import { notFound } from 'next/navigation';
import path from 'path';

export default async function PrivacyPage(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  try {
    const filePath = path.join(process.cwd(), `src/app/data/privacy-${searchParams.lang}.md`);
    const dayTextMd = await fs.readFile(filePath, 'utf-8');
    return (
      <>
        <ArticleMDX source={dayTextMd} />
      </>
    );
  } catch (error) {
    return notFound();
  }
}
