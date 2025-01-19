import { MigrateDownArgs, MigrateUpArgs, sql } from '@payloadcms/db-postgres';

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // First add the columns as nullable
  await db.execute(sql`
    ALTER TABLE "versions" ADD COLUMN "slug" varchar;
    ALTER TABLE "versions" ADD COLUMN "is_visible" boolean DEFAULT true;
  `);

  // Update existing rows to have a slug based on their ID or another unique field
  await db.execute(sql`
    UPDATE "versions" 
    SET "slug" = LOWER(REPLACE(display_name, ' ', '-'))
    WHERE "slug" IS NULL;
  `);

  // Now make the slug column NOT NULL
  await db.execute(sql`
    ALTER TABLE "versions" ALTER COLUMN "slug" SET NOT NULL;
    CREATE UNIQUE INDEX IF NOT EXISTS "versions_slug_idx" ON "versions" USING btree ("slug");
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "versions_slug_idx";
    ALTER TABLE "versions" DROP COLUMN IF EXISTS "slug";
    ALTER TABLE "versions" DROP COLUMN IF EXISTS "is_visible";
  `);
}
