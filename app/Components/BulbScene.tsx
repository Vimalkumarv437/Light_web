"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { Sparkles } from "@react-three/drei"
import { useRef, useState, useCallback } from "react"
import * as THREE from "three"

export interface BulbSceneProps {
  lightOn: boolean
  setLightOn: (v: boolean) => void
}

function BulbModel({ lightOn, setLightOn }: BulbSceneProps) {
  const group = useRef<THREE.Group>(null!)
  const flickerRef = useRef(0)
  const [cordOffset, setCordOffset] = useState(0)
  const isDragging = useRef(false)
  const hasFired = useRef(false)
  const startY = useRef(0)
  const lightOnRef = useRef(lightOn)
  lightOnRef.current = lightOn

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (!isDragging.current) return
    const dy = e.clientY - startY.current
    const move = Math.max(0, Math.min(dy * 0.015, 1.0))
    setCordOffset(move)
    if (move > 0.25 && !hasFired.current) {
      hasFired.current = true
      setLightOn(!lightOnRef.current)
    }
  }, [setLightOn])

  const onPointerUp = useCallback(() => {
    isDragging.current = false
    hasFired.current = false
    setCordOffset(0)
    document.body.style.cursor = "default"
    window.removeEventListener("pointermove", onPointerMove)
    window.removeEventListener("pointerup", onPointerUp)
  }, [onPointerMove])

  const onKnobPointerDown = useCallback((e: any) => {
    e.stopPropagation()
    isDragging.current = true
    hasFired.current = false
    startY.current = e.clientY
    document.body.style.cursor = "grabbing"
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)
  }, [onPointerMove, onPointerUp])

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime()
    group.current.rotation.z = Math.sin(t * 1.1) * (lightOn ? 0.04 : 0.012)
    if (lightOn) {
      flickerRef.current = 0.88 + Math.sin(t * 47) * 0.04 + Math.sin(t * 31) * 0.03
    }
  })

  const fi = lightOn ? flickerRef.current * 6 : 0
  const bulbEmissive = lightOn ? "#ffd54f" : "#000"
  const bulbColor = lightOn ? "#fff9e6" : "#2a2a2a"
  const cordY = -1.1 - cordOffset
  const knobY = -1.65 - cordOffset

  return (
    <group ref={group} position={[0, 0.6, 0]}>

      {/* Ceiling mount */}
      <mesh position={[0, 1.6, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.07, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Main wire */}
      <mesh position={[0, 0.85, 0]}>
        <cylinderGeometry args={[0.011, 0.011, 1.5, 12]} />
        <meshStandardMaterial color="#1c1c1c" roughness={0.9} />
      </mesh>

      {/* Socket body */}
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.18, 0.21, 0.26, 32]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.3} metalness={0.85} />
      </mesh>

      {/* Socket rings */}
      {[0.21, 0.15, 0.09].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <torusGeometry args={[0.19, 0.011, 8, 32]} />
          <meshStandardMaterial color="#666" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}

      {/* Bulb neck */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.12, 0.26, 0.28, 32]} />
        <meshPhysicalMaterial
          transmission={0.85}
          thickness={0.4}
          roughness={0.05}
          color={bulbColor}
          emissive={bulbEmissive}
          emissiveIntensity={fi * 0.3}
        />
      </mesh>

      {/* Glass globe */}
      <mesh position={[0, -0.5, 0]}>
        <sphereGeometry args={[0.44, 64, 64]} />
        <meshPhysicalMaterial
          transmission={0.95}
          thickness={0.5}
          roughness={0}
          ior={1.5}
          color={bulbColor}
          emissive={bulbEmissive}
          emissiveIntensity={fi * 0.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Filament group */}
      <group position={[0, -0.48, 0]}>
        {[-0.06, 0.06].map((x, i) => (
          <mesh key={i} position={[x, -0.08, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 0.22, 6]} />
            <meshStandardMaterial
              color={lightOn ? "#ff9800" : "#444"}
              emissive={lightOn ? "#ff6f00" : "#000"}
              emissiveIntensity={fi}
            />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.085, 0.009, 12, 48]} />
          <meshStandardMaterial
            color={lightOn ? "#ffcc02" : "#555"}
            emissive={lightOn ? "#ffaa00" : "#000"}
            emissiveIntensity={fi * 1.2}
            roughness={0.3}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.045, 0.005, 8, 32]} />
          <meshStandardMaterial
            color={lightOn ? "#fff176" : "#444"}
            emissive={lightOn ? "#ffee58" : "#000"}
            emissiveIntensity={fi * 1.5}
          />
        </mesh>
      </group>

      {/* Pull cord */}
      <mesh position={[0, cordY, 0]}>
        <cylinderGeometry args={[0.007, 0.007, 0.9, 8]} />
        <meshStandardMaterial color="#d4c9a8" roughness={1} />
      </mesh>

      {/* Knob */}
      <mesh
        position={[0, knobY, 0]}
        onPointerDown={onKnobPointerDown}
        onPointerEnter={() => { document.body.style.cursor = "grab" }}
        onPointerLeave={() => { if (!isDragging.current) document.body.style.cursor = "default" }}
      >
        <sphereGeometry args={[0.13, 32, 32]} />
        <meshStandardMaterial color="#e8dcc8" roughness={0.4} metalness={0.1} />
      </mesh>
      <mesh position={[0, knobY, 0]}>
        <torusGeometry args={[0.13, 0.014, 8, 24]} />
        <meshStandardMaterial color="#bbb0a0" roughness={0.3} metalness={0.3} />
      </mesh>

      {/* Lights + effects */}
      {lightOn && (
        <>
          <pointLight position={[0, -0.5, 0]} intensity={40} distance={20} color="#ffd54f" />
          <pointLight position={[0, -0.5, 0]} intensity={10} distance={7} color="#fff9c4" />
          <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.8, 0]}>
            <coneGeometry args={[2.4, 6, 48, 1, true]} />
            <meshBasicMaterial color="#ffd54f" transparent opacity={0.055} side={THREE.DoubleSide} />
          </mesh>
          <mesh rotation={[Math.PI, 0, 0]} position={[0, -0.8, 0]}>
            <coneGeometry args={[1.2, 4, 32, 1, true]} />
            <meshBasicMaterial color="#ffe082" transparent opacity={0.075} side={THREE.DoubleSide} />
          </mesh>
          <Sparkles count={50} size={2.5} speed={0.3} scale={[5, 5, 5]} color="#ffd54f" opacity={0.6} />
        </>
      )}
    </group>
  )
}

export default function BulbScene({ lightOn, setLightOn }: BulbSceneProps) {
  return (
    <div style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      inset: 0,
      touchAction: "none",
      background: "transparent",
      overflow: "visible",
    }}>
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 48 }}
        gl={{
          antialias: true,
          alpha: true,
          premultipliedAlpha: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0)
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          touchAction: "none",
        }}
      >
        <ambientLight
          intensity={lightOn ? 0.35 : 0.07}
          color={lightOn ? "#fff3e0" : "#8888bb"}
        />
        <BulbModel lightOn={lightOn} setLightOn={setLightOn} />
        <EffectComposer>
          <Bloom
            intensity={lightOn ? 2.2 : 0.08}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}