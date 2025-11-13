"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Battery, Zap, Clock } from "lucide-react"

export function BatteryWidget() {
  const [batteryLevel, setBatteryLevel] = useState(78)
  const [isCharging, setIsCharging] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState("2h 45m")

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => {
        const change = (Math.random() - 0.5) * 2
        return Math.max(0, Math.min(100, prev + change))
      })
      setIsCharging(Math.random() > 0.7)

      const hours = Math.floor(Math.random() * 5) + 1
      const minutes = Math.floor(Math.random() * 60)
      setTimeRemaining(`${hours}h ${minutes}m`)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (batteryLevel / 100) * circumference

  const getBatteryColor = () => {
    if (batteryLevel > 60) return "text-green-400"
    if (batteryLevel > 30) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <Card className="glass-card border-primary/20 hover:border-primary/40 smooth-transition">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Battery Level</CardTitle>
        <div className="flex items-center gap-1">
          {isCharging && <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />}
          <Battery className={`h-4 w-4 ${getBatteryColor()}`} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center relative">
          <svg className="w-32 h-32 transform -rotate-90">
            {/* Background circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted/20"
            />
            {/* Progress circle */}
            <circle
              cx="64"
              cy="64"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className={`${getBatteryColor()} transition-all duration-1000 ease-in-out`}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${getBatteryColor()}`}>{Math.round(batteryLevel)}%</span>
            <span className="text-xs text-muted-foreground">{isCharging ? "Charging" : "Discharging"}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Range</span>
            <span className="text-foreground font-medium">{Math.round(batteryLevel * 4.2)} km</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {isCharging ? "Full in" : "Empty in"}
            </span>
            <span className="text-foreground font-medium">{timeRemaining}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
