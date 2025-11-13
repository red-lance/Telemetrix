"use client";


import { useEffect, useState } from "react";
import { SubtleAnimatedBackground } from "@/components/subtle-animated-background";
import { DashboardLayout } from "@/components/dashboard-layout";
import { GaugeMeter } from "@/components/gauge-meter";
import { Gauge, RotateCcw, Zap, TrendingUp } from "lucide-react";
import { getTelemetryData } from "@/lib/api";

export default function TorqueRpmPage() {
  const [telemetry, setTelemetry] = useState({
    rpm: 0,
    torque: 0,
    power: 0,
    efficiency: 0,
  });

  // Fetch new telemetry every second
  useEffect(() => {
    async function fetchData() {
      const data = await getTelemetryData();
      if (data && data.length > 0) {
        const latest = data[0];
        setTelemetry({
          rpm: latest.rpm || 0,
          torque: latest.torque || 0,
          power: latest.power || 0,
          efficiency: latest.efficiency || 0,
        });
      }
    }

    fetchData();
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  const { rpm, torque, power, efficiency } = telemetry;

  return (
    <>
      <SubtleAnimatedBackground />
      <DashboardLayout>
        <div className="space-y-6 relative z-10">
          <div>
            <h2 className="text-4xl font-bold text-foreground neon-text tracking-tight">
              Torque & RPM
            </h2>
            <p className="text-muted-foreground text-lg mt-2">
              Monitor motor performance and power delivery
            </p>
          </div>

          {/* --- G A U G E S --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <GaugeMeter
              value={torque}
              max={320}
              label="Motor Torque"
              unit="Nm"
              color="#60a5fa"
              icon={<Gauge className="h-6 w-6 text-blue-400" />}
            />

            <GaugeMeter
              value={rpm}
              max={12000}
              label="Motor RPM"
              unit="RPM"
              color="#4ade80"
              icon={<RotateCcw className="h-6 w-6 text-green-400" />}
            />

            <GaugeMeter
              value={power}
              max={280}
              label="Power Output"
              unit="kW"
              color="#facc15"
              icon={<Zap className="h-6 w-6 text-yellow-400" />}
            />

            <GaugeMeter
              value={efficiency.toFixed(1)}
              max={100}
              label="Efficiency"
              unit="%"
              color="#a78bfa"
              icon={<TrendingUp className="h-6 w-6 text-purple-400" />}
            />
          </div>

          {/* --- S T A T S --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="group relative p-6 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-slate-700/50 group-hover:border-blue-500/50 transition-colors duration-300" />

              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-foreground mb-4">Performance Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-700/30 group-hover:border-blue-500/30 transition-colors duration-300">
                    <span className="text-muted-foreground">Peak Torque</span>
                    <span className="text-blue-400 font-semibold">320 Nm</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700/30 group-hover:border-blue-500/30 transition-colors duration-300">
                    <span className="text-muted-foreground">Max RPM</span>
                    <span className="text-green-400 font-semibold">12,000</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700/30 group-hover:border-blue-500/30 transition-colors duration-300">
                    <span className="text-muted-foreground">Peak Power</span>
                    <span className="text-yellow-400 font-semibold">280 kW</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Horsepower</span>
                    <span className="text-yellow-400 font-semibold">
                      {(power * 1.341).toFixed(0)} HP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative p-6 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-slate-900/60 to-slate-800/60 backdrop-blur-xl border border-slate-700/50 group-hover:border-purple-500/50 transition-colors duration-300" />

              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-foreground mb-4">Performance Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-slate-700/30 group-hover:border-purple-500/30 transition-colors duration-300">
                    <span className="text-muted-foreground">0-100 km/h</span>
                    <span className="text-purple-400 font-semibold">3.2s</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700/30 group-hover:border-purple-500/30 transition-colors duration-300">
                    <span className="text-muted-foreground">Top Speed</span>
                    <span className="text-purple-400 font-semibold">280 km/h</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-700/30 group-hover:border-purple-500/30 transition-colors duration-300">
                    <span className="text-muted-foreground">Quarter Mile</span>
                    <span className="text-purple-400 font-semibold">11.2s</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">G-Force</span>
                    <span className="text-red-400 font-semibold">1.2g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
