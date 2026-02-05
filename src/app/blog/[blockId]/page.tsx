import { BlogApi } from "@/entities/blog/api";
import { redirect, notFound } from "next/navigation";
import BlogHeader from "@/widgets/blog/ui/BlogHeader";
import ArticleContent from "@/widgets/article/ui/ArticleContent";
import TableOfContents from "@/widgets/article/ui/TableOfContents";
import BlogNavigation from "@/widgets/blog/ui/BlogNavigation";
import Reveal from "@/shared/ui/Reveal";
import AdSlot from "@/shared/ui/AdSlot";

export const revalidate = 86400;

export const generateStaticParams = async () => {
  const posts = await BlogApi.getPosts();
  return posts.map((post) => ({
    blockId: post.id,
  }));
};

const getBlogData = async (pageId: string) => {
  try {
    return await BlogApi.getPostById(pageId);
  } catch {
    return null;
  }
};

const getAdjacentPosts = async (currentPageId: string) => {
  try {
    const posts = await BlogApi.getPosts();
    const currentIndex = posts.findIndex(
      (p) => p.id === currentPageId,
    );

    if (currentIndex === -1) return { prevPost: null, nextPost: null };

    const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
    const nextPost =
      currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

    return {
      prevPost: prevPost
        ? {
            pageId: prevPost.id,
            title: prevPost.properties.name.title[0]?.plain_text || "Untitled",
          }
        : null,
      nextPost: nextPost
        ? {
            pageId: nextPost.id,
            title: nextPost.properties.name.title[0]?.plain_text || "Untitled",
          }
        : null,
    };
  } catch {
    return { prevPost: null, nextPost: null };
  }
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ blockId?: string }>;
}) {
  const { blockId } = await params;
  if (!blockId) {
    redirect("/blog");
  }

  const data = await getBlogData(blockId);
  if (!data) {
    notFound();
  }

  const { properties, blocks } = data;
  const { prevPost, nextPost } = await getAdjacentPosts(blockId);

  return (
    <main className="min-h-screen pb-20">
      <BlogHeader post={properties} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AdSlot position="top" />
      </div>

      <div className="w-full px-4 sm:px-6">
        <div className="flex gap-8">
          <aside className="flex-1 hidden lg:block shrink-0 justify-center">
            <div className="w-full px-4 sticky top-56">
              <AdSlot position="sidebar" />
            </div>
          </aside>

          <div className="w-full max-w-4xl">
            <Reveal threshold={0} triggerOnce>
              <article>
                <ArticleContent blocks={blocks} />
              </article>
            </Reveal>
          </div>
          <div className="flex-1" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <AdSlot position="bottom" />
      </div>

      <BlogNavigation
        prevPost={prevPost || undefined}
        nextPost={nextPost || undefined}
      />

      <TableOfContents blocks={blocks} />
    </main>
  );
}
