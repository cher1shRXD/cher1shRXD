import { BlogPost } from "@/entities/blog/types";
import { formatDate } from "@/shared/utils/format-date";
import Image from "next/image";
import { Link } from "@cher1shrxd/loading";
import A from "next/link";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Reveal from "@/shared/ui/Reveal";
import Github from "@/shared/icons/Github";

interface Props {
  post: BlogPost;
}

const BlogHeader = ({ post }: Props) => {
  const image = post.thumbnail?.files[0]?.file?.url ||
    post.thumbnail?.files[0]?.external?.url ||
    null;

  return (
    <header className="max-w-4xl mx-auto px-4 sm:px-6 pt-8">
      <Reveal triggerOnce>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-text/60 hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">블로그 목록</span>
        </Link>
      </Reveal>

      <Reveal delay={0.1} triggerOnce>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text mb-4">
          {post.name.title[0]?.plain_text}
        </h1>
      </Reveal>

      <Reveal delay={0.2} triggerOnce>
        <div className="flex flex-wrap items-center gap-4 text-sm text-text/60 mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time>{formatDate(post.created_at.created_time)}</time>
          </div>
        </div>
      </Reveal>

      {image && (
        <Reveal delay={0.3} triggerOnce>
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-surface mb-8">
            <Image
              src={image}
              alt={post.name.title[0]?.plain_text || "Blog post cover"}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Reveal>
      )}

      {post.tags.multi_select.length > 0 && (
        <Reveal delay={0.4} triggerOnce>
          <div className="flex flex-wrap items-center gap-2 mb-10">
            <Tag className="w-4 h-4 text-text/40" />
            {post.tags.multi_select.map((tag) => (
              <span
                key={tag.id}
                className="px-3 py-1.5 text-sm font-medium text-primary bg-primary/10 border border-primary/20 rounded-full whitespace-nowrap"
              >
                {tag.name.replace(/\s+/g, " ").trim()}
              </span>
            ))}
          </div>
        </Reveal>
      )}

      {post.github_repo?.url && (
        <Reveal delay={0.5} triggerOnce>
          <div className="flex flex-wrap gap-3 mb-10">
            <A
              href={post.github_repo.url}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border border-text rounded-full hover:bg-text hover:text-background transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </A>
          </div>
        </Reveal>
      )}
    </header>
  );
};

export default BlogHeader;
