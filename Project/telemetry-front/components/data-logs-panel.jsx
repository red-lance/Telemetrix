"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Download, RefreshCw, AlertTriangle, Info, CheckCircle, XCircle, Clock, Zap } from "lucide-react"

const logTypes = {
  error: { icon: XCircle, color: "text-red-400", bg: "bg-red-400/10", border: "border-red-400/20" },
  warning: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20" },
  success: { icon: CheckCircle, color: "text-green-400", bg: "bg-green-400/10", border: "border-green-400/20" },
  system: { icon: Zap, color: "text-purple-400", bg: "bg-purple-400/10", border: "border-purple-400/20" },
}

// Generate initial log data
const generateLogEntry = (id, type, category) => {
  const messages = {
    error: [
      "Battery temperature exceeded safe operating range",
      "Motor controller communication timeout",
      "Charging port connection failed",
      "Regenerative braking system malfunction",
    ],
    warning: [
      "Battery charge level below 20%",
      "Motor temperature approaching limit",
      "Tire pressure sensor reading low",
      "GPS signal strength weak",
    ],
    info: [
      "Vehicle started successfully",
      "Charging session completed",
      "Software update available",
      "Trip summary generated",
    ],
    success: [
      "Battery management system optimized",
      "Charging session completed successfully",
      "System diagnostics passed",
      "Energy efficiency improved",
    ],
    system: [
      "Telemetry data synchronized",
      "System backup completed",
      "Performance metrics updated",
      "Network connection established",
    ],
  }

  const categories = ["Battery", "Motor", "Charging", "Navigation", "System", "Network"]

  return {
    id,
    type,
    category: category || categories[Math.floor(Math.random() * categories.length)],
    message: messages[type][Math.floor(Math.random() * messages[type].length)],
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    details: `Log entry ${id} - Additional diagnostic information available`,
  }
}

export function DataLogsPanel() {
  const [logs, setLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Initialize logs
  useEffect(() => {
    const initialLogs = []
    const types = ["error", "warning", "info", "success", "system"]

    for (let i = 0; i < 50; i++) {
      const type = types[Math.floor(Math.random() * types.length)]
      initialLogs.push(generateLogEntry(i + 1, type))
    }

    initialLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    setLogs(initialLogs)
    setFilteredLogs(initialLogs)
  }, [])

  // Add new logs periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const types = ["info", "success", "warning", "system"]
      const type = types[Math.floor(Math.random() * types.length)]
      const newLog = generateLogEntry(Date.now(), type)

      setLogs((prevLogs) => {
        const updated = [newLog, ...prevLogs].slice(0, 100) // Keep only last 100 logs
        return updated
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Update filtered logs when search or filter changes
  useEffect(() => {
    let filtered = logs

    if (searchTerm) {
      filtered = filtered.filter(
        (log) =>
          log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
          log.category.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedType !== "all") {
      filtered = filtered.filter((log) => log.type === selectedType)
    }

    setFilteredLogs(filtered)
  }, [logs, searchTerm, selectedType])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  // Filter logs based on search and type
  const getLogCounts = () => {
    const counts = { all: logs.length }
    Object.keys(logTypes).forEach((type) => {
      counts[type] = logs.filter((log) => log.type === type).length
    })
    return counts
  }

  const logCounts = getLogCounts()

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return `${diffDays}d ago`
  }

  return (
    <Card className="glass-card border-primary/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-foreground flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            System Logs
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="glass-card border-primary/30 bg-transparent"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm" className="glass-card border-primary/30 bg-transparent">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 glass-card border-primary/30"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedType === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType("all")}
              className="glass-card border-primary/30"
            >
              All ({logCounts.all})
            </Button>
            {Object.entries(logTypes).map(([type, config]) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
                className="glass-card border-primary/30"
              >
                <config.icon className="h-3 w-3 mr-1" />
                {type.charAt(0).toUpperCase() + type.slice(1)} ({logCounts[type]})
              </Button>
            ))}
          </div>
        </div>

        {/* Logs List */}
        <ScrollArea className="h-[600px] w-full">
          <div className="space-y-2">
            {filteredLogs.map((log) => {
              const LogIcon = logTypes[log.type].icon
              return (
                <div
                  key={log.id}
                  className="flex items-start space-x-3 p-3 rounded-lg glass-card border border-border/30 hover:border-border/50 smooth-transition"
                >
                  <div className={`p-1.5 rounded-full ${logTypes[log.type].bg} ${logTypes[log.type].border} border`}>
                    <LogIcon className={`h-3 w-3 ${logTypes[log.type].color}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {log.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{formatTimestamp(log.timestamp)}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={`text-xs ${logTypes[log.type].color} ${logTypes[log.type].border}`}
                      >
                        {log.type.toUpperCase()}
                      </Badge>
                    </div>

                    <p className="text-sm text-foreground font-medium mb-1">{log.message}</p>

                    <p className="text-xs text-muted-foreground">{log.details}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>

        {filteredLogs.length === 0 && (
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No logs found matching your criteria</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
