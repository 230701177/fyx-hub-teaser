"use client";

import React, { useEffect, useRef, useState } from "react";

export default function GlitchOverlay() {
    const [active, setActive] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.85) {
                setActive(true);
                setTimeout(() => setActive(false), 150 + Math.random() * 200);
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let animId: number;
        let scanlineY = 0;

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Scanline
            scanlineY += 1.5;
            if (scanlineY > canvas.height) scanlineY = 0;

            ctx.fillStyle = "rgba(255, 0, 51, 0.03)";
            ctx.fillRect(0, scanlineY, canvas.width, 2);
            ctx.fillRect(0, scanlineY - canvas.height, canvas.width, 2);

            // Random noise lines
            if (active) {
                for (let i = 0; i < 5; i++) {
                    const y = Math.random() * canvas.height;
                    const h = Math.random() * 3 + 1;
                    ctx.fillStyle = `rgba(255, 0, 51, ${Math.random() * 0.15})`;
                    ctx.fillRect(0, y, canvas.width, h);
                }

                // Displacement blocks
                for (let i = 0; i < 3; i++) {
                    const y = Math.random() * canvas.height;
                    const h = Math.random() * 20 + 5;
                    const x = Math.random() * 20 - 10;
                    ctx.fillStyle = `rgba(255, 0, 51, ${Math.random() * 0.08})`;
                    ctx.fillRect(x, y, canvas.width, h);
                }
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", handleResize);
        };
    }, [active]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 1,
                pointerEvents: "none",
                opacity: 0.7,
            }}
        />
    );
}
