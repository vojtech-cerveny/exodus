import * as migration_20250108_213227 from "./20250108_213227";
import * as migration_20250112_201039 from "./20250112_201039";
import * as migration_20250203_214353 from "./20250203_214353";
import * as migration_20250421_201656 from "./20250421_201656";
import * as migration_20250421_201657 from "./20250421_201657";
import * as migration_20250811_132756 from "./20250811_132756";

export const migrations = [
  {
    up: migration_20250108_213227.up,
    down: migration_20250108_213227.down,
    name: "20250108_213227",
  },
  {
    up: migration_20250112_201039.up,
    down: migration_20250112_201039.down,
    name: "20250112_201039",
  },
  {
    up: migration_20250203_214353.up,
    down: migration_20250203_214353.down,
    name: "20250203_214353",
  },
  {
    up: migration_20250421_201656.up,
    down: migration_20250421_201656.down,
    name: "20250421_201656",
  },
  {
    up: migration_20250421_201657.up,
    down: migration_20250421_201657.down,
    name: "20250421_201657",
  },
  {
    up: migration_20250811_132756.up,
    down: migration_20250811_132756.down,
    name: "20250811_132756",
  },
];
