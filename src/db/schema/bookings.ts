import { pgTable, serial, uuid, integer, text, date, timestamp } from "drizzle-orm/pg-core";
import { users } from "./users";
import { tours } from "./tours";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tourId: integer("tour_id")
    .notNull()
    .references(() => tours.id, { onDelete: "cascade" }),
  status: text("status", { enum: ["pending", "confirmed", "rejected"] })
    .notNull()
    .default("pending"),
  travelDate: date("travel_date").notNull(),
  numTravelers: integer("num_travelers").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});
