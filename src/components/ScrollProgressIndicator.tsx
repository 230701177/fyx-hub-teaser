"use client";

import React, { useEffect, useState } from "react";

export default function ScrollProgressIndicator() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const current = window.scrollY;
            setProgress((current / totalHeight) * 100);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}
