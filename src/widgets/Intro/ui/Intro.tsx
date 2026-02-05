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
      className={`w-full pb-80 flex flex-col items-center justify-center bg-surface transition-[margin] duration-700 sticky top-44 ${
        inView ? "mx-0 rounded-0" : "mx-40 rounded-4xl"
      } overflow-hidden delayed-show animation-delay-1000`}>
      <div className="w-full p-4 bg-border flex gap-2 mb-80">
        <div className="w-4 h-4 rounded-full bg-red-600"></div>
        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
        <div className="w-4 h-4 rounded-full bg-green-600"></div>
      </div>
      <p className="text-6xl w-165 h-66 font-medium whitespace-pre-wrap leading-[140%] font-mulmaru text-primary/80" ref={typingRef}>
        {displayedText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
};

export default Intro;
