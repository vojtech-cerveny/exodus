// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { cs } from '@payloadcms/translations/languages/cs';
import { sk } from '@payloadcms/translations/languages/sk';

import path from 'path';
import { buildConfig } from 'payload';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

import { Days } from './collections/Days';
import { Exercises } from './collections/Exercises';
import { Media } from './collections/Media';
import { StartingDates } from './collections/StartingDates';
import { Tasks } from './collections/Tasks';
import { Users } from './collections/Users';
import { Versions } from './collections/Versions';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Exercises, Versions, StartingDates, Days, Tasks],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // database-adapter-config-start
  db: postgresAdapter({
    pool: {
      connectionString: process.env.PAYLOAD_DATABASE_URL || '',
    },
  }),
  // database-adapter-config-end
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
  i18n: {
    supportedLanguages: { cs, sk },
    fallbackLanguage: 'cs', // default
  },
  localization: {
    locales: [
      {
        label: 'Česky',
        code: 'cs',
      },
      {
        label: 'Slovensky',
        code: 'sk',
      },
    ],
    defaultLocale: 'cs', // required
    fallback: true, // defaults to true
  },
});
