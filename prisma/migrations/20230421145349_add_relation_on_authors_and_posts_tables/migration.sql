/*
  Warnings:

  - Added the required column `authorId` to the `posts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "authorId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
