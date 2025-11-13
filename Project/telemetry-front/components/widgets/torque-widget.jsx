"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap, TrendingUp } from "lucide-react"

export function TorqueWidget() {
  const [torque, setTorque] = useState(180)
  const [power, setPower] = useState(85)
  const [efficiency, setEfficiency] = useState(92)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTorque((prev) => {
        const change = (Math.random() - 0.5) * 20
        return Math.max(0, Math.min(300, prev + change))
      })
      setPower((prev) => {
        const change = (Math.random() - 0.5) * 10
        return Math.max(0, Math.min(150, prev + change))
      })
      setEfficiency((prev) => {
        const change = (Math.random() - 0.5) * 2
        return Math.max(80, Math.min(98, prev + change))
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glass-card border-primary/20 hover:border-primary/40 smooth-transition">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">Motor Performance</CardTitle>
        <Zap className="h-4 w-4 text-primary" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Torque Display */}
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{Math.round(torque)}</div>
            <div className="text-xs text-muted-foreground">Nm Torque</div>
            <div className="w-full bg-muted/20 rounded-full h-1 mt-2">
              <div
                className="h-1 bg-primary rounded-full transition-all duration-1000"
                style={{ width: `${(torque / 300) * 100}%` }}
              />
            </div>
          </div>

          {/* Power Display */}
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{Math.round(power)}</div>
            <div className="text-xs text-muted-foreground">kW Power</div>
            <div className="w-full bg-muted/20 rounded-full h-1 mt-2">
              <div
                className="h-1 bg-cyan-400 rounded-full transition-all duration-1000"
                style={{ width: `${(power / 150) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {/* Efficiency */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Efficiency
            </span>
            <span className="text-sm font-medium text-green-400">{efficiency.toFixed(1)}%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">RPM</span>
            <span className="text-sm font-medium text-foreground">{Math.round(2500 + (torque / 300) * 1000)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Temperature</span>
            <span className="text-sm font-medium text-yellow-400">{Math.round(40 + (power / 150) * 20)}°C</span>
          </div>
        </div>

        <div className="pt-2 border-t border-border/30">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Status</span>
            <span className="text-green-400 font-medium">Optimal</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
