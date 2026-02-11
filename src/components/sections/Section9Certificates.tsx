"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Section9Certificates() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const certRef = useRef<HTMLDivElement>(null);
    const laserRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);

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

        // Certificate emerges
        tl.fromTo(
            certRef.current,
            { scale: 0.5, opacity: 0, rotateY: -30, rotateX: 10 },
            {
                scale: 1,
                opacity: 1,
                rotateY: 0,
                rotateX: 0,
                duration: 1.5,
                ease: "power3.out",
            },
            0
        );

        // Laser scan
        tl.fromTo(
            laserRef.current,
            { top: "0%", opacity: 0 },
            { opacity: 1, duration: 0.1 },
            1.2
        );
        tl.to(laserRef.current, { top: "100%", duration: 1, ease: "none" }, 1.3);
        tl.to(laserRef.current, { opacity: 0, duration: 0.2 }, 2.3);

        // Texts
        textRefs.current.forEach((ref, i) => {
            if (!ref) return;
            tl.fromTo(
                ref,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
                1.5 + i * 0.3
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
            id="section-certificates"
            style={{ flexDirection: "column", gap: "40px", perspective: "1000px" }}
        >
            <div className="font-code" style={{ fontSize: "0.75rem", color: "rgba(255,0,51,0.5)", letterSpacing: "0.3em", zIndex: 2 }}>
                CREDENTIAL SYSTEM
            </div>

            {/* Certificate */}
            <div
                ref={certRef}
                className="cert-float"
                style={{
                    maxWidth: "500px",
                    width: "100%",
                    opacity: 0,
                    zIndex: 2,
                    position: "relative",
                    transformStyle: "preserve-3d",
                }}
            >
                <div
                    className="glass-panel-strong"
                    style={{
                        padding: "40px",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Laser scanline */}
                    <div
                        ref={laserRef}
                        style={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            height: "2px",
                            background: "linear-gradient(90deg, transparent 0%, #FF0033 30%, #FF0033 70%, transparent 100%)",
                            boxShadow: "0 0 15px rgba(255,0,51,0.8), 0 0 30px rgba(255,0,51,0.4)",
                            zIndex: 5,
                            opacity: 0,
                        }}
                    />

                    {/* Header */}
                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                        <div
                            className="font-headline"
                            style={{
                                fontSize: "0.6rem",
                                letterSpacing: "0.4em",
                                color: "rgba(255,0,51,0.5)",
                                marginBottom: "8px",
                            }}
                        >
                            FYX HUB CERTIFIED
                        </div>
                        <div
                            className="font-headline red-glow"
                            style={{
                                fontSize: "1.3rem",
                                fontWeight: 800,
                                color: "#FF0033",
                            }}
                        >
                            WINNER CERTIFICATE
                        </div>
                    </div>

                    {/* Content */}
                    <div style={{ textAlign: "center", marginBottom: "24px" }}>
                        <div
                            className="font-body"
                            style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}
                        >
                            This certifies that
                        </div>
                        <div
                            className="font-headline"
                            style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", margin: "8px 0" }}
                        >
                            xR_Phantom
                        </div>
                        <div
                            className="font-body"
                            style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}
                        >
                            has completed Sprint #2847 with an FXP score of 1,247
                            <br />
                            on February 11, 2026
                        </div>
                    </div>

                    {/* QR Code */}
                    <div style={{ display: "flex", justifyContent: "center", marginBottom: "16px" }}>
                        <div
                            style={{
                                width: "80px",
                                height: "80px",
                                border: "1px solid rgba(255,0,51,0.2)",
                                borderRadius: "4px",
                                padding: "8px",
                                background: "rgba(0,0,0,0.3)",
                            }}
                        >
                            {/* Simulated QR pattern */}
                            <svg viewBox="0 0 64 64" width="100%" height="100%">
                                {/* QR corner squares */}
                                <rect x="0" y="0" width="18" height="18" fill="none" stroke="rgba(255,0,51,0.6)" strokeWidth="2" />
                                <rect x="4" y="4" width="10" height="10" fill="rgba(255,0,51,0.4)" />
                                <rect x="46" y="0" width="18" height="18" fill="none" stroke="rgba(255,0,51,0.6)" strokeWidth="2" />
                                <rect x="50" y="4" width="10" height="10" fill="rgba(255,0,51,0.4)" />
                                <rect x="0" y="46" width="18" height="18" fill="none" stroke="rgba(255,0,51,0.6)" strokeWidth="2" />
                                <rect x="4" y="50" width="10" height="10" fill="rgba(255,0,51,0.4)" />
                                {/* Data pattern */}
                                {Array.from({ length: 36 }).map((_, i) => {
                                    const x = 18 + (i % 6) * 5;
                                    const y = 18 + Math.floor(i / 6) * 5;
                                    // Deterministic pattern based on index
                                    const show = (i * 7 + 3) % 10 > 4;
                                    return show ? (
                                        <rect key={i} x={x} y={y} width="4" height="4" fill="rgba(255,0,51,0.35)" />
                                    ) : null;
                                })}
                            </svg>
                        </div>
                    </div>

                    {/* Verification badge */}
                    <div
                        className="font-code"
                        style={{
                            textAlign: "center",
                            fontSize: "0.55rem",
                            letterSpacing: "0.2em",
                            color: "rgba(255,0,51,0.4)",
                        }}
                    >
                        QR VERIFIED • BLOCKCHAIN ANCHORED • UNFAKEABLE
                    </div>

                    {/* Decorative corners */}
                    {[
                        { top: "8px", left: "8px" },
                        { top: "8px", right: "8px" },
                        { bottom: "8px", left: "8px" },
                        { bottom: "8px", right: "8px" },
                    ].map((pos, i) => (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                ...pos,
                                width: "20px",
                                height: "20px",
                                borderTop: i < 2 ? "1px solid rgba(255,0,51,0.3)" : "none",
                                borderBottom: i >= 2 ? "1px solid rgba(255,0,51,0.3)" : "none",
                                borderLeft: i % 2 === 0 ? "1px solid rgba(255,0,51,0.3)" : "none",
                                borderRight: i % 2 === 1 ? "1px solid rgba(255,0,51,0.3)" : "none",
                            } as React.CSSProperties}
                        />
                    ))}
                </div>
            </div>

            {/* Text lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", textAlign: "center", zIndex: 2 }}>
                {["WINNER CERTIFICATE.", "PARTICIPATION CERTIFICATE.", "QR VERIFIED. UNFAKEABLE."].map(
                    (text, i) => (
                        <div
                            key={text}
                            ref={(el) => { textRefs.current[i] = el; }}
                            className={`font-headline ${i === 2 ? "red-glow" : ""}`}
                            style={{
                                fontSize: "clamp(0.9rem, 2vw, 1.4rem)",
                                fontWeight: i === 2 ? 800 : 600,
                                color: i === 2 ? "#FF0033" : "rgba(255,255,255,0.5)",
                                opacity: 0,
                            }}
                        >
                            {text}
                        </div>
                    )
                )}
            </div>

            <div className="font-body" style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.25)", textAlign: "center", zIndex: 2 }}>
                Certificates verified by QR.
            </div>
        </section>
    );
}
