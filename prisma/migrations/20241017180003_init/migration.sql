-- CreateTable
CREATE TABLE "games" (
    "word" VARCHAR(5),
    "target_date" DATE NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id" SERIAL NOT NULL,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);
