-- CreateTable
CREATE TABLE "vendaSimples" (
    "id" SERIAL NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "itemId" INTEGER,

    CONSTRAINT "vendaSimples_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vendaLeilao" (
    "id" SERIAL NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3) NOT NULL,
    "itemId" INTEGER,

    CONSTRAINT "vendaLeilao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "deckId" INTEGER,
    "cardId" INTEGER,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deck" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deckSize" INTEGER NOT NULL,

    CONSTRAINT "deck_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vendaSimples_itemId_key" ON "vendaSimples"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "vendaLeilao_itemId_key" ON "vendaLeilao"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "item_deckId_key" ON "item"("deckId");

-- CreateIndex
CREATE UNIQUE INDEX "item_cardId_key" ON "item"("cardId");

-- AddForeignKey
ALTER TABLE "vendaSimples" ADD CONSTRAINT "vendaSimples_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendaLeilao" ADD CONSTRAINT "vendaLeilao_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_deckId_fkey" FOREIGN KEY ("deckId") REFERENCES "deck"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE SET NULL ON UPDATE CASCADE;
