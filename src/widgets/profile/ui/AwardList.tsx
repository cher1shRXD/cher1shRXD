import type { Award } from "@/entities/award/types";
import Reveal from "@/shared/ui/Reveal";
import { formatDate } from "@/shared/utils/format-date";

interface Props {
  awards: Award[];
}

const AwardList = ({ awards }: Props) => {
  return (
    <Reveal>
      <div className="w-full flex flex-col items-start gap-8">
        <h3 className="text-2xl font-semibold">수상경력</h3>
        <div className="grid grid-cols-2 gap-2">
          {awards.map((award, index) => (
            <div
              key={index}
              className="bg-surface rounded-sm p-4 px-8 border-l-4 border-primary flex flex-col gap-1">
              <div className="text-xs text-text/50 font-semibold">
                {award.award_category.select.name || ""} ·{" "}
                <span className="text-yellow-600">
                  {award.honor.rich_text[0].plain_text}
                </span>
              </div>
              <div className="flex items-end gap-1">
                <div className="text-xl font-medium">
                  {award.name.title[0].plain_text}
                </div>
                <div className="text-sm text-text/50">
                  {formatDate(award.date.date.start, 1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default AwardList;
