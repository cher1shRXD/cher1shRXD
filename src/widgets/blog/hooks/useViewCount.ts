import { useEffect, useState, useRef } from "react";
import { BlogApi } from "@/entities/blog/api";

export const useViewCount = (blockId: string | null | undefined) => {
  const [views, setViews] = useState(0);
  const requestedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!blockId) return;
    if (requestedRef.current === blockId) return;
    requestedRef.current = blockId;

    const incrementView = async () => {
      try {
        const data = await BlogApi.getAndIncrementView(blockId);
        if (typeof data.views === "number") {
          setViews(data.views);
        }
      } catch (error) {
        console.error("Failed to increment view:", error);
      }
    };
    incrementView();
  }, [blockId]);
  return views;
};
