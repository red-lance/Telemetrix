"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { TrendingUp, Zap, BarChart3 } from "lucide-react"

const timeRanges = [
  { label: "1H", value: "1h", points: 12 },
  { label: "6H", value: "6h", points: 24 },
  { label: "24H", value: "24h", points: 48 },
  { label: "7D", value: "7d", points: 168 },
]

// Generate initial data
const generateDataPoint = (index, timeRange) => {
  const now = new Date()
  let time

  switch (timeRange) {
    case "1h":
      time = new Date(now.getTime() - (11 - index) * 5 * 60 * 1000)
      break
    case "6h":
      time = new Date(now.getTime() - (23 - index) * 15 * 60 * 1000)
      break
    case "24h":
      time = new Date(now.getTime() - (47 - index) * 30 * 60 * 1000)
      break
    case "7d":
      time = new Date(now.getTime() - (167 - index) * 60 * 60 * 1000)
      break
    default:
      time = now
  }

  const baseConsumption = 15 + Math.sin(index * 0.3) * 5
  const baseGeneration = Math.max(0, 8 + Math.sin(index * 0.2) * 6)

  return {
    time: time.toISOString(),
    consumption: Math.max(0, baseConsumption + (Math.random() - 0.5) * 4),
    generation: Math.max(0, baseGeneration + (Math.random() - 0.5) * 3),
    efficiency: 85 + Math.sin(index * 0.1) * 10 + (Math.random() - 0.5) * 5,
  }
}

export function EnergyChart() {
  const [selectedRange, setSelectedRange] = useState("6h")
  const [data, setData] = useState([])
  const [chartType, setChartType] = useState("line")

  // Update data in real-time
  useEffect(() => {
    const currentRange = timeRanges.find((r) => r.value === selectedRange)
    const initialData = Array.from({ length: currentRange.points }, (_, i) => generateDataPoint(i, selectedRange))
    setData(initialData)

    const interval = setInterval(
      () => {
        setData((prevData) => {
          const newData = [...prevData.slice(1)]
          newData.push(generateDataPoint(newData.length, selectedRange))
          return newData
        })
      },
      selectedRange === "1h" ? 5000 : selectedRange === "6h" ? 15000 : 30000,
    )

    return () => clearInterval(interval)
  }, [selectedRange])

  const formatTime = (timeStr) => {
    const time = new Date(timeStr)
    if (selectedRange === "1h" || selectedRange === "6h") {
      return time.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    } else if (selectedRange === "24h") {
      return (
        time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          hour12: false,
        }) + "h"
      )
    } else {
      return time.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    }
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card border border-border/50 p-3 rounded-lg shadow-lg">
          <p className="text-foreground font-medium mb-2">{formatTime(label)}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value.toFixed(1)}
              {entry.dataKey === "efficiency" ? "%" : " kW"}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const totalConsumption = data.reduce((sum, point) => sum + point.consumption, 0)
  const totalGeneration = data.reduce((sum, point) => sum + point.generation, 0)
  const avgEfficiency = data.length > 0 ? data.reduce((sum, point) => sum + point.efficiency, 0) / data.length : 0
  const netConsumption = totalConsumption - totalGeneration

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Energy Flow
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant={chartType === "line" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("line")}
              className="glass-card border-primary/30"
            >
              <TrendingUp className="h-4 w-4" />
            </Button>
            <Button
              variant={chartType === "area" ? "default" : "outline"}
              size="sm"
              onClick={() => setChartType("area")}
              className="glass-card border-primary/30"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg glass-card border border-border/30">
            <div className="text-lg font-bold text-red-400">{totalConsumption.toFixed(1)} kW</div>
            <div className="text-xs text-muted-foreground">Consumed</div>
          </div>
          <div className="text-center p-3 rounded-lg glass-card border border-border/30">
            <div className="text-lg font-bold text-green-400">{totalGeneration.toFixed(1)} kW</div>
            <div className="text-xs text-muted-foreground">Generated</div>
          </div>
          <div className="text-center p-3 rounded-lg glass-card border border-border/30">
            <div className="text-lg font-bold text-primary">{netConsumption.toFixed(1)} kW</div>
            <div className="text-xs text-muted-foreground">Net Usage</div>
          </div>
          <div className="text-center p-3 rounded-lg glass-card border border-border/30">
            <div className="text-lg font-bold text-cyan-400">{avgEfficiency.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Efficiency</div>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-center gap-1">
          {timeRanges.map((range) => (
            <Button
              key={range.value}
              variant={selectedRange === range.value ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRange(range.value)}
              className="glass-card border-primary/30"
            >
              {range.label}
            </Button>
          ))}
        </div>

        {/* Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === "line" ? (
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="time" tickFormatter={formatTime} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="consumption"
                  stroke="hsl(var(--destructive))"
                  strokeWidth={2}
                  name="Consumption"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="generation"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Generation"
                  dot={false}
                />
              </LineChart>
            ) : (
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis dataKey="time" tickFormatter={formatTime} stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="consumption"
                  stackId="1"
                  stroke="hsl(var(--destructive))"
                  fill="hsl(var(--destructive))"
                  fillOpacity={0.3}
                  name="Consumption"
                />
                <Area
                  type="monotone"
                  dataKey="generation"
                  stackId="2"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  name="Generation"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
