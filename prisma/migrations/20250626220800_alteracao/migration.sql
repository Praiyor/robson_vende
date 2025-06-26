/*
  Warnings:

  - Added the required column `status` to the `vendaLeilao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `vendaSimples` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vendaLeilao" ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "vendaSimples" ADD COLUMN     "status" TEXT NOT NULL;
