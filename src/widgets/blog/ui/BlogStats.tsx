"use client";

import { Eye, Heart } from "lucide-react";
import { useViewCount } from "@/widgets/article/hooks/useViewCount";
import { useLikeCount } from "@/widgets/article/hooks/useLlikeCount";

interface Props {
  blockId: string;
  initialViews: number;
  initialLikes: number;
}

const BlogStats = ({ blockId, initialViews, initialLikes }: Props) => {
  const views = useViewCount(blockId, initialViews);
  const { likes, isLiked, isLoading, handleLike } = useLikeCount(
    blockId,
    initialLikes
  );

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1 text-text/60">
        <Eye className="w-4 h-4" />
        <span className="text-xs sm:text-sm">{views.toLocaleString()}</span>
      </div>

      <button
        onClick={handleLike}
        disabled={isLoading}
        className={`flex items-center gap-1 transition-colors ${
          isLiked
            ? "text-red-500 hover:text-red-600"
            : "text-text/60 hover:text-red-500"
        } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        aria-label={isLiked ? "좋아요 취소" : "좋아요"}>
        <Heart
          className={`w-4 h-4 transition-all ${
            isLiked ? "fill-current" : ""
          }`}
        />
        <span className="text-xs sm:text-sm">{likes.toLocaleString()}</span>
      </button>
    </div>
  );
};

export default BlogStats;
