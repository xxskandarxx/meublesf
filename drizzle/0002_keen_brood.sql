ALTER TABLE "products" ALTER COLUMN "price" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "image_url" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "image_urls" text;