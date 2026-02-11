"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const leaderboard = [
    { rank: 1, name: "xR_Phantom", fxp: 12847, streak: 42, badge: "🔥" },
    { rank: 2, name: "c0deNinja", fxp: 11293, streak: 38, badge: "⚡" },
    { rank: 3, name: "v0idWalker", fxp: 10561, streak: 35, badge: "💎" },
    { rank: 4, name: "byteHunter", fxp: 9872, streak: 31, badge: "" },
    { rank: 5, name: "nullPtr", fxp: 8944, streak: 28, badge: "" },
];

export default function Section8Rewards() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const leaderboardRef = useRef<HTMLDivElement>(null);
    const coinRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [counters, setCounters] = useState(leaderboard.map(() => 0));

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
                    const progress = Math.min(1, self.progress * 2);
                    setCounters(leaderboard.map((item) => Math.round(item.fxp * progress)));
                },
            },
        });

        // Floating coins
        coinRefs.current.forEach((coin, i) => {
            if (!coin) return;
            tl.fromTo(
                coin,
                { y: 200, opacity: 0, rotate: -180 },
                {
                    y: 0,
                    opacity: 0.6,
                    rotate: 0,
                    duration: 1,
                    ease: "power3.out",
                },
                i * 0.15
            );
        });

        // Title texts
        titleRefs.current.forEach((ref, i) => {
            if (!ref) return;
            tl.fromTo(
                ref,
                { opacity: 0, y: 40, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                0.3 + i * 0.4
            );
        });

        // Leaderboard rises
        tl.fromTo(
            leaderboardRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
            0.8
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
            id="section-rewards"
            style={{ flexDirection: "column", gap: "30px", padding: "60px 20px" }}
        >
            {/* Floating FXP coins */}
            {Array.from({ length: 12 }).map((_, i) => {
                const left = 10 + (i * 73) % 80;
                const top = 10 + (i * 47) % 80;
                return (
                    <div
                        key={i}
                        ref={(el) => { coinRefs.current[i] = el; }}
                        style={{
                            position: "absolute",
                            left: `${left}%`,
                            top: `${top}%`,
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border: "2px solid rgba(255,0,51,0.3)",
                            background: "radial-gradient(circle, rgba(255,0,51,0.15), transparent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            pointerEvents: "none",
                            opacity: 0,
                            zIndex: 1,
                        }}
                    >
                        <span
                            className="font-headline"
                            style={{ fontSize: "0.5rem", color: "#FF0033", opacity: 0.7 }}
                        >
                            FX
                        </span>
                    </div>
                );
            })}

            {/* Titles */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "center", zIndex: 2 }}>
                <div
                    ref={(el) => { titleRefs.current[0] = el; }}
                    className="font-headline red-glow"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 900, color: "#FF0033", opacity: 0 }}
                >
                    WIN FXP.
                </div>
                <div
                    ref={(el) => { titleRefs.current[1] = el; }}
                    className="font-headline"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 900, color: "#FFFFFF", opacity: 0 }}
                >
                    CLIMB GLOBAL RANKS.
                </div>
                <div
                    ref={(el) => { titleRefs.current[2] = el; }}
                    className="font-headline"
                    style={{
                        fontSize: "clamp(1.5rem, 4vw, 3rem)",
                        fontWeight: 900,
                        color: "#FFFFFF",
                        opacity: 0,
                    }}
                >
                    BECOME{" "}
                    <span className="red-glow" style={{ color: "#FF0033" }}>
                        TALENT.
                    </span>
                </div>
            </div>

            {/* Leaderboard */}
            <div
                ref={leaderboardRef}
                className="glass-panel"
                style={{
                    maxWidth: "550px",
                    width: "100%",
                    padding: "24px",
                    opacity: 0,
                    zIndex: 2,
                }}
            >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                    <span className="font-code" style={{ fontSize: "0.65rem", color: "rgba(255,0,51,0.5)", letterSpacing: "0.2em" }}>
                        GLOBAL LEADERBOARD
                    </span>
                    <span className="font-code" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.2)" }}>
                        SEASON 01
                    </span>
                </div>

                {leaderboard.map((player, i) => (
                    <div
                        key={player.name}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            padding: "12px 16px",
                            marginBottom: "4px",
                            borderRadius: "8px",
                            background: i === 0
                                ? "rgba(255,0,51,0.06)"
                                : i < 3
                                    ? "rgba(255,0,51,0.02)"
                                    : "transparent",
                            border: i === 0 ? "1px solid rgba(255,0,51,0.15)" : "1px solid transparent",
                        }}
                    >
                        <span
                            className="font-headline"
                            style={{
                                fontSize: "0.7rem",
                                fontWeight: 800,
                                color: i === 0 ? "#FF0033" : "rgba(255,255,255,0.3)",
                                width: "30px",
                            }}
                        >
                            #{player.rank}
                        </span>
                        <span
                            className="font-code"
                            style={{
                                fontSize: "0.75rem",
                                color: i < 3 ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.4)",
                                flex: 1,
                            }}
                        >
                            {player.name} {player.badge}
                        </span>
                        {/* Streak */}
                        <span
                            className="font-code"
                            style={{
                                fontSize: "0.55rem",
                                color: "rgba(255,0,51,0.5)",
                                marginRight: "16px",
                            }}
                        >
                            {player.streak}d 🔥
                        </span>
                        {/* FXP counter */}
                        <span
                            className="font-headline"
                            style={{
                                fontSize: "0.8rem",
                                fontWeight: 700,
                                color: i === 0 ? "#FF0033" : "rgba(255,255,255,0.5)",
                                minWidth: "70px",
                                textAlign: "right",
                            }}
                        >
                            {counters[i].toLocaleString()}
                        </span>
                        <span
                            className="font-code"
                            style={{ fontSize: "0.5rem", color: "rgba(255,0,51,0.4)", marginLeft: "4px" }}
                        >
                            FXP
                        </span>
                    </div>
                ))}
            </div>

            <div className="font-body" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", textAlign: "center", zIndex: 2 }}>
                Earn FXP. Build proof.
            </div>
        </section>
    );
}
