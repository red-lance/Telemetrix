"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Gauge, TrendingUp } from "lucide-react"

export function SpeedWidget() {
  const [currentSpeed, setCurrentSpeed] = useState(65)
  const [maxSpeed, setMaxSpeed] = useState(120)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSpeed((prev) => {
        const change = (Math.random() - 0.5) * 10
        return Math.max(0, Math.min(150, prev + change))
      })
      setMaxSpeed((prev) => Math.max(prev, currentSpeed + 5))
    }, 1500)

    return () => clearInterval(interval)
  }, [currentSpeed])

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference * 0.75 // 3/4 circle
  const strokeDashoffset = strokeDasharray - (currentSpeed / 150) * strokeDasharray

  return (
    <Card className="glass-card border-primary/20 hover:border-primary/40 smooth-transition">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Speed</CardTitle>
        <Gauge className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center relative">
          <svg className="w-32 h-32 transform rotate-[135deg]">
            {/* Background arc */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/20"
              strokeDasharray={strokeDasharray}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Progress arc */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-primary transition-all duration-1000 ease-in-out"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-foreground">{Math.round(currentSpeed)}</span>
            <div className="text-xs text-muted-foreground">km/h</div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Max Today</span>
            <span className="text-foreground font-medium">{Math.round(maxSpeed)} km/h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Average</span>
            <span className="text-foreground font-medium">38 km/h</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-green-400" />
              Efficiency
            </span>
            <span className="text-green-400 font-medium">Good</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
