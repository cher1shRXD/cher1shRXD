import { AwardApi } from "@/entities/award/api";
import { BlogApi } from "@/entities/blog/api";
import { EducationApi } from "@/entities/education/api";
import { LicenseApi } from "@/entities/license/api";
import { PersonalInfoApi } from "@/entities/personal-info/api";
import { ProjectApi } from "@/entities/project/api";

export default async function HomePage() {
  const datas = await Promise.all([
    BlogApi.getPosts(),
    ProjectApi.getProjects(),
    AwardApi.getAwards(),
    EducationApi.getEducations(),
    LicenseApi.getLicenses(),
    PersonalInfoApi.getPersonalInfo(),
  ]);

  console.log("posts:", datas);

  return <div>HomePage</div>;
}
