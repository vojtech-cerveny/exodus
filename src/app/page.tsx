import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  function countDaysFromJan1PlusOne() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const differenceInMs = Number(now) - Number(startOfYear);
    const differenceInDays = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    return differenceInDays + 1;
  }
  
  console.log(countDaysFromJan1PlusOne());
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      
      <div className="flex flex-col space-y-2">
        <Button><Link href="/days">OTEVŘI SEZNAM DNÍ</Link></Button>
        <Button><Link href={`/days/${countDaysFromJan1PlusOne()}`}>OTEVŘI DNEŠNÍ ROZJÍMÁNÍ</Link></Button>
      </div>
    </main>
  )
}
