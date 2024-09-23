/*
  Warnings:

  - The primary key for the `key_token` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `key_token` table. All the data in the column will be lost.
  - The required column `client_id` was added to the `key_token` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `refresh_token` to the `key_token` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `key_token` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `permission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "key_token" DROP CONSTRAINT "key_token_pkey",
DROP COLUMN "id",
ADD COLUMN     "client_id" TEXT NOT NULL,
ADD COLUMN     "refresh_token" TEXT NOT NULL,
ADD COLUMN     "user_id" INTEGER NOT NULL,
ADD CONSTRAINT "key_token_pkey" PRIMARY KEY ("client_id");

-- AlterTable
ALTER TABLE "permission" ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "_RoleToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_RoleToUser_AB_unique" ON "_RoleToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_RoleToUser_B_index" ON "_RoleToUser"("B");

-- AddForeignKey
ALTER TABLE "key_token" ADD CONSTRAINT "key_token_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RoleToUser" ADD CONSTRAINT "_RoleToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
