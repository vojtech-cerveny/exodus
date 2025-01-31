import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Exodus 90 CZ",
    short_name: "Exodus 90 CZ",
    icons: [
      {
        src: "/icons/pwa/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/pwa/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/icons/pwa/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#18181b",
    background_color: "#18181b",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
  };
}
