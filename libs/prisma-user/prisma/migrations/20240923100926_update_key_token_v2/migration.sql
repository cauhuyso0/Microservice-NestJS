/*
  Warnings:

  - Added the required column `public_key_refresh` to the `key_token` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "key_token" ADD COLUMN     "public_key_refresh" TEXT NOT NULL;
