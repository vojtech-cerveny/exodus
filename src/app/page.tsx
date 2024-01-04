import { Button } from "@/components/ui/button";
import Link from "next/link";
import ModeToggle from "./components/theme-switcher";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      
      <div className="z-10 max-w-5xl w-full items-center font-mono text-sm lg:flex">
        <Button><Link href="/days">OTEVŘI SEZNAM DNÍ</Link></Button>
      </div>
    </main>
  )
}
