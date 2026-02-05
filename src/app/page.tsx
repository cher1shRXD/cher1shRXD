export const revalidate = 60 * 60 * 2;

import { AwardApi } from "@/entities/award/api";
import { EducationApi } from "@/entities/education/api";
import { LicenseApi } from "@/entities/license/api";
import { PersonalInfoApi } from "@/entities/personal-info/api";
import { TechStackApi } from "@/entities/tech-stacks/api";
import Reveal from "@/shared/ui/Reveal";
import Intro from "@/widgets/Intro/ui/Intro";
import TechStacks from "@/widgets/tech-stacks/ui/TechStacks";
import HeroSlogans from "@/widgets/hero-slogans/ui/HeroSlogans";
import ValuesQuote from "@/widgets/values-quote/ui/ValuesQuote";
import ProfileSection from "@/widgets/profile/ui/ProfileSection";
import OverviewSection from "@/widgets/overview/ui/OverviewSection";

export default async function HomePage() {
  const [techStacks, awards, educations, licenses, personalInfo] =
    await Promise.all([
      TechStackApi.getTechStacks(),
      AwardApi.getAwards(),
      EducationApi.getEducations(),
      LicenseApi.getLicenses(),
      PersonalInfoApi.getPersonalInfo(),
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
    </>
  );
}
