import { AwardApi } from "@/entities/award/api";
import { BlogApi } from "@/entities/blog/api";
import { EducationApi } from "@/entities/education/api";
import { LicenseApi } from "@/entities/license/api";
import { PersonalInfoApi } from "@/entities/personal-info/api";
import { ProjectApi } from "@/entities/project/api";
import Intro from "@/widgets/Intro/ui/Intro";

export default async function HomePage() {
  // const datas = await Promise.all([
  //   BlogApi.getPosts(),
  //   ProjectApi.getProjects(),
  //   AwardApi.getAwards(),
  //   EducationApi.getEducations(),
  //   LicenseApi.getLicenses(),
  //   PersonalInfoApi.getPersonalInfo(),
  // ]);

  return (
    <>
      <div className="w-full max-w-440 py-32 mx-auto px-4 flex flex-col gap-18">
        <h1 className="text-7xl delayed-show animation-delay-200 relative hover:[&>div]:block">
          <span className="font-medium font-playpen">CLEAR INTERFACES</span>
          <div className="absolute -bottom-12 left-10 hidden delayed-show bg-primary text-white px-8 py-2 rounded-md">
            <p className="text-lg">언제나 보다 나은 인터페이스를 고민하고 구축합니다.</p>
          </div>
        </h1>
        <h1 className="text-7xl self-center delayed-show animation-delay-500 relative hover:[&>div]:block">
          <span className="animate-bounce inline-block">🔧</span>{" "}
          <span className="font-medium font-playpen">EFFICIENT WORKFLOWS</span>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 hidden delayed-show bg-primary text-white px-8 py-2 rounded-md">
            <p className="text-lg">때에 맞는 가장 효율적인 워크플로우를 채택합니다.</p>
          </div>
        </h1>
        <h1 className="text-7xl self-end delayed-show animation-delay-700 relative hover:[&>div]:block">
          <span className="font-medium font-playpen">MAINTAINABLE FRONTEND</span>
          <div className="absolute -bottom-12 right-10 hidden delayed-show bg-primary text-white px-8 py-2 rounded-md">
            <p className="text-lg">보이는게 다가 아닌 유지보수 가능한 프론트엔드를 구축합니다.</p>
          </div>
        </h1>
        <h1 className="text-7xl self-start delayed-show animation-delay-1000 relative hover:[&>div]:block">
          <span className="font-medium font-playpen">HARD WORKS, PAYS OFF</span>{" "}
          <span className="animate-bounce inline-block animation-delay-200">
            😎
          </span>
          <div className="absolute -bottom-12 left-10 hidden delayed-show bg-primary text-white px-8 py-2 rounded-md">
            <p className="text-lg">열정과 비례하는 결과를 창출합니다.</p>
          </div>
        </h1>
      </div>
      <div className="w-full py-32 flex items-center justify-center">
        <Intro />
      </div>
      <div className="w-full max-w-440 py-32 mx-auto px-4 flex flex-col gap-18">
        
      </div>
    </>
  );
}
