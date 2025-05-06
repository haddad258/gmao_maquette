"use client"

import { motion } from "framer-motion"
import { Building2 } from "lucide-react"

export default function SplashPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
        className="flex flex-col items-center gap-6 text-center"
      >
        <div className="relative">
          <Building2 className="h-20 w-20 text-primary" />
          <motion.div
            className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-green-400"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </div>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold">Welcome to CMMS Pro</h1>
          <p className="text-muted-foreground">Your smart maintenance management solution</p>
        </motion.div>
      </motion.div>
    </div>
  )
}

