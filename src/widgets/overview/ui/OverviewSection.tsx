import { OVERVIEW_DESCRIPTION } from "@/entities/personal-info/datasets";
import Reveal from "@/shared/ui/Reveal";
import NavigationCard from "./NavigationCard";

const OverviewSection = () => {
  return (
    <Reveal threshold={0.3}>
      <section className="w-full max-w-440 mx-auto px-4 flex flex-col gap-16 mb-32">
        <h1 className="text-6xl font-semibold font-playpen tracking-widest">
          OVERVIEW.
        </h1>
        <div className="w-full max-w-440 mx-auto px-4 flex flex-col text-center mb-16">
          <p className="text-2xl whitespace-pre-wrap break-keep leading-[160%] italic border-y border-border py-10 mx-8">
            {OVERVIEW_DESCRIPTION}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <NavigationCard
            href="/projects"
            title="PROJECTS"
            description="진행했던 프로젝트들을 확인하세요"
          />
          <NavigationCard
            href="/blog"
            title="BLOG"
            description="기술 블로그 포스트를 읽어보세요"
          />
        </div>
      </section>
    </Reveal>
  );
};

export default OverviewSection;
