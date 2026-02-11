"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const profileData = {
    name: "xR_Phantom",
    level: 12,
    fxp: 12847,
    rank: "#1",
    streaks: 42,
    sprints: 87,
    focusAvg: 94,
    badges: ["🏆", "⚡", "🔥", "💎", "🎯"],
    certCount: 23,
};

const focusHistory = [85, 90, 88, 94, 92, 96, 94, 91, 95, 97, 93, 94];

export default function Section10Profile() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: "+=150%",
                scrub: 1,
                pin: true,
                pinSpacing: true,
            },
        });

        tl.fromTo(
            titleRef.current,
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
            0
        );

        tl.fromTo(
            profileRef.current,
            { opacity: 0, y: 80, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" },
            0.3
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
            id="section-profile"
            style={{ flexDirection: "column", gap: "30px", padding: "60px 20px" }}
        >
            <div ref={titleRef} style={{ textAlign: "center", opacity: 0, zIndex: 2 }}>
                <div
                    className="font-headline red-glow"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 900, color: "#FF0033" }}
                >
                    YOUR PROFILE IS YOUR PROOF.
                </div>
            </div>

            {/* Profile Dashboard */}
            <div
                ref={profileRef}
                className="glass-panel"
                style={{
                    maxWidth: "700px",
                    width: "100%",
                    padding: "32px",
                    opacity: 0,
                    zIndex: 2,
                }}
            >
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" }}>
                    {/* Avatar */}
                    <div
                        style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "50%",
                            background: "linear-gradient(135deg, #1a1a2e, #16213e)",
                            border: "2px solid rgba(255,0,51,0.3)",
                            boxShadow: "0 0 20px rgba(255,0,51,0.15)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >
                        <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                            <circle cx="20" cy="14" r="8" stroke="#FF0033" strokeWidth="1.5" fill="none" />
                            <path d="M6 36 Q20 24 34 36" stroke="#FF0033" strokeWidth="1.5" fill="none" />
                        </svg>
                    </div>

                    <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <span className="font-headline" style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FFFFFF" }}>
                                {profileData.name}
                            </span>
                            <span
                                className="font-code"
                                style={{
                                    fontSize: "0.55rem",
                                    padding: "2px 8px",
                                    borderRadius: "4px",
                                    background: "rgba(255,0,51,0.1)",
                                    border: "1px solid rgba(255,0,51,0.2)",
                                    color: "#FF0033",
                                    letterSpacing: "0.1em",
                                }}
                            >
                                TALENT
                            </span>
                        </div>
                        <div className="font-code" style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", marginTop: "4px" }}>
                            Level {profileData.level} • {profileData.rank} Global • {profileData.fxp.toLocaleString()} FXP
                        </div>
                    </div>

                    {/* Badges */}
                    <div style={{ display: "flex", gap: "4px" }}>
                        {profileData.badges.map((badge, i) => (
                            <span key={i} style={{ fontSize: "1.2rem" }}>
                                {badge}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Stats grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "12px",
                        marginBottom: "24px",
                    }}
                >
                    {[
                        { label: "SPRINTS", value: profileData.sprints },
                        { label: "STREAK", value: `${profileData.streaks}d` },
                        { label: "AVG FOCUS", value: `${profileData.focusAvg}%` },
                        { label: "CERTS", value: profileData.certCount },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            style={{
                                padding: "12px",
                                borderRadius: "8px",
                                background: "rgba(255,0,51,0.03)",
                                border: "1px solid rgba(255,0,51,0.06)",
                                textAlign: "center",
                            }}
                        >
                            <div
                                className="font-headline"
                                style={{ fontSize: "1.2rem", fontWeight: 800, color: "#FF0033" }}
                            >
                                {stat.value}
                            </div>
                            <div
                                className="font-code"
                                style={{ fontSize: "0.5rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", marginTop: "4px" }}
                            >
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Focus graph */}
                <div style={{ marginBottom: "20px" }}>
                    <div className="font-code" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", marginBottom: "10px" }}>
                        FOCUS HISTORY
                    </div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "60px" }}>
                        {focusHistory.map((val, i) => (
                            <div
                                key={i}
                                style={{
                                    flex: 1,
                                    height: `${val * 0.6}%`,
                                    background: `linear-gradient(to top, rgba(255,0,51,${0.2 + (val / 100) * 0.5}), rgba(255,0,51,0.05))`,
                                    borderRadius: "2px 2px 0 0",
                                    transition: "height 0.5s ease",
                                }}
                            />
                        ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                        <span className="font-code" style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.15)" }}>
                            12 SPRINTS AGO
                        </span>
                        <span className="font-code" style={{ fontSize: "0.45rem", color: "rgba(255,255,255,0.15)" }}>
                            LATEST
                        </span>
                    </div>
                </div>

                {/* Recent certificates */}
                <div>
                    <div className="font-code" style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", marginBottom: "10px" }}>
                        RECENT CERTIFICATES
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                        {["Sprint #2847", "Sprint #2831", "Sprint #2819"].map((cert) => (
                            <div
                                key={cert}
                                style={{
                                    flex: 1,
                                    padding: "10px",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(255,0,51,0.1)",
                                    background: "rgba(255,0,51,0.02)",
                                    textAlign: "center",
                                }}
                            >
                                <div style={{ fontSize: "1rem", marginBottom: "4px" }}>🏅</div>
                                <div className="font-code" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.3)" }}>
                                    {cert}
                                </div>
                                <div className="font-code" style={{ fontSize: "0.45rem", color: "rgba(255,0,51,0.4)", marginTop: "2px" }}>
                                    WINNER
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
