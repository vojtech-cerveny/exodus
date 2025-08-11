import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_versions_language" AS ENUM('czk', 'svk');
  ALTER TABLE "versions" ADD COLUMN "language" "enum_versions_language" DEFAULT 'czk' NOT NULL;`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "versions" DROP COLUMN IF EXISTS "language";
  DROP TYPE "public"."enum_versions_language";`);
}
