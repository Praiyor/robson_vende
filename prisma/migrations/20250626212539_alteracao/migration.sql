/*
  Warnings:

  - You are about to drop the column `cardId` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `deckId` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `vendaLeilao` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `vendaSimples` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[itemId]` on the table `card` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[itemId]` on the table `deck` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vendaSimplesId]` on the table `item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vendaLeilaoId]` on the table `item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `itemId` to the `card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `itemId` to the `deck` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_cardId_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_deckId_fkey";

-- DropForeignKey
ALTER TABLE "vendaLeilao" DROP CONSTRAINT "vendaLeilao_itemId_fkey";

-- DropForeignKey
ALTER TABLE "vendaSimples" DROP CONSTRAINT "vendaSimples_itemId_fkey";

-- DropIndex
DROP INDEX "item_cardId_key";

-- DropIndex
DROP INDEX "item_deckId_key";

-- DropIndex
DROP INDEX "vendaLeilao_itemId_key";

-- DropIndex
DROP INDEX "vendaSimples_itemId_key";

-- AlterTable
ALTER TABLE "card" ADD COLUMN     "itemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "deck" ADD COLUMN     "itemId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "item" DROP COLUMN "cardId",
DROP COLUMN "deckId",
ADD COLUMN     "vendaLeilaoId" INTEGER,
ADD COLUMN     "vendaSimplesId" INTEGER;

-- AlterTable
ALTER TABLE "vendaLeilao" DROP COLUMN "itemId";

-- AlterTable
ALTER TABLE "vendaSimples" DROP COLUMN "itemId";

-- CreateIndex
CREATE UNIQUE INDEX "card_itemId_key" ON "card"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "deck_itemId_key" ON "deck"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "item_vendaSimplesId_key" ON "item"("vendaSimplesId");

-- CreateIndex
CREATE UNIQUE INDEX "item_vendaLeilaoId_key" ON "item"("vendaLeilaoId");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_vendaSimplesId_fkey" FOREIGN KEY ("vendaSimplesId") REFERENCES "vendaSimples"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_vendaLeilaoId_fkey" FOREIGN KEY ("vendaLeilaoId") REFERENCES "vendaLeilao"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deck" ADD CONSTRAINT "deck_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card" ADD CONSTRAINT "card_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE CASCADE ON UPDATE CASCADE;
