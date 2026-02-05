import type { Education } from "@/entities/education/types";
import Reveal from "@/shared/ui/Reveal";
import { formatDate } from "@/shared/utils/format-date";

interface Props {
  educations: Education[];
}

const EducationTimeline = ({ educations }: Props) => {
  return (
    <Reveal className="sticky top-50">
      <div className="flex flex-col items-end gap-8 mt-12">
        <h3 className="text-4xl font-semibold">학력</h3>
        <div className="relative flex flex-col gap-24">
          <div className="absolute right-4 top-6 bottom-6 w-0.5 bg-border"></div>
          {educations.reverse().map((education, index) => (
            <div
              key={index}
              className="relative pr-16 flex flex-col items-end gap-2">
              <div className="text-xs text-text/70 bg-primary/40 px-4 py-1 rounded-full">
                {education.school_level.select.name}
              </div>
              <div className="text-2xl font-medium">
                {education.name.title[0].plain_text}
              </div>
              <div className="text-text/50">
                {formatDate(education.duration.date.start)} -{" "}
                {formatDate(education.duration.date.end || "")}
              </div>
              <div className="absolute right-0 top-3 w-8 h-8 rounded-full bg-primary border-4 border-background"></div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default EducationTimeline;
