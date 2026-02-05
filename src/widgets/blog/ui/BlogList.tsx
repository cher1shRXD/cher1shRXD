import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "@/entities/blog/types";
import BlogCard from "./BlogCard";
import Reveal from "@/shared/ui/Reveal";

interface Props {
  posts: ResultResponse<BlogPost>[];
}

const BlogList = ({ posts }: Props) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-text/60 text-lg">아직 작성된 블로그 포스트가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
      {posts.map((post, index) => (
        <Reveal key={post.id} delay={index * 0.05} triggerOnce>
          <BlogCard post={post} />
        </Reveal>
      ))}
    </div>
  );
};

export default BlogList;
