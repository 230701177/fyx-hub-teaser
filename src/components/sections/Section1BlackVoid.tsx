"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "../AudioContext";

gsap.registerPlugin(ScrollTrigger);

export default function Section1BlackVoid() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const pulseRef = useRef<HTMLDivElement>(null);
    const words = ["PLAN.", "PAIR.", "PERFORM."];
    const wordRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { playBassHit } = useAudio();

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        // Heartbeat pulse
        gsap.to(pulseRef.current, {
            scale: 1.5,
            opacity: 0.15,
            duration: 1,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        // Word reveals on scroll
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

        wordRefs.current.forEach((word, i) => {
            if (!word) return;
            tl.fromTo(
                word,
                {
                    opacity: 0,
                    y: 80,
                    scale: 0.8,
                    filter: "blur(10px)",
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 1,
                    ease: "power3.out",
                    onStart: () => playBassHit(),
                },
                i * 1.2
            );
            // Glitch flash
            tl.to(
                word,
                {
                    x: -5,
                    duration: 0.05,
                    yoyo: true,
                    repeat: 3,
                },
                i * 1.2 + 0.3
            );
            // Hold
            if (i < words.length - 1) {
                tl.to(word, { duration: 0.5 }, `+=${0.3}`);
            }
        });

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
            id="section-void"
            style={{ minHeight: "100vh", flexDirection: "column", gap: "20px" }}
        >
            {/* Heartbeat pulse */}
            <div
                ref={pulseRef}
                style={{
                    position: "absolute",
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,0,51,0.15) 0%, transparent 70%)",
                    pointerEvents: "none",
                }}
            />

            {/* Fog */}
            <div
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "40%",
                    background: "linear-gradient(to top, rgba(122,0,24,0.05), transparent)",
                    pointerEvents: "none",
                }}
            />

            {/* Words */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "30px",
                    zIndex: 2,
                }}
            >
                {words.map((word, i) => (
                    <div
                        key={word}
                        ref={(el) => { wordRefs.current[i] = el; }}
                        className="font-headline glitch-text red-glow-strong"
                        data-text={word}
                        style={{
                            fontSize: "clamp(3rem, 8vw, 7rem)",
                            fontWeight: 900,
                            color: "#FF0033",
                            opacity: 0,
                            letterSpacing: "0.15em",
                        }}
                    >
                        {word}
                    </div>
                ))}
            </div>

            {/* Scroll indicator */}
            <div
                style={{
                    position: "absolute",
                    bottom: "40px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "8px",
                    opacity: 0.4,
                }}
            >
                <span
                    className="font-code"
                    style={{ fontSize: "0.7rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.4)" }}
                >
                    SCROLL TO ENTER
                </span>
                <div
                    style={{
                        width: "1px",
                        height: "40px",
                        background: "linear-gradient(to bottom, rgba(255,0,51,0.5), transparent)",
                    }}
                />
            </div>
        </section>
    );
}
