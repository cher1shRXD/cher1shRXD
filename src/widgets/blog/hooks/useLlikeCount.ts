import { BlogApi } from "@/entities/blog/api";
import { MouseEvent, useEffect, useState } from "react";

export const useLikeCount = (blockId: string) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      setIsLoading(true);
      try {
        const data = await BlogApi.getLikeStatus(blockId);
        if (typeof data.likes === "number") setLikes(data.likes);
        if (typeof data.liked === "boolean") setIsLiked(data.liked);
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    };
    fetchLikeStatus();
  }, [blockId]);

  const handleLike = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoading) return;
    setIsLoading(true);
    const newLikedState = !isLiked;
    const previousLikes = likes;
    const previousLikedState = isLiked;
    setIsLiked(newLikedState);
    setLikes(newLikedState ? likes + 1 : Math.max(0, likes - 1));
    try {
      const data = await BlogApi.like(
        blockId,
        newLikedState ? "like" : "unlike",
      );
      if (typeof data.likes === "number") setLikes(data.likes);
      if (typeof data.liked === "boolean") setIsLiked(data.liked);
    } catch {
      setIsLiked(previousLikedState);
      setLikes(previousLikes);
    } finally {
      setIsLoading(false);
    }
  };

  return { likes, isLiked, isLoading, handleLike };
};
