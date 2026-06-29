"use client";

import { useTyping } from "../hooks/useTyping";
import { useInView } from "react-intersection-observer";

const Intro = () => {
  const text = "기술보다\n문제를 먼저 바라보는 개발자,\n김태우입니다.";
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const { displayedText, ref: typingRef } = useTyping(text, 80, 1000);

  return (
    <div
      ref={ref}
      className={`hard-panel w-full h-[calc(95vh-10rem)] flex flex-col items-center justify-center bg-surface transition-[margin,transform,background-color] duration-700 sticky top-24 ${
        inView ? "mx-0 rotate-0" : "xl:mx-32 xl:-rotate-1"
      } overflow-hidden delayed-show animation-delay-1000`}>
      <div className="w-full border-b-2 border-border md:p-4 p-2 bg-primary text-white flex items-center gap-2">
        <div className="md:w-4 md:h-4 w-2 h-2 border border-ink bg-lime"></div>
        <div className="md:w-4 md:h-4 w-2 h-2 border border-ink bg-accent"></div>
        <div className="md:w-4 md:h-4 w-2 h-2 border border-ink bg-background"></div>
        <span className="ml-3 text-xs font-black tracking-[0.2em]">
          PROBLEM FIRST / CODE SECOND
        </span>
      </div>
      <div className="flex-1" />
      <p
        className="relative z-10 xl:text-7xl lg:text-5xl md:text-3xl text-2xl xl:w-190 lg:w-120 md:w-80 w-64 xl:h-78 lg:h-48 md:h-32 h-26 font-black whitespace-pre-wrap leading-[120%] font-mulmaru text-text"
        ref={typingRef}>
        {displayedText}
        <span className="animate-pulse text-primary">|</span>
      </p>
      <div className="absolute bottom-8 right-8 hidden rotate-6 border-2 border-border bg-lime px-6 py-3 font-playpen text-4xl font-black text-ink shadow-[6px_6px_0_var(--theme-color-ink)] md:block">
        01
      </div>
      <div className="flex-1" />
    </div>
  );
};

export default Intro;
