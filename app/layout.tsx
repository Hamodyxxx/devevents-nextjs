import '../lib/orpc/orpc.server';
import type { Metadata } from "next";
import {  Martian_Mono, Schibsted_Grotesk, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from "@/components/light-rays";
import Navbar from "@/components/navbar";
import AppProvider from "@/providers/app-provider/app-provider";
import { PropsWithChildren } from "react";
import Background from "@/components/background/background";

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

interface RootLayoutProps extends PropsWithChildren {
    modal: React.ReactNode;
}

/**
 * Renders the application's root HTML layout including global fonts, providers, decorative light rays, navigation, and main content area.
 *
 * @param children - Page content to render inside the layout's main area.
 * @param modal - Modal content to overlay within the main area (rendered after `children`).
 * @returns The root `<html>` element containing the app's layout structure and content.
 */
export default function RootLayout({
  children,
  modal,
}: RootLayoutProps) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} antialiased min-h-screen`}
      >
        <AppProvider>
          <div className="fixed -z-50 inset-0">
            <LightRays
              className="h-full!"
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
            {modal}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}
