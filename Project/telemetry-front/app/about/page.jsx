import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SubscriptionForm } from "@/components/subscription-form"
import { Zap, Activity, Shield, Gauge } from "lucide-react"

export default function AboutPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="text-center space-y-6 py-8">
          <h1 className="text-5xl font-bold text-foreground neon-text tracking-tight">About Telemetrix</h1>
          <p className="text-2xl text-primary font-medium">Advanced EV Telemetry Dashboard</p>
          <p className="text-muted-foreground max-w-4xl mx-auto text-lg leading-relaxed">
            Telemetrix is a cutting-edge electric vehicle telemetry dashboard designed for Formula One-style EV racing
            and high-performance electric vehicles. Our platform provides real-time monitoring and analytics for
            critical vehicle systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="glass-card border-border/50 neon-glow card-hover">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <Zap className="h-8 w-8 text-yellow-400 icon-glow mr-4" />
              <CardTitle className="text-xl font-semibold text-foreground">Real-time Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Monitor battery voltage, temperature, torque, and RPM in real-time with millisecond precision. Our
                advanced sensors provide accurate data for optimal performance analysis.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/50 neon-glow card-hover">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <Activity className="h-8 w-8 text-green-400 icon-glow mr-4" />
              <CardTitle className="text-xl font-semibold text-foreground">Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Advanced analytics engine processes telemetry data to provide insights into vehicle performance,
                efficiency metrics, and predictive maintenance recommendations.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/50 neon-glow card-hover">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <Shield className="h-8 w-8 text-blue-400 icon-glow mr-4" />
              <CardTitle className="text-xl font-semibold text-foreground">Safety Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive safety monitoring with automatic alerts for temperature thresholds, voltage anomalies, and
                system failures to ensure driver and vehicle safety.
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card border-border/50 neon-glow card-hover">
            <CardHeader className="flex flex-row items-center space-y-0 pb-4">
              <Gauge className="h-8 w-8 text-purple-400 icon-glow mr-4" />
              <CardTitle className="text-xl font-semibold text-foreground">Racing Optimized</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                Built specifically for high-performance racing environments with low-latency data transmission and
                intuitive interfaces designed for split-second decision making.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center py-8">
          <h2 className="text-3xl font-bold text-foreground neon-text mb-4">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="glass-card p-6 border-border/50">
              <h3 className="text-xl font-semibold text-primary mb-2">Data Refresh Rate</h3>
              <p className="text-3xl font-bold text-green-400">100Hz</p>
              <p className="text-sm text-muted-foreground mt-2">Real-time updates every 10ms</p>
            </div>
            <div className="glass-card p-6 border-border/50">
              <h3 className="text-xl font-semibold text-primary mb-2">Sensor Accuracy</h3>
              <p className="text-3xl font-bold text-blue-400">±0.1%</p>
              <p className="text-sm text-muted-foreground mt-2">Precision measurement systems</p>
            </div>
            <div className="glass-card p-6 border-border/50">
              <h3 className="text-xl font-semibold text-primary mb-2">Data Retention</h3>
              <p className="text-3xl font-bold text-purple-400">30 Days</p>
              <p className="text-sm text-muted-foreground mt-2">Historical data analysis</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
