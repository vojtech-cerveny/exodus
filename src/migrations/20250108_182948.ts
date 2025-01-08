import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_tasks_type" AS ENUM('daily', 'weekly', 'weekday', 'monthly', 'specificDay');
  CREATE TYPE "public"."enum_tasks_scheduling_day_in_week" AS ENUM('1', '2', '3', '4', '5', '6', '7');
  CREATE TABLE IF NOT EXISTS "tasks_tasks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"task_title" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "tasks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"is_required" boolean DEFAULT true,
  	"version_id" integer NOT NULL,
  	"type" "enum_tasks_type" NOT NULL,
  	"scheduling_week" numeric,
  	"scheduling_day_in_week" "enum_tasks_scheduling_day_in_week",
  	"scheduling_day_number" numeric,
  	"scheduling_month" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "weeks_tasks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "weeks" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "weeks_tasks" CASCADE;
  DROP TABLE "weeks" CASCADE;
  ALTER TABLE "days" DROP CONSTRAINT "days_week_id_weeks_id_fk";
  
  ALTER TABLE "days" DROP CONSTRAINT "days_exercise_id_exercises_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_weeks_fk";
  
  DROP INDEX IF EXISTS "days_week_idx";
  DROP INDEX IF EXISTS "days_exercise_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_weeks_id_idx";
  ALTER TABLE "exercises" ADD COLUMN "icon_id" integer;
  ALTER TABLE "days" ADD COLUMN "version_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "tasks_id" integer;
  DO $$ BEGIN
   ALTER TABLE "tasks_tasks" ADD CONSTRAINT "tasks_tasks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "tasks" ADD CONSTRAINT "tasks_version_id_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."versions"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "tasks_tasks_order_idx" ON "tasks_tasks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "tasks_tasks_parent_id_idx" ON "tasks_tasks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "tasks_version_idx" ON "tasks" USING btree ("version_id");
  CREATE INDEX IF NOT EXISTS "tasks_updated_at_idx" ON "tasks" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "tasks_created_at_idx" ON "tasks" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "exercises" ADD CONSTRAINT "exercises_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "days" ADD CONSTRAINT "days_version_id_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."versions"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tasks_fk" FOREIGN KEY ("tasks_id") REFERENCES "public"."tasks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "exercises_icon_idx" ON "exercises" USING btree ("icon_id");
  CREATE INDEX IF NOT EXISTS "days_version_idx" ON "days" USING btree ("version_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tasks_id_idx" ON "payload_locked_documents_rels" USING btree ("tasks_id");
  ALTER TABLE "days" DROP COLUMN IF EXISTS "relation_type";
  ALTER TABLE "days" DROP COLUMN IF EXISTS "week_id";
  ALTER TABLE "days" DROP COLUMN IF EXISTS "exercise_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "weeks_id";
  DROP TYPE "public"."enum_days_relation_type";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_days_relation_type" AS ENUM('week', 'exercise');
  CREATE TABLE IF NOT EXISTS "weeks_tasks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"task_title" varchar NOT NULL,
  	"description" varchar,
  	"due_date" timestamp(3) with time zone
  );
  
  CREATE TABLE IF NOT EXISTS "weeks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"display_name" varchar NOT NULL,
  	"version_id" integer NOT NULL,
  	"number" numeric NOT NULL,
  	"title" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "tasks_tasks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "tasks" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "tasks_tasks" CASCADE;
  DROP TABLE "tasks" CASCADE;
  ALTER TABLE "exercises" DROP CONSTRAINT "exercises_icon_id_media_id_fk";
  
  ALTER TABLE "days" DROP CONSTRAINT "days_version_id_versions_id_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_tasks_fk";
  
  DROP INDEX IF EXISTS "exercises_icon_idx";
  DROP INDEX IF EXISTS "days_version_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_tasks_id_idx";
  ALTER TABLE "days" ADD COLUMN "relation_type" "enum_days_relation_type" DEFAULT 'week' NOT NULL;
  ALTER TABLE "days" ADD COLUMN "week_id" integer;
  ALTER TABLE "days" ADD COLUMN "exercise_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "weeks_id" integer;
  DO $$ BEGIN
   ALTER TABLE "weeks_tasks" ADD CONSTRAINT "weeks_tasks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."weeks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "weeks" ADD CONSTRAINT "weeks_version_id_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."versions"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "weeks_tasks_order_idx" ON "weeks_tasks" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "weeks_tasks_parent_id_idx" ON "weeks_tasks" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "weeks_version_idx" ON "weeks" USING btree ("version_id");
  CREATE INDEX IF NOT EXISTS "weeks_updated_at_idx" ON "weeks" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "weeks_created_at_idx" ON "weeks" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "days" ADD CONSTRAINT "days_week_id_weeks_id_fk" FOREIGN KEY ("week_id") REFERENCES "public"."weeks"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "days" ADD CONSTRAINT "days_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_weeks_fk" FOREIGN KEY ("weeks_id") REFERENCES "public"."weeks"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "days_week_idx" ON "days" USING btree ("week_id");
  CREATE INDEX IF NOT EXISTS "days_exercise_idx" ON "days" USING btree ("exercise_id");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_weeks_id_idx" ON "payload_locked_documents_rels" USING btree ("weeks_id");
  ALTER TABLE "exercises" DROP COLUMN IF EXISTS "icon_id";
  ALTER TABLE "days" DROP COLUMN IF EXISTS "version_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "tasks_id";
  DROP TYPE "public"."enum_tasks_type";
  DROP TYPE "public"."enum_tasks_scheduling_day_in_week";`);
}
