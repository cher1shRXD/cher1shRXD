export const revalidate = 3600;

import { AwardApi } from "@/entities/award/api";
import { EducationApi } from "@/entities/education/api";
import { LicenseApi } from "@/entities/license/api";
import { PersonalInfoApi } from "@/entities/personal-info/api";
import { TechStackApi } from "@/entities/tech-stacks/api";
import { formatDate } from "@/shared/utils/format-date";
import Intro from "@/widgets/Intro/ui/Intro";
import Image from "next/image";

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
      <div className="w-full max-w-440 py-32 mx-auto px-4 flex flex-col gap-18">
        <h1 className="text-7xl self-start delayed-show animation-delay-200 relative hover:[&>div]:opacity-100">
          <span className="font-medium font-playpen">CLEAR INTERFACES</span>
          <div className="absolute -bottom-12 left-10 opacity-0 transition-opacity duration-500 bg-primary text-white px-8 py-2 rounded-md">
            <p className="text-lg">
              언제나 보다 나은 인터페이스를 고민하고 구축합니다.
            </p>
          </div>
        </h1>
        <h1 className="text-7xl self-center delayed-show animation-delay-500 relative hover:[&>div]:opacity-100">
          <span className="animate-bounce inline-block">🔧</span>{" "}
          <span className="font-medium font-playpen">EFFICIENT WORKFLOWS</span>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 transition-opacity duration-500 bg-primary text-white px-8 py-2 rounded-md">
            <p className="text-lg">
              때에 맞는 가장 효율적인 워크플로우를 채택합니다.
            </p>
          </div>
        </h1>
        <h1 className="text-7xl self-end delayed-show animation-delay-700 relative hover:[&>div]:opacity-100">
          <span className="font-medium font-playpen">
            MAINTAINABLE FRONTEND
          </span>
          <div className="absolute -bottom-12 right-10 opacity-0 transition-opacity duration-500 bg-primary text-white px-8 py-2 rounded-md">
            <p className="text-lg">
              보이는게 다가 아닌 유지보수 가능한 프론트엔드를 구축합니다.
            </p>
          </div>
        </h1>
        <h1 className="text-7xl self-start delayed-show animation-delay-1000 relative hover:[&>div]:opacity-100">
          <span className="font-medium font-playpen">HARD WORKS, PAYS OFF</span>{" "}
          <span className="animate-bounce inline-block animation-delay-200">
            😎
          </span>
          <div className="absolute -bottom-12 left-10 opacity-0 transition-opacity duration-500 bg-primary text-white px-8 py-2 rounded-md">
            <p className="text-lg">열정과 비례하는 결과를 창출합니다.</p>
          </div>
        </h1>
      </div>
      <div className="w-full pt-32 pb-16 flex items-center justify-center">
        <Intro />
      </div>
      <div className="w-full max-w-440 mx-auto px-4 flex flex-col text-center relative mb-32">
        <p className="text-2xl whitespace-pre-wrap break-keep leading-[180%] border-y border-border py-20 mx-8 italic font-semibold">
          {personalInfo.values}
        </p>
        <span className="absolute top-16 left-28 text-5xl text-primary">
          &ldquo;
        </span>
        <span className="absolute bottom-16 right-28 text-5xl text-primary">
          &rdquo;
        </span>
      </div>
      <div className="w-full max-w-440 mx-auto px-4 flex flex-col gap-16 mb-64">
        <h1 className="text-6xl font-semibold font-playpen tracking-widest">
          PROFILE.
        </h1>
        <div className="w-full flex items-center justify-start gap-8">
          <Image
            src="/profile.JPG"
            alt="증명사진"
            width={240}
            height={240}
            className="w-60 h-60 object-cover object-top rounded-xl"
          />
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-medium">
              {personalInfo.name}
              <span className="text-xl ml-2 font-playpen text-text/50">
                {personalInfo.nickname}
              </span>
            </h2>
            <table className="border-collapse border border-border overflow-hidden rounded-xl bg-surface w-auto">
              <tbody>
                <tr className="border border-border">
                  <th className="px-6 py-2 border-r border-border">생년월일</th>
                  <td className="px-6 py-2">
                    {formatDate(personalInfo.birthday)}
                  </td>
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
          </div>
        </div>
        <div className="w-full flex items-start justify-center gap-32 pr-24">
          <div className="flex-1 flex flex-col gap-16">
            <div className="py-40 text-center text-primary">
              <h3 className="text-5xl font-semibold mb-8 tracking-widest font-playpen neon-sign">
                Live a life you will rememeber.
              </h3>
              <p className="text-text/50">— Lyrics from &ldquo;The Nights&rdquo; by Avicii —</p>
            </div>
            <div className="w-full flex flex-col items-start gap-8">
              <h3 className="text-2xl font-semibold">자격증</h3>
              <div className="flex gap-4">
                {licenses.map((license, index) => (
                  <div
                    key={index}
                    className="bg-surface rounded-sm p-4 px-8 flex items-center justify-between hover:bg-surface/80 transition-colors border border-border gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="text-xl font-medium">
                        {license.properties.name.title[0].plain_text}
                      </div>
                      <div className="text-sm text-text/50">
                        {formatDate(license.properties.issue_date.date.start)}
                      </div>
                    </div>
                    {license.properties.score.number && (
                      <div className="text-xl font-bold text-primary">
                        {license.properties.score.number}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full flex flex-col items-start gap-8">
              <h3 className="text-2xl font-semibold">수상경력</h3>
              <div className="grid grid-cols-2 gap-2">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="bg-surface rounded-sm p-4 px-8 border-l-4 border-primary flex flex-col gap-1">
                    <div className="text-xs text-text/50 font-semibold">
                      {award.properties.award_category.select.name || ""} ·{" "}
                      <span className="text-yellow-600">
                        {award.properties.honor.rich_text[0].plain_text}
                      </span>
                    </div>
                    <div className="flex items-end gap-1">
                      <div className="text-xl font-medium">
                        {award.properties.name.title[0].plain_text}
                      </div>
                      <div className="text-sm text-text/50">
                        {formatDate(award.properties.date.date.start, 1)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-8 mt-12 sticky top-50">
            <h3 className="text-4xl font-semibold">학력</h3>
            <div className="relative flex flex-col gap-24">
              <div className="absolute right-4 top-6 bottom-6 w-0.5 bg-border"></div>
              {educations.reverse().map((education, index) => (
                <div
                  key={index}
                  className="relative pr-16 flex flex-col items-end gap-2">
                  <div className="text-xs text-text/70 bg-primary/40 px-4 py-1 rounded-full">
                    {education.properties.school_level.select.name}
                  </div>
                  <div className="text-2xl font-medium">
                    {education.properties.name.title[0].plain_text}
                  </div>
                  <div className="text-text/50">
                    {formatDate(education.properties.duration.date.start)} -{" "}
                    {formatDate(education.properties.duration.date.end || "")}
                  </div>
                  <div className="absolute right-0 top-3 w-8 h-8 rounded-full bg-primary border-4 border-background"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-440 h-[500vh] mx-auto px-4 flex flex-col gap-16">
        <h1 className="text-6xl font-semibold font-playpen tracking-widest">
          TECH STACKS.
        </h1>
      </div>
      <div className="h-screen"></div>
    </>
  );
}
