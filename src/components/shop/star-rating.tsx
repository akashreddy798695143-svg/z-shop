'use client';

import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, maxRating = 5, size = 16, className = '' }: StarRatingProps) {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2;

  for (let i = 1; i <= maxRating; i++) {
    if (i <= Math.floor(roundedRating)) {
      stars.push(
        <Star
          key={i}
          size={size}
          className={`fill-amber-400 text-amber-400 ${className}`}
        />
      );
    } else if (i === Math.ceil(roundedRating) && roundedRating % 1 !== 0) {
      stars.push(
        <StarHalf
          key={i}
          size={size}
          className={`fill-amber-400 text-amber-400 ${className}`}
        />
      );
    } else {
      stars.push(
        <Star
          key={i}
          size={size}
          className={`text-gray-300 ${className}`}
        />
      );
    }
  }

  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of ${maxRating} stars`}>
      {stars}
    </div>
  );
}
