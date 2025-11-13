"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function ProtectedRoute({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // If no token → redirect to subscription page
    if (!token) {
      router.replace("/subscription");
    }
  }, [router]);

  return <>{children}</>;
}
