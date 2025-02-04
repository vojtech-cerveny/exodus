// This is a server-side import, the value will be bundled at build time
import pkg from "../../package.json";

export const PUBLIC_CONFIG = {
  version: pkg.version,
} as const;
