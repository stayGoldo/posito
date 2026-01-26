ALTER TABLE "refresh_tokens" DROP CONSTRAINT "refresh_tokens_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD COLUMN "token_hash" text NOT NULL;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD COLUMN "user_agent" text;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD COLUMN "ip_address" text;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "token_hash_idx" ON "refresh_tokens" USING btree ("token_hash");--> statement-breakpoint
ALTER TABLE "refresh_tokens" DROP COLUMN "token";