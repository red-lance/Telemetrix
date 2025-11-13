"use client";

import { useEffect, useState } from "react";
import { SubtleAnimatedBackground } from "@/components/subtle-animated-background";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Battery, Thermometer, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTelemetryData } from "@/lib/api";

export default function BatteryTemperaturePage() {
  const [showStackDetails, setShowStackDetails] = useState(false);
  const [telemetry, setTelemetry] = useState({
    batteryVoltage: 0,
    accumulatorTemp: 0,
    motorTemp: 0,
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getTelemetryData();
      if (data && data.length > 0) {
        const latest = data[0];
        setTelemetry({
          batteryVoltage: latest.batteryVoltage || 0,
          accumulatorTemp: latest.accumulatorTemp || 0,
          motorTemp: latest.motorTemp || 0,
        });
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, []);

  const { batteryVoltage, accumulatorTemp, motorTemp } = telemetry;

  const stackData = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    voltage: (batteryVoltage / 8 + (Math.random() - 0.5)).toFixed(2),
    temperature: (accumulatorTemp + (Math.random() - 0.5) * 2).toFixed(1),
    health: (95 + (Math.random() - 0.5) * 3).toFixed(0),
  }));

  return (
    <>
      <SubtleAnimatedBackground />
      <DashboardLayout>
        <div className="space-y-6 relative z-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground neon-text tracking-tight">
              Battery & Temperature
            </h2>
            <p className="text-muted-foreground text-lg mt-2">
              Monitor your EV's accumulator and thermal performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* --- Accumulator Voltage --- */}
            <Card className="glass-card-subtle border-border/50 neon-glow-subtle card-hover-subtle">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-semibold text-foreground">
                  Accumulator Voltage
                </CardTitle>
                <Battery className="h-7 w-7 text-green-400 icon-glow-subtle pulse-glow-subtle" />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <div className="text-7xl font-bold text-green-400 metric-value">
                    {batteryVoltage.toFixed(1)}V
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-muted-foreground font-medium">Status</span>
                      <span className="text-green-400 font-semibold">
                        {batteryVoltage > 395 ? "Optimal" : "Low"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-muted-foreground font-medium">Health</span>
                      <span className="text-green-400 font-semibold">95%</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-muted-foreground font-medium">Stacks</span>
                      <span className="text-foreground font-semibold">8 Active</span>
                    </div>
                    <Button
                      variant="outline"
                      className="w-full mt-4 glass-card-subtle border-primary/30 hover:border-primary/50 bg-transparent"
                      onClick={() => setShowStackDetails(!showStackDetails)}
                    >
                      {showStackDetails ? (
                        <>
                          <ChevronUp className="h-4 w-4 mr-2" /> Hide Stack Details
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 mr-2" /> Show Stack Details
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --- Accumulator Temperature --- */}
            <Card className="glass-card-subtle border-border/50 neon-glow-subtle card-hover-subtle">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-semibold text-foreground">
                  Accumulator Temperature
                </CardTitle>
                <Thermometer className="h-7 w-7 text-blue-400 icon-glow-subtle pulse-glow-subtle" />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <div className="text-7xl font-bold text-blue-400 metric-value">
                    {accumulatorTemp.toFixed(1)}°C
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-muted-foreground font-medium">Status</span>
                      <span className="text-blue-400 font-semibold">
                        {accumulatorTemp < 45 ? "Cool" : accumulatorTemp < 60 ? "Warm" : "Hot"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-muted-foreground font-medium">Max Safe</span>
                      <span className="text-muted-foreground font-semibold">60°C</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground font-medium">Cooling</span>
                      <span className="text-green-400 font-semibold">
                        {accumulatorTemp < 45 ? "Passive" : "Active"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --- Motor Temperature --- */}
            <Card className="glass-card-subtle border-border/50 neon-glow-subtle card-hover-subtle">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-xl font-semibold text-foreground">
                  Motor Temperature
                </CardTitle>
                <Thermometer className="h-7 w-7 text-orange-400 icon-glow-subtle pulse-glow-subtle" />
              </CardHeader>
              <CardContent className="pt-6">
                <div className="text-center space-y-6">
                  <div className="text-7xl font-bold text-orange-400 metric-value">
                    {motorTemp.toFixed(1)}°C
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-muted-foreground font-medium">Status</span>
                      <span className="text-orange-400 font-semibold">
                        {motorTemp < 90 ? "Normal" : "Overheating"}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-muted-foreground font-medium">Max Safe</span>
                      <span className="text-muted-foreground font-semibold">120°C</span>
                    </div>
                    <div className="flex justify-between py-2">
                      <span className="text-muted-foreground font-medium">Cooling</span>
                      <span className="text-blue-400 font-semibold">
                        {motorTemp > 85 ? "Active" : "Passive"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* --- Stack Details --- */}
          {showStackDetails && (
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-foreground neon-text mb-6">
                Individual Stack Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stackData.map((stack) => (
                  <Card
                    key={stack.id}
                    className="glass-card-subtle border-border/50 neon-glow-subtle card-hover-subtle"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold text-foreground">
                        Stack {stack.id}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Voltage</span>
                        <span className="text-green-400 font-semibold">{stack.voltage}V</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Temperature</span>
                        <span className="text-blue-400 font-semibold">{stack.temperature}°C</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Health</span>
                        <span className="text-green-400 font-semibold">{stack.health}%</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
