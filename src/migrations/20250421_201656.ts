import { MigrateDownArgs, MigrateUpArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "guide" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_id" integer,
  	"slug" varchar NOT NULL,
  	"order_number" numeric NOT NULL,
  	"title" varchar,
  	"content" jsonb,
  	"author_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  DO $$ 
  BEGIN
    IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'starting_dates') THEN
      ALTER TABLE "starting_dates" DISABLE ROW LEVEL SECURITY;
      DROP TABLE "starting_dates" CASCADE;
    END IF;
  END $$;
  
  DO $$
  BEGIN
    IF EXISTS (
      SELECT 1 FROM information_schema.table_constraints 
      WHERE constraint_name = 'payload_locked_documents_rels_starting_dates_fk'
    ) THEN
      ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_starting_dates_fk";
    END IF;
  END $$;
  
  DROP INDEX IF EXISTS "versions_name_idx";
  DROP INDEX IF EXISTS "versions_slug_idx";
  DROP INDEX IF EXISTS "payload_locked_documents_rels_starting_dates_id_idx";
  
  -- First add columns as nullable
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'versions' AND column_name = 'start_date'
    ) THEN
      ALTER TABLE "versions" ADD COLUMN "start_date" timestamp(3) with time zone;
    END IF;
    
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'versions' AND column_name = 'end_date'
    ) THEN
      ALTER TABLE "versions" ADD COLUMN "end_date" timestamp(3) with time zone;
    END IF;
    
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'versions' AND column_name = 'duration'
    ) THEN
      ALTER TABLE "versions" ADD COLUMN "duration" numeric;
    END IF;
  END $$;

  -- Update existing rows with default values
  UPDATE "versions"
  SET 
    "start_date" = now(),
    "end_date" = now() + interval '90 days',
    "duration" = 90
  WHERE "start_date" IS NULL 
  OR "end_date" IS NULL 
  OR "duration" IS NULL;

  -- Now add NOT NULL constraints
  ALTER TABLE "versions" ALTER COLUMN "start_date" SET NOT NULL;
  ALTER TABLE "versions" ALTER COLUMN "end_date" SET NOT NULL;
  ALTER TABLE "versions" ALTER COLUMN "duration" SET NOT NULL;
  
  DO $$
  BEGIN
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'payload_locked_documents_rels' AND column_name = 'guide_id'
    ) THEN
      ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "guide_id" integer;
    END IF;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "guide" ADD CONSTRAINT "guide_version_id_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."versions"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "guide" ADD CONSTRAINT "guide_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "guide_version_idx" ON "guide" USING btree ("version_id");
  CREATE UNIQUE INDEX IF NOT EXISTS "guide_slug_idx" ON "guide" USING btree ("slug");
  CREATE UNIQUE INDEX IF NOT EXISTS "guide_order_number_idx" ON "guide" USING btree ("order_number");
  CREATE INDEX IF NOT EXISTS "guide_author_idx" ON "guide" USING btree ("author_id");
  CREATE INDEX IF NOT EXISTS "guide_updated_at_idx" ON "guide" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "guide_created_at_idx" ON "guide" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_guide_fk" FOREIGN KEY ("guide_id") REFERENCES "public"."guide"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_guide_id_idx" ON "payload_locked_documents_rels" USING btree ("guide_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "starting_dates_id";`);
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "starting_dates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"exercise_id" integer NOT NULL,
  	"version_id" integer,
  	"start_date" timestamp(3) with time zone NOT NULL,
  	"end_date" timestamp(3) with time zone,
  	"is_active" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "guide" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "guide" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_guide_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_guide_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "starting_dates_id" integer;
  DO $$ BEGIN
   ALTER TABLE "starting_dates" ADD CONSTRAINT "starting_dates_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "starting_dates" ADD CONSTRAINT "starting_dates_version_id_versions_id_fk" FOREIGN KEY ("version_id") REFERENCES "public"."versions"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "starting_dates_exercise_idx" ON "starting_dates" USING btree ("exercise_id");
  CREATE INDEX IF NOT EXISTS "starting_dates_version_idx" ON "starting_dates" USING btree ("version_id");
  CREATE INDEX IF NOT EXISTS "starting_dates_updated_at_idx" ON "starting_dates" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "starting_dates_created_at_idx" ON "starting_dates" USING btree ("created_at");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_starting_dates_fk" FOREIGN KEY ("starting_dates_id") REFERENCES "public"."starting_dates"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE UNIQUE INDEX IF NOT EXISTS "versions_name_idx" ON "versions" USING btree ("name");
  CREATE UNIQUE INDEX IF NOT EXISTS "versions_slug_idx" ON "versions" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_starting_dates_id_idx" ON "payload_locked_documents_rels" USING btree ("starting_dates_id");
  ALTER TABLE "versions" DROP COLUMN IF EXISTS "start_date";
  ALTER TABLE "versions" DROP COLUMN IF EXISTS "end_date";
  ALTER TABLE "versions" DROP COLUMN IF EXISTS "duration";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "guide_id";`);
}
