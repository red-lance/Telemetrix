"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface GaugeMeterProps {
  value: number
  max: number
  label: string
  unit: string
  color: string
  icon?: React.ReactNode
}

export function GaugeMeter({ value, max, label, unit, color, icon }: GaugeMeterProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 20

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
    ctx.strokeStyle = "rgba(100, 116, 139, 0.2)"
    ctx.lineWidth = 8
    ctx.stroke()

    // Draw gauge arc (0 to 180 degrees)
    const startAngle = Math.PI
    const endAngle = Math.PI * 2
    const percentage = Math.min(value / max, 1)
    const currentAngle = startAngle + (endAngle - startAngle) * percentage

    // Draw colored arc
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, startAngle, currentAngle)
    ctx.strokeStyle = color
    ctx.lineWidth = 8
    ctx.lineCap = "round"
    ctx.stroke()

    // Draw needle
    const needleAngle = startAngle + (endAngle - startAngle) * percentage
    const needleLength = radius - 10
    const needleX = centerX + Math.cos(needleAngle) * needleLength
    const needleY = centerY + Math.sin(needleAngle) * needleLength

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(needleX, needleY)
    ctx.strokeStyle = color
    ctx.lineWidth = 3
    ctx.stroke()

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 8, 0, Math.PI * 2)
    ctx.fillStyle = color
    ctx.fill()

    // Draw tick marks
    for (let i = 0; i <= 10; i++) {
      const angle = startAngle + (endAngle - startAngle) * (i / 10)
      const x1 = centerX + Math.cos(angle) * (radius - 5)
      const y1 = centerY + Math.sin(angle) * (radius - 5)
      const x2 = centerX + Math.cos(angle) * (radius + 5)
      const y2 = centerY + Math.sin(angle) * (radius + 5)

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.strokeStyle = "rgba(148, 163, 184, 0.4)"
      ctx.lineWidth = 1
      ctx.stroke()
    }
  }, [value, max, color])

  return (
    <div
      className="group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl"
      style={{
        boxShadow: `0 0 30px ${color}20`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-slate-800/40 backdrop-blur-xl border border-slate-700/50 group-hover:border-slate-600/80 transition-all duration-300" />
      <div
        className="absolute inset-0 rounded-lg bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          backgroundImage: `linear-gradient(135deg, ${color}15 0%, transparent 50%, ${color}10 100%)`,
        }}
      />

      <div className="relative z-10 p-6 flex flex-col items-center justify-center">
        <div className="flex items-center gap-2 mb-4">
          {icon && <div className="text-2xl">{icon}</div>}
          <h3 className="text-lg font-semibold text-foreground">{label}</h3>
        </div>

        <canvas ref={canvasRef} width={200} height={140} className="mb-4" />

        <div className="text-center">
          <div className="text-4xl font-bold" style={{ color }}>
            {value.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground mt-1">{unit}</div>
        </div>
      </div>
    </div>
  )
}
