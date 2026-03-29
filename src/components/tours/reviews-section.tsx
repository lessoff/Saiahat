"use client";

import { useState } from "react";
import { StarRating } from "@/components/ui/star-rating";
import { ReviewCard } from "./review-card";
import { ReviewForm } from "./review-form";
import { MessageSquare } from "lucide-react";

interface Review {
  id: number;
  rating: number;
  comment: string | null;
  photos: string[];
  createdAt: Date;
  user: {
    name: string | null;
    avatarUrl: string | null;
  };
}

interface ReviewsSectionProps {
  tourId: number;
  reviews: Review[];
  isLoggedIn: boolean;
}

export function ReviewsSection({
  tourId,
  reviews: initialReviews,
  isLoggedIn,
}: ReviewsSectionProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  function handleNewReview(review: Review) {
    setReviews([review, ...reviews]);
    setShowForm(false);
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-sand-900">
            <MessageSquare className="h-5 w-5 text-terracotta-500" />
            Reviews
          </h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2">
              <StarRating value={Math.round(avgRating)} readonly size={16} />
              <span className="text-sm text-sand-500">
                {avgRating.toFixed(1)} ({reviews.length})
              </span>
            </div>
          )}
        </div>

        {isLoggedIn && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="text-sm font-medium text-terracotta-500 hover:text-terracotta-600"
          >
            Write a Review
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6">
          <ReviewForm
            tourId={tourId}
            onSuccess={handleNewReview}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      {reviews.length > 0 ? (
        <div>
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              userName={review.user.name}
              userAvatar={review.user.avatarUrl}
              rating={review.rating}
              comment={review.comment}
              photos={review.photos}
              createdAt={review.createdAt}
            />
          ))}
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-sand-400">
          No reviews yet. Be the first to share your experience!
        </p>
      )}
    </div>
  );
}
