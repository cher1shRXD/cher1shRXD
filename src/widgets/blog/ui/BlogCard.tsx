"use client";

import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "@/entities/blog/types";
import { formatDate } from "@/shared/utils/format-date";
import Image from "next/image";
import { useRouter } from "@cher1shrxd/loading";
import { Calendar } from "lucide-react";

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
      className="group hard-panel cursor-pointer bg-surface overflow-hidden hover:-translate-y-2 hover:rotate-1 transition-all duration-300 flex flex-col h-full">
      {properties.thumbnail && image && (
        <div className="relative w-full aspect-video overflow-hidden border-b-2 border-border bg-surface">
          <Image
            src={image}
            alt={properties.name.title[0]?.plain_text || "Blog post"}
            fill
            unoptimized
            className="object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
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
                className="border border-border px-2.5 py-1 text-xs font-black bg-lime text-ink">
                {tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t-2 border-border flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-1.5 text-xs text-text/60">
            <Calendar className="w-3.5 h-3.5" />
            <time>{formatDate(properties.created_at.created_time)}</time>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
