"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const topPlayers = [
    "xR_Phantom", "c0deNinja", "v0idWalker", "byteHunter", "nullPtr",
    "darkMatter", "n3xGen", "pixelDrift", "ironcl4d", "synapz",
    "qu4ntum", "zeroCool", "echoStr1ke", "v3ctor", "gl1tchP0wer",
    "n0vaFlux", "synthW4ve", "d4rkF1re", "r3dShift", "cyb3rF0x",
];

export default function Section11Recruitment() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const avatarRefs = useRef<(HTMLDivElement | null)[]>([]);
    const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [eliminatedCount, setEliminatedCount] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=250%",
                scrub: 1,
                pin: true,
                pinSpacing: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    if (progress < 0.3) {
                        setEliminatedCount(0);
                    } else if (progress < 0.6) {
                        setEliminatedCount(17); // Keep top 3
                    } else {
                        setEliminatedCount(17);
                    }
                },
            },
        });

        // Title texts
        titleRefs.current.forEach((ref, i) => {
            if (!ref) return;
            tl.fromTo(
                ref,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
                i * 0.5
            );
        });

        // All avatars appear
        avatarRefs.current.forEach((ref, i) => {
            if (!ref) return;
            tl.fromTo(
                ref,
                { opacity: 0, scale: 0.5 },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    ease: "back.out(1.7)",
                },
                0.1 + i * 0.05
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === section) t.kill();
            });
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="cinema-section"
            id="section-recruitment"
            style={{ flexDirection: "column", gap: "40px", padding: "60px 20px" }}
        >
            <div className="font-code" style={{ fontSize: "0.75rem", color: "rgba(255,0,51,0.5)", letterSpacing: "0.3em", zIndex: 2 }}>
                ANNUAL RECRUITMENT
            </div>

            {/* Title texts */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "center", zIndex: 2 }}>
                <div
                    ref={(el) => { titleRefs.current[0] = el; }}
                    className="font-headline"
                    style={{ fontSize: "clamp(1rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "rgba(255,255,255,0.6)", opacity: 0 }}
                >
                    TOP 20 INTERVIEWED.
                </div>
                <div
                    ref={(el) => { titleRefs.current[1] = el; }}
                    className="font-headline"
                    style={{ fontSize: "clamp(1rem, 2.5vw, 1.8rem)", fontWeight: 700, color: "rgba(255,255,255,0.8)", opacity: 0 }}
                >
                    TOP 3 SELECTED.
                </div>
                <div
                    ref={(el) => { titleRefs.current[2] = el; }}
                    className="font-headline red-glow"
                    style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "#FF0033", opacity: 0 }}
                >
                    FYX RECRUITMENT.
                </div>
            </div>

            {/* Avatars Grid */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: "16px",
                    maxWidth: "600px",
                    width: "100%",
                    zIndex: 2,
                }}
            >
                {topPlayers.map((player, i) => {
                    const isTop3 = i < 3;
                    const isEliminated = !isTop3 && i < eliminatedCount + 3;

                    return (
                        <div
                            key={player}
                            ref={(el) => { avatarRefs.current[i] = el; }}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "6px",
                                opacity: 0,
                                transition: "all 0.8s ease",
                                transform: isEliminated ? "scale(0.7)" : "scale(1)",
                                filter: isEliminated
                                    ? "brightness(0.2) saturate(0)"
                                    : isTop3 && eliminatedCount > 0
                                        ? "brightness(1.2)"
                                        : "brightness(1)",
                            }}
                        >
                            <div
                                style={{
                                    width: isTop3 && eliminatedCount > 0 ? "56px" : "44px",
                                    height: isTop3 && eliminatedCount > 0 ? "56px" : "44px",
                                    borderRadius: "50%",
                                    background: isTop3
                                        ? "linear-gradient(135deg, rgba(255,0,51,0.15), rgba(122,0,24,0.1))"
                                        : "linear-gradient(135deg, #1a1a2e, #16213e)",
                                    border: isTop3
                                        ? "2px solid rgba(255,0,51,0.5)"
                                        : "1px solid rgba(255,255,255,0.08)",
                                    boxShadow: isTop3 && eliminatedCount > 0
                                        ? "0 0 25px rgba(255,0,51,0.3)"
                                        : "none",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    transition: "all 0.8s ease",
                                }}
                            >
                                <svg width="20" height="20" viewBox="0 0 40 40" fill="none">
                                    <circle
                                        cx="20"
                                        cy="14"
                                        r="7"
                                        stroke={isTop3 ? "#FF0033" : "rgba(255,255,255,0.2)"}
                                        strokeWidth="1.5"
                                        fill="none"
                                    />
                                    <path
                                        d="M8 36 Q20 26 32 36"
                                        stroke={isTop3 ? "#FF0033" : "rgba(255,255,255,0.2)"}
                                        strokeWidth="1.5"
                                        fill="none"
                                    />
                                </svg>
                            </div>
                            <span
                                className="font-code"
                                style={{
                                    fontSize: "0.5rem",
                                    color: isTop3 && eliminatedCount > 0
                                        ? "#FF0033"
                                        : isEliminated
                                            ? "rgba(255,255,255,0.1)"
                                            : "rgba(255,255,255,0.3)",
                                    transition: "color 0.8s ease",
                                }}
                            >
                                {player}
                            </span>
                            {isTop3 && eliminatedCount > 0 && (
                                <span
                                    className="font-code"
                                    style={{
                                        fontSize: "0.45rem",
                                        color: "#FF0033",
                                        letterSpacing: "0.1em",
                                    }}
                                >
                                    SELECTED
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="font-body" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", textAlign: "center", zIndex: 2 }}>
                Top streaks get recruited.
            </div>
        </section>
    );
}
