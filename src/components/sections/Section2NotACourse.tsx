"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useAudio } from "../AudioContext";

gsap.registerPlugin(ScrollTrigger);

export default function Section2NotACourse() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const line1Ref = useRef<HTMLDivElement>(null);
    const line2Ref = useRef<HTMLDivElement>(null);
    const scanlineRef = useRef<HTMLDivElement>(null);
    const { playBassHit, playGlitch } = useAudio();

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

        // Camera zoom effect
        tl.fromTo(
            section,
            { scale: 0.9 },
            { scale: 1, duration: 1, ease: "power2.out" },
            0
        );

        // Line 1 flicker in
        tl.fromTo(
            line1Ref.current,
            { opacity: 0, y: 30, letterSpacing: "0.3em" },
            {
                opacity: 1,
                y: 0,
                letterSpacing: "0.1em",
                duration: 1,
                ease: "power3.out",
                onStart: () => playBassHit(),
            },
            0.3
        );

        // Flicker effect on line 1
        tl.to(line1Ref.current, { opacity: 0.3, duration: 0.05, onStart: () => playGlitch() }, 1.0);
        tl.to(line1Ref.current, { opacity: 1, duration: 0.05 }, 1.05);
        tl.to(line1Ref.current, { opacity: 0.5, duration: 0.03 }, 1.1);
        tl.to(line1Ref.current, { opacity: 1, duration: 0.05 }, 1.13);

        // Line 2
        tl.fromTo(
            line2Ref.current,
            { opacity: 0, y: 30, letterSpacing: "0.3em" },
            {
                opacity: 1,
                y: 0,
                letterSpacing: "0.1em",
                duration: 1,
                ease: "power3.out",
            },
            1.5
        );

        // Red scanline pass
        tl.fromTo(
            scanlineRef.current,
            { top: "-10%" },
            { top: "110%", duration: 2, ease: "none" },
            0.5
        );

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === section) t.kill();
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="cinema-section scanline-overlay"
            id="section-not-a-course"
            style={{ flexDirection: "column", gap: "30px" }}
        >
            {/* Code particles (decorative) */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    overflow: "hidden",
                    pointerEvents: "none",
                }}
            >
                {Array.from({ length: 30 }).map((_, i) => {
                    const left = (i * 37) % 100;
                    const top = (i * 23) % 100;
                    const fontSize = 8 + (i * 7) % 6;
                    const opacity = 0.05 + ((i * 11) % 10) / 100;
                    const rotate = (i * 13) % 360;
                    const duration = 4 + (i * 17) % 4;
                    const delay = (i * 19) % 3;
                    const codeSnippets = ["const", "=>", "{}", "[]", "async", "fn()", "let", "if", "&&", "||", "===", "return", "class", "import", "</>", "null"];
                    const snippet = codeSnippets[i % codeSnippets.length];
                    return (
                        <div
                            key={i}
                            className="font-code"
                            style={{
                                position: "absolute",
                                left: `${left}%`,
                                top: `${top}%`,
                                fontSize: `${fontSize}px`,
                                color: `rgba(255, 0, 51, ${opacity})`,
                                transform: `rotate(${rotate}deg)`,
                                animation: `float ${duration}s ease-in-out infinite`,
                                animationDelay: `${delay}s`,
                            }}
                        >
                            {snippet}
                        </div>
                    );
                })}
            </div>

            {/* Red scanline */}
            <div
                ref={scanlineRef}
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: "3px",
                    background: "linear-gradient(90deg, transparent 0%, #FF0033 30%, #FF0033 70%, transparent 100%)",
                    boxShadow: "0 0 20px rgba(255,0,51,0.5), 0 0 40px rgba(255,0,51,0.3)",
                    zIndex: 5,
                    pointerEvents: "none",
                }}
            />

            <div
                ref={line1Ref}
                className="font-headline red-glow"
                style={{
                    fontSize: "clamp(1.5rem, 5vw, 4rem)",
                    fontWeight: 800,
                    color: "#FF0033",
                    textAlign: "center",
                    opacity: 0,
                    zIndex: 2,
                }}
            >
                THIS IS NOT A COURSE.
            </div>

            <div
                ref={line2Ref}
                className="font-headline"
                style={{
                    fontSize: "clamp(1.5rem, 5vw, 4rem)",
                    fontWeight: 800,
                    color: "#FFFFFF",
                    textAlign: "center",
                    opacity: 0,
                    zIndex: 2,
                }}
            >
                THIS IS AN{" "}
                <span className="red-glow" style={{ color: "#FF0033" }}>
                    ARENA.
                </span>
            </div>

            {/* Subtitle */}
            <div
                className="font-body"
                style={{
                    fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                    color: "rgba(255,255,255,0.3)",
                    textAlign: "center",
                    maxWidth: "600px",
                    lineHeight: 1.8,
                    zIndex: 2,
                }}
            >
                Skill isn&apos;t explained. It&apos;s demonstrated.
            </div>
        </section>
    );
}
