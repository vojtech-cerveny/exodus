const withMDX = require("@next/mdx")();
const withPWA = require("next-pwa")({
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  output: "standalone",
  // Optionally, add any other Next.js config below
};

module.exports = withPWA(withMDX(nextConfig));
