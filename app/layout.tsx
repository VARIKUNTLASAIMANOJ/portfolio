import { AnimatePresence } from "framer-motion"
import { Inter } from "next/font/google"
import React from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "VSM'S Portfolio",
  description: "Showcasing cutting-edge web development skills and projects",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
        <Header />
        <AnimatePresence mode="wait">
          {React.cloneElement(children as React.ReactElement, { key: Math.random() })}
        </AnimatePresence>
        <Footer />
      </body>
    </html>
  )
}

