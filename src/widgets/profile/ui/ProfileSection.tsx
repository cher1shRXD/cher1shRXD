import type { Award } from "@/entities/award/types";
import type { Education } from "@/entities/education/types";
import type { License } from "@/entities/license/types";
import type { PersonalInfo } from "@/entities/personal-info/types";
import Reveal from "@/shared/ui/Reveal";
import Image from "next/image";
import ProfileTable from "./ProfileTable";
import LicenseList from "./LicenseList";
import AwardList from "./AwardList";
import EducationTimeline from "./EducationTimeline";

interface Props {
  personalInfo: PersonalInfo;
  licenses: License[];
  awards: Award[];
  educations: Education[];
}

const ProfileSection = ({
  personalInfo,
  licenses,
  awards,
  educations,
}: Props) => {
  return (
    <section className="w-full max-w-440 mx-auto px-4 flex flex-col gap-16 mb-64">
      <Reveal>
        <h1 className="text-6xl font-semibold font-playpen tracking-widest">
          PROFILE.
        </h1>
      </Reveal>
      <div className="w-full flex items-center justify-start gap-8">
        <Reveal delay={0.3}>
          <Image
            src="/profile.JPG"
            alt="증명사진"
            width={240}
            height={240}
            className="w-60 h-60 object-cover object-top rounded-xl"
          />
        </Reveal>
        <div className="flex flex-col gap-4">
          <Reveal delay={0.6}>
            <h2 className="text-4xl font-medium">
              {personalInfo.name}
              <span className="text-xl ml-2 font-playpen text-text/50">
                {personalInfo.nickname}
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.9}>
            <ProfileTable personalInfo={personalInfo} />
          </Reveal>
        </div>
      </div>
      <div className="w-full flex items-start justify-center gap-32 pr-24">
        <div className="flex-1 flex flex-col gap-16">
          <div className="py-60 text-center text-primary">
            <h3 className="text-5xl font-semibold mb-8 tracking-widest font-playpen neon-sign">
              Live a life you will rememeber.
            </h3>
            <p className="text-text/50">
              — Lyrics from &ldquo;The Nights&rdquo; by Avicii —
            </p>
          </div>
          <LicenseList licenses={licenses} />
          <AwardList awards={awards} />
        </div>
        <EducationTimeline educations={educations} />
      </div>
    </section>
  );
};

export default ProfileSection;
