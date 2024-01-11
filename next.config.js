const withMDX = require("@next/mdx")();

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below
  extends: {
    colors: {
      elephant: {
        50: "#f1f9fa",
        100: "#dceef1",
        200: "#bddfe4",
        300: "#90c7d0",
        400: "#5ba6b5",
        500: "#408a9a",
        600: "#387282",
        700: "#325d6c",
        800: "#304f5a",
        900: "#2c434d",
        950: "#1e343e",
      },
    },
  },
};

module.exports = withMDX(nextConfig);

