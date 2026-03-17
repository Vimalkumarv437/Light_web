"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

interface LampProps {
    lit: boolean
}

function DeskLamp({ lit }: LampProps) {
    const group = useRef<THREE.Group>(null!)
    const flickerRef = useRef(1)

    useFrame(({ clock }) => {
        if (!lit) return
        const t = clock.getElapsedTime()
        flickerRef.current =
            0.93 + Math.sin(t * 57) * 0.025 +
            Math.sin(t * 33) * 0.018 +
            Math.sin(t * 19) * 0.012
    })

    const fi = lit ? flickerRef.current * 5 : 0
    const brass = "#b8923a"
    const brassDk = "#7a5e18"
    const brassLt = "#d4aa50"
    const green = "#2d5016"
    const greenIn = lit ? "#3a6b1a" : "#1a2a0a"

    return (
        <group ref={group} position={[0, 0, 0]} scale={1.0}>

            {/* ── Weighted base ── */}
            <mesh position={[0, -1.72, 0]}>
                <cylinderGeometry args={[0.52, 0.58, 0.055, 40]} />
                <meshStandardMaterial color={brass} roughness={0.22} metalness={0.95} />
            </mesh>
            {/* base bevel ring */}
            <mesh position={[0, -1.695, 0]}>
                <torusGeometry args={[0.55, 0.022, 10, 48]} />
                <meshStandardMaterial color={brassLt} roughness={0.12} metalness={1} />
            </mesh>
            {/* inner raised platform */}
            <mesh position={[0, -1.675, 0]}>
                <cylinderGeometry args={[0.36, 0.50, 0.045, 36]} />
                <meshStandardMaterial color={brassDk} roughness={0.28} metalness={0.9} />
            </mesh>
            {/* base collar */}
            <mesh position={[0, -1.645, 0]}>
                <cylinderGeometry args={[0.32, 0.34, 0.055, 32]} />
                <meshStandardMaterial color={brass} roughness={0.2} metalness={0.95} />
            </mesh>

            {/* ── Stem ── */}
            <mesh position={[0, -0.95, 0]}>
                <cylinderGeometry args={[0.038, 0.055, 1.45, 18]} />
                <meshStandardMaterial color={brass} roughness={0.2} metalness={0.95} />
            </mesh>
            {/* bottom stem collar */}
            <mesh position={[0, -1.61, 0]}>
                <cylinderGeometry args={[0.068, 0.058, 0.085, 18]} />
                <meshStandardMaterial color={brassDk} roughness={0.22} metalness={1} />
            </mesh>
            {/* top stem collar */}
            <mesh position={[0, -0.22, 0]}>
                <cylinderGeometry args={[0.058, 0.048, 0.065, 18]} />
                <meshStandardMaterial color={brassDk} roughness={0.22} metalness={1} />
            </mesh>
            {/* knurled mid rings */}
            {[-1.1, -0.75].map((y, i) => (
                <mesh key={i} position={[0, y, 0]}>
                    <torusGeometry args={[0.045, 0.01, 8, 24]} />
                    <meshStandardMaterial color={brassLt} roughness={0.12} metalness={1} />
                </mesh>
            ))}

            {/* ── Harp fitter ── */}
            <mesh position={[0, -0.16, 0]}>
                <cylinderGeometry args={[0.055, 0.072, 0.09, 18]} />
                <meshStandardMaterial color={brass} roughness={0.2} metalness={0.95} />
            </mesh>

            {/* ── Socket ── */}
            <mesh position={[0, -0.04, 0]}>
                <cylinderGeometry args={[0.078, 0.088, 0.15, 20]} />
                <meshStandardMaterial color={brass} roughness={0.22} metalness={0.95} />
            </mesh>
            {[-0.02, -0.07, -0.12].map((y, i) => (
                <mesh key={i} position={[0, y, 0]}>
                    <torusGeometry args={[0.082, 0.007, 8, 24]} />
                    <meshStandardMaterial color={brassLt} roughness={0.12} metalness={1} />
                </mesh>
            ))}

            {/* ── Bulb ── */}
            <mesh position={[0, 0.1, 0]}>
                <cylinderGeometry args={[0.048, 0.076, 0.13, 20]} />
                <meshPhysicalMaterial
                    transmission={0.88}
                    thickness={0.28}
                    roughness={0.04}
                    color={lit ? "#fff9e6" : "#1e1e1e"}
                    emissive={lit ? "#ffd54f" : "#000"}
                    emissiveIntensity={fi * 0.28}
                />
            </mesh>
            <mesh position={[0, 0.22, 0]}>
                <sphereGeometry args={[0.16, 40, 40]} />
                <meshPhysicalMaterial
                    transmission={0.96}
                    thickness={0.32}
                    roughness={0}
                    ior={1.5}
                    color={lit ? "#fff9e6" : "#1e1e1e"}
                    emissive={lit ? "#ffd54f" : "#000"}
                    emissiveIntensity={fi * 0.55}
                    transparent
                    opacity={0.88}
                />
            </mesh>
            {/* filament */}
            <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.036, 0.005, 8, 28]} />
                <meshStandardMaterial
                    color={lit ? "#ffc400" : "#333"}
                    emissive={lit ? "#ffaa00" : "#000"}
                    emissiveIntensity={fi * 1.5}
                />
            </mesh>

            {/* ── Shade — classic banker green cone ── */}
            {/* outer */}
            <mesh position={[0, 0.14, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.68, 0.50, 64, 1, true]} />
                <meshStandardMaterial
                    color={green}
                    roughness={0.55}
                    metalness={0.05}
                    side={THREE.FrontSide}
                />
            </mesh>
            {/* inner warm glow */}
            <mesh position={[0, 0.14, 0]} rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[0.64, 0.47, 64, 1, true]} />
                <meshStandardMaterial
                    color={greenIn}
                    emissive={lit ? "#88aa00" : "#000"}
                    emissiveIntensity={fi * 0.2}
                    roughness={0.6}
                    side={THREE.BackSide}
                />
            </mesh>
            {/* top cap */}
            <mesh position={[0, 0.38, 0]}>
                <cylinderGeometry args={[0.068, 0.068, 0.016, 32]} />
                <meshStandardMaterial color={brassDk} roughness={0.2} metalness={1} />
            </mesh>
            {/* shade rim brass ring */}
            <mesh position={[0, -0.11, 0]}>
                <torusGeometry args={[0.665, 0.016, 10, 64]} />
                <meshStandardMaterial color={brassLt} roughness={0.1} metalness={1} />
            </mesh>
            {/* shade top rim */}
            <mesh position={[0, 0.382, 0]}>
                <torusGeometry args={[0.069, 0.009, 8, 32]} />
                <meshStandardMaterial color={brassLt} roughness={0.1} metalness={1} />
            </mesh>

            {/* ── Lights ── */}
            {lit && (
                <>
                    <pointLight
                        position={[0, 0.2, 0]}
                        intensity={30}
                        distance={15}
                        color="#ffd54f"
                    />
                    <pointLight
                        position={[0, -0.3, 0]}
                        intensity={9}
                        distance={7}
                        color="#ffcc70"
                    />
                    {/* downward cone */}
                    <mesh position={[0, -0.75, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[1.5, 3.8, 48, 1, true]} />
                        <meshBasicMaterial
                            color="#ffd54f"
                            transparent
                            opacity={0.048}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                    {/* tight centre */}
                    <mesh position={[0, -0.65, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.7, 2.8, 32, 1, true]} />
                        <meshBasicMaterial
                            color="#ffe082"
                            transparent
                            opacity={0.068}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                    {/* desk pool */}
                    <pointLight
                        position={[0, -1.65, 0]}
                        intensity={4}
                        distance={4}
                        color="#ffcc44"
                    />
                </>
            )}
        </group>
    )
}

export default function TableLamp({ lit }: LampProps) {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            overflow: "visible",
        }}>
            <Canvas
                camera={{ position: [0, 0, 3.6], fov: 46 }}
                gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
                onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
                style={{
                    background: "transparent",
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                }}
            >
                <ambientLight
                    intensity={lit ? 0.2 : 0.05}
                    color={lit ? "#fff3e0" : "#555"}
                />
                <DeskLamp lit={lit} />
                <EffectComposer>
                    <Bloom
                        intensity={lit ? 1.8 : 0.04}
                        luminanceThreshold={0.18}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    )
}