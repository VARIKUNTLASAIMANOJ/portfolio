"use client"

import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { useRef, useState } from "react"
import { useInView } from "react-intersection-observer"
import { sendEmail } from "../actions/sendEmail"

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const formRef = useRef<HTMLFormElement>(null)

  const [formStatus, setFormStatus] = useState<{ type: "success" | "error" | null; message: string }>({
    type: null,
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = formRef.current
    if (!form) return

    const formData = new FormData(form)

    setFormStatus({ type: null, message: "Sending..." })

    try {
      const result = await sendEmail(formData)

      if (result.success) {
        setFormStatus({ type: "success", message: "Message sent successfully! I will get back to you soon." })
        form.reset()
      } else {
        setFormStatus({ type: "error", message: result.message })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormStatus({
        type: "error",
        message:
          "An unexpected error occurred. Please try again or contact me directly at varikuntlasaimanoj@gmail.com",
      })
    }
  }

  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Get in Touch
        </motion.h2>
        <motion.form
          ref={formRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="max-w-md mx-auto perspective-1000"
        >
          <motion.div
            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg transform-style-3d"
            whileHover={{ rotateX: 5, rotateY: 5 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
              <Send className="ml-2" size={20} />
            </motion.button>
            {formStatus.message && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 text-center ${formStatus.type === "success" ? "text-green-500" : "text-red-500"}`}
              >
                {formStatus.message}
              </motion.p>
            )}
          </motion.div>
        </motion.form>
      </div>
    </section>
  )
}

export default Contact

