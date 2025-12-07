CREATE TABLE "playlist_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"playlist_id" text NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text,
	"limit_at" text,
	"is_completed" text NOT NULL
);
