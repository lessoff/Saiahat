import { unstable_cache } from "next/cache";
import { db } from "@/db";
import { tours, reviews, users } from "@/db/schema";
import { and, asc, avg, count, desc, eq, gte, ilike, lte, ne, or } from "drizzle-orm";

export interface FilterParams {
  sort?: string;
  q?: string;
  difficulty?: string;
  duration?: string;
  minPrice?: string;
  maxPrice?: string;
}

function parseDurationDays(duration: string): number {
  const match = duration.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

const ratingSq = db
  .select({
    tourId: reviews.tourId,
    avgRating: avg(reviews.rating).as("avg_rating"),
    reviewCount: count(reviews.id).as("review_count"),
  })
  .from(reviews)
  .groupBy(reviews.tourId)
  .as("rating_sq");

export const getFeaturedTours = unstable_cache(
  async () => {
    const rows = await db
      .select({
        id: tours.id,
        title: tours.title,
        location: tours.location,
        price: tours.price,
        duration: tours.duration,
        difficulty: tours.difficulty,
        images: tours.images,
        maxGroupSize: tours.maxGroupSize,
        avgRating: ratingSq.avgRating,
        reviewCount: ratingSq.reviewCount,
      })
      .from(tours)
      .leftJoin(ratingSq, eq(tours.id, ratingSq.tourId))
      .orderBy(desc(tours.popularityScore))
      .limit(4);

    return rows.map((r) => ({
      ...r,
      avgRating: r.avgRating ? parseFloat(r.avgRating) : null,
      reviewCount: r.reviewCount ?? 0,
    }));
  },
  ["tours-featured"],
  { tags: ["tours", "tours-featured"], revalidate: 3600 }
);

export function getFilteredTours(params: FilterParams) {
  const { sort, q, difficulty, duration, minPrice, maxPrice } = params;
  return unstable_cache(
    async () => {
      const orderBy =
        sort === "price-asc"
          ? asc(tours.price)
          : sort === "price-desc"
            ? desc(tours.price)
            : desc(tours.popularityScore);

      const conditions = [];

      if (q) {
        conditions.push(
          or(ilike(tours.title, `%${q}%`), ilike(tours.location, `%${q}%`))
        );
      }

      if (difficulty && ["easy", "moderate", "hard"].includes(difficulty)) {
        conditions.push(
          eq(tours.difficulty, difficulty as "easy" | "moderate" | "hard")
        );
      }

      if (minPrice) {
        conditions.push(gte(tours.price, minPrice));
      }

      if (maxPrice) {
        conditions.push(lte(tours.price, maxPrice));
      }

      const query = db
        .select({
          id: tours.id,
          title: tours.title,
          location: tours.location,
          price: tours.price,
          duration: tours.duration,
          difficulty: tours.difficulty,
          images: tours.images,
          maxGroupSize: tours.maxGroupSize,
          avgRating: ratingSq.avgRating,
          reviewCount: ratingSq.reviewCount,
        })
        .from(tours)
        .leftJoin(ratingSq, eq(tours.id, ratingSq.tourId))
        .orderBy(orderBy);

      const rawRows = await (conditions.length > 0
        ? query.where(and(...conditions))
        : query);

      const rows = rawRows.map((r) => ({
        ...r,
        avgRating: r.avgRating ? parseFloat(r.avgRating) : null,
        reviewCount: r.reviewCount ?? 0,
      }));

      if (duration) {
        return rows.filter((tour) => {
          const days = parseDurationDays(tour.duration);
          if (duration === "short") return days >= 1 && days <= 3;
          if (duration === "medium") return days >= 4 && days <= 7;
          if (duration === "long") return days >= 8;
          return true;
        });
      }

      return rows;
    },
    [
      "tours-list",
      sort ?? "",
      q ?? "",
      difficulty ?? "",
      duration ?? "",
      minPrice ?? "",
      maxPrice ?? "",
    ],
    { tags: ["tours", "tours-list"], revalidate: 300 }
  )();
}

export function getSimilarTours(currentId: number, difficulty: string) {
  return unstable_cache(
    async () => {
      const rows = await db
        .select({
          id: tours.id,
          title: tours.title,
          location: tours.location,
          price: tours.price,
          duration: tours.duration,
          difficulty: tours.difficulty,
          images: tours.images,
          maxGroupSize: tours.maxGroupSize,
          avgRating: ratingSq.avgRating,
          reviewCount: ratingSq.reviewCount,
        })
        .from(tours)
        .leftJoin(ratingSq, eq(tours.id, ratingSq.tourId))
        .where(
          and(
            eq(tours.difficulty, difficulty as "easy" | "moderate" | "hard"),
            ne(tours.id, currentId)
          )
        )
        .orderBy(desc(tours.popularityScore))
        .limit(3);

      return rows.map((r) => ({
        ...r,
        avgRating: r.avgRating ? parseFloat(r.avgRating) : null,
        reviewCount: r.reviewCount ?? 0,
      }));
    },
    [`similar-tours-${currentId}-${difficulty}`],
    { tags: ["tours"], revalidate: 3600 }
  )();
}

export function getTourById(id: number) {
  return unstable_cache(
    async () => {
      const [tour] = await db
        .select()
        .from(tours)
        .where(eq(tours.id, id))
        .limit(1);

      if (!tour) return null;

      const tourReviews = await db
        .select({
          id: reviews.id,
          rating: reviews.rating,
          comment: reviews.comment,
          photos: reviews.photos,
          createdAt: reviews.createdAt,
          user: {
            name: users.name,
            avatarUrl: users.avatarUrl,
          },
        })
        .from(reviews)
        .innerJoin(users, eq(reviews.userId, users.id))
        .where(eq(reviews.tourId, id))
        .orderBy(reviews.createdAt);

      return { tour, reviews: tourReviews };
    },
    [`tour-${id}`],
    { tags: ["tours", `tour-${id}`, `tour-reviews-${id}`], revalidate: 600 }
  )();
}
