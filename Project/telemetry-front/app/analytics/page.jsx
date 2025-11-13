"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { EnergyChart } from "@/components/widgets/energy-chart"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Zap, Battery, Gauge, Thermometer } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analysis of your EV's performance and efficiency metrics
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="glass-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Efficiency</CardTitle>
              <Zap className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">4.2 mi/kWh</div>
              <div className="flex items-center text-xs text-green-400 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last week
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Distance</CardTitle>
              <Gauge className="h-4 w-4 text-cyan-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">1,247 km</div>
              <div className="flex items-center text-xs text-green-400 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Energy Used</CardTitle>
              <Battery className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">297 kWh</div>
              <div className="flex items-center text-xs text-red-400 mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                -3% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">42°C</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">Normal operating range</div>
            </CardContent>
          </Card>
        </div>

        {/* Energy Analysis Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <EnergyChart />
          </div>

          <div className="space-y-4">
            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Performance Summary</CardTitle>
                <CardDescription>Last 30 days overview</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Best Efficiency</span>
                  <span className="text-sm font-medium text-green-400">4.8 mi/kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Worst Efficiency</span>
                  <span className="text-sm font-medium text-red-400">3.1 mi/kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Trips</span>
                  <span className="text-sm font-medium text-foreground">47</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Charging Sessions</span>
                  <span className="text-sm font-medium text-foreground">12</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Efficiency Trends</CardTitle>
                <CardDescription>Compared to previous period</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Current Period</span>
                  <span className="text-sm font-medium text-green-400">4.2 mi/kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Previous Period</span>
                  <span className="text-sm font-medium text-muted-foreground">3.8 mi/kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Best Record</span>
                  <span className="text-sm font-medium text-primary">4.5 mi/kWh</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Improvement</span>
                  <span className="text-sm font-medium text-green-400">+10.5%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
