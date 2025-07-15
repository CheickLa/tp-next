/*
  Warnings:

  - Added the required column `createdBy` to the `Pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pokemon" ADD COLUMN     "createdBy" INTEGER;

-- Update existing Pokemon to assign them to the first user (or create a default admin user)
-- First, ensure we have at least one admin user
INSERT INTO "User" ("firstName", "lastName", "email", "role") 
VALUES ('Admin', 'System', 'admin@pokemon.com', 'ADMIN')
ON CONFLICT ("email") DO NOTHING;

-- Assign all existing Pokemon to the first user
UPDATE "Pokemon" 
SET "createdBy" = (SELECT id FROM "User" ORDER BY id LIMIT 1)
WHERE "createdBy" IS NULL;

-- Now make the column NOT NULL
ALTER TABLE "Pokemon" ALTER COLUMN "createdBy" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Pokemon" ADD CONSTRAINT "Pokemon_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
