"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "../AudioContext";

gsap.registerPlugin(ScrollTrigger);

const p3Data = [
    {
        title: "PLAN",
        subtitle: "AI GENERATES YOUR SPRINT",
        description:
            "Our AI engine analyzes your skill level, learning path, and goals to create a custom sprint tailored to your growth. No fluff. Pure focus.",
        icon: "⬡",
        features: ["AI-powered sprint generation", "Skill-level calibration", "Goal-oriented tasks"],
    },
    {
        title: "PAIR",
        subtitle: "MATCHMAKING ENGINE",
        description:
            "Get matched with a developer of similar skill. Collaborate under pressure. Push each other to new limits in the arena.",
        icon: "⬢",
        features: ["Real-time matchmaking", "Skill-based pairing", "Friend code system"],
    },
    {
        title: "PERFORM",
        subtitle: "2-HOUR SPRINT",
        description:
            "Execute under pressure. 2 hours. Real tasks. Real code. Monitored focus. The arena doesn't forgive idle time.",
        icon: "◆",
        features: ["Live coding environment", "Focus tracking", "Performance scoring"],
    },
];

export default function Section4P3Model() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { playWhoosh } = useAudio();

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=200%",
                scrub: 1,
                pin: true,
                pinSpacing: true,
            },
        });

        // Title
        tl.fromTo(
            titleRef.current,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            0
        );

        // Cards slide in one by one with red trail
        cardRefs.current.forEach((card, i) => {
            if (!card) return;
            const direction = i % 2 === 0 ? -1 : 1;

            tl.fromTo(
                card,
                {
                    x: direction * 300,
                    opacity: 0,
                    rotateY: direction * 15,
                    scale: 0.9,
                },
                {
                    x: 0,
                    opacity: 1,
                    rotateY: 0,
                    scale: 1,
                    duration: 1,
                    ease: "power3.out",
                    onStart: () => playWhoosh(),
                },
                0.5 + i * 0.8
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === section) t.kill();
            });
        };
    }, [playWhoosh]);

    return (
        <section
            ref={sectionRef}
            className="cinema-section"
            id="section-p3-model"
            style={{
                flexDirection: "column",
                padding: "60px 20px",
                perspective: "1200px",
            }}
        >
            {/* Section title */}
            <div
                ref={titleRef}
                style={{
                    textAlign: "center",
                    marginBottom: "60px",
                    opacity: 0,
                    zIndex: 2,
                }}
            >
                <div
                    className="font-code"
                    style={{
                        fontSize: "0.8rem",
                        color: "rgba(255,0,51,0.6)",
                        letterSpacing: "0.3em",
                        marginBottom: "10px",
                    }}
                >
                    THE CORE MODEL
                </div>
                <div
                    className="font-headline red-glow"
                    style={{
                        fontSize: "clamp(2rem, 4vw, 3.5rem)",
                        fontWeight: 900,
                        color: "#FF0033",
                    }}
                >
                    P³ FRAMEWORK
                </div>
            </div>

            {/* Cards */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "30px",
                    maxWidth: "800px",
                    width: "100%",
                    zIndex: 2,
                }}
            >
                {p3Data.map((item, i) => (
                    <div
                        key={item.title}
                        ref={(el) => { cardRefs.current[i] = el; }}
                        className="glass-panel-strong"
                        style={{
                            padding: "40px",
                            opacity: 0,
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {/* Red trail glow */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "4px",
                                height: "100%",
                                background: "linear-gradient(to bottom, transparent, #FF0033, transparent)",
                                boxShadow: "0 0 20px rgba(255,0,51,0.5)",
                            }}
                        />

                        <div style={{ display: "flex", alignItems: "flex-start", gap: "24px" }}>
                            {/* Icon */}
                            <div
                                style={{
                                    fontSize: "2rem",
                                    color: "#FF0033",
                                    filter: "drop-shadow(0 0 10px rgba(255,0,51,0.5))",
                                    flexShrink: 0,
                                }}
                            >
                                {item.icon}
                            </div>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "8px" }}>
                                    <span
                                        className="font-headline"
                                        style={{
                                            fontSize: "1.5rem",
                                            fontWeight: 800,
                                            color: "#FF0033",
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                    <span
                                        className="font-code"
                                        style={{
                                            fontSize: "0.7rem",
                                            color: "rgba(255,255,255,0.4)",
                                            letterSpacing: "0.15em",
                                        }}
                                    >
                                        {item.subtitle}
                                    </span>
                                </div>

                                <p
                                    className="font-body"
                                    style={{
                                        fontSize: "0.9rem",
                                        color: "rgba(255,255,255,0.5)",
                                        lineHeight: 1.6,
                                        marginBottom: "16px",
                                    }}
                                >
                                    {item.description}
                                </p>

                                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                                    {item.features.map((feat) => (
                                        <span
                                            key={feat}
                                            className="font-code"
                                            style={{
                                                fontSize: "0.65rem",
                                                color: "rgba(255,0,51,0.7)",
                                                letterSpacing: "0.1em",
                                                padding: "4px 12px",
                                                border: "1px solid rgba(255,0,51,0.15)",
                                                borderRadius: "4px",
                                                background: "rgba(255,0,51,0.03)",
                                            }}
                                        >
                                            {feat}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Step number */}
                        <div
                            className="font-headline"
                            style={{
                                position: "absolute",
                                top: "16px",
                                right: "24px",
                                fontSize: "3rem",
                                fontWeight: 900,
                                color: "rgba(255,0,51,0.06)",
                            }}
                        >
                            0{i + 1}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
