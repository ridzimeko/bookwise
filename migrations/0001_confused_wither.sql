ALTER TABLE "users" ADD COLUMN "borrow_status" "borrow_status" DEFAULT 'BORROWED';--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "borrowStatus";