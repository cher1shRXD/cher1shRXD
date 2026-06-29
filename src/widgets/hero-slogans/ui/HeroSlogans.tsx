import Reveal from "@/shared/ui/Reveal";
import { SLOGANS } from "../constants";

const HeroSlogans = () => {
  return (
    <section className="relative mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-440 flex-col justify-between overflow-hidden px-4 py-8 sm:px-6 md:px-8 lg:px-10 xl:px-4">
      <div className="absolute right-4 top-6 hidden rotate-2 border-2 border-border bg-primary px-4 py-2 text-sm font-black text-white shadow-[5px_5px_0_var(--theme-color-ink)] md:block">
        SCROLL RESPONSIVE PORTFOLIO
      </div>
      <Reveal triggerOnce threshold={0.2}>
        <p className="section-label mb-6 text-xs font-black sm:text-sm">
          KIM TAEWOO / CHER1SHRXD
        </p>
        <h1 className="section-title max-w-[12ch] text-[clamp(3.7rem,15vw,12rem)]">
          FRONTEND THAT MOVES.
        </h1>
      </Reveal>

      <div className="grid gap-4 pb-4 md:grid-cols-[1fr_1.45fr] md:items-end">
        <Reveal delay={0.2} triggerOnce threshold={0.2}>
          <div className="hard-panel bg-surface p-4 text-sm font-semibold leading-7 sm:p-6 sm:text-base">
            다음 사람이 망설이지 않는 코드를 쓰는 프론트엔드 개발자.
            문제를 구조화하고, 인터페이스를 움직이게 만들고, 오래 버티는
            화면을 설계합니다.
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2">
          {SLOGANS.map((slogan) => (
            <Reveal
              className={slogan.className}
              delay={slogan.delay}
              key={slogan.key}
              triggerOnce
              threshold={0.2}>
              <article className="group hard-panel min-h-32 bg-background p-4 transition-transform duration-300 hover:-translate-y-1 hover:rotate-1 hover:bg-lime sm:p-5">
                <p className="mb-4 font-playpen text-xl font-extrabold leading-none sm:text-2xl">
                  {slogan.title}
                </p>
                <p className="text-sm font-medium leading-6 text-text/75">
                  {slogan.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSlogans;
