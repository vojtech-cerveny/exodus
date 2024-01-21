import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { SizeSwitcher } from "./components/size-switcher";
import { ModeToggle } from "./components/theme-switcher";
import "./globals.css";

// Font files can be colocated inside of `app`
const myFont = localFont({
  src: "./fonts/cmunrm.ttf",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Excessus101",
  description: "Ještě lepší a prémiovější verze než je Exodus90! 😂",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-full" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen w-full min-w-full px-4 py-4 pb-10 sm:px-6 lg:px-8 dark:bg-zinc-900 dark:text-zinc-400",
          myFont.className,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-1 justify-end space-x-2 p-2">
            <SizeSwitcher />
            <ModeToggle />
          </div>
          <Link href="/">
            <h1 className="mx-auto w-full scroll-m-20 pb-4 text-5xl font-black tracking-tight md:max-w-2xl lg:text-5xl">
              Excessus101
            </h1>
          </Link>
          <div className="mx-auto max-w-2xl">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
