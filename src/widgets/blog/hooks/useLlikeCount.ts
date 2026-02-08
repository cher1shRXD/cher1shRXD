import { MouseEvent, useEffect, useState } from "react";

export const useLikeCount = (blockId: string) => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLikeStatus = async () => {
      try {
        const res = await fetch(`/api/blog/${blockId}/like`, {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data.likes === "number") setLikes(data.likes);
          if (typeof data.liked === "boolean") setIsLiked(data.liked);
        }
      } catch {
        // ignore
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
      const res = await fetch(`/api/blog/${blockId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: newLikedState ? "like" : "unlike" }),
      });
      if (!res.ok) throw new Error("Failed to update like");
      const data = await res.json();
      if (typeof data.likes === "number") setLikes(data.likes);
      if (typeof data.liked === "boolean") setIsLiked(data.liked);
    } catch {
      setIsLiked(previousLikedState);
      setLikes(previousLikes);
    }
    setIsLoading(false);
  };

  return { likes, isLiked, isLoading, handleLike };
};
