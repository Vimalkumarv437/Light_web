"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const works = [
    {
        id: 1,
        category: "Brand Identity",
        title: "Aurum Studio",
        description: "Full visual identity system — wordmark, palette, and brand guidelines.",
        accent: "#d4aa50",
        bg: "#0a0804",
        elements: (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", padding: "32px" }}>
                <div style={{ width: "80px", height: "80px", border: "2px solid #d4aa50", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "40px", height: "40px", background: "#d4aa50", borderRadius: "50%" }} />
                </div>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.2rem", fontWeight: 300, letterSpacing: "0.3em", color: "#d4aa50" }}>AURUM</div>
                    <div style={{ fontSize: "9px", letterSpacing: "5px", color: "#555", marginTop: "6px" }}>STUDIO</div>
                </div>
                <div style={{ display: "flex", gap: "10px", marginTop: "8px" }}>
                    {["#d4aa50", "#8a6a20", "#f0ebe0", "#1a1410", "#2d2010"].map((c) => (
                        <div key={c} style={{ width: "28px", height: "28px", borderRadius: "50%", background: c, border: "1px solid rgba(255,255,255,0.08)" }} />
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 2,
        category: "Web Design",
        title: "Meridian Agency",
        description: "Award-winning agency site with immersive scroll interactions.",
        accent: "#6eb5ff",
        bg: "#04080f",
        elements: (
            <div style={{ width: "100%", height: "100%", padding: "28px", display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ width: "60px", height: "8px", background: "#6eb5ff", borderRadius: "4px" }} />
                    <div style={{ display: "flex", gap: "12px" }}>
                        {[40, 36, 40, 30].map((w, i) => <div key={i} style={{ width: `${w}px`, height: "6px", background: "#1e2a3a", borderRadius: "3px" }} />)}
                    </div>
                </div>
                <div style={{ marginTop: "16px" }}>
                    <div style={{ width: "75%", height: "18px", background: "#0e1a2a", borderRadius: "4px", marginBottom: "8px" }} />
                    <div style={{ width: "55%", height: "14px", background: "#0a1420", borderRadius: "4px", marginBottom: "6px" }} />
                    <div style={{ width: "40%", height: "14px", background: "#0a1420", borderRadius: "4px" }} />
                </div>
                <div style={{ width: "90px", height: "28px", background: "#6eb5ff", borderRadius: "3px", marginTop: "8px" }} />
                <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
                    {[1, 2, 3].map(i => (
                        <div key={i} style={{ flex: 1, height: "60px", background: "#0a1624", border: "1px solid #1a2a3a", borderRadius: "4px" }} />
                    ))}
                </div>
            </div>
        ),
    },
    {
        id: 3,
        category: "UI/UX Design",
        title: "Pulse Health App",
        description: "Patient-first health dashboard with calm, accessible interface design.",
        accent: "#7ee8a2",
        bg: "#030f08",
        elements: (
            <div style={{ width: "100%", height: "100%", padding: "24px", display: "flex", gap: "14px" }}>
                <div style={{ width: "44px", display: "flex", flexDirection: "column", gap: "14px", alignItems: "center", paddingTop: "8px" }}>
                    {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} style={{ width: "28px", height: "28px", borderRadius: "8px", background: i === 1 ? "#7ee8a2" : "#0a1f10" }} />
                    ))}
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
                    <div style={{ width: "50%", height: "10px", background: "#0d2018", borderRadius: "4px" }} />
                    <div style={{ flex: 1, background: "#061410", border: "1px solid #0d2018", borderRadius: "6px", padding: "12px", display: "flex", alignItems: "flex-end", gap: "6px" }}>
                        {[55, 70, 45, 80, 60, 90, 72].map((h, i) => (
                            <div key={i} style={{ flex: 1, height: `${h}%`, background: i === 5 ? "#7ee8a2" : "#0d2018", borderRadius: "3px 3px 0 0" }} />
                        ))}
                    </div>
                    <div style={{ display: "flex", gap: "8px" }}>
                        {["#7ee8a2", "#0d2018", "#0d2018"].map((bg, i) => (
                            <div key={i} style={{ flex: 1, height: "32px", background: bg, borderRadius: "4px" }} />
                        ))}
                    </div>
                </div>
            </div>
        ),
    },
    {
        id: 4,
        category: "Motion & Animation",
        title: "Flux Motion Reel",
        description: "Brand motion system with micro-interactions and transition library.",
        accent: "#ff6b6b",
        bg: "#0f0404",
        elements: (
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", padding: "28px" }}>
                <div style={{ position: "relative", width: "100px", height: "100px" }}>
                    {[100, 72, 48].map((size, i) => (
                        <div key={i} style={{
                            position: "absolute",
                            top: "50%", left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: `${size}px`, height: `${size}px`,
                            border: `${i === 0 ? 1 : i === 1 ? 2 : 3}px solid`,
                            borderColor: i === 0 ? "rgba(255,107,107,0.2)" : i === 1 ? "rgba(255,107,107,0.5)" : "#ff6b6b",
                            borderRadius: "50%",
                        }} />
                    ))}
                    <div style={{
                        position: "absolute", top: "50%", left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "20px", height: "20px",
                        background: "#ff6b6b", borderRadius: "50%",
                    }} />
                </div>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "11px", letterSpacing: "4px", color: "#ff6b6b", textTransform: "uppercase" }}>Motion System</div>
                    <div style={{ fontSize: "9px", letterSpacing: "3px", color: "#3a1818", marginTop: "6px" }}>12 Components · 48 Variants</div>
                </div>
                <div style={{ width: "100%", height: "4px", background: "#1a0808", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ width: "65%", height: "100%", background: "#ff6b6b", borderRadius: "2px" }} />
                </div>
            </div>
        ),
    },
]

