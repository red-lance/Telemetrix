"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function DashboardLayout({ children }) {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/subscription"); // redirect if not logged in
    } else {
      setLoggedIn(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/subscription");
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-20 glass-card border-b border-border/40 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center px-6 py-4">
          <Link href="/" className="text-xl font-bold text-primary neon-text">
            Telemetrix
          </Link>
          <div className="flex space-x-6 items-center">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/battery-temperature" className="hover:text-primary transition-colors">
              Battery & Temperature
            </Link>
            <Link href="/torque-rpm" className="hover:text-primary transition-colors">
              Torque & RPM
            </Link>
            <Link href="/extra-data" className="hover:text-primary transition-colors">
              Extra Data
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About
            </Link>

            {loggedIn && (
              <Button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white rounded-xl px-4 py-1 font-medium shadow-md neon-glow"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 px-8 pb-16 container mx-auto">{children}</main>
    </div>
  );
}
