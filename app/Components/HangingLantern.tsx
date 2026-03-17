"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import * as THREE from "three"

interface LanternProps {
    lit: boolean
}

function Lantern({ lit }: LanternProps) {
    const group = useRef<THREE.Group>(null!)
    const lanternGroup = useRef<THREE.Group>(null!)
    const flickerRef = useRef(1)

    useFrame(({ clock }) => {
        if (!lanternGroup.current) return
        const t = clock.getElapsedTime()
        // gentle sway
        lanternGroup.current.rotation.z = Math.sin(t * 0.7) * 0.035 + Math.sin(t * 1.3) * 0.015
        if (lit) {
            flickerRef.current =
                0.9 + Math.sin(t * 61) * 0.04 +
                Math.sin(t * 37) * 0.03 +
                Math.sin(t * 23) * 0.015
        }
    })

    const fi = lit ? flickerRef.current * 5.5 : 0
    const iron = "#1a1612"
    const ironMid = "#242018"
    const ironLt = "#3a3228"
    const glassCol = lit ? "#fff9e6" : "#1a1a1a"
    const glassEm = lit ? "#ffd54f" : "#000"

    return (
        <group ref={group} position={[0, 0, 0]}>

            {/* ── Wall bracket ── */}
            {/* wall plate */}
            <mesh position={[0.55, 0.9, -0.18]}>
                <boxGeometry args={[0.18, 0.42, 0.06]} />
                <meshStandardMaterial color={iron} roughness={0.7} metalness={0.6} />
            </mesh>
            {/* wall plate rivets */}
            {[0.72, 0.88, 1.04].map((y, i) => (
                <mesh key={i} position={[0.55, y, -0.15]}>
                    <sphereGeometry args={[0.018, 8, 8]} />
                    <meshStandardMaterial color={ironLt} roughness={0.4} metalness={0.8} />
                </mesh>
            ))}

            {/* horizontal arm */}
            <mesh position={[0.18, 0.94, 0]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.022, 0.022, 0.76, 14]} />
                <meshStandardMaterial color={ironMid} roughness={0.35} metalness={0.85} />
            </mesh>

            {/* decorative curl at wall end */}
            <mesh position={[0.52, 1.02, 0]} rotation={[0, 0, Math.PI * 0.7]}>
                <torusGeometry args={[0.1, 0.016, 8, 20, Math.PI * 1.2]} />
                <meshStandardMaterial color={ironMid} roughness={0.35} metalness={0.85} />
            </mesh>

            {/* decorative curl at tip */}
            <mesh position={[-0.18, 1.02, 0]} rotation={[0, 0, Math.PI * 0.3]}>
                <torusGeometry args={[0.08, 0.014, 8, 16, Math.PI]} />
                <meshStandardMaterial color={ironMid} roughness={0.35} metalness={0.85} />
            </mesh>

            {/* hook at arm tip */}
            <mesh position={[-0.18, 0.9, 0]} rotation={[0, 0, Math.PI * 0.15]}>
                <torusGeometry args={[0.055, 0.016, 8, 16, Math.PI * 1.4]} />
                <meshStandardMaterial color={iron} roughness={0.4} metalness={0.8} />
            </mesh>

            {/* chain link 1 */}
            <mesh position={[-0.18, 0.76, 0]}>
                <torusGeometry args={[0.028, 0.009, 8, 16]} />
                <meshStandardMaterial color={ironMid} roughness={0.3} metalness={0.9} />
            </mesh>
            {/* chain link 2 */}
            <mesh position={[-0.18, 0.68, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.028, 0.009, 8, 16]} />
                <meshStandardMaterial color={ironMid} roughness={0.3} metalness={0.9} />
            </mesh>
            {/* chain link 3 */}
            <mesh position={[-0.18, 0.60, 0]}>
                <torusGeometry args={[0.028, 0.009, 8, 16]} />
                <meshStandardMaterial color={ironMid} roughness={0.3} metalness={0.9} />
            </mesh>

            {/* ── Lantern body — swaying group ── */}
            <group ref={lanternGroup} position={[-0.18, 0.52, 0]}>

                {/* top cap */}
                <mesh position={[0, 0.38, 0]}>
                    <cylinderGeometry args={[0.16, 0.2, 0.06, 20]} />
                    <meshStandardMaterial color={iron} roughness={0.4} metalness={0.75} />
                </mesh>
                {/* top cap pyramid roof */}
                <mesh position={[0, 0.46, 0]}>
                    <coneGeometry args={[0.2, 0.2, 4, 1]} />
                    <meshStandardMaterial color={iron} roughness={0.45} metalness={0.7} />
                </mesh>
                {/* roof tip finial */}
                <mesh position={[0, 0.57, 0]}>
                    <sphereGeometry args={[0.028, 12, 12]} />
                    <meshStandardMaterial color={ironLt} roughness={0.3} metalness={0.9} />
                </mesh>

                {/* 4 corner vertical frame bars */}
                {[
                    [0.13, 0, 0.13],
                    [-0.13, 0, 0.13],
                    [0.13, 0, -0.13],
                    [-0.13, 0, -0.13],
                ].map((pos, i) => (
                    <mesh key={i} position={pos as [number, number, number]}>
                        <cylinderGeometry args={[0.013, 0.013, 0.7, 8]} />
                        <meshStandardMaterial color={ironMid} roughness={0.35} metalness={0.85} />
                    </mesh>
                ))}

                {/* 4 glass panels */}
                {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((rot, i) => (
                    <mesh key={i} position={[Math.sin(rot) * 0.14, 0, Math.cos(rot) * 0.14]} rotation={[0, rot, 0]}>
                        <planeGeometry args={[0.26, 0.68]} />
                        <meshPhysicalMaterial
                            transmission={0.88}
                            thickness={0.04}
                            roughness={0.05}
                            color={glassCol}
                            emissive={glassEm}
                            emissiveIntensity={fi * 0.15}
                            transparent
                            opacity={0.82}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                ))}

                {/* horizontal frame rings — top middle bottom */}
                {[0.35, 0, -0.35].map((y, i) => (
                    <mesh key={i} position={[0, y, 0]}>
                        <torusGeometry args={[0.185, 0.011, 8, 28]} />
                        <meshStandardMaterial color={ironMid} roughness={0.3} metalness={0.85} />
                    </mesh>
                ))}

                {/* bottom cap */}
                <mesh position={[0, -0.38, 0]}>
                    <cylinderGeometry args={[0.16, 0.1, 0.055, 20]} />
                    <meshStandardMaterial color={iron} roughness={0.4} metalness={0.75} />
                </mesh>
                {/* bottom drip finial */}
                <mesh position={[0, -0.44, 0]}>
                    <coneGeometry args={[0.04, 0.1, 12]} rotation={[Math.PI, 0, 0]} />
                    <meshStandardMaterial color={ironLt} roughness={0.3} metalness={0.85} />
                </mesh>

                {/* candle inside */}
                <mesh position={[0, -0.22, 0]}>
                    <cylinderGeometry args={[0.04, 0.04, 0.18, 12]} />
                    <meshStandardMaterial color="#f5f0e8" roughness={0.9} metalness={0} />
                </mesh>
                {/* flame */}
                {lit && (
                    <mesh position={[0, -0.1, 0]}>
                        <sphereGeometry args={[0.035, 10, 10]} />
                        <meshStandardMaterial
                            color="#ff9800"
                            emissive="#ff6f00"
                            emissiveIntensity={fi * 2}
                            roughness={0}
                        />
                    </mesh>
                )}

                {/* ── Lights ── */}
                {lit && (
                    <>
                        <pointLight position={[0, 0, 0]} intensity={22} distance={12} color="#ffd54f" />
                        <pointLight position={[0, -0.1, 0]} intensity={6} distance={5} color="#ff9800" />
                        {/* omnidirectional warm glow */}
                        <mesh position={[0, 0, 0]}>
                            <sphereGeometry args={[0.5, 16, 16]} />
                            <meshBasicMaterial
                                color="#ff9800"
                                transparent
                                opacity={0.04}
                                side={THREE.BackSide}
                            />
                        </mesh>
                    </>
                )}
            </group>
        </group>
    )
}

export default function HangingLantern({ lit }: LanternProps) {
    return (
        <div style={{
            width: "100%",
            height: "100%",
            background: "transparent",
            overflow: "visible",
        }}>
            <Canvas
                camera={{ position: [0, 0, 4.8], fov: 38 }}
                gl={{ antialias: true, alpha: true, premultipliedAlpha: false }}
                onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
                style={{
                    background: "transparent",
                    width: "100%",
                    height: "100%",
                    overflow: "visible",
                }}
            >
                <ambientLight intensity={lit ? 0.2 : 0.06} color={lit ? "#fff3e0" : "#555"} />
                <Lantern lit={lit} />
                <EffectComposer>
                    <Bloom
                        intensity={lit ? 1.9 : 0.04}
                        luminanceThreshold={0.18}
                        luminanceSmoothing={0.9}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    )
}