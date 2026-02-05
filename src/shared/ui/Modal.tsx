"use client";

import { useRouter } from "@cher1shrxd/loading";
import { X } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const router = useRouter();
  const scrollY = useRef(0);

  useLayoutEffect(() => {
    scrollY.current = window.scrollY;
    document.body.style.cssText = `
      position: fixed;
      top: -${scrollY.current}px;
      left: 0;
      right: 0;
      overflow: hidden;
    `;

    return () => {
      document.body.style.cssText = "";
      window.scrollTo(0, scrollY.current);
    };
  }, []);

  const handleClose = () => {
    router.back();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const preventScroll = (e: React.WheelEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-100 bg-black/60 flex items-center justify-center"
      onWheel={preventScroll}
      onTouchMove={preventScroll}>
      <div className="absolute inset-0" onClick={handleClose} />
      <div
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[90svh] bg-background rounded-lg shadow-2xl flex flex-col">
        <div className="shrink-0 flex justify-end p-4 border-b border-surface">
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-surface transition-colors cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8 overscroll-contain">
          {children}
        </div>
      </div>
    </div>
  );
}
