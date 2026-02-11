"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AudioProvider } from "../components/AudioContext";

// Dynamic imports to avoid SSR issues with Three.js and canvas
const RedParticleBackground = dynamic(
  () => import("../components/RedParticleBackground"),
  { ssr: false }
);
const GlitchOverlay = dynamic(
  () => import("../components/GlitchOverlay"),
  { ssr: false }
);
const ScrollProgressIndicator = dynamic(
  () => import("../components/ScrollProgressIndicator"),
  { ssr: false }
);
const StarsBackground = dynamic(
  () => import("../components/StarsBackground"),
  { ssr: false }
);

// Sections
const Section1BlackVoid = dynamic(
  () => import("../components/sections/Section1BlackVoid"),
  { ssr: false }
);
const Section2NotACourse = dynamic(
  () => import("../components/sections/Section2NotACourse"),
  { ssr: false }
);
const Section3ArenaReveal = dynamic(
  () => import("../components/sections/Section3ArenaReveal"),
  { ssr: false }
);
const Section4P3Model = dynamic(
  () => import("../components/sections/Section4P3Model"),
  { ssr: false }
);
const Section5Matchmaking = dynamic(
  () => import("../components/sections/Section5Matchmaking"),
  { ssr: false }
);
const Section6SprintArena = dynamic(
  () => import("../components/sections/Section6SprintArena"),
  { ssr: false }
);
const Section7FocusEnforcement = dynamic(
  () => import("../components/sections/Section7FocusEnforcement"),
  { ssr: false }
);
const Section8Rewards = dynamic(
  () => import("../components/sections/Section8Rewards"),
  { ssr: false }
);
const Section9Certificates = dynamic(
  () => import("../components/sections/Section9Certificates"),
  { ssr: false }
);
const Section10Profile = dynamic(
  () => import("../components/sections/Section10Profile"),
  { ssr: false }
);
const Section11Recruitment = dynamic(
  () => import("../components/sections/Section11Recruitment"),
  { ssr: false }
);
const Section12LogoFinale = dynamic(
  () => import("../components/sections/Section12LogoFinale"),
  { ssr: false }
);

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  useEffect(() => {
    // Refresh ScrollTrigger after all components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    // Prevent copy and context menu for a fully cinematic feel
    const preventAction = (e: Event) => e.preventDefault();
    document.addEventListener("copy", preventAction);
    document.addEventListener("contextmenu", preventAction);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      document.removeEventListener("copy", preventAction);
      document.removeEventListener("contextmenu", preventAction);
    };
  }, []);

  return (
    <AudioProvider>
      <main
        style={{
          position: "relative",
          background: "#000000",
          minHeight: "100vh",
        }}
      >
        <RedParticleBackground />
        <StarsBackground factor={0.05} speed={80} starColor="#FF0033" />
        <GlitchOverlay />
        <ScrollProgressIndicator />

        {/* Sections */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <Section1BlackVoid />
          <Section2NotACourse />
          <Section3ArenaReveal />
          <Section4P3Model />
          <Section5Matchmaking />
          <Section6SprintArena />
          <Section7FocusEnforcement />
          <Section8Rewards />
          <Section9Certificates />
          <Section10Profile />
          <Section11Recruitment />
          <Section12LogoFinale />
        </div>
      </main>
    </AudioProvider>
  );
}
