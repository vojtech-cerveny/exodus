import type { Metadata } from "next";
import localFont from "next/font/local";

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: "./fonts/cmunrm.ttf",
  display: "swap",
});
import "./globals.css";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./components/theme-switcher";
import { ThemeProvider } from "@/components/theme-provider";
import { SizeSwitcher } from "./components/size-switcher";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-10 dark:bg-zinc-900 dark:text-zinc-400",
          myFont.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-1 justify-end p-2 space-x-2">
            <ModeToggle />
            <SizeSwitcher />
          </div>
          <Link href="/">
            <h1 className="scroll-m-20 text-5xl font-black tracking-tight lg:text-5xl pb-4">Excessus101</h1>
          </Link>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
