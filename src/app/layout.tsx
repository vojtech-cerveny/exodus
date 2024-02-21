import { ThemeProvider } from "@/components/theme-provider";
import UserButton from "@/components/user-button";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { SizeSwitcher } from "../components/size-switcher";
import { ModeToggle } from "../components/theme-switcher";
import "./globals.css";

import Footer from "@/components/footer";
import Navigation from "@/components/navigation";
import ProgressUpdateCard from "@/components/progress-update-card";
import { Toaster } from "@/components/ui/sonner";
import moment from "moment";
import "moment/locale/cs";

moment.locale("cs");
// Font files can be colocated inside of `app`

const myFont = localFont({
  src: "./fonts/cmunrm.ttf",
  display: "block",
  preload: true,
  variable: "--font-cmunrm",
});

export const metadata: Metadata = {
  title: "Exodus90",
  description: "Ještě lepší a prémiovější verze než je Exodus90! 😂",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={cn("w-full", "flex h-screen flex-col justify-between", myFont.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-screen w-full min-w-full px-4 py-4 pb-10 sm:px-6 md:max-w-2xl lg:px-8 dark:bg-zinc-900 dark:text-zinc-400",
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
              Exodus90
            </h1>
          </Link>

          <div className="mx-auto max-w-2xl">
            <div className="mb-4 flex items-center justify-between">
              <Navigation />
              <ProgressUpdateCard />
            </div>
            {children}
            <Footer />
          </div>
        </ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}
