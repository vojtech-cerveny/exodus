import { ThemeProvider } from "@/components/theme-provider";
import UserButton from "@/components/user-button";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import Navigation from "../components/navigation";
import { SizeSwitcher } from "../components/size-switcher";
import { ModeToggle } from "../components/theme-switcher";
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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="w-full" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen w-full min-w-full px-4 py-4 pb-10 sm:px-6 md:max-w-2xl lg:px-8 dark:bg-zinc-900 dark:text-zinc-400",
          myFont.className,
          GeistSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-1 justify-end space-x-2 p-2">
            <SizeSwitcher />
            <ModeToggle />
            <UserButton />
          </div>
          <Link href="/">
            <h1 className="mx-auto w-full max-w-2xl scroll-m-20 pb-4 text-5xl font-black tracking-tight lg:text-5xl">
              Excessus101
            </h1>
          </Link>

          <div className="mx-auto max-w-2xl">
            <Navigation />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
