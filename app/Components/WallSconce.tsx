"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

interface SconceProps {
    lit: boolean
}

function PendantDome({ lit }: SconceProps) {
    const group = useRef<THREE.Group>(null!)
    const flickerRef = useRef(1)

    useFrame(({ clock }) => {
        if (!lit) return
        const t = clock.getElapsedTime()
        flickerRef.current =
            0.92 + Math.sin(t * 61) * 0.03 +
            Math.sin(t * 37) * 0.025 +
            Math.sin(t * 19) * 0.015
        if (group.current) {
            group.current.rotation.z = Math.sin(t * 0.8) * 0.018
        }
    })

    const fi = lit ? flickerRef.current * 5.5 : 0
    const bulbEm = lit ? "#ffd54f" : "#000"
    const bulbCol = lit ? "#fff9e6" : "#1e1e1e"
    const brass = "#b8923a"
    const brassDk = "#8a6a20"
    const brassLt = "#d4aa50"

    return (
        <group ref={group} position={[0, 0.2, 0]} scale={0.6}>

            {/* Ceiling rose */}
            <mesh position={[0, 1.62, 0]}>
                <cylinderGeometry args={[0.18, 0.16, 0.06, 32]} />
                <meshStandardMaterial color={brass} roughness={0.25} metalness={0.95} />
            </mesh>
            <mesh position={[0, 1.59, 0]}>
                <torusGeometry args={[0.17, 0.012, 8, 32]} />
                <meshStandardMaterial color={brassLt} roughness={0.15} metalness={1} />
            </mesh>

            {/* Rod */}
            <mesh position={[0, 1.1, 0]}>
                <cylinderGeometry args={[0.018, 0.018, 1.0, 16]} />
                <meshStandardMaterial color={brass} roughness={0.2} metalness={0.95} />
            </mesh>
            <mesh position={[0, 0.62, 0]}>
                <cylinderGeometry args={[0.028, 0.022, 0.045, 16]} />
                <meshStandardMaterial color={brassDk} roughness={0.2} metalness={1} />
            </mesh>

            {/* Socket */}
            <mesh position={[0, 0.52, 0]}>
                <cylinderGeometry args={[0.1, 0.12, 0.22, 24]} />
                <meshStandardMaterial color={brass} roughness={0.22} metalness={0.95} />
            </mesh>
            {[0.55, 0.49, 0.43].map((y, i) => (
                <mesh key={i} position={[0, y, 0]}>
                    <torusGeometry args={[0.11, 0.009, 8, 24]} />
                    <meshStandardMaterial color={brassLt} metalness={1} roughness={0.12} />
                </mesh>
            ))}

            {/* Bulb neck */}
            <mesh position={[0, 0.26, 0]}>
                <cylinderGeometry args={[0.07, 0.12, 0.2, 28]} />
                <meshPhysicalMaterial
                    transmission={0.88} thickness={0.35} roughness={0.04}
                    color={bulbCol} emissive={bulbEm} emissiveIntensity={fi * 0.25}
                />
            </mesh>

            {/* Bulb globe */}
            <mesh position={[0, 0.02, 0]}>
                <sphereGeometry args={[0.26, 56, 56]} />
                <meshPhysicalMaterial
                    transmission={0.96} thickness={0.45} roughness={0} ior={1.5}
                    color={bulbCol} emissive={bulbEm} emissiveIntensity={fi * 0.55}
                    transparent opacity={0.88}
                />
            </mesh>

            {/* Filament */}
            <group position={[0, 0.04, 0]}>
                {[-0.04, 0.04].map((x, i) => (
                    <mesh key={i} position={[x, -0.06, 0]}>
                        <cylinderGeometry args={[0.004, 0.004, 0.16, 6]} />
                        <meshStandardMaterial
                            color={lit ? "#ffb300" : "#333"}
                            emissive={lit ? "#ff6f00" : "#000"}
                            emissiveIntensity={fi}
                        />
                    </mesh>
                ))}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.052, 0.007, 10, 36]} />
                    <meshStandardMaterial
                        color={lit ? "#ffc400" : "#444"}
                        emissive={lit ? "#ffaa00" : "#000"}
                        emissiveIntensity={fi * 1.4}
                    />
                </mesh>
            </group>

            {/* Dome outer */}
            <mesh position={[0, -0.32, 0]}>
                <sphereGeometry args={[0.72, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
                <meshStandardMaterial color={brass} roughness={0.28} metalness={0.92} side={THREE.FrontSide} />
            </mesh>

            {/* Dome inner */}
            <mesh position={[0, -0.32, 0]}>
                <sphereGeometry args={[0.68, 64, 64, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
                <meshStandardMaterial
                    color={lit ? "#5a3a08" : "#1a1a1a"}
                    emissive={lit ? "#ff8c00" : "#000"}
                    emissiveIntensity={fi * 0.22}
                    roughness={0.55} metalness={0.3}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Dome rim */}
            <mesh position={[0, -0.69, 0]}>
                <torusGeometry args={[0.595, 0.022, 12, 64]} />
                <meshStandardMaterial color={brassLt} roughness={0.1} metalness={1} />
            </mesh>

            {/* Dome cap */}
            <mesh position={[0, -0.02, 0]}>
                <cylinderGeometry args={[0.095, 0.095, 0.04, 24]} />
                <meshStandardMaterial color={brassDk} roughness={0.2} metalness={1} />
            </mesh>

            {/* Decorative rings */}
            {[-0.18, -0.38, -0.56].map((y, i) => {
                const r = 0.72 * Math.sin(Math.acos(Math.min(1, Math.max(-1, (y + 0.32) / -0.72)))) * 0.97
                return (
                    <mesh key={i} position={[0, y, 0]}>
                        <torusGeometry args={[r, 0.007, 8, 48]} />
                        <meshStandardMaterial color={brassLt} roughness={0.12} metalness={1} />
                    </mesh>
                )
            })}

            {/* Lights */}
            {lit && (
                <>
                    <pointLight position={[0, 0.02, 0]} intensity={36} distance={18} color="#ffd54f" />
                    <pointLight position={[0, -0.5, 0]} intensity={8} distance={7} color="#ffcc70" />
                    <mesh position={[0, -1.1, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[1.8, 4.5, 48, 1, true]} />
                        <meshBasicMaterial color="#ffd54f" transparent opacity={0.045} side={THREE.DoubleSide} />
                    </mesh>
                    <mesh position={[0, -1.0, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.9, 3.5, 32, 1, true]} />
                        <meshBasicMaterial color="#ffe082" transparent opacity={0.065} side={THREE.DoubleSide} />
                    </mesh>
                </>
            )}
        </group>
    )
}

export default function WallSconce({ lit }: SconceProps) {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            overflow: "visible",
        }}>
            <Canvas
                camera={{ position: [0, 0, 3.2], fov: 58 }}
                gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
                onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
                style={{
                    background: "transparent",
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                }}
            >
                <ambientLight intensity={lit ? 0.22 : 0.05} color={lit ? "#fff3e0" : "#555"} />
                <PendantDome lit={lit} />
                <EffectComposer>
                    <Bloom
                        intensity={lit ? 2.0 : 0.05}
                        luminanceThreshold={0.18}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    )
}