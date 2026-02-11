"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section5Matchmaking() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const avatar1Ref = useRef<HTMLDivElement>(null);
    const avatar2Ref = useRef<HTMLDivElement>(null);
    const circuitRef = useRef<SVGSVGElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const uiRef = useRef<HTMLDivElement>(null);

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

        // Avatars slide in from sides
        tl.fromTo(
            avatar1Ref.current,
            { x: -200, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
            0
        );
        tl.fromTo(
            avatar2Ref.current,
            { x: 200, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: "power3.out" },
            0
        );

        // Circuit lines animate
        tl.fromTo(
            circuitRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 },
            0.8
        );

        // "SYNCING MINDS" text
        tl.fromTo(
            textRef.current,
            { opacity: 0, scale: 0.8, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "power3.out" },
            1.2
        );

        // UI demo slides up
        tl.fromTo(
            uiRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
            1.8
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
            className="cinema-section"
            id="section-matchmaking"
            style={{ flexDirection: "column", gap: "40px" }}
        >
            {/* Subtitle */}
            <div
                className="font-code"
                style={{
                    fontSize: "0.75rem",
                    color: "rgba(255,0,51,0.5)",
                    letterSpacing: "0.3em",
                    zIndex: 2,
                }}
            >
                MATCHMAKING ENGINE
            </div>

            {/* Avatars + Circuit */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "40px",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {/* Avatar 1 */}
                <div
                    ref={avatar1Ref}
                    style={{
                        width: "120px",
                        height: "160px",
                        opacity: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    <div
                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                            border: "2px solid rgba(255,0,51,0.3)",
                            boxShadow: "0 0 20px rgba(255,0,51,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <circle cx="20" cy="14" r="8" stroke="#FF0033" strokeWidth="1.5" fill="none" opacity="0.6" />
                            <path d="M6 36 Q20 24 34 36" stroke="#FF0033" strokeWidth="1.5" fill="none" opacity="0.6" />
                        </svg>
                    </div>
                    <div className="font-code" style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>
                        PLAYER_01
                    </div>
                    <div
                        className="font-code"
                        style={{
                            fontSize: "0.55rem",
                            color: "rgba(255,0,51,0.5)",
                            padding: "2px 8px",
                            border: "1px solid rgba(255,0,51,0.15)",
                            borderRadius: "4px",
                        }}
                    >
                        LVL 12
                    </div>
                </div>

                {/* Circuit lines */}
                <svg
                    ref={circuitRef}
                    width="200"
                    height="60"
                    viewBox="0 0 200 60"
                    style={{ opacity: 0 }}
                >
                    <path
                        d="M 0 30 L 40 30 L 55 10 L 90 10 L 100 30 L 110 30"
                        stroke="#FF0033"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="4 4"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            values="8;0"
                            dur="1s"
                            repeatCount="indefinite"
                        />
                    </path>
                    <path
                        d="M 90 30 L 100 50 L 145 50 L 160 30 L 200 30"
                        stroke="#FF0033"
                        strokeWidth="1.5"
                        fill="none"
                        strokeDasharray="4 4"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            values="8;0"
                            dur="1.2s"
                            repeatCount="indefinite"
                        />
                    </path>
                    {/* Pulse nodes */}
                    <circle cx="100" cy="30" r="4" fill="#FF0033" opacity="0.8">
                        <animate attributeName="r" values="3;6;3" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
                    </circle>
                </svg>

                {/* Avatar 2 */}
                <div
                    ref={avatar2Ref}
                    style={{
                        width: "120px",
                        height: "160px",
                        opacity: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                    }}
                >
                    <div
                        style={{
                            width: "80px",
                            height: "80px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                            border: "2px solid rgba(255,0,51,0.3)",
                            boxShadow: "0 0 20px rgba(255,0,51,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <circle cx="20" cy="14" r="8" stroke="#FF0033" strokeWidth="1.5" fill="none" opacity="0.6" />
                            <path d="M6 36 Q20 24 34 36" stroke="#FF0033" strokeWidth="1.5" fill="none" opacity="0.6" />
                        </svg>
                    </div>
                    <div className="font-code" style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>
                        PLAYER_02
                    </div>
                    <div
                        className="font-code"
                        style={{
                            fontSize: "0.55rem",
                            color: "rgba(255,0,51,0.5)",
                            padding: "2px 8px",
                            border: "1px solid rgba(255,0,51,0.15)",
                            borderRadius: "4px",
                        }}
                    >
                        LVL 11
                    </div>
                </div>
            </div>

            {/* Syncing text */}
            <div
                ref={textRef}
                className="font-headline red-glow"
                style={{
                    fontSize: "clamp(1.5rem, 4vw, 3rem)",
                    fontWeight: 800,
                    color: "#FF0033",
                    opacity: 0,
                    zIndex: 2,
                }}
            >
                SYNCING MINDS…
            </div>

            {/* Interactive UI Demo */}
            <div
                ref={uiRef}
                className="glass-panel"
                style={{
                    padding: "24px",
                    maxWidth: "400px",
                    width: "100%",
                    opacity: 0,
                    zIndex: 2,
                }}
            >
                <div className="font-code" style={{ fontSize: "0.65rem", color: "rgba(255,0,51,0.5)", marginBottom: "16px", letterSpacing: "0.2em" }}>
                    SPRINT LOBBY
                </div>

                {[
                    { label: "JOIN ROOM", code: "#FYX-2847", active: true },
                    { label: "START NEW SPRINT", code: "CREATING...", active: false },
                    { label: "FRIEND CODE", code: "FYX-MNH-0847", active: false },
                ].map((item, i) => (
                    <div
                        key={item.label}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px 16px",
                            marginBottom: i < 2 ? "8px" : 0,
                            borderRadius: "8px",
                            border: `1px solid ${item.active ? "rgba(255,0,51,0.3)" : "rgba(255,255,255,0.05)"}`,
                            background: item.active ? "rgba(255,0,51,0.05)" : "transparent",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                    >
                        <span
                            className="font-code"
                            style={{
                                fontSize: "0.7rem",
                                color: item.active ? "#FF0033" : "rgba(255,255,255,0.4)",
                                letterSpacing: "0.1em",
                            }}
                        >
                            {item.label}
                        </span>
                        <span
                            className="font-code"
                            style={{
                                fontSize: "0.6rem",
                                color: "rgba(255,255,255,0.25)",
                            }}
                        >
                            {item.code}
                        </span>
                    </div>
                ))}
            </div>

            {/* Subtitle */}
            <div
                className="font-body"
                style={{
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.3)",
                    textAlign: "center",
                    zIndex: 2,
                }}
            >
                Sync minds. Beat time.
            </div>
        </section>
    );
}
