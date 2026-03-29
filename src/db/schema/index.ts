import { relations } from "drizzle-orm";
import { users } from "./users";
import { tours } from "./tours";
import { bookings } from "./bookings";
import { favorites } from "./favorites";
import { reviews } from "./reviews";
import { communityPosts } from "./community-posts";

// Re-export all tables
export { users } from "./users";
export { tours } from "./tours";
export { bookings } from "./bookings";
export { favorites } from "./favorites";
export { reviews } from "./reviews";
export { communityPosts } from "./community-posts";

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  favorites: many(favorites),
  reviews: many(reviews),
  communityPosts: many(communityPosts),
}));

export const toursRelations = relations(tours, ({ many }) => ({
  bookings: many(bookings),
  favorites: many(favorites),
  reviews: many(reviews),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  tour: one(tours, {
    fields: [bookings.tourId],
    references: [tours.id],
  }),
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, {
    fields: [favorites.userId],
    references: [users.id],
  }),
  tour: one(tours, {
    fields: [favorites.tourId],
    references: [tours.id],
  }),
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  user: one(users, {
    fields: [reviews.userId],
    references: [users.id],
  }),
  tour: one(tours, {
    fields: [reviews.tourId],
    references: [tours.id],
  }),
}));

export const communityPostsRelations = relations(communityPosts, ({ one }) => ({
  user: one(users, {
    fields: [communityPosts.userId],
    references: [users.id],
  }),
}));
