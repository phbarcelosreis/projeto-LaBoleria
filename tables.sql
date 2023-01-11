CREATE TABLE "cakes" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" VARCHAR(80) NOT NULL UNIQUE,
	"price" NUMERIC(10,2) NOT NULL,
	"image" TEXT NOT NULL,
	"description" TEXT
);

CREATE TABLE "clients" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"name" VARCHAR(80) NOT NULL UNIQUE,
	"address" VARCHAR(255) NOT NULL,
	"phone" VARCHAR(11) NOT NULL UNIQUE
);

CREATE TABLE "orders" (
	"id" SERIAL PRIMARY KEY NOT NULL,
	"clientId" INTEGER NOT NULL REFERENCES "clients"("id"),
	"cakeId" INTEGER NOT NULL REFERENCES "cakes"("id"),
	"quantity" INTEGER NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW(),
	"totalPrice" NUMERIC(10,2) NOT NULL
);

ALTER TABLE cakes
ALTER COLUMN price TYPE DOUBLE PRECISION USING price::double precision;