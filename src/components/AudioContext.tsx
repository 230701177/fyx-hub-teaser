"use client";

import React, { createContext, useContext, useRef, useCallback, useState, useEffect } from "react";
import { Howl, Howler } from "howler";

interface AudioContextType {
    playBassHit: () => void;
    playGlitch: () => void;
    playWhoosh: () => void;
    playAlert: () => void;
    toggleMute: () => void;
    isMuted: boolean;
}

const AudioCtx = createContext<AudioContextType>({
    playBassHit: () => { },
    playGlitch: () => { },
    playWhoosh: () => { },
    playAlert: () => { },
    toggleMute: () => { },
    isMuted: true,
});

export const useAudio = () => useContext(AudioCtx);

// Generate synthetic sounds using Web Audio API
function createSyntheticSound(type: "bass" | "glitch" | "whoosh" | "alert"): Howl {
    if (typeof window === "undefined") return null as any;
    // We'll use tiny inline base64 audio - these are synthesized procedurally
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();

    const duration = type === "bass" ? 0.5 : type === "glitch" ? 0.15 : type === "whoosh" ? 0.4 : 0.3;
    const sampleRate = audioContext.sampleRate;
    const numSamples = Math.floor(duration * sampleRate);
    const buffer = audioContext.createBuffer(1, numSamples, sampleRate);
    const channelData = buffer.getChannelData(0);

    for (let i = 0; i < numSamples; i++) {
        const t = i / sampleRate;
        const env = Math.exp(-t * (type === "bass" ? 5 : type === "glitch" ? 30 : 8));

        switch (type) {
            case "bass":
                channelData[i] = Math.sin(2 * Math.PI * 50 * t) * env * 0.8 +
                    Math.sin(2 * Math.PI * 30 * t) * env * 0.4;
                break;
            case "glitch":
                channelData[i] = (Math.random() * 2 - 1) * env * 0.5;
                break;
            case "whoosh":
                // Glassy "Tech Swipe" - No noise, just clean sine harmonics
                // Starts at 400Hz and drops very smoothly for a "premium" feel
                const baseFreq = 400 * Math.exp(-t * 8);
                channelData[i] = (
                    Math.sin(2 * Math.PI * baseFreq * t) * 0.6 + // Fundamental
                    Math.sin(2 * Math.PI * baseFreq * 2.01 * t) * 0.2 + // Slightly detuned harmonic
                    Math.sin(2 * Math.PI * baseFreq * 2.99 * t) * 0.1 // Third harmonic
                ) * env * 0.8;
                break;
            case "alert":
                channelData[i] = Math.sin(2 * Math.PI * 800 * t) * env * 0.4 *
                    (Math.sin(2 * Math.PI * 5 * t) > 0 ? 1 : 0.5);
                break;
        }
    }

    // Convert buffer to WAV blob
    const wavBuffer = audioBufferToWav(buffer);
    const blob = new Blob([wavBuffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);

    return new Howl({ src: [url], format: ["wav"], volume: 1.0 });
}

function audioBufferToWav(buffer: AudioBuffer): ArrayBuffer {
    const numChannels = buffer.numberOfChannels;
    const sampleRate = buffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;
    const bytesPerSample = bitDepth / 8;
    const blockAlign = numChannels * bytesPerSample;
    const dataSize = buffer.length * blockAlign;
    const headerSize = 44;
    const totalSize = headerSize + dataSize;

    const arrayBuffer = new ArrayBuffer(totalSize);
    const view = new DataView(arrayBuffer);

    const writeString = (offset: number, str: string) => {
        for (let i = 0; i < str.length; i++) {
            view.setUint8(offset + i, str.charCodeAt(i));
        }
    };

    writeString(0, "RIFF");
    view.setUint32(4, totalSize - 8, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * blockAlign, true);
    view.setUint16(32, blockAlign, true);
    view.setUint16(34, bitDepth, true);
    writeString(36, "data");
    view.setUint32(40, dataSize, true);

    const channelData = buffer.getChannelData(0);
    let offset = 44;
    for (let i = 0; i < buffer.length; i++) {
        const sample = Math.max(-1, Math.min(1, channelData[i]));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7FFF, true);
        offset += 2;
    }

    return arrayBuffer;
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
    const soundsRef = useRef<{
        bass?: Howl;
        glitch?: Howl;
        whoosh?: Howl;
        alert?: Howl;
        initialized: boolean;
    }>({ initialized: false });

    // Default to unmuted, but we need interaction to start
    const [isMuted, setIsMuted] = useState(false);
    const lastScrollY = useRef(0);
    const scrollThreshold = 150; // Balanced threshold
    const scrollDelta = useRef(0);

    const initSounds = useCallback(() => {
        if (soundsRef.current.initialized) return;
        try {
            // Force auto-unlock
            Howler.autoUnlock = true;

            soundsRef.current.bass = createSyntheticSound("bass");
            soundsRef.current.glitch = createSyntheticSound("glitch");
            soundsRef.current.whoosh = createSyntheticSound("whoosh");
            soundsRef.current.alert = createSyntheticSound("alert");
            soundsRef.current.initialized = true;

            // Ensure Howler is unmuted and context is resumed
            Howler.mute(false);
            if (Howler.ctx && Howler.ctx.state === 'suspended') {
                Howler.ctx.resume();
            }
            console.log("Audio objects created and Howler initialized.");
        } catch (e) {
            console.error("Audio initialization error:", e);
        }
    }, []);

    const playBassHit = useCallback(() => {
        if (isMuted) return;
        initSounds();
        if (soundsRef.current.bass) {
            console.log("Playing Bass Hit...");
            soundsRef.current.bass.volume(0.8);
            soundsRef.current.bass.play();
        }
    }, [isMuted, initSounds]);

    const playGlitch = useCallback(() => {
        if (isMuted) return;
        initSounds();
        soundsRef.current.glitch?.play();
    }, [isMuted, initSounds]);

    const playWhoosh = useCallback((volume = 0.4) => {
        if (isMuted) return;
        initSounds();
        const sound = soundsRef.current.whoosh;
        if (sound) {
            sound.volume(volume);
            sound.play();
        }
    }, [isMuted, initSounds]);

    const playAlert = useCallback(() => {
        if (isMuted) return;
        initSounds();
        soundsRef.current.alert?.play();
    }, [isMuted, initSounds]);

    const toggleMute = useCallback(() => {
        if (isMuted) {
            initSounds();
        }
        const newMuted = !isMuted;
        setIsMuted(newMuted);
    }, [isMuted, initSounds]);

    // Global interaction listener to unblock audio
    useEffect(() => {
        const handleInteraction = () => {
            console.log("Interaction detected: attempting to unlock audio context...");
            initSounds();

            // Explicitly play a silent note to force context activation
            if (soundsRef.current.initialized && soundsRef.current.whoosh) {
                soundsRef.current.whoosh.play();
                soundsRef.current.whoosh.stop();
                console.log("Sent unlock signal via synthetic whoosh.");
            }

            // Check state
            if (Howler.ctx && Howler.ctx.state !== 'running') {
                Howler.ctx.resume().then(() => {
                    console.log("AudioContext resumed successfully. State:", Howler.ctx.state);
                });
            } else {
                console.log("AudioContext state check:", Howler.ctx ? Howler.ctx.state : "No context available yet");
            }

            window.removeEventListener("mousedown", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("click", handleInteraction);
        };

        window.addEventListener("mousedown", handleInteraction);
        window.addEventListener("keydown", handleInteraction);
        window.addEventListener("touchstart", handleInteraction);
        window.addEventListener("click", handleInteraction);

        return () => {
            window.removeEventListener("mousedown", handleInteraction);
            window.removeEventListener("keydown", handleInteraction);
            window.removeEventListener("touchstart", handleInteraction);
            window.removeEventListener("click", handleInteraction);
        };
    }, [initSounds]);

    return (
        <AudioCtx.Provider value={{ playBassHit, playGlitch, playWhoosh, playAlert, toggleMute, isMuted }}>
            {children}
        </AudioCtx.Provider>
    );
}
