import type { Metadata } from "next";
import { Bebas_Neue, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fontBebas = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
  display: 'swap',
});

const fontInter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-inter",
  display: 'swap',
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  variable: "--font-mono",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "ROADMEN | Precision Automotive Engineering",
  description: "We build, calibrate, and perfect high-performance vehicles for the track and the street.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`bg-void text-text antialiased ${fontInter.variable} ${fontBebas.variable} ${fontMono.variable} font-inter selection:bg-plasma selection:text-void`}>
        {/* Global Film Grain Noise */}
        <div className="film-grain" />
        {children}
      </body>
    </html>
  );
}
