"use client"

import { useState, useEffect } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { SubscriptionForm } from "@/components/subscription-form"

export default function SubscriptionPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <AnimatedBackground />

      {/* Content overlay */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-2xl">
          <SubscriptionForm />
        </div>
      </div>
    </main>
  )
}
