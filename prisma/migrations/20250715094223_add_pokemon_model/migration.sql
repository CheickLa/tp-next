-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type1" TEXT NOT NULL,
    "type2" TEXT,
    "hp" INTEGER NOT NULL,
    "attack" INTEGER NOT NULL,
    "defense" INTEGER NOT NULL,
    "speed" INTEGER NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pokemon_name_key" ON "Pokemon"("name");
