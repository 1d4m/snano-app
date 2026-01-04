ALTER TABLE "logs" DROP CONSTRAINT "logs_playlist_id_playlists_id_fk";
--> statement-breakpoint
ALTER TABLE "playlist_items" DROP CONSTRAINT "playlist_items_playlist_id_playlists_id_fk";
--> statement-breakpoint
ALTER TABLE "logs" ADD CONSTRAINT "logs_playlist_id_playlists_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "playlist_items" ADD CONSTRAINT "playlist_items_playlist_id_playlists_id_fk" FOREIGN KEY ("playlist_id") REFERENCES "public"."playlists"("id") ON DELETE cascade ON UPDATE no action;