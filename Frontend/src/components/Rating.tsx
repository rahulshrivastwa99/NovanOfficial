import { Star, StarHalf } from "lucide-react";

interface RatingProps {
  value: number;
  text?: string;
  color?: string;
}

const Rating = ({ value, text, color = "#FFA41C" }: RatingProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((index) => (
          <span key={index}>
            {value >= index ? (
              <Star size={16} fill={color} color={color} />
            ) : value >= index - 0.5 ? (
              <StarHalf size={16} fill={color} color={color} />
            ) : (
              <Star size={16} color={color} />
            )}
          </span>
        ))}
      </div>
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
};

export default Rating;
