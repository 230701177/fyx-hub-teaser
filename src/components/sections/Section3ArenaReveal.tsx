"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "../AudioContext";

gsap.registerPlugin(ScrollTrigger);

export default function Section3ArenaReveal() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);
    const arenaRef = useRef<HTMLDivElement>(null);
    const lightningRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { playBassHit } = useAudio();

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "bottom top",
                scrub: 1,
                pin: true,
                pinSpacing: true,
            },
        });

        // Arena wireframe rises
        tl.fromTo(
            arenaRef.current,
            { y: 200, opacity: 0, scale: 0.6, rotateX: 45 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                rotateX: 0,
                duration: 2,
                ease: "power3.out",
                onStart: () => playBassHit(),
            },
            0
        );

        // Lightning strikes
        lightningRefs.current.forEach((ref, i) => {
            if (!ref) return;
            tl.fromTo(
                ref,
                { opacity: 0, scaleY: 0 },
                {
                    opacity: 1,
                    scaleY: 1,
                    duration: 0.1,
                    ease: "power4.out",
                },
                1 + i * 0.3
            );
            tl.to(ref, { opacity: 0, duration: 0.2 }, 1.2 + i * 0.3);
        });

        // Screen shake
        tl.to(section, { x: -3, duration: 0.05, yoyo: true, repeat: 5 }, 1);

        // Logo and Title Reveal
        tl.fromTo(
            [logoRef.current, titleRef.current],
            { opacity: 0, scale: 0.5, y: 40 },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "elastic.out(1, 0.5)",
            },
            1.5
        );

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === section) t.kill();
            });
        };
    }, [playBassHit]);

    return (
        <section
            ref={sectionRef}
            className="cinema-section"
            id="section-arena-reveal"
            style={{ flexDirection: "column", perspective: "1000px" }}
        >
            {/* Lightning bolts */}
            {[0, 1, 2].map((i) => (
                <div
                    key={i}
                    ref={(el) => { lightningRefs.current[i] = el; }}
                    style={{
                        position: "absolute",
                        top: 0,
                        left: `${25 + i * 25}%`,
                        width: "3px",
                        height: "100%",
                        background: `linear-gradient(to bottom, #FF0033, transparent)`,
                        boxShadow: "0 0 20px rgba(255,0,51,0.8), 0 0 40px rgba(255,0,51,0.4)",
                        opacity: 0,
                        transformOrigin: "top",
                        zIndex: 3,
                        clipPath: `polygon(
              0% 0%, 100% 0%,
              ${60 + i * 5}% 15%, ${40 - i * 3}% 30%,
              ${65 + i * 4}% 45%, ${35 - i * 2}% 60%,
              ${55 + i * 3}% 75%, 50% 100%,
              48% 100%, ${53 + i * 3}% 75%,
              ${33 - i * 2}% 60%, ${63 + i * 4}% 45%,
              ${38 - i * 3}% 30%, ${58 + i * 5}% 15%
            )`,
                    }}
                />
            ))}

            {/* Central Logo with Glitch Effects */}
            <div
                ref={arenaRef}
                style={{
                    position: "relative",
                    width: "clamp(300px, 60vw, 600px)",
                    height: "auto",
                    opacity: 0,
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {/* Main Glitched Logo Container */}
                <div style={{ position: "relative", width: "100%" }}>
                    {/* Shadow/Glow layers for flickering light */}
                    <div
                        className="logo-glow-pulse"
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "radial-gradient(circle, rgba(255,0,51,0.2) 0%, transparent 70%)",
                            filter: "blur(40px)",
                            zIndex: -1,
                        }}
                    />

                    {/* RGB Split / Glitch layers */}
                    <img
                        ref={logoRef}
                        src="/fyx-logo-bg.svg"
                        alt="FYX HUB Logo"
                        className="logo-glitch"
                        style={{
                            width: "100%",
                            height: "auto",
                            opacity: 0,
                            filter: "drop-shadow(0 0 30px rgba(255,0,51,0.8))",
                        }}
                    />

                    {/* Scanline overlay over logo */}
                    <div style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(transparent 50%, rgba(255, 0, 51, 0.05) 50%)",
                        backgroundSize: "100% 4px",
                        pointerEvents: "none",
                        opacity: 0.3
                    }} />
                </div>
            </div>

            {/* Title */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "20px",
                    zIndex: 2,
                }}
            >
                <div
                    ref={titleRef}
                    className="font-headline red-glow-strong"
                    style={{
                        fontSize: "clamp(2rem, 6vw, 5rem)",
                        fontWeight: 900,
                        color: "#FF0033",
                        textAlign: "center",
                        opacity: 0,
                    }}
                >
                    WELCOME TO FYX HUB.
                </div>
            </div>
        </section>
    );
}