export default function WorksMonitor({ visible }: { visible: boolean }) {
    const [active, setActive] = useState(0)

    useEffect(() => {
        if (!visible) return
        const interval = setInterval(() => {
            setActive((i) => (i + 1) % works.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [visible])

    const work = works[active]

    return (
        <div style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
        }}>
            <div style={{ width: "100%", maxWidth: "540px", position: "relative" }}>

                {/* ── Screen bezel ── */}
                <div style={{
                    background: "#0e0e0e",
                    borderRadius: "12px 12px 4px 4px",
                    padding: "14px 14px 10px",
                    border: "1px solid #222",
                    boxShadow: "0 0 0 1px #111, 0 24px 60px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)",
                    position: "relative",
                }}>
                    {/* camera dot */}
                    <div style={{
                        position: "absolute",
                        top: "7px", left: "50%",
                        transform: "translateX(-50%)",
                        width: "6px", height: "6px",
                        borderRadius: "50%",
                        background: "#1a1a1a",
                        border: "1px solid #2a2a2a",
                    }} />

                    {/* Screen */}
                    <div style={{
                        borderRadius: "4px",
                        overflow: "hidden",
                        background: work.bg,
                        height: "300px",
                        position: "relative",
                        border: "1px solid #111",
                    }}>
                        <div style={{
                            position: "absolute", inset: 0,
                            background: `radial-gradient(ellipse at 50% 0%, ${work.accent}08, transparent 70%)`,
                            zIndex: 1, pointerEvents: "none",
                        }} />
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={work.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.5 }}
                                style={{ width: "100%", height: "100%", position: "relative", zIndex: 2 }}
                            >
                                {work.elements}
                            </motion.div>
                        </AnimatePresence>
                        {/* scanlines */}
                        <div style={{
                            position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
                            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
                        }} />
                    </div>

                    {/* Bottom bezel */}
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: "8px",
                        paddingLeft: "4px",
                        paddingRight: "4px",
                    }}>
                        <div style={{ fontSize: "9px", letterSpacing: "3px", color: "#2a2a2a", fontFamily: "Syne, sans-serif" }}>
                            {work.category.toUpperCase()}
                        </div>
                        <div style={{ display: "flex", gap: "5px" }}>
                            {works.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    style={{
                                        width: i === active ? "16px" : "5px",
                                        height: "5px",
                                        borderRadius: "3px",
                                        background: i === active ? work.accent : "#222",
                                        border: "none",
                                        cursor: "pointer",
                                        padding: 0,
                                        transition: "all 0.3s ease",
                                    }}
                                />
                            ))}
                        </div>
                        <div style={{ fontSize: "9px", letterSpacing: "2px", color: "#2a2a2a", fontFamily: "Syne, sans-serif" }}>
                            LUMINA
                        </div>
                    </div>
                </div>

                {/* ── Monitor neck ── */}
                <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <div style={{
                        width: "0", height: "0",
                        borderLeft: "28px solid transparent",
                        borderRight: "28px solid transparent",
                        borderTop: "16px solid #0e0e0e",
                    }} />
                    <div style={{
                        width: "52px", height: "28px",
                        background: "linear-gradient(180deg, #0e0e0e, #141414)",
                        borderLeft: "1px solid #1a1a1a",
                        borderRight: "1px solid #1a1a1a",
                    }} />
                    <div style={{
                        width: "160px", height: "12px",
                        background: "linear-gradient(180deg, #141414, #0a0a0a)",
                        borderRadius: "0 0 30px 30px",
                        border: "1px solid #1a1a1a",
                        borderTop: "none",
                    }} />
                </div>

                {/* ── Desk table ── */}
                <div style={{
                    width: "140%",
                    marginLeft: "-20%",
                    position: "relative",
                }}>
                    {/* table top surface */}
                    <div style={{
                        width: "100%",
                        height: "18px",
                        background: "linear-gradient(180deg, #2a1f0e 0%, #1e1508 100%)",
                        borderRadius: "3px 3px 0 0",
                        border: "1px solid #3a2a12",
                        borderBottom: "none",
                        boxShadow: "0 -2px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,180,60,0.06)",
                        position: "relative",
                        overflow: "hidden",
                    }}>
                        {/* wood grain */}
                        <div style={{
                            position: "absolute", inset: 0,
                            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.08) 39px, rgba(0,0,0,0.08) 40px)",
                        }} />
                        {/* sheen */}
                        <div style={{
                            position: "absolute", top: 0, left: 0, right: 0,
                            height: "4px",
                            background: "linear-gradient(180deg, rgba(255,180,60,0.07), transparent)",
                        }} />
                    </div>

                    {/* table front face */}
                    <div style={{
                        width: "100%",
                        height: "28px",
                        background: "linear-gradient(180deg, #1e1508 0%, #140f05 100%)",
                        border: "1px solid #2a1e0a",
                        borderTop: "none",
                        overflow: "hidden",
                        position: "relative",
                    }}>
                        <div style={{
                            position: "absolute", inset: 0,
                            backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(0,0,0,0.06) 39px, rgba(0,0,0,0.06) 40px)",
                        }} />
                    </div>

                    {/* table legs */}
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "0 20px" }}>
                        {[0, 1].map(i => (
                            <div key={i} style={{
                                width: "14px",
                                height: "36px",
                                background: "linear-gradient(180deg, #1a1206, #0e0a04)",
                                border: "1px solid #2a1e0a",
                                borderTop: "none",
                                borderRadius: "0 0 3px 3px",
                            }} />
                        ))}
                    </div>

                    {/* floor shadow */}
                    <div style={{
                        width: "90%",
                        height: "12px",
                        marginLeft: "5%",
                        background: "radial-gradient(ellipse at 50% 0%, rgba(0,0,0,0.5), transparent 70%)",
                        filter: "blur(4px)",
                    }} />
                </div>

                {/* Work info */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={work.id}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        style={{ textAlign: "center", marginTop: "20px" }}
                    >
                        <div style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: "1.3rem",
                            fontWeight: 300,
                            color: "#f0ebe0",
                            letterSpacing: "0.05em",
                        }}>
                            {work.title}
                        </div>
                        <div style={{
                            fontSize: "11px",
                            color: "#4a4030",
                            marginTop: "6px",
                            letterSpacing: "1px",
                            maxWidth: "320px",
                            margin: "6px auto 0",
                            lineHeight: 1.6,
                            fontFamily: "Syne, sans-serif",
                        }}>
                            {work.description}
                        </div>
                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
    )
}