"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Battery, Thermometer, Gauge, BarChart3, Info } from "lucide-react";
import { AnimatedBackground } from "@/components/animated-background";

export default function HomePage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // ⛔ If user not logged in, redirect to signup/login
      router.replace("/subscription");
    } else {
      // ✅ If token exists, allow access
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, [router]);

  if (loading) return null; // Avoid flicker during redirect

  if (!isAuthenticated) return null; // Prevent rendering before auth check

  // ✅ Normal HomePage content (unchanged)
  return (
    <DashboardLayout>
      <AnimatedBackground />
      <div className="space-y-8 relative z-10">
        <div className="text-center space-y-6 py-8">
          <h1 className="text-5xl font-bold text-foreground neon-text tracking-tight">
            Telemetrix
          </h1>
          <p className="text-2xl text-primary font-medium">
            Real-time EV Performance at a Glance
          </p>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg leading-relaxed">
            Welcome to Telemetrix, your comprehensive electric vehicle telemetry dashboard.
            Monitor battery performance, temperature readings, torque metrics, and more with our
            intuitive interface designed for Formula One-style EV racing analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Link href="/battery-temperature">
            <Card className="glass-card border-border/50 card-hover cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base font-semibold">
                  Battery & Temperature
                </CardTitle>
                <div className="flex space-x-2">
                  <Battery className="h-5 w-5 text-green-400 icon-glow" />
                  <Thermometer className="h-5 w-5 text-orange-400 icon-glow" />
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monitor battery voltage and motor temperature readings
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/torque-rpm">
            <Card className="glass-card border-border/50 card-hover cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base font-semibold">Torque & RPM</CardTitle>
                <Gauge className="h-5 w-5 text-blue-400 icon-glow" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  View torque output and RPM performance metrics
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/extra-data">
            <Card className="glass-card border-border/50 card-hover cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base font-semibold">Extra Data</CardTitle>
                <BarChart3 className="h-5 w-5 text-purple-400 icon-glow" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Additional EV metrics and performance data
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/about">
            <Card className="glass-card border-border/50 card-hover cursor-pointer h-full">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <CardTitle className="text-base font-semibold">About</CardTitle>
                <Info className="h-5 w-5 text-cyan-400 icon-glow" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Learn about Telemetrix and EV telemetry
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
