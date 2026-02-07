"use client";

import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "@/entities/blog/types";
import { formatDate } from "@/shared/utils/format-date";
import Image from "next/image";
import { useRouter } from "@cher1shrxd/loading";
import { Calendar } from "lucide-react";
import BlogStats from "./BlogStats";

interface Props {
  post: ResultResponse<BlogPost>;
}

const BlogCard = ({ post }: Props) => {
  const router = useRouter();
  const { properties } = post;

  const handleClick = () => {
    router.push(`/blog/${post.id}`);
  };

  const fileUrl = properties.thumbnail?.files[0]?.file?.url;
  const externalUrl = properties.thumbnail?.files[0]?.external?.url;

  const image = fileUrl || externalUrl || null;

  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer bg-surface rounded-lg overflow-hidden hover:-translate-y-2 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-lg">
      {properties.thumbnail && image && (
        <div className="relative w-full aspect-video overflow-hidden bg-surface">
          <Image
            src={image}
            alt={properties.name.title[0]?.plain_text || "Blog post"}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      <div className="flex-1 p-5 flex flex-col gap-3">
        <h2 className="text-lg font-bold text-text transition-colors line-clamp-2 leading-snug">
          {properties.name.title[0]?.plain_text}
        </h2>

        {properties.tags.multi_select.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {properties.tags.multi_select.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-2.5 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-border flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs text-text/60">
            <Calendar className="w-3.5 h-3.5" />
            <time>{formatDate(properties.created_at.created_time)}</time>
          </div>
          <BlogStats
            blockId={post.id}
            initialLikes={properties.likes.number || 0}
            initialViews={properties.views.number || 0}
          />
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
