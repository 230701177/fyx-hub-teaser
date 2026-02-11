"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useAudio } from "../AudioContext";

gsap.registerPlugin(ScrollTrigger);

export default function Section12LogoFinale() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const pulseRef = useRef<HTMLDivElement>(null);
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const ctaRef = useRef<HTMLButtonElement>(null);
    const [emailInput, setEmailInput] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const { playBassHit } = useAudio();

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

        // Explosion pulse
        tl.fromTo(
            pulseRef.current,
            { scale: 0, opacity: 1 },
            {
                scale: 8,
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                onStart: () => playBassHit(),
            },
            0
        );

        // Logo appears
        tl.fromTo(
            logoRef.current,
            { scale: 0.3, opacity: 0, filter: "blur(20px)" },
            {
                scale: 1,
                opacity: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "elastic.out(1, 0.5)",
            },
            0.3
        );

        // Text lines
        textRefs.current.forEach((ref, i) => {
            if (!ref) return;
            tl.fromTo(
                ref,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
                0.8 + i * 0.3
            );
        });

        // CTA button
        tl.fromTo(
            ctaRef.current,
            { opacity: 0, y: 20, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
            },
            1.8
        );

        return () => {
            ScrollTrigger.getAll().forEach((t) => {
                if (t.trigger === section) t.kill();
            });
        };
    }, [playBassHit]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (emailInput.trim()) {
            setSubmitted(true);
        }
    };

    return (
        <section
            ref={sectionRef}
            className="cinema-section"
            id="section-finale"
            style={{ flexDirection: "column", gap: "30px" }}
        >
            {/* Explosion pulse */}
            <div
                ref={pulseRef}
                style={{
                    position: "absolute",
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,0,51,0.6), rgba(255,0,51,0.2), transparent)",
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            />

            {/* Logo */}
            <div
                ref={logoRef}
                style={{
                    opacity: 0,
                    zIndex: 2,
                    textAlign: "center",
                }}
            >
                <img
                    src="/fyx-logo-bg.svg"
                    alt="FYX HUB Logo"
                    style={{
                        width: "clamp(250px, 50vw, 600px)",
                        height: "auto",
                        filter: "drop-shadow(0 0 40px rgba(255,0,51,0.6))",
                    }}
                />
            </div>

            {/* Taglines */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", textAlign: "center", zIndex: 2 }}>
                <div
                    ref={(el) => { textRefs.current[0] = el; }}
                    className="font-headline"
                    style={{
                        fontSize: "clamp(1rem, 2vw, 1.5rem)",
                        fontWeight: 600,
                        color: "rgba(255,255,255,0.6)",
                        letterSpacing: "0.3em",
                        opacity: 0,
                    }}
                >
                    LAUNCHING SOON
                </div>
                <div
                    ref={(el) => { textRefs.current[1] = el; }}
                    className="font-headline red-glow"
                    style={{
                        fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
                        fontWeight: 700,
                        color: "#FF0033",
                        letterSpacing: "0.2em",
                        opacity: 0,
                    }}
                >
                    ENTER THE ARENA
                </div>
            </div>

            {/* CTA */}
            {!submitted ? (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "16px",
                        zIndex: 2,
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: "8px",
                            maxWidth: "420px",
                            width: "100%",
                        }}
                    >
                        <input
                            type="email"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                            placeholder="your@email.com"
                            className="font-code"
                            id="waitlist-email"
                            style={{
                                flex: 1,
                                padding: "14px 20px",
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,0,51,0.15)",
                                borderRadius: "4px",
                                color: "#FFFFFF",
                                fontSize: "0.8rem",
                                outline: "none",
                                transition: "border-color 0.3s ease",
                            }}
                        />
                        <button
                            ref={ctaRef}
                            type="submit"
                            className="cta-button"
                            id="join-waitlist-button"
                            style={{ opacity: 0, padding: "14px 32px" }}
                        >
                            JOIN WAITLIST
                        </button>
                    </div>
                    <div
                        className="font-code"
                        style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}
                    >
                        BE FIRST TO ENTER THE ARENA
                    </div>
                </form>
            ) : (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                        zIndex: 2,
                    }}
                >
                    <div
                        className="font-headline red-glow"
                        style={{ fontSize: "1.2rem", fontWeight: 700, color: "#FF0033" }}
                    >
                        YOU&apos;RE IN.
                    </div>
                    <div
                        className="font-code"
                        style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}
                    >
                        Welcome to the arena, warrior.
                    </div>
                </div>
            )}

            {/* Bottom text */}
            <div
                className="font-body"
                style={{
                    position: "absolute",
                    bottom: "40px",
                    fontSize: "0.7rem",
                    color: "rgba(255,255,255,0.15)",
                    zIndex: 2,
                    textAlign: "center",
                }}
            >
                © 2026 FYX HUB. All rights reserved. This is not a tutorial. This is execution under pressure.
            </div>
        </section>
    );
}
