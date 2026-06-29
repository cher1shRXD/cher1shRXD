"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const TICKER_ITEMS = [
  "FRONTEND",
  "PROBLEM FIRST",
  "CLEAR INTERFACES",
  "MAINTAINABLE CODE",
  "NEXT.JS",
  "TYPESCRIPT",
  "USER FLOWS",
  "STEADY DELIVERY",
];

const KineticScrollStage = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.35,
  });
  const rotate = useTransform(progress, [0, 1], [-10, 18]);
  const x = useTransform(progress, [0, 1], ["-12%", "10%"]);
  const y = useTransform(progress, [0, 1], ["0%", "28%"]);
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const tickerX = useTransform(progress, [0, 1], ["0%", "-10%"]);

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed left-0 top-0 z-[70] h-2 origin-left bg-primary"
        style={{ scaleX, width: "100%" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <motion.div
          className="absolute -right-8 top-28 hidden select-none font-playpen text-[16vw] font-extrabold leading-none text-text/[0.05] xl:block"
          style={{ rotate, x, y }}>
          RXD
        </motion.div>
        <motion.div
          className="absolute -left-10 bottom-8 hidden h-32 w-[120vw] -rotate-3 border-y-2 border-border bg-lime/45 text-ink opacity-70 mix-blend-multiply md:block"
          style={{ x: tickerX }}>
          <div className="ticker-track flex h-full w-max items-center gap-8 whitespace-nowrap text-3xl font-black">
            {[...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS].map(
              (item, index) => (
                <span key={`${item}-${index}`} className="font-playpen">
                  {item}
                </span>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default KineticScrollStage;
