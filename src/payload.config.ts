// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { cs } from "@payloadcms/translations/languages/cs";
import { en } from "@payloadcms/translations/languages/en";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Days } from "./collections/Days";
import { Exercises } from "./collections/Exercises";
import { Guide } from "./collections/Guide";
import { Media } from "./collections/Media";
import { Tasks } from "./collections/Tasks";
import { Users } from "./collections/Users";
import { Versions } from "./collections/Versions";
import { WeeklyMeeting } from "./collections/WeeklyMeeting";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Exercises, Versions, Days, Tasks, WeeklyMeeting, Guide],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  // database-adapter-config-start
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URL || "",
    },
  }),
  // database-adapter-config-end
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  i18n: {
    supportedLanguages: { cs, en },
    fallbackLanguage: "en", // default
  },
});
