CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"age" integer NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) DEFAULT '12345678' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
