import { Metadata } from "next";
import Breadcrumb from "../../components/navigation/breadcrumb";

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
  twitter: {
    images: [{ url: "https://verici.dev/icons/pwa/og-kralovske-leto.png" }],
    description:
      "Exodus90 je 90 denní duchovní cvičení, které vám pomůže získat kontrolu nad svým životem. Toto cvičení zahrnuje modlitbu, půst, cvičení a studium. Připojte se k nám a zažijte svobodu, kterou vám Bůh chce dát.",
  },
  openGraph: {
    description:
      "Exodus90 je 90 denní duchovní cvičení, které vám pomůže získat kontrolu nad svým životem. Toto cvičení zahrnuje modlitbu, půst, cvičení a studium. Připojte se k nám a zažijte svobodu, kterou vám Bůh chce dát.",
    images: [{ url: "https://verici.dev/icons/pwa/og-kralovske-leto.png", height: 630, width: 1200 }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-8">
      <Breadcrumb pages={[{ path: "/kralovske-leto", title: "Královské léto" }]} />
      {children}
    </div>
  );
}
