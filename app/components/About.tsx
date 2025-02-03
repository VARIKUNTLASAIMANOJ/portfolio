"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useInView } from "react-intersection-observer"

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })



  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-8"
        >
          About Me
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image src="/profile.jpg" alt="Your Name" width={400} height={400} className="rounded-full shadow-lg" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <p className="text-lg mb-6">
              I'm a passionate web developer and Ai & Ml Engineer with a keen eye for design and a love for creating seamless user
              experiences. With expertise in modern web technologies, I strive to build innovative and efficient
              solutions that make a difference.
            </p>
            <p className="text-lg mb-6">
              When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or
              enjoying a good cup of coffee while brainstorming my next big idea.
            </p>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4"></h3>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About

