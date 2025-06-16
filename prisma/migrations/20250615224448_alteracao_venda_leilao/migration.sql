/*
  Warnings:

  - Added the required column `preco` to the `vendaLeilao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vendaLeilao" ADD COLUMN     "lances" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "preco" DOUBLE PRECISION NOT NULL;
