"use client"

import { useState, useEffect, useRef } from "react"
import BulbScene from "../Components/BulbScene"
import WallSconce from "../Components/WallSconce"
import HangingLantern from "../Components/HangingLantern"
import WorksMonitor from "../Components/WorksMonitor"
import type { BulbSceneProps } from "../Components/BulbScene"
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion"
import styles from "../scss/hero.module.scss"

const taglines = [
  "Design that illuminates.",
  "Where ideas spark.",
  "Built for those who build.",
]

const services = [
  {
    icon: "◈",
    title: "Web Design & Development",
    desc: "Pixel-perfect interfaces engineered for performance, built to convert and delight.",
    tag: "01",
  },
  {
    icon: "◉",
    title: "Branding & Identity",
    desc: "Visual systems that speak before words do — logos, palettes, and brand language.",
    tag: "02",
  },
  {
    icon: "◎",
    title: "UI/UX Design",
    desc: "Intuitive flows and human-centred experiences that reduce friction and build trust.",
    tag: "03",
  },
  {
    icon: "◐",
    title: "Motion & Animation",
    desc: "Purposeful movement that guides attention, adds delight, and brings interfaces alive.",
    tag: "04",
  },
]

export default function Hero() {
  const [lightOn, setLightOn] = useState(false)
  const [taglineIndex, setTaglineIndex] = useState(0)
  const [sconcelit, setSconceLit] = useState(false)
  const [lampLit, setLampLit] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 22,
    restDelta: 0.001,
  })

  // ── Hero ──
  const heroOpacity = useTransform(smoothProgress, [0, 0.22], [1, 0])
  const hangingBulbOpacity = useTransform(smoothProgress, [0, 0.20], [1, 0])

  // ── Services ──
  // Services + sconce now fade in together at the same time
  const servicesOpacity = useTransform(smoothProgress, [0.20, 0.42], [0, 1])
  const sconceOpacity = useTransform(smoothProgress, [0.20, 0.42], [0, 1]) // same as section
  const sconceX = useTransform(smoothProgress, [0.20, 0.40], [-40, 0]) // slides in with content
  const roomGlowOpacity = useTransform(smoothProgress, [0.35, 0.55], [0, 1])
  const servicesFadeOut = useTransform(smoothProgress, [0.62, 0.74], [1, 0])

  // ── Works ──
  const worksOpacity = useTransform(smoothProgress, [0.70, 0.84], [0, 1])
  const lampOpacity = useTransform(smoothProgress, [0.72, 0.88], [0, 1])
  const lampX = useTransform(smoothProgress, [0.72, 0.86], [100, 0])
  const deskGlowOpacity = useTransform(smoothProgress, [0.80, 0.95], [0, 1])

  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => {
      setSconceLit(v > 0.40 && v < 0.76)
      setLampLit(v > 0.86)
    })
    return unsub
  }, [smoothProgress])

  useEffect(() => {
    if (!lightOn) return
    const interval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % taglines.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [lightOn])

  const bulbProps: BulbSceneProps = { lightOn, setLightOn }

  return (
    <div ref={containerRef} className={styles.scrollContainer}>
      <div className={styles.stickyWrap}>

        {/* ── Hanging bulb ── */}
        <motion.div
          className={styles.floatingBulb}
          style={{ opacity: hangingBulbOpacity }}
        >
          <BulbScene {...bulbProps} />
        </motion.div>

        {/* ══ HERO ══ */}
        <motion.section
          className={`${styles.hero} ${lightOn ? styles.lit : ""}`}
          style={{ opacity: heroOpacity }}
        >
          <div className={styles.grain} aria-hidden />
          <div className={`${styles.lightGlow} ${lightOn ? styles.activeLight : ""}`} />

          <div className={styles.leftSide}>
            <AnimatePresence>
              {!lightOn && (
                <motion.div
                  className={styles.instruction}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <span className={styles.instrArrow}>↓</span>
                  <span className={styles.instrText}>Pull the cord</span>
                </motion.div>
              )}
            </AnimatePresence>
            <div className={styles.canvasWrap} />
            <motion.div
              className={styles.logoWrap}
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              animate={lightOn ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className={styles.logo}>LUMINA</h1>
              <div className={styles.logoDivider} />
            </motion.div>
          </div>

          <div className={`${styles.rightSide} ${lightOn ? styles.rightVisible : ""}`}>
            <motion.div
              className={styles.rightContent}
              initial={{ opacity: 0, x: 40 }}
              animate={lightOn ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.badge}>Est. 2024</div>
              <AnimatePresence mode="wait">
                <motion.p
                  key={taglineIndex}
                  className={styles.tagline}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.55 }}
                >
                  {taglines[taglineIndex]}
                </motion.p>
              </AnimatePresence>
              <p className={styles.description}>
                A creative studio crafting digital experiences that resonate,
                endure, and inspire. Turn on the light — see what's possible.
              </p>
              <div className={styles.ctaRow}>
                <button className={styles.ctaPrimary}>Explore Work</button>
                <button className={styles.ctaSecondary}>Get in Touch</button>
              </div>
              <div className={styles.stats}>
                {[["48+", "Projects"], ["12", "Awards"], ["6yr", "Experience"]].map(
                  ([num, label]) => (
                    <div key={label} className={styles.stat}>
                      <span className={styles.statNum}>{num}</span>
                      <span className={styles.statLabel}>{label}</span>
                    </div>
                  )
                )}
              </div>
            </motion.div>
            <div className={styles.dotGrid} aria-hidden />
          </div>
        </motion.section>

        {/* ══ SERVICES ══ */}
        <motion.section
          className={styles.services}
          style={{ opacity: servicesFadeOut }}
        >
          <motion.div
            style={{
              opacity: servicesOpacity,
              position: "absolute",
              inset: 0,
              display: "flex",
            }}
          >
            <div className={styles.roomCeiling} />
            <div className={styles.roomFloor} />
            <div className={styles.brickOverlay} aria-hidden />

            {/* Sconce — absolute top-left of services */}
            <motion.div
              className={styles.sconceWrap}
              style={{ opacity: sconceOpacity, x: sconceX }}
            >
              <WallSconce lit={sconcelit} />
            </motion.div>

            <motion.div className={styles.floorGlow} style={{ opacity: roomGlowOpacity }} />
            <motion.div className={styles.wallGlow} style={{ opacity: roomGlowOpacity }} />

            {/* Left — text only, no lamp inside */}
            <div className={styles.roomLeft}>
              <motion.div
                className={styles.sectionLabel}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
              >
                <span className={styles.labelLine} />
                <span className={styles.labelText}>What We Do</span>
              </motion.div>

              <motion.h2
                className={styles.servicesHeading}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Crafted with<br />
                <em>light & purpose</em>
              </motion.h2>

              <motion.p
                className={styles.servicesSubtext}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                viewport={{ once: true }}
              >
                Every project begins with understanding.<br />
                It ends with something unforgettable.
              </motion.p>
            </div>

            {/* Right — cards */}
            <div className={styles.roomRight}>
              <div className={styles.cardsGrid}>
                {services.map((s, i) => (
                  <motion.div
                    key={s.tag}
                    className={styles.serviceCard}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.65, delay: 0.12 * i }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  >
                    <div className={styles.cardTop}>
                      <span className={styles.cardIcon}>{s.icon}</span>
                      <span className={styles.cardTag}>{s.tag}</span>
                    </div>
                    <h3 className={styles.cardTitle}>{s.title}</h3>
                    <p className={styles.cardDesc}>{s.desc}</p>
                    <div className={styles.cardFooter}>
                      <span className={styles.cardArrow}>→</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </motion.div>
        </motion.section>

        {/* ══ WORKS ══ */}
        <motion.section
          className={styles.works}
          style={{ opacity: worksOpacity }}
        >
          <div className={styles.worksFloor} />
          <div className={styles.worksCeiling} />
          <div className={styles.brickOverlay} aria-hidden />

          <motion.div className={styles.deskGlow} style={{ opacity: deskGlowOpacity }} />
          <motion.div className={styles.worksWallGlow} style={{ opacity: deskGlowOpacity }} />

          {/* Lantern — absolute top-right */}
          <motion.div
            className={styles.lanternWrap}
            style={{ opacity: lampOpacity, x: lampX }}
          >
            <HangingLantern lit={lampLit} />
          </motion.div>

          {/* Left */}
          <div className={styles.worksLeft}>
            <motion.div
              className={styles.sectionLabel}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <span className={styles.labelLine} />
              <span className={styles.labelText}>Selected Works</span>
            </motion.div>

            <motion.h2
              className={styles.worksHeading}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Work that<br />
              <em>speaks for itself</em>
            </motion.h2>

            <motion.p
              className={styles.worksSubtext}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              viewport={{ once: true }}
            >
              Four disciplines.<br />
              One consistent standard of excellence.
            </motion.p>

            <motion.button
              className={styles.worksBtn}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -2 }}
            >
              View All Projects →
            </motion.button>
          </div>

          {/* Right — monitor only */}
          <div className={styles.worksRight}>
            <motion.div
              className={styles.monitorWrap}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <WorksMonitor visible={lampLit} />
            </motion.div>
          </div>

        </motion.section>

      </div>
    </div>
  )
}