import { useEffect, useState, useRef } from "react";
import { BlogApi } from "@/entities/blog/api";

export const useViewCount = (blockId: string | null | undefined) => {
  console.log("useViewCount blockId:", blockId);

  const [views, setViews] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const requestedRef = useRef<string | null>(null);

  useEffect(() => {
    const incrementView = async () => {
      if (!blockId) return;
      if (requestedRef.current === blockId) return;
      requestedRef.current = blockId;
      setIsLoading(true);
      try {
        const data = await BlogApi.getAndIncrementView(blockId);
        if (typeof data.views === "number") {
          setViews(data.views);
        }
      } catch (error) {
        console.error("Failed to increment view:", error);
      } finally {
        setIsLoading(false);
      }
    };
    incrementView();
  }, [blockId]);

  return { views, isLoading };
};
