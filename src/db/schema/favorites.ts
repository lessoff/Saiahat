import { pgTable, serial, uuid, integer, timestamp, unique } from "drizzle-orm/pg-core";
import { users } from "./users";
import { tours } from "./tours";

export const favorites = pgTable(
  "favorites",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    tourId: integer("tour_id")
      .notNull()
      .references(() => tours.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (t) => [unique().on(t.userId, t.tourId)]
);
