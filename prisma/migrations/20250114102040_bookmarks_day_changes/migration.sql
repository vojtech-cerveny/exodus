/*
 Warnings:
 
 - You are about to drop the column `day` on the `Bookmark` table. All the data in the column will be lost.
 - Added the required column `url` to the `Bookmark` table without a default value. This is not possible if the table is not empty.
 
 */
-- First clear all existing bookmarks
TRUNCATE TABLE "Bookmark" CASCADE;
-- Then make the schema changes
ALTER TABLE "Bookmark" DROP COLUMN "day",
  ADD COLUMN "url" TEXT NOT NULL;
-- Add the other changes from the original migration
ALTER TABLE "_BrotherhoodMembers"
ADD CONSTRAINT "_BrotherhoodMembers_AB_pkey" PRIMARY KEY ("A", "B");
DROP INDEX "_BrotherhoodMembers_AB_unique";
-- Create Versions table
CREATE TABLE "Versions" (
  "id" TEXT NOT NULL,
  "version" TEXT NOT NULL,
  "type" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  CONSTRAINT "Versions_pkey" PRIMARY KEY ("id")
);
-- Add foreign key
ALTER TABLE "Versions"
ADD CONSTRAINT "Versions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;