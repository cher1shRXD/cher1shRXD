import { Link } from "@cher1shrxd/loading";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Props {
  prevPost?: {
    pageId: string;
    title: string;
  };
  nextPost?: {
    pageId: string;
    title: string;
  };
}

const BlogNavigation = ({ prevPost, nextPost }: Props) => {
  return (
    <nav className="max-w-4xl mx-auto px-4 sm:px-6 mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.pageId}`}
          className="group relative bg-surface/50 border border-border rounded-lg p-6 flex flex-col gap-2 hover:border-primary hover:bg-surface transition-all duration-300 overflow-hidden">
          <div className="flex items-center gap-2 text-sm text-text/60">
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>이전 포스트</span>
          </div>
          <h3 className="text-lg font-bold text-text line-clamp-1">
            {prevPost.title}
          </h3>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </Link>
      ) : (
        <div />
      )}

      {nextPost ? (
        <Link
          href={`/blog/${nextPost.pageId}`}
          className="group relative bg-surface/50 border border-border rounded-lg p-6 flex flex-col gap-2 hover:border-primary hover:bg-surface transition-all duration-300 overflow-hidden sm:items-end sm:text-right">
          <div className="flex items-center gap-2 text-sm text-text/60">
            <span>다음 포스트</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </div>
          <h3 className="text-lg font-bold text-text line-clamp-1">
            {nextPost.title}
          </h3>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
};

export default BlogNavigation;
