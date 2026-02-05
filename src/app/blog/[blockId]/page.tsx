import { BlogApi } from "@/entities/blog/api";
import { redirect, notFound } from "next/navigation";
import BlogHeader from "@/widgets/blog/ui/BlogHeader";
import ArticleContent from "@/widgets/article/ui/ArticleContent";
import TableOfContents from "@/widgets/article/ui/TableOfContents";
import BlogNavigation from "@/widgets/blog/ui/BlogNavigation";
import Reveal from "@/shared/ui/Reveal";
import { Metadata } from "next";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ blockId?: string }>;
}): Promise<Metadata> {
  const { blockId } = await params;

  if (!blockId) {
    return {
      title: "Blog | cher1shRXD",
    };
  }

  const data = await getBlogData(blockId);

  if (!data) {
    return {
      title: "Blog Not Found | cher1shRXD",
    };
  }

  const title = data.properties.name.title[0]?.plain_text || "Untitled";
  const description = title;
  const thumbnail =
    data.properties.thumbnail?.files[0]?.file?.url ||
    data.properties.thumbnail?.files[0]?.external?.url;

  return {
    title: `${title} | cher1shRXD`,
    description,
    openGraph: {
      title: `${title} | cher1shRXD`,
      description,
      type: "article",
      url: `https://cher1shrxd.me/blog/${blockId}`,
      images: thumbnail ? [{ url: thumbnail }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | cher1shRXD`,
      description,
      images: thumbnail ? [thumbnail] : [],
    },
  };
}

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
    const currentIndex = posts.findIndex((p) => p.id === currentPageId);

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
    <main className="min-h-screen pb-20 px-4 sm:px-6">
      <BlogHeader post={properties} />

      <div className="w-full max-w-4xl mx-auto">
        <Reveal threshold={0} triggerOnce>
          <article>
            <ArticleContent blocks={blocks} />
          </article>
        </Reveal>
      </div>

      <BlogNavigation
        prevPost={prevPost || undefined}
        nextPost={nextPost || undefined}
      />

      <TableOfContents blocks={blocks} />
    </main>
  );
}
