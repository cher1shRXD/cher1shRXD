import { useEffect, useState, useRef } from "react";
import { BlogApi } from "@/entities/blog/api";

export const useViewCount = (blockId: string | null | undefined) => {
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
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    };
    incrementView();
  }, [blockId]);

  return { views, isLoading };
};
