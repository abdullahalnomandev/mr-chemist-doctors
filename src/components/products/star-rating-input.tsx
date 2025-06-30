import clsx from "clsx";
import { Star } from "lucide-react";
import { useState } from "react";

type StarRatingInputProps = {
  value: number;
  onChange: (value: number) => void;
};

export function StarRatingInput({ value, onChange }: StarRatingInputProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChange(star)}
          className={clsx(
            "h-6 w-6 cursor-pointer transition-colors",
            (hovered ?? value) >= star ? "text-yellow-400" : "text-gray-300",
          )}
          fill={(hovered ?? value) >= star ? "#facc15" : "none"}
        />
      ))}
    </div>
  );
}
