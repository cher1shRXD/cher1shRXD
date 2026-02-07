"use client";

import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "@/entities/blog/types";
import BlogCard from "./BlogCard";
import BlogTagFilter from "./BlogTagFilter";
import Reveal from "@/shared/ui/Reveal";
import { Search } from "lucide-react";
import { useFilter } from "../hooks/useFilter";

interface Props {
  posts: ResultResponse<BlogPost>[];
}

const BlogList = ({ posts }: Props) => {
  const {
    tags,
    selectedTag,
    setSelectedTag,
    searchQuery,
    setSearchQuery,
    filteredPosts,
  } = useFilter(posts);

  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-text/60 text-lg">
          아직 작성된 블로그 포스트가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <BlogTagFilter
          tags={tags}
          selectedTag={selectedTag}
          onTagSelect={setSelectedTag}
        />

        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="제목으로 검색..."
            className="w-full pl-10 pr-4 py-2 text-sm bg-background border border-border rounded-lg text-text placeholder:text-text/40 focus:outline-none focus:border-primary transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text/40 hover:text-text text-sm">
              ✕
            </button>
          )}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-text/60 text-lg">검색 결과가 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredPosts.map((post, index) => (
            <Reveal
              key={post.id}
              delay={index * 0.05}
              threshold={0}
              triggerOnce>
              <BlogCard post={post} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
