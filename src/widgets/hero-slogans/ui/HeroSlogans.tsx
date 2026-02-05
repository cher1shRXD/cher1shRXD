import Reveal from "@/shared/ui/Reveal";
import { SLOGANS } from "../constants";
import Cursor from "@/shared/icons/Cursor";

const HeroSlogans = () => {
  return (
    <section className="w-full max-w-440 py-32 mx-auto px-4 flex flex-col gap-18">
      {SLOGANS.map((slogan) => (
        <Reveal
          className={slogan.className}
          delay={slogan.delay}
          key={slogan.key}
          triggerOnce>
          <h1 className="text-7xl relative hover:[&>div]:opacity-100">
            {slogan.emoji && !slogan.emojiPosition && (
              <span className="animate-bounce inline-block">
                {slogan.emoji}
              </span>
            )}{" "}
            <span className="font-medium font-playpen">{slogan.title}</span>{" "}
            {slogan.emoji && slogan.emojiPosition === "end" && (
              <span className="animate-bounce inline-block animation-delay-300">
                {slogan.emoji}
              </span>
            )}
            {slogan.pointer && (
              <span className="absolute top-1/2 -right-20 -translate-x-1/2 text-4xl cursor-guide">
                <Cursor />
              </span>
            )}
            <div
              className={`absolute -bottom-12 ${slogan.tooltipPosition} opacity-0 transition-opacity duration-500 bg-primary text-white px-8 py-2 rounded-md`}>
              <p className="text-lg">{slogan.description}</p>
            </div>
          </h1>
        </Reveal>
      ))}
    </section>
  );
};

export default HeroSlogans;
