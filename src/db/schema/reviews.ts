import { pgTable, serial, uuid, integer, text, timestamp, check } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./users";
import { tours } from "./tours";

export const reviews = pgTable(
  "reviews",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tourId: integer("tour_id")
      .notNull()
      .references(() => tours.id, { onDelete: "cascade" }),
    rating: integer("rating").notNull(),
    comment: text("comment"),
    photos: text("photos")
      .array()
      .notNull()
      .default([]),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [check("rating_check", sql`${t.rating} >= 1 AND ${t.rating} <= 5`)]
);
