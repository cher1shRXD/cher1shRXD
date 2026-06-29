import type { PersonalInfo } from "@/entities/personal-info/types";
import { formatDate } from "@/shared/utils/format-date";

interface Props {
  personalInfo: PersonalInfo;
}

const ProfileTable = ({ personalInfo }: Props) => {
  return (
    <table className="hard-panel border-collapse overflow-hidden bg-surface w-full md:w-auto text-sm md:text-base">
      <tbody>
        <tr className="border-2 border-border">
          <th className="bg-lime text-ink px-3 py-1.5 sm:px-4 md:px-5 md:py-2 xl:px-6 xl:py-2 border-r-2 border-border">
            <span className="sm:hidden">📅</span>
            <span className="hidden sm:inline">생년월일</span>
          </th>
          <td className="px-3 py-1.5 sm:px-4 md:px-5 md:py-2 xl:px-6 xl:py-2">{formatDate(personalInfo.birthday)}</td>
        </tr>
        <tr className="border-2 border-border">
          <th className="bg-lime text-ink px-3 py-1.5 sm:px-4 md:px-5 md:py-2 xl:px-6 xl:py-2 border-r-2 border-border">
            <span className="sm:hidden">📍</span>
            <span className="hidden sm:inline">주소</span>
          </th>
          <td className="px-3 py-1.5 sm:px-4 md:px-5 md:py-2 xl:px-6 xl:py-2">{personalInfo.address}</td>
        </tr>
        <tr className="border-2 border-border">
          <th className="bg-lime text-ink px-3 py-1.5 sm:px-4 md:px-5 md:py-2 xl:px-6 xl:py-2 border-r-2 border-border">
            <span className="sm:hidden">📞</span>
            <span className="hidden sm:inline">전화번호</span>
          </th>
          <td className="px-3 py-1.5 sm:px-4 md:px-5 md:py-2 xl:px-6 xl:py-2">{personalInfo.phone}</td>
        </tr>
        <tr className="border-2 border-border">
          <th className="bg-lime text-ink px-3 py-1.5 sm:px-4 md:px-5 md:py-2 xl:px-6 xl:py-2 border-r-2 border-border">
            <span className="sm:hidden">📧</span>
            <span className="hidden sm:inline">이메일</span>
          </th>
          <td className="px-3 py-1.5 sm:px-4 md:px-5 md:py-2 xl:px-6 xl:py-2">{personalInfo.email}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProfileTable;
