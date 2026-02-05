import { BlogApi } from "@/entities/blog/api";
import { notFound } from "next/navigation";
import Modal from "@/shared/ui/Modal";
import BlogHeader from "@/widgets/blog/ui/BlogHeader";
import ArticleContent from "@/widgets/article/ui/ArticleContent";

export const revalidate = 86400;

export const generateStaticParams = async () => {
  const posts = await BlogApi.getPosts();
  return posts.map((post) => ({
    blockId: post.id,
  }));
};

export default async function BlogModal({
  params,
}: {
  params: Promise<{ blockId: string }>;
}) {
  const { blockId } = await params;

  const data = await BlogApi.getPostById(blockId).catch(() => null);

  if (!data) {
    notFound();
  }

  const { properties, blocks } = data;

  return (
    <Modal>
      <BlogHeader post={properties} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <article>
          <ArticleContent blocks={blocks} />
        </article>
      </div>
    </Modal>
  );
}
