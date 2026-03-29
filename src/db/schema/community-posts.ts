import { pgTable, serial, uuid, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";

export const communityPosts = pgTable("community_posts", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  mediaUrls: text("media_urls").array().notNull().default([]),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
