import * as migration_20241216_135120 from "./20241216_135120";

export const migrations = [
  {
    up: migration_20241216_135120.up,
    down: migration_20241216_135120.down,
    name: "20241216_135120",
  },
];
