"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { DataLogsPanel } from "@/components/data-logs-panel"

export default function DataLogsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Logs</h1>
          <p className="text-muted-foreground mt-2">Real-time system logs and diagnostic information</p>
        </div>

        <DataLogsPanel />
      </div>
    </DashboardLayout>
  )
}
