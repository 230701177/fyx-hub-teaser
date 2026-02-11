"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles({ count = 1500 }: { count?: number }) {
    const mesh = useRef<THREE.Points>(null!);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    const [positions, sizes] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const siz = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            // Deterministic formulas instead of Math.random()
            pos[i * 3] = ((i * 13) % 40) - 20;
            pos[i * 3 + 1] = ((i * 17) % 40) - 20;
            pos[i * 3 + 2] = ((i * 19) % 20) - 10;

            siz[i] = ((i * 37) % 30) / 10 + 0.5;
        }
        return [pos, siz];
    }, [count]);

    const particleGeometry = useMemo(() => {
        const geo = new THREE.BufferGeometry();
        geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        geo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
        return geo;
    }, [positions, sizes]);

    const particleMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uMouse: { value: new THREE.Vector2(0, 0) },
                uColor: { value: new THREE.Color("#FF0033") },
                uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
            },
            vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        uniform float uPixelRatio;
        attribute float aSize;
        varying float vAlpha;
        
        void main() {
          vec3 pos = position;
          pos.x += sin(uTime * 0.3 + position.y * 0.5) * 0.3;
          pos.y += cos(uTime * 0.2 + position.x * 0.3) * 0.3;
          pos.z += sin(uTime * 0.1 + position.x * 0.2) * 0.2;
          
          // Mouse interaction
          float dist = length(pos.xy - uMouse * 10.0);
          pos.xy += normalize(pos.xy - uMouse * 10.0) * max(0.0, 3.0 - dist) * 0.3;
          
          vec4 modelPosition = modelMatrix * vec4(pos, 1.0);
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectedPosition = projectionMatrix * viewPosition;
          
          gl_Position = projectedPosition;
          gl_PointSize = aSize * uPixelRatio * (1.0 / -viewPosition.z) * 20.0;
          
          vAlpha = smoothstep(0.0, 0.5, aSize / 3.5) * (1.0 - smoothstep(10.0, 20.0, -viewPosition.z));
        }
      `,
            fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        
        void main() {
          float dist = length(gl_PointCoord - vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = smoothstep(0.5, 0.0, dist) * vAlpha * 0.6;
          gl_FragColor = vec4(uColor, alpha);
        }
      `,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
        });
    }, []);

    useFrame(({ clock }) => {
        if (mesh.current) {
            const mat = mesh.current.material as THREE.ShaderMaterial;
            if (mat.uniforms) {
                mat.uniforms.uTime.value = clock.getElapsedTime();
                mat.uniforms.uMouse.value.set(
                    mouseRef.current.x,
                    mouseRef.current.y
                );
            }
            mesh.current.rotation.y = clock.getElapsedTime() * 0.02;
        }
    });

    return <points ref={mesh} geometry={particleGeometry} material={particleMaterial} />;
}

function RedMist() {
    const meshRef = useRef<THREE.Mesh>(null!);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
            },
            vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
            fragmentShader: `
        uniform float uTime;
        varying vec2 vUv;
        
        float noise(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
        }
        
        float smoothNoise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          f = f * f * (3.0 - 2.0 * f);
          float a = noise(i);
          float b = noise(i + vec2(1.0, 0.0));
          float c = noise(i + vec2(0.0, 1.0));
          float d = noise(i + vec2(1.0, 1.0));
          return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
        }
        
        void main() {
          vec2 uv = vUv;
          float n = smoothNoise(uv * 3.0 + uTime * 0.1);
          n += smoothNoise(uv * 6.0 - uTime * 0.05) * 0.5;
          n += smoothNoise(uv * 12.0 + uTime * 0.08) * 0.25;
          n /= 1.75;
          
          float edge = smoothstep(0.0, 0.3, uv.x) * smoothstep(1.0, 0.7, uv.x);
          edge *= smoothstep(0.0, 0.3, uv.y) * smoothstep(1.0, 0.7, uv.y);
          
          vec3 color = vec3(0.5, 0.0, 0.08) * n;
          float alpha = n * 0.15 * edge;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
            transparent: true,
            depthWrite: false,
        });
    }, []);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            const mat = meshRef.current.material as THREE.ShaderMaterial;
            if (mat.uniforms) {
                mat.uniforms.uTime.value = clock.getElapsedTime();
            }
        }
    });

    return (
        <mesh ref={meshRef} material={material} position={[0, 0, -5]}>
            <planeGeometry args={[50, 50]} />
        </mesh>
    );
}

export default function RedParticleBackground() {
    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 0,
                pointerEvents: "none",
            }}
        >
            <Canvas
                camera={{ position: [0, 0, 15], fov: 60 }}
                dpr={[1, 2]}
                style={{ background: "transparent" }}
            >
                <Particles />
                <RedMist />
            </Canvas>
        </div>
    );
}
