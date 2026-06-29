"use client";

import BlogCard from "@/widgets/blog/ui/BlogCard";
import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "@/entities/blog/types";
import { Project } from "@/entities/project/types";
import Reveal from "@/shared/ui/Reveal";
import { Link } from "@cher1shrxd/loading";
import ProjectCard from "@/widgets/projects/ui/ProjectCard";

interface Props {
  blogs: ResultResponse<BlogPost>[];
  projects: ResultResponse<Project>[];
}

const HomeContent = ({ blogs, projects }: Props) => {
  return (
    <>
      <section className="w-full max-w-440 mx-auto px-4 flex flex-col gap-8 mb-16 md:mb-32">
        <Reveal triggerOnce>
          <div className="flex flex-col items-start gap-4">
            <p className="section-label text-xs font-black">LATEST WRITING</p>
            <h1 className="section-title text-5xl sm:text-6xl md:text-7xl xl:text-8xl">
              RECENT BLOG.
            </h1>
            <Link
              href="/blog"
              className="hard-panel bg-background px-4 py-2 text-sm sm:text-base text-primary font-black whitespace-nowrap text-nowrap self-end hover:bg-lime hover:text-ink transition-colors">
              View All →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} post={blog} />
          ))}
        </div>
      </section>

      <section className="w-full max-w-440 mx-auto px-4 flex flex-col gap-8 mb-16 md:mb-32">
        <Reveal triggerOnce>
          <div className="flex flex-col items-start gap-4">
            <p className="section-label text-xs font-black">SHIPPED THINGS</p>
            <h1 className="section-title text-5xl sm:text-6xl md:text-7xl xl:text-8xl">
              RECENT PROJECTS.
            </h1>
            <Link
              href="/projects"
              className="hard-panel bg-background px-4 py-2 text-sm sm:text-base text-primary font-black whitespace-nowrap text-nowrap self-end hover:bg-lime hover:text-ink transition-colors">
              View All →
            </Link>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project.properties}
              projectId={project.id}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default HomeContent;
