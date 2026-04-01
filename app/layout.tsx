import type { Metadata } from "next";
import {  Martian_Mono, Schibsted_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/navbar";
import AppProvider from "@/providers/app-provider/app-provider";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevEvent",
  description: "The Hub for Every Dev Event You Mustn't Miss",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} antialiased min-h-screen`}
      >
        <AppProvider>
          <div className="absolute inset-0 top-0 z-[-1] min-h-screen">
            <LightRays
              raysOrigin="top-center-offset"
              raysColor="#5dfeca"
              raysSpeed={0.5}
              lightSpread={0.1}
              rayLength={15}
              followMouse={true}
              mouseInfluence={0.1}
              noiseAmount={0}
              distortion={0}
              pulsating={false}
              fadeDistance={1}
              saturation={1}
            />
          </div>

          <Navbar/>

          <main>
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
