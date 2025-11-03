// app/not-found.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      router.replace("/auth/login");
    } else {
      router.replace("/products");
    }
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen text-gray-600">
      Redirecting...
    </div>
  );
}
