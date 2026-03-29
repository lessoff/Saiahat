import { HTMLAttributes, forwardRef } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`rounded-2xl border border-sand-200 bg-white shadow-lg overflow-hidden ${className}`}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
