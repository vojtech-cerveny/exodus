import { Button } from "@/components/ui/button";
import { unstable_noStore } from "next/cache";
import Link from "next/link";
import { Progress } from "./components/circle-progress";

export default function Home() {
  unstable_noStore();
  function countDaysFromJan1PlusOne() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const differenceInMs = Number(now) - Number(startOfYear);
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    return differenceInDays + 1;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="flex flex-col space-y-2">
        <Button>
          <Link href="/days">OTEVŘI SEZNAM DNÍ</Link>
        </Button>
        <Button>
          <Link href={`/days/${countDaysFromJan1PlusOne()}`}>OTEVŘI DNEŠNÍ ROZJÍMÁNÍ</Link>
        </Button>
        <Progress progress={(countDaysFromJan1PlusOne() / 90) * 100} />
      </div>
    </main>
  );
}
