import type { PersonalInfo } from "@/entities/personal-info/types";
import { formatDate } from "@/shared/utils/format-date";

interface Props {
  personalInfo: PersonalInfo;
}

const ProfileTable = ({ personalInfo }: Props) => {
  return (
    <table className="border-collapse border border-border overflow-hidden rounded-xl bg-surface w-auto">
      <tbody>
        <tr className="border border-border">
          <th className="px-6 py-2 border-r border-border">생년월일</th>
          <td className="px-6 py-2">{formatDate(personalInfo.birthday)}</td>
        </tr>
        <tr className="border border-border">
          <th className="px-6 py-2 border-r border-border">주소</th>
          <td className="px-6 py-2">{personalInfo.address}</td>
        </tr>
        <tr className="border border-border">
          <th className="px-6 py-2 border-r border-border">전화번호</th>
          <td className="px-6 py-2">{personalInfo.phone}</td>
        </tr>
        <tr className="border border-border">
          <th className="px-6 py-2 border-r border-border">이메일</th>
          <td className="px-6 py-2">{personalInfo.email}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ProfileTable;
