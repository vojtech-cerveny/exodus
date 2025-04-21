import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Set default values for existing rows
    UPDATE "versions"
    SET 
      "start_date" = now(),
      "end_date" = now() + interval '90 days',
      "duration" = 90
    WHERE "start_date" IS NULL 
    OR "end_date" IS NULL 
    OR "duration" IS NULL;
  `);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // No down migration needed as we don't want to remove the data
  await db.execute(sql`SELECT 1;`);
}
