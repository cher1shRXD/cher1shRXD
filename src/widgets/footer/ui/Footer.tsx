import { PersonalInfoApi } from "@/entities/personal-info/api";
import { Link } from "@cher1shrxd/loading";
import A from "next/link";

const Footer = () => {
  const personalInfo = PersonalInfoApi.getPersonalInfo();

  return (
    <footer className="w-full border-t-2 border-border mt-16 bg-ink text-white">
      <div className="w-full max-w-440 mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-4 py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16">
        <div className="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20">
          <div className="flex-1 flex flex-col gap-3 sm:gap-4">
            <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-black font-playpen text-lime">
              SITEMAP
            </h3>
            <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 text-sm sm:text-base md:text-base">
              <Link
                href="/"
                className="text-white/70 hover:text-primary transition-colors">
                Home
              </Link>
              <Link
                href="/blog"
                className="text-white/70 hover:text-primary transition-colors">
                Blog
              </Link>
              <Link
                href="/projects"
                className="text-white/70 hover:text-primary transition-colors">
                Projects
              </Link>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3 sm:gap-4">
            <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-black font-playpen text-lime">
              CONTACT
            </h3>
            <div className="flex flex-col gap-2 sm:gap-2.5 md:gap-3 text-sm sm:text-base md:text-base">
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-white/70 hover:text-primary transition-colors">
                📧 {personalInfo.email}
              </a>
              <a
                href={`tel:${personalInfo.phone}`}
                className="text-white/70 hover:text-primary transition-colors">
                📞 {personalInfo.phone}
              </a>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-3 sm:gap-4">
            <h3 className="text-lg sm:text-xl md:text-xl lg:text-2xl xl:text-2xl font-black font-playpen text-lime">
              CREDITS
            </h3>
            <div className="text-sm sm:text-base md:text-base">
              <p>디자인 참고</p>
              <A
                href="https://www.leeboa.com/"
                target="_blank"
                className="text-primary hover:underline">
                www.leeboa.com - 이보아님 포트폴리오 사이트
              </A>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-6 sm:pt-7 md:pt-8 border-t-2 border-white/30">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-3">
            <Link
              href="/privacy"
              className="text-xs sm:text-sm text-white/60 hover:text-primary transition-colors">
              개인정보처리방침
            </Link>
          </div>
          <p className="text-xs sm:text-sm md:text-sm text-white/50 text-center">
            © {new Date().getFullYear()} cher1shRXD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
