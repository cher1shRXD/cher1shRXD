"use client";

import BlogCard from "@/widgets/blog/ui/BlogCard";
import ProjectsGrid from "@/widgets/projects/ui/ProjectsGrid";
import { ResultResponse } from "@/shared/types/result-response";
import { BlogPost } from "@/entities/blog/types";
import { Project } from "@/entities/project/types";
import Reveal from "@/shared/ui/Reveal";
import { Link } from "@cher1shrxd/loading";

interface Props {
  blogs: ResultResponse<BlogPost>[];
  projects: ResultResponse<Project>[];
}

const HomeContent = ({ blogs, projects }: Props) => {
  return (
    <>
      <section className="w-full max-w-440 mx-auto px-4 flex flex-col gap-8 mb-16 md:mb-32">
        <Reveal>
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold font-playpen tracking-widest">
              RECENT BLOG.
            </h1>
            <Link
              href="/blog"
              className="text-sm sm:text-base text-primary whitespace-nowrap text-nowrap self-end hover:underline">
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
        <Reveal>
          <div className="flex flex-col items-start gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold font-playpen tracking-widest">
              RECENT PROJECTS.
            </h1>
            <Link
              href="/projects"
              className="text-sm sm:text-base text-primary whitespace-nowrap text-nowrap self-end hover:underline">
              View All →
            </Link>
          </div>
        </Reveal>
        <ProjectsGrid projects={projects} />
      </section>
    </>
  );
}

export default HomeContent;