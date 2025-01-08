import * as migration_20241216_135120 from "./20241216_135120";
import * as migration_20250108_182948 from "./20250108_182948";

export const migrations = [
  {
    up: migration_20241216_135120.up,
    down: migration_20241216_135120.down,
    name: "20241216_135120",
  },
  {
    up: migration_20250108_182948.up,
    down: migration_20250108_182948.down,
    name: "20250108_182948",
  },
];
