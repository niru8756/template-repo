"use client";

import React, { useEffect, useState, ComponentType } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PUBLIC_ROUTES } from "@/lib/constant";

export default function withAuth<P extends Record<string, unknown>>(
  WrappedComponent: ComponentType<P>
) {
  const AuthGuard: React.FC<P> = (props) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
      const isAuthenticated =
        localStorage.getItem("isAuthenticated") === "true";
      const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

      // Public routes (login/signup/verifyEmail)
      if (isAuthenticated && isPublicRoute) {
        router.replace("/products");
        return;
      }

      // Protected routes
      if (!isAuthenticated && !isPublicRoute) {
        router.replace("/auth/login");
        return;
      }
      setIsAuthorized(true);
    }, [pathname, router]);

    // Initial loading state
    if (isAuthorized === null) {
      return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-500 text-lg font-medium">Loading...</p>
        </div>
      );
    }

    // Render the wrapped component if authorized
    return <WrappedComponent {...props} />;
  };

  AuthGuard.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return AuthGuard;
}
