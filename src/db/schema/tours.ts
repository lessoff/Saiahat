import { pgTable, serial, text, numeric, integer, timestamp } from "drizzle-orm/pg-core";

export const tours = pgTable("tours", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  location: text("location").notNull(),
  duration: text("duration").notNull(),
  difficulty: text("difficulty", { enum: ["easy", "moderate", "hard"] })
    .notNull()
    .default("moderate"),
  maxGroupSize: integer("max_group_size"),
  images: text("images")
    .array()
    .notNull()
    .default([]),
  popularityScore: integer("popularity_score").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
