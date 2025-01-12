import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "versions" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "versions" ADD COLUMN "is_visible" boolean DEFAULT true;
  CREATE UNIQUE INDEX IF NOT EXISTS "versions_slug_idx" ON "versions" USING btree ("slug");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX IF EXISTS "versions_slug_idx";
  ALTER TABLE "versions" DROP COLUMN IF EXISTS "slug";
  ALTER TABLE "versions" DROP COLUMN IF EXISTS "is_visible";`);
}
