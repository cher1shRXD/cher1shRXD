import { ProjectApi } from "@/entities/project/api";
import { redirect, notFound } from "next/navigation";
import ArticleHeader from "@/widgets/article/ui/ArticleHeader";
import ArticleContent from "@/widgets/article/ui/ArticleContent";
import TableOfContents from "@/widgets/article/ui/TableOfContents";
import ArticleNavigation from "@/widgets/article/ui/ArticleNavigation";
import Reveal from "@/shared/ui/Reveal";

export const revalidate = 3600;

const getArticleData = async (blockId: string) => {
  try {
    return await ProjectApi.getProjectById(blockId);
  } catch {
    return null;
  }
};

const getAdjacentProjects = async (currentBlockId: string) => {
  try {
    const projects = await ProjectApi.getProjects();
    const currentIndex = projects.findIndex((p) => p.id === currentBlockId);

    if (currentIndex === -1) return { prevProject: null, nextProject: null };

    const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const nextProject =
      currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    return {
      prevProject: prevProject
        ? {
            id: prevProject.id,
            title:
              prevProject.properties.name.title[0]?.plain_text || "Untitled",
          }
        : null,
      nextProject: nextProject
        ? {
            id: nextProject.id,
            title:
              nextProject.properties.name.title[0]?.plain_text || "Untitled",
          }
        : null,
    };
  } catch {
    return { prevProject: null, nextProject: null };
  }
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ blockId?: string }>;
}) {
  const { blockId } = await params;
  if (!blockId) {
    redirect("/projects");
  }

  const data = await getArticleData(blockId);

  if (!data) {
    notFound();
  }

  const { properties, blocks } = data;
  const { prevProject, nextProject } = await getAdjacentProjects(blockId);

  return (
    <main className="min-h-screen pb-20">
      <ArticleHeader project={properties} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative">
        <Reveal threshold={0.2} triggerOnce>
          <article>
            <ArticleContent blocks={blocks} />
          </article>
        </Reveal>
      </div>

      <ArticleNavigation
        prevProject={prevProject || undefined}
        nextProject={nextProject || undefined}
      />

      <TableOfContents blocks={blocks} />
    </main>
  );
}
