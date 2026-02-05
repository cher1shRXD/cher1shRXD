import type { Metadata } from "next";
import "./globals.css";
import { LoadingBar } from "@cher1shrxd/loading";
import { ThemeSetter } from "@/shared/themes/ThemeSetter";
import Header from "@/widgets/header/ui/Header";
import Footer from "@/widgets/footer/ui/Footer";
import LenisProvider from "@/shared/providers/LenisProvider";
import InitScrollProvider from "@/shared/providers/InitScrollProvider";

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
        <meta name="google-adsense-account" content="ca-pub-6661151683803615" />
      </head>
      <body className="antialiased bg-background text-text pt-20 md:pt-40">
        <LoadingBar color="var(--theme-color-primary)" />
        <InitScrollProvider />
        <Header />
        <LenisProvider>
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
