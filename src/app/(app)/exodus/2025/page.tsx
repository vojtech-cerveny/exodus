import { DownloadTextFiles } from "@/components/download-text-files";
import { H1 } from "@/components/typography";
import { cn } from "@/lib/utils";
import config from "@payload-config";
import { Metadata } from "next";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { getPayload } from "payload";
import { getEventStatus } from "../../utils/date";

export const metadata: Metadata = {
  title: "Exodus90 - Texty na den",
  description: "Texty na den Exodus90",
};

export default async function RemoteMdxPage() {
  unstable_noStore();

  const payload = await getPayload({ config });
  const days = await payload.find({
    collection: "days",
    where: {
      "version.displayName": { equals: "Exodus - 2024" },
    },
    sort: "number",
  });

  const exodus = getEventStatus("EXODUS");
  const today = exodus.currentDays;

  return (
    <>
      <H1>Exodus90 dny</H1>
      <div className="grid-flex grid grid-cols-5 flex-col gap-2 md:grid-cols-7">
        {days.docs.map((day, index) => {
          const dayString = day.number.toString();
          const formatedDay = dayString.startsWith("0") ? dayString.substring(1) : dayString;

          return (
            <Link
              className={cn(
                "flex h-12 items-center justify-center rounded-md border border-foreground/10 text-foreground/30 underline hover:border-foreground hover:text-foreground md:no-underline",
                today < parseInt(formatedDay) && "border border-foreground/50 bg-background/10 text-foreground/50",
                today == parseInt(formatedDay) &&
                  "border-green-500/45 bg-green-500/45 text-foreground hover:bg-green-500/55",
              )}
              key={index}
              href={"dny/" + dayString}
            >
              <div>{formatedDay}</div>
            </Link>
          );
        })}
      </div>
      <DownloadTextFiles />
    </>
  );
}
