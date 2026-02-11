"use client";

import React from "react";
import { useAudio } from "./AudioContext";

export default function AudioToggle() {
    const { toggleMute, isMuted } = useAudio();

    return (
        <button
            onClick={toggleMute}
            className="audio-toggle"
            aria-label={isMuted ? "Unmute audio" : "Mute audio"}
            id="audio-toggle"
        >
            <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "20px" }}>
                {[12, 18, 8, 14, 10].map((h, i) => (
                    <div
                        key={i}
                        className="audio-bar"
                        style={{
                            height: isMuted ? "4px" : `${h}px`,
                            transition: `height 0.3s ease ${i * 0.05}s`,
                        }}
                    />
                ))}
            </div>
        </button>
    );
}
