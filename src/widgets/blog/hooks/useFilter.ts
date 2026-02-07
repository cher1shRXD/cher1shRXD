import { BlogPost } from "@/entities/blog/types";
import { ResultResponse } from "@/shared/types/result-response";
import { useEffect, useMemo, useState } from "react";

export const useFilter = (posts: ResultResponse<BlogPost>[]) => {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const tags = useMemo(() => {
    const tagSet = new Set<string>();
    posts.forEach((post) => {
      post.properties.tags.multi_select.forEach((tag) => {
        tagSet.add(tag.name);
      });
    });
    return Array.from(tagSet).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    let result = posts;

    if (selectedTag) {
      result = result.filter((post) =>
        post.properties.tags.multi_select.some(
          (tag) => tag.name === selectedTag,
        ),
      );
    }

    if (debouncedSearchQuery) {
      const query = debouncedSearchQuery.toLowerCase();
      result = result.filter((post) =>
        post.properties.name.title.some((t) =>
          t.plain_text.toLowerCase().includes(query),
        ),
      );
    }

    return result;
  }, [posts, selectedTag, debouncedSearchQuery]);

  return {
    tags,
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    filteredPosts,
  }
};
