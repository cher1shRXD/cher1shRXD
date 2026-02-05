import type { License } from "@/entities/license/types";
import Reveal from "@/shared/ui/Reveal";
import { formatDate } from "@/shared/utils/format-date";

interface Props {
  licenses: License[];
}

const LicenseList = ({ licenses }: Props) => {
  return (
    <Reveal>
      <div className="w-full flex flex-col items-start gap-8">
        <h3 className="text-2xl font-semibold">자격증</h3>
        <div className="flex gap-4">
          {licenses.map((license, index) => (
            <div
              key={index}
              className="bg-surface rounded-sm p-4 px-8 flex items-center justify-between hover:bg-surface/80 transition-colors border border-border gap-4">
              <div className="flex flex-col gap-2">
                <div className="text-xl font-medium">
                  {license.name.title[0].plain_text}
                </div>
                <div className="text-sm text-text/50">
                  {formatDate(license.issue_date.date.start)}
                </div>
              </div>
              {license.score.number && (
                <div className="text-xl font-bold text-primary">
                  {license.score.number}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
};

export default LicenseList;
