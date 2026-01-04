ALTER TABLE "logs" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "logs" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "playlist_items" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "playlist_items" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "playlists" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "playlists" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "logs" ADD CONSTRAINT "logs_playlist_id_playlists_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_items" ADD CONSTRAINT "playlist_items_playlist_id_playlists_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE no action ON UPDATE no action;