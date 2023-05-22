CREATE TABLE "weekend-to-do-app" (
	"id" SERIAL PRIMARY KEY,
	"todo" VARCHAR (100) NOT NULL,
	"complete" BOOLEAN DEFAULT FALSE
	
);

INSERT INTO "weekend-to-do-app" ("todo")
VALUES( 'Read lecture notes every night');

INSERT INTO "weekend-to-do-app"("todo")
VALUES($1);
    `
'SELECT * FROM "weekend-to-do-app";'; 
'SELECT * FROM "weekend-to-do-app" WHERE "id"= $1;';

`DELETE FROM "weekend-to-do-app" WHERE "id" = $1;`;

`UPDATE "weekend-to-do-app" SET "complete" = 'TRUE' WHERE "id" = $1;`;