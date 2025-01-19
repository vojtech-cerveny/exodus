import { H1 } from '@/components/typography';
import { cn } from '@/lib/utils';
import config from '@payload-config';
import { unstable_noStore } from 'next/cache';
import Link from 'next/link';
import { notFound } from 'next/navigation';
// import { useRouter } from 'next/router';
import { getEventStatus } from '@/app/(app)/utils/date';
import { getPayload } from 'payload';

type PageProps = {
  params: Promise<{
    version: string;
    lang: string;
  }>;
};

export default async function ExodusVersionPage({ params }: PageProps) {
  const aParams = await params;
  unstable_noStore();

  console.log(aParams);

  const payload = await getPayload({ config });

  // First verify the version exists
  const version = await payload.find({
    collection: 'versions',
    where: {
      slug: { equals: aParams.version },
    },
    locale: aParams.lang,
  });

  if (version.docs.length === 0) {
    notFound();
  }

  const days = await payload.find({
    collection: 'days',
    where: {
      'version.slug': { equals: aParams.version },
    },
    sort: 'number',
    limit: 100,
    locale: aParams.lang,
  });

  const exodus = getEventStatus('EXODUS');
  const today = exodus.currentDays;

  return (
    <>
      <H1>Exodus90 dny</H1>
      <div className="grid-flex grid grid-cols-5 flex-col gap-2 md:grid-cols-7">
        {days.docs.map((day, index) => {
          const dayString = day.number.toString();
          const formatedDay = dayString.startsWith('0') ? dayString.substring(1) : dayString;

          return (
            <Link
              className={cn(
                'flex h-12 items-center justify-center rounded-md border border-foreground/10 text-foreground/30 underline hover:border-foreground hover:text-foreground md:no-underline',
                today < parseInt(formatedDay) && 'border border-foreground/50 bg-background/10 text-foreground/50',
                today == parseInt(formatedDay) &&
                  'border-green-500/45 bg-green-500/45 text-foreground hover:bg-green-500/55',
              )}
              key={index}
              href={`/exodus/${aParams.lang}/${aParams.version}/${dayString}`}
            >
              <div>{formatedDay}</div>
            </Link>
          );
        })}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">
        Postupně překládáme anglické texty na české, proto zde nemusíš vidět všechny dny.
      </p>
    </>
  );
}
