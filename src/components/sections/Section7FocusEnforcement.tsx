"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "../AudioContext";

gsap.registerPlugin(ScrollTrigger);

export default function Section7FocusEnforcement() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const meterRef = useRef<HTMLDivElement>(null);
    const warningRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [focusLevel, setFocusLevel] = useState(100);
    const [showWarning, setShowWarning] = useState(false);
    const { playAlert } = useAudio();

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
                onUpdate: (self) => {
                    const progress = self.progress;
                    // Focus drops as you scroll
                    const newFocus = Math.max(0, 100 - progress * 150);
                    setFocusLevel(newFocus);

                    if (progress > 0.4 && progress < 0.45) {
                        setShowWarning(true);
                        playAlert();
                    }
                    if (progress > 0.7) {
                        setShowWarning(true);
                    }
                    if (progress < 0.35 || (progress > 0.5 && progress < 0.65)) {
                        setShowWarning(false);
                    }
                },
            },
        });

        // Text reveals
        textRefs.current.forEach((ref, i) => {
            if (!ref) return;
            tl.fromTo(
                ref,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
                0.3 + i * 0.5
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === section) t.kill();
            });
        };
    }, [playAlert]);

    return (
        <section
            ref={sectionRef}
            className="cinema-section"
            id="section-focus"
            style={{
                flexDirection: "column",
                gap: "40px",
                border: showWarning ? "2px solid rgba(255,0,51,0.5)" : "2px solid transparent",
                transition: "border-color 0.3s ease",
            }}
        >
            {/* Warning Overlay */}
            {showWarning && (
                <div
                    ref={warningRef}
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(255,0,51,0.03)",
                        border: "3px solid rgba(255,0,51,0.4)",
                        zIndex: 3,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                        animation: "warning-shake 0.5s ease-in-out",
                    }}
                >
                    <div
                        className="font-headline"
                        style={{
                            fontSize: "clamp(1rem, 3vw, 2rem)",
                            color: "#FF0033",
                            textShadow: "0 0 30px rgba(255,0,51,0.8)",
                            animation: "heartbeat-pulse 0.5s ease-in-out infinite",
                        }}
                    >
                        ⚠ IDLE WARNING ⚠
                    </div>
                </div>
            )}

            <div className="font-code" style={{ fontSize: "0.75rem", color: "rgba(255,0,51,0.5)", letterSpacing: "0.3em", zIndex: 2 }}>
                FOCUS ENFORCEMENT
            </div>

            {/* Focus meter */}
            <div
                ref={meterRef}
                style={{
                    maxWidth: "500px",
                    width: "100%",
                    zIndex: 2,
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span className="font-code" style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>
                        FOCUS LEVEL
                    </span>
                    <span
                        className="font-code"
                        style={{
                            fontSize: "0.65rem",
                            color: focusLevel > 50 ? "#27C93F" : focusLevel > 25 ? "#FFBD2E" : "#FF0033",
                        }}
                    >
                        {Math.round(focusLevel)}%
                    </span>
                </div>
                <div
                    style={{
                        width: "100%",
                        height: "8px",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "4px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        className="progress-fill"
                        style={{
                            width: `${focusLevel}%`,
                            height: "100%",
                            borderRadius: "4px",
                            background:
                                focusLevel > 50
                                    ? "linear-gradient(90deg, #27C93F, #2ecc71)"
                                    : focusLevel > 25
                                        ? "linear-gradient(90deg, #f39c12, #FFBD2E)"
                                        : "linear-gradient(90deg, #7A0018, #FF0033)",
                            boxShadow:
                                focusLevel <= 25
                                    ? "0 0 15px rgba(255,0,51,0.5)"
                                    : "none",
                            transition: "width 0.3s ease, background 0.3s ease",
                        }}
                    />
                </div>
            </div>

            {/* Warning texts */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px", zIndex: 2 }}>
                <div
                    ref={(el) => { textRefs.current[0] = el; }}
                    className="font-headline"
                    style={{
                        fontSize: "clamp(1.2rem, 3vw, 2rem)",
                        fontWeight: 800,
                        color: "#FFBD2E",
                        textAlign: "center",
                        opacity: 0,
                    }}
                >
                    IDLE 2 MINUTES = <span style={{ color: "#FF0033" }}>WARNING.</span>
                </div>
                <div
                    ref={(el) => { textRefs.current[1] = el; }}
                    className="font-headline red-glow-strong"
                    style={{
                        fontSize: "clamp(1.2rem, 3vw, 2rem)",
                        fontWeight: 800,
                        color: "#FF0033",
                        textAlign: "center",
                        opacity: 0,
                    }}
                >
                    IDLE 5 MINUTES = <span style={{ textDecoration: "line-through" }}>REMOVAL.</span>
                </div>
            </div>

            {/* Timer UI */}
            <div
                className="glass-panel"
                style={{
                    padding: "20px 32px",
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    zIndex: 2,
                }}
            >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="font-code" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>
                        IDLE TIME
                    </div>
                    <div
                        className="font-headline"
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 800,
                            color: focusLevel > 50 ? "rgba(255,255,255,0.3)" : "#FF0033",
                        }}
                    >
                        {focusLevel > 50 ? "00:00" : focusLevel > 25 ? "02:14" : "04:51"}
                    </div>
                </div>
                <div
                    style={{
                        width: "1px",
                        height: "40px",
                        background: "rgba(255,255,255,0.08)",
                    }}
                />
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div className="font-code" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.3)", marginBottom: "4px" }}>
                        STATUS
                    </div>
                    <div
                        className="font-code"
                        style={{
                            fontSize: "0.7rem",
                            fontWeight: 700,
                            letterSpacing: "0.1em",
                            color: focusLevel > 50 ? "#27C93F" : focusLevel > 25 ? "#FFBD2E" : "#FF0033",
                        }}
                    >
                        {focusLevel > 50 ? "ACTIVE" : focusLevel > 25 ? "WARNING" : "CRITICAL"}
                    </div>
                </div>
            </div>

            {/* Subtitle */}
            <div className="font-body" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", textAlign: "center", zIndex: 2 }}>
                No ghosting. No slacking. The arena demands your focus.
            </div>
        </section>
    );
}
