import type { PersonalInfo } from "@/entities/personal-info/types";
import Reveal from "@/shared/ui/Reveal";

interface Props {
  personalInfo: PersonalInfo;
}

const ValuesQuote = ({ personalInfo }: Props) => {
  return (
    <Reveal>
      <section className="w-full max-w-440 mx-auto px-4 flex flex-col text-center relative mb-32">
        <p className="text-2xl whitespace-pre-wrap break-keep leading-[180%] border-y border-border py-20 mx-8 italic font-semibold">
          {personalInfo.values}
        </p>
        <span className="absolute top-16 left-28 text-5xl text-primary">
          &ldquo;
        </span>
        <span className="absolute bottom-16 right-28 text-5xl text-primary">
          &rdquo;
        </span>
      </section>
    </Reveal>
  );
};

export default ValuesQuote;
