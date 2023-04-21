-- CreateEnum
CREATE TYPE "Category" AS ENUM ('social', 'fashion', 'technology', 'games', 'nature');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "description" TEXT,
    "category" "Category" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "published_at" TIMESTAMP(3),

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "posts_tag_key" ON "posts"("tag");
