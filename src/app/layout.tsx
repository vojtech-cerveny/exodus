import { ThemeProvider } from "@/components/theme-provider";
import UserButton from "@/components/user-button";
import { cn } from "@/lib/utils";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import { SizeSwitcher } from "../components/size-switcher";
import { ModeToggle } from "../components/theme-switcher";
import "./globals.css";

import ProgressUpdateCard from "@/components/brotherhood/progress-update-card";
import Footer from "@/components/navigation/footer";
import Navigation from "@/components/navigation/navigation";
import { Toaster } from "@/components/ui/sonner";
import moment from "moment";
import "moment/locale/cs";
import { SessionProvider } from "next-auth/react";
import { auth } from "../../auth";

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
  icons: {
    icon: { url: "/icons/pwa/icon-512x512.png" },
    shortcut: ["/icons/pwa/icon-512x512.png"],
    apple: [
      {
        url: "/icons/pwa/ios/64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        url: "/icons/pwa/ios/120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        url: "/icons/pwa/ios/152.png",
        sizes: "152x152",
        type: "image/png",
      },
      {
        url: "/icons/pwa/ios/512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        url: "/icons/pwa/ios/180.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        url: "/icons/pwa/ios/1024.png",
        sizes: "1024x1024",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    description:
      "Exodus90 je 90 denní duchovní cvičení, které vám pomůže získat kontrolu nad svým životem. Toto cvičení zahrnuje modlitbu, půst, cvičení a studium. Připojte se k nám a zažijte svobodu, kterou vám Bůh chce dát.",
    images: [{ url: "/icons/pwa/og.png", height: 630, width: 1200 }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
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

          <h1 className="mx-auto max-w-2xl scroll-m-20 pb-4 text-5xl font-black tracking-tight lg:text-5xl">
            <Link href="/">Exodus90</Link>
          </h1>

          <div className="mx-auto max-w-2xl">
            <div className="mb-4 md:flex md:items-center md:justify-between">
              <SessionProvider basePath={"/api/auth"} session={session}>
                <Navigation />
              </SessionProvider>
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
