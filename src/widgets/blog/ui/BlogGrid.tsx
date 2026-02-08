"use client";

import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "@/entities/blog/types";
import BlogCard from "./BlogCard";
import BlogTagFilter from "./BlogTagFilter";
import Reveal from "@/shared/ui/Reveal";
import { Search } from "lucide-react";
import { useFilter } from "../hooks/useFilter";
import Masonry from "react-masonry-css";

interface Props {
  posts: ResultResponse<BlogPost>[];
}

const BlogGrid = ({ posts }: Props) => {
  const {
    tags,
    tagCounts,
    selectedTag,
    setSelectedTag,
    searchQuery,
    filteredPosts,
    setSearchQuery,
  } = useFilter(posts);

  const breakpointColumnsObj = {
    default: 4,
    1280: 3,
    1024: 2,
    768: 2,
    640: 1,
  };

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
      <div className="w-full flex flex-col gap-4">
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
        <BlogTagFilter
          tags={tags}
          tagCounts={tagCounts}
          totalCount={posts.length}
          onTagSelect={setSelectedTag}
          selectedTag={selectedTag}
        />
      </div>
      <Reveal threshold={0} delay={0.4} triggerOnce>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex -ml-4 sm:-ml-5 md:-ml-6 lg:-ml-7 xl:-ml-8 w-auto"
          columnClassName="pl-4 sm:pl-5 md:pl-6 lg:pl-7 xl:pl-8 bg-clip-padding">
          {filteredPosts.map((post) => (
            <div key={post.id} className="mb-4 sm:mb-5 md:mb-6 lg:mb-7 xl:mb-8">
              <BlogCard post={post} />
            </div>
          ))}
        </Masonry>
      </Reveal>
    </div>
  );
};

export default BlogGrid;
