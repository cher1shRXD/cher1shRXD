import type { PersonalInfo } from "@/entities/personal-info/types";
import Reveal from "@/shared/ui/Reveal";

interface Props {
  personalInfo: PersonalInfo;
}

const ValuesQuote = ({ personalInfo }: Props) => {
  return (
    <Reveal>
      <section className="w-full max-w-440 mx-auto px-4 flex flex-col text-center relative xl:mb-32 mb-16">
        <p className="hard-panel bg-primary text-white md:text-3xl sm:text-xl whitespace-pre-wrap leading-[170%] xl:px-20 px-10 py-16 lg:mx-8 font-black">
          {personalInfo.values}
        </p>
        <span className="absolute top-8 xl:left-28 lg:left-20 left-8 text-7xl font-black text-lime">
          &ldquo;
        </span>
        <span className="absolute bottom-8 xl:right-28 lg:right-20 right-8 text-7xl font-black text-lime">
          &rdquo;
        </span>
      </section>
    </Reveal>
  );
};

export default ValuesQuote;
