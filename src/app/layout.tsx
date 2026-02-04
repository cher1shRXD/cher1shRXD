import type { Metadata } from "next";
import "./globals.css";
import { LoadingBar } from "@cher1shrxd/loading";
import { ThemeSetter } from "@/shared/themes/ThemeSetter";
import Header from "@/widgets/header/ui/Header";

export const metadata: Metadata = {
  title: "cher1shRXD's Portfolio",
  description: "다음 사람이 망설이지 않는 코드를 쓰는 개발자, 김태우입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <ThemeSetter />
      </head>
      <body className="antialiased bg-background text-text transition-colors pt-40">
        <LoadingBar color="var(--theme-color-primary)" />
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
