/*
  Warnings:

  - Made the column `itemId` on table `vendaLeilao` required. This step will fail if there are existing NULL values in that column.
  - Made the column `itemId` on table `vendaSimples` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "vendaLeilao" DROP CONSTRAINT "vendaLeilao_itemId_fkey";

-- DropForeignKey
ALTER TABLE "vendaSimples" DROP CONSTRAINT "vendaSimples_itemId_fkey";

-- AlterTable
ALTER TABLE "vendaLeilao" ALTER COLUMN "itemId" SET NOT NULL;

-- AlterTable
ALTER TABLE "vendaSimples" ALTER COLUMN "itemId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "vendaSimples" ADD CONSTRAINT "vendaSimples_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendaLeilao" ADD CONSTRAINT "vendaLeilao_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
