"use client";

import { useEffect, useState } from "react";
import { SubtleAnimatedBackground } from "@/components/subtle-animated-background";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Wifi, MapPin, Clock } from "lucide-react";
import { getTelemetryData } from "@/lib/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function ExtraDataPage() {
  const [data, setData] = useState({
    energyConsumption: 0,
    signalStrength: 0,
    satellites: 0,
    accuracy: 0,
    altitude: 0,
    uptime: 0,
    systemLoad: 0,
    power: 0,
    efficiency: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const telemetry = await getTelemetryData();
      if (telemetry && telemetry.length > 0) {
        const latest = telemetry[0];
        const newData = {
          energyConsumption: latest.energyConsumption || (15 + Math.random() * 5),
          signalStrength: latest.signalStrength || (-60 - Math.random() * 15),
          satellites: latest.satellites || Math.floor(8 + Math.random() * 4),
          accuracy: latest.accuracy || (2 + Math.random() * 4),
          altitude: latest.altitude || (240 + Math.random() * 10),
          uptime: (latest.uptime || Math.random() * 100).toFixed(1),
          systemLoad: Math.floor(Math.random() * 80),
          power: latest.power || Math.floor(100 + Math.random() * 180),
          efficiency: latest.efficiency || (80 + Math.random() * 20),
        };

        setData(newData);

        // Update chart (keep last 25 readings)
        setChartData((prev) => [
          ...prev.slice(-25),
          {
            time: new Date().toLocaleTimeString([], {
              minute: "2-digit",
              second: "2-digit",
            }),
            power: newData.power,
            efficiency: newData.efficiency,
            energyConsumption: newData.energyConsumption,
          },
        ]);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  const {
    energyConsumption,
    signalStrength,
    satellites,
    accuracy,
    altitude,
    uptime,
    systemLoad,
  } = data;

  return (
    <>
      <SubtleAnimatedBackground />
      <DashboardLayout>
        <div className="space-y-6 relative z-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground neon-text tracking-tight">
              Extra Data
            </h2>
            <p className="text-muted-foreground text-lg mt-2">
              Additional telemetry and system information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Energy Consumption */}
            <Card className="glass-card border-border/50 neon-glow card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Energy Consumption
                </CardTitle>
                <BarChart3 className="h-6 w-6 text-green-400 icon-glow" />
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-green-400 metric-value">
                    {energyConsumption.toFixed(1)}
                  </div>
                  <div className="text-sm text-muted-foreground">kWh/100km</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Avg Consumption
                      </span>
                      <span className="text-green-400">
                        {(energyConsumption + 1.5).toFixed(1)} kWh/100km
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Best</span>
                      <span className="text-green-400">
                        {(energyConsumption - 1.5).toFixed(1)} kWh/100km
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Connectivity */}
            <Card className="glass-card border-border/50 neon-glow card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">
                  Connectivity
                </CardTitle>
                <Wifi className="h-6 w-6 text-blue-400 icon-glow" />
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-blue-400 metric-value">
                    5G
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Network Status
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Signal Strength
                      </span>
                      <span className="text-blue-400">
                        {signalStrength.toFixed(0)} dBm
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Data Usage</span>
                      <span className="text-blue-400">
                        {(Math.random() * 2 + 1).toFixed(1)} GB
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GPS Location */}
            <Card className="glass-card border-border/50 neon-glow card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">
                  GPS Location
                </CardTitle>
                <MapPin className="h-6 w-6 text-purple-400 icon-glow" />
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-purple-400 metric-value">
                    {satellites}
                  </div>
                  <div className="text-sm text-muted-foreground">Satellites</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Accuracy</span>
                      <span className="text-purple-400">
                        ±{accuracy.toFixed(1)}m
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Altitude</span>
                      <span className="text-purple-400">{altitude}m</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Uptime */}
            <Card className="glass-card border-border/50 neon-glow card-hover">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-lg font-semibold text-foreground">
                  System Uptime
                </CardTitle>
                <Clock className="h-6 w-6 text-orange-400 icon-glow" />
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-orange-400 metric-value">
                    {uptime}
                  </div>
                  <div className="text-sm text-muted-foreground">Hours</div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Last Reboot</span>
                      <span className="text-orange-400">
                        {uptime > 48 ? "3 days ago" : "Today"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">System Load</span>
                      <span className="text-orange-400">{systemLoad}%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Live Graph */}
            <Card className="glass-card border-border/50 neon-glow card-hover col-span-1 md:col-span-2 lg:col-span-3">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Power, Efficiency & Energy Consumption (Live Trends)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgba(255,255,255,0.1)"
                    />
                    <XAxis dataKey="time" stroke="#8884d8" />
                    <YAxis stroke="#8884d8" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15,23,42,0.9)",
                        border: "1px solid #334155",
                        borderRadius: "10px",
                      }}
                      labelStyle={{ color: "#93c5fd" }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="power"
                      stroke="#facc15"
                      strokeWidth={2}
                      dot={false}
                      name="Power (kW)"
                    />
                    <Line
                      type="monotone"
                      dataKey="efficiency"
                      stroke="#a78bfa"
                      strokeWidth={2}
                      dot={false}
                      name="Efficiency (%)"
                    />
                    <Line
                      type="monotone"
                      dataKey="energyConsumption"
                      stroke="#4ade80"
                      strokeWidth={2}
                      dot={false}
                      name="Energy Cons. (kWh/100km)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
