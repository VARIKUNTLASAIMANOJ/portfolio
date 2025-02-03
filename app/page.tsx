"use client"

import { motion } from "framer-motion"
import dynamic from "next/dynamic"
import About from "./components/About"
import Hero from "./components/Hero"
import InteractiveBackground from "./components/InteractiveBackground"
import Skills from "./components/Skills"

const Projects = dynamic(() => import("./components/Projects"), { ssr: false })

const Contact = dynamic(() => import("./components/Contact"), { ssr: false })

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
}

export default function Home() {
  return (
    <motion.div initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}>
      <InteractiveBackground />
      <Hero />
      <About />
      <Skills />
      <Projects />

      <Contact />
    </motion.div>
  )
}

