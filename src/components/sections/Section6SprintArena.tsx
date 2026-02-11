"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const codeLines = [
    { text: 'import { Arena } from "@fyx/core";', color: "#c792ea" },
    { text: "", color: "" },
    { text: "const sprint = new Arena({", color: "#82aaff" },
    { text: '  mode: "competitive",', color: "#c3e88d" },
    { text: "  duration: 7200,", color: "#f78c6c" },
    { text: "  players: 2,", color: "#f78c6c" },
    { text: '  focus: "enforced"', color: "#c3e88d" },
    { text: "});", color: "#82aaff" },
    { text: "", color: "" },
    { text: "sprint.onStart(() => {", color: "#82aaff" },
    { text: "  console.log('Arena activated');", color: "#c3e88d" },
    { text: "  performanceTracker.begin();", color: "#ffcb6b" },
    { text: "});", color: "#82aaff" },
];

const consoleLogs = [
    { text: "[FYX] Arena initialized...", type: "info" },
    { text: "[FYX] Connecting to peer...", type: "info" },
    { text: "[FYX] Connection established ✓", type: "success" },
    { text: "[FYX] Sprint countdown: 3...2...1", type: "warn" },
    { text: "[FYX] >>> ARENA ACTIVATED <<<", type: "error" },
    { text: "[FYX] Focus tracking: ENABLED", type: "info" },
    { text: "[FYX] Test suite loaded (12 tests)", type: "info" },
];

const testResults = [
    { name: "auth.login()", status: "pass" },
    { name: "data.fetch()", status: "pass" },
    { name: "api.validate()", status: "pass" },
    { name: "render.component()", status: "running" },
    { name: "cache.invalidate()", status: "pending" },
];

