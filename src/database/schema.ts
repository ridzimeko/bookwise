import { timestamp } from "drizzle-orm/pg-core";
import { date } from "drizzle-orm/pg-core";
import {
  integer,
  pgTable,
  pgEnum,
  varchar,
  uuid,
  text,
} from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum("status", [
  "PENDING",
  "APPROVED",
  "REJECTED",
]);
export const ROLE_ENUM = pgEnum("role", ["USER", "ADMIN"]);
export const BORROW_STATUS_ENUM = pgEnum("borrow_status", [
  "BORROWED",
  "RETURNED",
]);

export const usersTable = pgTable("users", {
  id: uuid("id").notNull().defaultRandom().primaryKey().unique(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  universityId: integer("university_id").notNull().unique(),
  password: text("password").notNull(),
  universityCard: text("university_card"),
  status: STATUS_ENUM("status").default("PENDING"),
  role: ROLE_ENUM("role").default("USER"),
  borrowStatus: BORROW_STATUS_ENUM("borrow_status").default("BORROWED"),
  lastActivityDate: date("last_activity_date").defaultNow(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow()
});
