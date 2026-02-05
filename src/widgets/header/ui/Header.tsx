"use client";

import { useState } from "react";
import Hamburger from "./Hamburger";
import FromisNine from "@/shared/icons/FromisNine";
import Velog from "@/shared/icons/Velog";
import Github from "@/shared/icons/Github";
import Link from "next/link";
import NavItem from "./NavItem";
import { ROUTES } from "../constants/routes";
import { useScroll } from "../hooks/useScroll";
import { ThemeToggle } from "@/shared/themes/ThemeToggle";

const Header = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { isVisible, isTop } = useScroll();

  const shouldShow = isMenuOpened || isVisible;

  return (
    <div
      className={`w-full fixed top-0 z-50 ${isMenuOpened ? "backdrop-blur-lg" : "backdrop-blur-none"} transition-all duration-300`}>
      <header
        className={`w-full ${isMenuOpened ? "bg-primary/80" : "bg-background"} flex flex-col items-center justify-start ${shouldShow ? "translate-y-0" : "-translate-y-full"} transition-transform duration-700`}>
        <div
          className={`${isTop || isMenuOpened ? "border-0" : "border-b border-border"} w-full max-w-440 h-40 flex items-center justify-start px-2 gap-4`}>
          <Hamburger
            isMenuOpened={isMenuOpened}
            setIsMenuOpened={setIsMenuOpened}
          />
          <FromisNine size={32} className="text-text cursor-pointer" />
          <div className="flex-1" />
          <Link href="https://velog.io/@rxd123" target="_blank">
            <Velog size={24} className="text-text cursor-pointer" />
          </Link>
          <Link href="https://github.com/cher1shRXD" target="_blank">
            <Github size={24} className="text-text cursor-pointer" />
          </Link>
          <ThemeToggle />
        </div>
        <div
          className={`w-full ${isMenuOpened ? "h-[calc(100svh-10rem)]" : "h-0"} transition-all`}>
          {isMenuOpened && (
            <nav className="w-full max-w-440 flex-1 flex flex-col items-start justify-start gap-8 px-2 delayed-show animation-delay-200 mx-auto">
              {ROUTES.map(({ name, href }) => (
                <NavItem
                  key={href}
                  name={name}
                  href={href}
                  onClick={() => setIsMenuOpened(false)}
                />
              ))}
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
