import { useEffect, useState } from "react";

export const useViewCount = (blockId: string, initialViews: number) => {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    const incrementView = async () => {
      try {
        const res = await fetch(`/api/blog/${blockId}/view`, {
          method: "POST",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.views !== undefined) {
            setViews(data.views);
          }
        }
      } catch (error) {
        console.error("Failed to increment view:", error);
      }
    };

    incrementView();
  }, [blockId]);

  return views;
};
