import { BlogApi } from "@/entities/blog/api";
import Reveal from "@/shared/ui/Reveal";
import BlogList from "@/widgets/blog/ui/BlogList";
import BlogSubscribe from "@/widgets/blog/ui/BlogSubscribe";
import { Metadata } from "next";

export const revalidate = 31536000;

export const metadata: Metadata = {
  title: "Blog | cher1shRXD",
  description: "개발 과정에서의 인사이트와 학습 내용을 공유합니다",
  openGraph: {
    title: "Blog | cher1shRXD",
    description: "개발 과정에서의 인사이트와 학습 내용을 공유합니다",
    type: "website",
    url: "https://cher1shrxd.me/blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | cher1shRXD",
    description: "개발 과정에서의 인사이트와 학습 내용을 공유합니다",
  },
};

export default async function BlogsPage() {
  const posts = await BlogApi.getPosts();

  return (
    <section className="w-full max-w-440 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-4 pt-8 pb-4 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16">
      <Reveal triggerOnce>
        <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold font-playpen tracking-widest mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
          BLOG.
        </h1>
      </Reveal>

      <Reveal delay={0.3} triggerOnce>
        <p className="text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl text-text/70 mb-8 sm:mb-10 md:mb-12 lg:mb-14 xl:mb-16">
          개발 과정에서의 인사이트와 학습 내용을 공유합니다
        </p>
      </Reveal>

      <BlogList posts={posts} />

      <div className="max-w-2xl mt-32 mx-auto">
        <Reveal delay={0.4} triggerOnce>
          <BlogSubscribe />
        </Reveal>
      </div>
    </section>
  );
}