export default function Section6SprintArena() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLDivElement>(null);
    const [visibleLines, setVisibleLines] = useState(0);
    const [visibleLogs, setVisibleLogs] = useState(0);
    const [cursorVisible, setCursorVisible] = useState(true);

    // Cursor blink
    useEffect(() => {
        const interval = setInterval(() => setCursorVisible((v) => !v), 500);
        return () => clearInterval(interval);
    }, []);

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
                    setVisibleLines(Math.floor(progress * codeLines.length * 2));
                    setVisibleLogs(Math.floor(progress * consoleLogs.length * 2));
                },
            },
        });

        // Title
        tl.fromTo(
            titleRef.current,
            { opacity: 0, y: -30 },
            { opacity: 1, y: 0, duration: 0.3 },
            0
        );

        // Editor slides in
        tl.fromTo(
            editorRef.current,
            { y: 100, opacity: 0, scale: 0.95 },
            { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power3.out" },
            0.2
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
            id="section-sprint-arena"
            style={{ flexDirection: "column", gap: "30px", padding: "40px 20px" }}
        >
            {/* Title */}
            <div ref={titleRef} style={{ textAlign: "center", opacity: 0, zIndex: 2 }}>
                <div
                    className="font-headline red-glow"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 3rem)", fontWeight: 900, color: "#FF0033" }}
                >
                    CODE UNDER PRESSURE.
                </div>
                <div
                    className="font-body"
                    style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.3)", marginTop: "8px" }}
                >
                    This is execution under pressure.
                </div>
            </div>

            {/* VSCode-style Editor */}
            <div
                ref={editorRef}
                style={{
                    maxWidth: "900px",
                    width: "100%",
                    opacity: 0,
                    zIndex: 2,
                    borderRadius: "12px",
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(255,0,51,0.05)",
                }}
            >
                {/* Title bar */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 16px",
                        background: "rgba(30,30,30,0.95)",
                        borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                >
                    <div style={{ display: "flex", gap: "8px" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FF5F56" }} />
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#FFBD2E" }} />
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#27C93F" }} />
                    </div>
                    <div className="font-code" style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>
                        sprint.arena.ts — FYX HUB
                    </div>
                    <div className="font-code" style={{ fontSize: "0.55rem", color: "rgba(255,0,51,0.5)", letterSpacing: "0.1em" }}>
                        LIVE
                    </div>
                </div>

                {/* Editor body */}
                <div style={{ display: "flex", minHeight: "350px" }}>
                    {/* Code panel */}
                    <div
                        style={{
                            flex: "1.5",
                            background: "rgba(20,20,25,0.98)",
                            padding: "16px 20px",
                            fontFamily: "var(--font-code)",
                            fontSize: "0.75rem",
                            lineHeight: "1.8",
                            overflowY: "auto",
                            borderRight: "1px solid rgba(255,255,255,0.04)",
                        }}
                    >
                        {codeLines.map((line, i) => (
                            <div
                                key={i}
                                style={{
                                    display: "flex",
                                    opacity: i < visibleLines ? 1 : 0.1,
                                    transition: "opacity 0.3s ease",
                                }}
                            >
                                <span style={{ color: "rgba(255,255,255,0.15)", marginRight: "20px", userSelect: "none", minWidth: "20px", textAlign: "right" }}>
                                    {i + 1}
                                </span>
                                <span style={{ color: line.color || "rgba(255,255,255,0.4)" }}>
                                    {line.text}
                                    {i === visibleLines - 1 && (
                                        <span
                                            style={{
                                                display: "inline-block",
                                                width: "2px",
                                                height: "14px",
                                                background: "#FF0033",
                                                marginLeft: "2px",
                                                verticalAlign: "middle",
                                                opacity: cursorVisible ? 1 : 0,
                                            }}
                                        />
                                    )}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Right panel */}
                    <div style={{ flex: "1", display: "flex", flexDirection: "column", background: "rgba(15,15,20,0.98)" }}>
                        {/* Console */}
                        <div style={{ flex: 1, padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                            <div
                                className="font-code"
                                style={{
                                    fontSize: "0.6rem",
                                    color: "rgba(255,255,255,0.25)",
                                    letterSpacing: "0.15em",
                                    marginBottom: "10px",
                                }}
                            >
                                CONSOLE
                            </div>
                            {consoleLogs.map((log, i) => (
                                <div
                                    key={i}
                                    className="font-code"
                                    style={{
                                        fontSize: "0.6rem",
                                        marginBottom: "4px",
                                        opacity: i < visibleLogs ? 1 : 0,
                                        transition: "opacity 0.3s ease",
                                        color:
                                            log.type === "success"
                                                ? "#27C93F"
                                                : log.type === "warn"
                                                    ? "#FFBD2E"
                                                    : log.type === "error"
                                                        ? "#FF0033"
                                                        : "rgba(255,255,255,0.4)",
                                    }}
                                >
                                    {log.text}
                                </div>
                            ))}
                        </div>

                        {/* Test Suite */}
                        <div style={{ flex: 1, padding: "12px 16px" }}>
                            <div
                                className="font-code"
                                style={{
                                    fontSize: "0.6rem",
                                    color: "rgba(255,255,255,0.25)",
                                    letterSpacing: "0.15em",
                                    marginBottom: "10px",
                                }}
                            >
                                TESTS
                            </div>
                            {testResults.map((test, i) => (
                                <div
                                    key={i}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        marginBottom: "6px",
                                    }}
                                >
                                    <span
                                        style={{
                                            width: "6px",
                                            height: "6px",
                                            borderRadius: "50%",
                                            background:
                                                test.status === "pass"
                                                    ? "#27C93F"
                                                    : test.status === "running"
                                                        ? "#FFBD2E"
                                                        : "rgba(255,255,255,0.15)",
                                        }}
                                    />
                                    <span
                                        className="font-code"
                                        style={{
                                            fontSize: "0.6rem",
                                            color:
                                                test.status === "pass"
                                                    ? "rgba(255,255,255,0.5)"
                                                    : "rgba(255,255,255,0.25)",
                                        }}
                                    >
                                        {test.name}
                                    </span>
                                    <span
                                        className="font-code"
                                        style={{
                                            fontSize: "0.5rem",
                                            marginLeft: "auto",
                                            color:
                                                test.status === "pass"
                                                    ? "#27C93F"
                                                    : test.status === "running"
                                                        ? "#FFBD2E"
                                                        : "rgba(255,255,255,0.15)",
                                        }}
                                    >
                                        {test.status === "pass"
                                            ? "✓"
                                            : test.status === "running"
                                                ? "●"
                                                : "○"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Status bar */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "4px 16px",
                        background: "rgba(255,0,51,0.08)",
                        borderTop: "1px solid rgba(255,0,51,0.15)",
                    }}
                >
                    <div className="font-code" style={{ fontSize: "0.55rem", color: "rgba(255,0,51,0.6)" }}>
                        ● LIVE SPRINT
                    </div>
                    <div className="font-code" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.3)" }}>
                        1:47:23 remaining
                    </div>
                    <div className="font-code" style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.3)" }}>
                        Focus: 94%
                    </div>
                </div>
            </div>
        </section>
    );
}
