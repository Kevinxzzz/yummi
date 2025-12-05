/*
  Warnings:

  - The `ingredients` column on the `Ingredient` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `steps` column on the `PreparationMethod` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `iigredientsId` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `grade` on the `Review` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userName]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `recipeId` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PreparationMethod" DROP CONSTRAINT "PreparationMethod_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_iigredientsId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_userId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "recipeId" INTEGER NOT NULL,
DROP COLUMN "ingredients",
ADD COLUMN     "ingredients" TEXT[];

-- AlterTable
ALTER TABLE "PreparationMethod" DROP COLUMN "steps",
ADD COLUMN     "steps" TEXT[];

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "iigredientsId",
ADD COLUMN     "difficulty" TEXT,
ALTER COLUMN "imageUrl" DROP NOT NULL,
ALTER COLUMN "prepTime" DROP NOT NULL,
ALTER COLUMN "servings" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "grade",
ADD COLUMN     "rating" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_userName_key" ON "User"("userName");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreparationMethod" ADD CONSTRAINT "PreparationMethod_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
