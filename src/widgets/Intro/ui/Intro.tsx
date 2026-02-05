"use client";

import { useTyping } from "../hooks/useTyping";
import { useInView } from "react-intersection-observer";

const Intro = () => {
  const text = "다음 사람이\n망설이지 않는 코드를 쓰는\n개발자, 김태우입니다.";
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const { displayedText, ref: typingRef } = useTyping(text, 80, 1000);

  return (
    <div
      ref={ref}
      className={`w-full xl:pb-80 lg:pb-60 md:pb-40 pb-20 flex flex-col items-center justify-center bg-surface transition-[margin] duration-700 sticky top-44 ${
        inView ? "mx-0 rounded-0" : "xl:mx-40 xl:rounded-4xl"
      } overflow-hidden delayed-show animation-delay-1000`}>
      <div className="w-full md:p-4 p-2 bg-border flex gap-2 xl:mb-80 lg:mb-60 md:mb-40 mb-20">
        <div className="md:w-4 md:h-4 w-2 h-2 rounded-full bg-red-600"></div>
        <div className="md:w-4 md:h-4 w-2 h-2 rounded-full bg-yellow-500"></div>
        <div className="md:w-4 md:h-4 w-2 h-2 rounded-full bg-green-600"></div>
      </div>
      <p
        className="xl:text-6xl lg:text-4xl md:text-2xl text-xl xl:w-165 lg:w-99 md:w-66 w-55 xl:h-66 lg:h-38 md:h-25.5 h-21 font-medium whitespace-pre-wrap leading-[140%] font-mulmaru text-primary/80"
        ref={typingRef}>
        {displayedText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
};

export default Intro;
