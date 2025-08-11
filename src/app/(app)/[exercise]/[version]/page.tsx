import { H1 } from "@/components/typography";
import { cn } from "@/lib/utils";
import config from "@payload-config";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { countDaysFromDate } from "../../utils/date";

type PageProps = {
  params: Promise<{
    version: string;
    exercise: string;
  }>;
};

export default async function ExodusVersionPage({ params }: PageProps) {
  const aParams = await params;
  unstable_noStore();

  const payload = await getPayload({ config });

  // First verify the version exists
  const version = await payload.find({
    collection: "versions",
    where: {
      slug: { equals: aParams.version },
      "exercise.slug": { equals: aParams.exercise },
    },
    limit: 1,
    select: {
      name: true,
      exercise: true,
      startDate: true,
    },
  });

  if (version.docs.length === 0) {
    notFound();
  }

  const days = await payload.find({
    collection: "days",
    where: {
      "version.slug": { equals: aParams.version },
      "version.exercise.slug": { equals: aParams.exercise },
    },
    sort: "number",
    limit: 100,
  });

  const today = countDaysFromDate(version.docs[0].startDate);

  // Use type assertion if necessary
  const exerciseName = (version.docs[0].exercise as { name: string }).name;

  return (
    <>
      <H1>{exerciseName} dny</H1>
      <div className="grid-flex grid grid-cols-5 flex-col gap-2 md:grid-cols-7">
        {days.docs.length > 0 ? (
          days.docs.map((day, index) => {
            const dayString = day.number.toString();
            const formatedDay = dayString.startsWith("0") ? dayString.substring(1) : dayString;

            return (
              <Link
                className={cn(
                  "border-foreground/10 text-foreground/30 hover:border-foreground hover:text-foreground flex h-12 items-center justify-center rounded-md border underline md:no-underline",
                  today < parseInt(formatedDay) && "border-foreground/50 bg-background/10 text-foreground/50 border",
                  today == parseInt(formatedDay) &&
                    "text-foreground border-green-500/45 bg-green-500/45 hover:bg-green-500/55",
                )}
                key={index}
                href={`/${aParams.exercise}/${aParams.version}/${dayString}`}
              >
                <div>{formatedDay}</div>
              </Link>
            );
          })
        ) : (
          <p className="text-muted-foreground mt-4 text-sm">
            Tady zatím nic nemáme. Postupně překládáme anglické texty, proto zde nemusíš vidět všechny dny. Toto může
            nastat hlavně na začátku cvičení. Pokud si myslíš, že to je chyba, dej nám vědět.
          </p>
        )}
      </div>
    </>
  );
}
