import { Project } from "@/entities/project/types";
import { formatDate } from "@/shared/utils/format-date";
import Reveal from "@/shared/ui/Reveal";
import Link from "next/link";
import Image from "next/image";
import { Globe } from "lucide-react";
import Github from "@/shared/icons/Github";
import { useRouter } from "@cher1shrxd/loading";

interface Props {
  project: Project;
  projectId: string;
  delay?: number;
}

const ProjectCard = ({ project, projectId, delay = 0 }: Props) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/projects/${projectId}`);
  };

  return (
    <Reveal delay={delay} triggerOnce threshold={0.1}>
      <div 
        onClick={handleCardClick}
        className="group relative bg-surface border border-border sm:border-2 rounded-lg sm:rounded-xl md:rounded-xl overflow-hidden hover:border-primary transition-all duration-300 cursor-pointer">
        {project.thumbnail && project.thumbnail.url && (
          <div className="relative w-full h-40 sm:h-48 md:h-52 lg:h-56 xl:h-60 overflow-hidden bg-surface/50">
            <Image
              src={project.thumbnail.url}
              alt={project.name.title[0].plain_text}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        <div className="p-4 sm:p-5 md:p-6 lg:p-7 xl:p-8 flex flex-col gap-3 sm:gap-4 md:gap-5">
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3">
            <span
              className={`text-xs sm:text-sm md:text-sm px-2 py-1 sm:px-3 sm:py-1 md:px-3 md:py-1 rounded-full ${project.is_deployed.status.name === "Deployed" ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"} font-medium`}>
              {project.is_deployed.status.name}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl md:text-2xl lg:text-3xl xl:text-3xl font-bold font-playpen text-primary">
            {project.name.title[0].plain_text}
          </h3>

          {project.description.rich_text[0] && (
            <p className="text-sm sm:text-base md:text-base text-text/70 line-clamp-2">
              {project.description.rich_text[0].plain_text}
            </p>
          )}

          {project.duration.date && (
            <p className="text-xs sm:text-sm md:text-sm text-text/50">
              {formatDate(project.duration.date.start)} -{" "}
              {project.duration.date.end
                ? formatDate(project.duration.date.end)
                : "진행중"}
            </p>
          )}

          <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-2">
            {project.tech_stacks.multi_select.map((tech) => (
              <span
                key={tech.id}
                className="text-xs sm:text-sm md:text-sm px-2 py-1 sm:px-3 sm:py-1 md:px-3 md:py-1 rounded-md bg-surface/80 border border-border text-text">
                {tech.name}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mt-2 sm:mt-3 md:mt-4">
            {project.github_repo && project.github_repo.url && (
              <Link
                href={project.github_repo.url}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-base text-text/70 hover:text-primary transition-colors">
                <Github className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />
                <span>GitHub</span>
              </Link>
            )}
            {project.deployed_url && project.deployed_url.url && (
              <Link
                href={project.deployed_url.url}
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base md:text-base text-text/70 hover:text-primary transition-colors">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 md:w-5 md:h-5" />
                <span>Go to Service</span>
              </Link>
            )}
          </div>

          <div className="absolute bottom-0 left-0 w-full h-0.5 sm:h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
        </div>
      </div>
    </Reveal>
  );
};

export default ProjectCard;
