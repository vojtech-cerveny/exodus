import { promises as fs } from "fs";

import { H1 } from "@/components/typography";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { getEventStatus } from "../../../utils/date";

export const metadata: Metadata = {
  title: "Exodus90 - Texty na den",
  description: "Best website ever",
};

export default async function RemoteMdxPage() {
  unstable_noStore();

  async function getFilesInFolder() {
    const folderPath = process.cwd() + "/src/app/(app)/data/ukony/";
    const files = await fs.readdir(folderPath);
    return files;
  }

  return (
    <>
      <H1>Exodus90 týdenní úkony</H1>
      <div className="grid-flex grid grid-cols-5 flex-col gap-2 md:grid-cols-7">
        {(await getFilesInFolder()).map((file, index) => {
          const exodus = getEventStatus("EXODUS");
          const today = exodus.currentDays;
          const fileName = file.replace(".md", "");
          const formattedFileName = fileName.startsWith("0") ? fileName.substring(1) : fileName;

          return (
            <Link
              className={cn(
                "flex h-12 items-center justify-center rounded-md border border-foreground/10 text-foreground/30 underline hover:border-foreground hover:text-foreground md:no-underline",
                Math.floor(today / 7 + 1) < parseInt(formattedFileName) &&
                  "border border-foreground/50 bg-background/10 text-foreground/50",
                Math.floor(today / 7 + 1) == parseInt(formattedFileName) &&
                  "border-green-500/45 bg-green-500/45 text-foreground hover:bg-green-500/55",
              )}
              key={index}
              href={"/exodus/ukony/" + fileName}
            >
              <div>{formattedFileName}</div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
