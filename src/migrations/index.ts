import * as migration_20250108_213227 from "./20250108_213227";

export const migrations = [
  {
    up: migration_20250108_213227.up,
    down: migration_20250108_213227.down,
    name: "20250108_213227",
  },
];
