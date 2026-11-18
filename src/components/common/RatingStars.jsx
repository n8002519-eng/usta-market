import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5.0, count, showNumber = true, size = 'sm', className = '' }) => {
  const stars = [1, 2, 3, 4, 5];
  const starSize = size === 'lg' ? 'w-5 h-5' : size === 'md' ? 'w-4 h-4' : 'w-3.5 h-3.5';

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="flex items-center text-amber-400">
        {stars.map((star) => {
          const isFilled = rating >= star;
          const isHalf = !isFilled && rating >= star - 0.5;

          return (
            <Star
              key={star}
              className={`${starSize} ${
                isFilled
                  ? 'fill-amber-400 text-amber-400'
                  : isHalf
                  ? 'fill-amber-400/50 text-amber-400'
                  : 'text-slate-600'
              }`}
            />
          );
        })}
      </div>
      {showNumber && (
        <span className="font-bold text-slate-100 text-xs tracking-tight">
          {Number(rating).toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-slate-400 text-xs">
          ({count})
        </span>
      )}
    </div>
  );
};
