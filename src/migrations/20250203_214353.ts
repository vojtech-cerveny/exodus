import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "weekly_meeting" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"number" numeric NOT NULL,
  	"version_id" integer NOT NULL,
  	"content" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "weekly_meeting_id" integer;
  DO $$ BEGIN
   ALTER TABLE "weekly_meeting" ADD CONSTRAINT "weekly_meeting_version_id_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."versions"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "weekly_meeting_version_idx" ON "weekly_meeting" USING btree ("version_id");
  CREATE INDEX IF NOT EXISTS "weekly_meeting_updated_at_idx" ON "weekly_meeting" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "weekly_meeting_created_at_idx" ON "weekly_meeting" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_weekly_meeting_fk" FOREIGN KEY ("weekly_meeting_id") REFERENCES "public"."weekly_meeting"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_weekly_meeting_id_idx" ON "payload_locked_documents_rels" USING btree ("weekly_meeting_id");`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "weekly_meeting" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "weekly_meeting" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_weekly_meeting_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_weekly_meeting_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "weekly_meeting_id";`);
}
