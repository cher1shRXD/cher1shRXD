import { AwardApi } from "@/entities/award/api";
import { EducationApi } from "@/entities/education/api";
import { LicenseApi } from "@/entities/license/api";
import { PersonalInfoApi } from "@/entities/personal-info/api";
import { TechStackApi } from "@/entities/tech-stacks/api";
import { BlogApi } from "@/entities/blog/api";
import { ProjectApi } from "@/entities/project/api";
import Reveal from "@/shared/ui/Reveal";
import Intro from "@/widgets/Intro/ui/Intro";
import TechStacks from "@/widgets/tech-stacks/ui/TechStacks";
import HeroSlogans from "@/widgets/hero-slogans/ui/HeroSlogans";
import ValuesQuote from "@/widgets/values-quote/ui/ValuesQuote";
import ProfileSection from "@/widgets/profile/ui/ProfileSection";
import OverviewSection from "@/widgets/overview/ui/OverviewSection";
import BlogCard from "@/widgets/blog/ui/BlogCard";
import { Link } from "@cher1shrxd/loading";
import ProjectsGrid from "@/widgets/projects/ui/ProjectsGrid";

export const revalidate = 86400;

export default async function HomePage() {
  const [
    techStacks,
    awards,
    educations,
    licenses,
    personalInfo,
    blogs,
    projects,
  ] = await Promise.all([
    TechStackApi.getTechStacks(),
    AwardApi.getAwards(),
    EducationApi.getEducations(),
    LicenseApi.getLicenses(),
    PersonalInfoApi.getPersonalInfo(),
    BlogApi.getPosts(3),
    ProjectApi.getProjects(3),
  ]);

  return (
    <>
      <HeroSlogans />
      <section className="w-full xl:h-[200vh] xl:pt-32 pb-16 flex items-start justify-center">
        <Intro />
      </section>
      <ValuesQuote personalInfo={personalInfo} />
      <ProfileSection
        personalInfo={personalInfo}
        licenses={licenses.map((l) => l.properties)}
        awards={awards.map((a) => a.properties)}
        educations={educations.map((e) => e.properties)}
      />
      <section className="w-full max-w-440 mx-auto px-4 flex flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 md:mb-64 mb-16">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold font-playpen tracking-widest">
            TECH STACKS.
          </h1>
        </Reveal>
        <TechStacks data={techStacks.map((t) => t.properties)} />
      </section>
      <OverviewSection />
      <section className="w-full max-w-440 mx-auto px-4 flex flex-col gap-8 mb-16 md:mb-32">
        <Reveal>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold font-playpen tracking-widest">
              RECENT BLOG.
            </h1>
            <Link
              href="/blog"
              className="text-sm sm:text-base text-primary hover:underline">
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
          <div className="flex items-center justify-between">
            <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-semibold font-playpen tracking-widest">
              RECENT PROJECTS.
            </h1>
            <Link
              href="/projects"
              className="text-sm sm:text-base text-primary hover:underline">
              View All →
            </Link>
          </div>
        </Reveal>
        <ProjectsGrid projects={projects} />
      </section>
    </>
  );
}
