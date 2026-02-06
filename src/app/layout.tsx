import type { Metadata } from "next";
import "./globals.css";
import { LoadingBar } from "@cher1shrxd/loading";
import { ThemeSetter } from "@/shared/themes/ThemeSetter";
import Header from "@/widgets/header/ui/Header";
import Footer from "@/widgets/footer/ui/Footer";
import LenisProvider from "@/shared/providers/LenisProvider";
import Script from "next/script";

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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6661151683803615"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="antialiased bg-background text-text pt-20">
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-TLSWZB7P');`,
          }}
        />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TLSWZB7P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <LoadingBar color="var(--theme-color-primary)" />
        <Header />
        <LenisProvider>
          <main>{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
