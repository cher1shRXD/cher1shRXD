import { MouseEvent, useEffect, useState } from "react";

export const useLikeCount = (blockId: string, initialLikes: number) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(
      localStorage.getItem("likedPosts") || "{}"
    );
    setIsLiked(likedPosts[blockId] === true);
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

    const likedPosts = JSON.parse(
      localStorage.getItem("likedPosts") || "{}"
    );
    likedPosts[blockId] = newLikedState;
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

    try {
      const res = await fetch(`/api/blog/${blockId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked: newLikedState }),
      });

      if (!res.ok) {
        throw new Error("Failed to update like");
      }

      const data = await res.json();
      setLikes(data.likes);
    } catch (error) {
      console.error("Failed to update like:", error);

      setIsLiked(previousLikedState);
      setLikes(previousLikes);

      const likedPosts = JSON.parse(
        localStorage.getItem("likedPosts") || "{}"
      );
      likedPosts[blockId] = previousLikedState;
      localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
    } finally {
      setIsLoading(false);
    }
  };

  return { likes, isLiked, isLoading, handleLike };
};
