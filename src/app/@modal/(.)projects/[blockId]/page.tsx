import { ProjectApi } from "@/entities/project/api";
import { notFound } from "next/navigation";
import Modal from "@/shared/ui/Modal";
import ArticleHeader from "@/widgets/article/ui/ArticleHeader";
import ArticleContent from "@/widgets/article/ui/ArticleContent";

export const revalidate = 86400;

export const generateStaticParams = async () => {
  const projects = await ProjectApi.getProjects();
  return projects.map((project) => ({
    blockId: project.id,
  }));
};

export default async function ProjectModal({
  params,
}: {
  params: Promise<{ blockId: string }>;
}) {
  const { blockId } = await params;

  const data = await ProjectApi.getProjectById(blockId).catch(() => null);

  if (!data) {
    notFound();
  }

  const { properties, blocks } = data;

  return (
    <Modal>
      <ArticleHeader project={properties} />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <article>
          <ArticleContent blocks={blocks} />
        </article>
      </div>
    </Modal>
  );
}
