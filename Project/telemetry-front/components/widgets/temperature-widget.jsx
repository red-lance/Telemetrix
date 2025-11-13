"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Thermometer, Zap, Battery } from "lucide-react"

export function TemperatureWidget() {
  const [motorTemp, setMotorTemp] = useState(45)
  const [batteryTemp, setBatteryTemp] = useState(32)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMotorTemp((prev) => {
        const change = (Math.random() - 0.5) * 4
        return Math.max(20, Math.min(80, prev + change))
      })
      setBatteryTemp((prev) => {
        const change = (Math.random() - 0.5) * 2
        return Math.max(15, Math.min(60, prev + change))
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const getTempColor = (temp, max) => {
    const ratio = temp / max
    if (ratio > 0.8) return "text-red-400"
    if (ratio > 0.6) return "text-yellow-400"
    return "text-green-400"
  }

  const getTempBg = (temp, max) => {
    const ratio = temp / max
    if (ratio > 0.8) return "bg-red-400/10"
    if (ratio > 0.6) return "bg-yellow-400/10"
    return "bg-green-400/10"
  }

  return (
    <Card className="glass-card border-primary/20 hover:border-primary/40 smooth-transition">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Temperature</CardTitle>
        <Thermometer className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {/* Motor Temperature */}
          <div className={`p-3 rounded-lg ${getTempBg(motorTemp, 80)} border border-border/30`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-foreground">Motor</span>
              </div>
              <span className={`text-lg font-bold ${getTempColor(motorTemp, 80)}`}>{Math.round(motorTemp)}°C</span>
            </div>
            <div className="w-full bg-muted/20 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${getTempColor(motorTemp, 80).replace("text-", "bg-")}`}
                style={{ width: `${(motorTemp / 80) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Normal: 20-60°C</span>
              <span>Max: 80°C</span>
            </div>
          </div>

          {/* Battery Temperature */}
          <div className={`p-3 rounded-lg ${getTempBg(batteryTemp, 60)} border border-border/30`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-foreground">Battery</span>
              </div>
              <span className={`text-lg font-bold ${getTempColor(batteryTemp, 60)}`}>{Math.round(batteryTemp)}°C</span>
            </div>
            <div className="w-full bg-muted/20 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-1000 ${getTempColor(batteryTemp, 60).replace("text-", "bg-")}`}
                style={{ width: `${(batteryTemp / 60) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>Optimal: 15-45°C</span>
              <span>Max: 60°C</span>
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-border/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Cooling System</span>
            <span className="text-green-400 font-medium">Active</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
