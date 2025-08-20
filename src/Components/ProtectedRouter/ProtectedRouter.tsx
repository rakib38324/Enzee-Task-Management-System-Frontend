"use client";
import React, { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";


interface ProtectedRouteProps {
  children: ReactNode;
  permittedRoutes?: string[];
}

const unprotectedRoutes = [
  "/signup",
  "/forget-password",
  "/reset-password",
  "/email-verification",
  "/",
];

export interface DecodedToken {
  exp: number; // Expiration time in seconds
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  permittedRoutes = unprotectedRoutes,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (!userToken) {
      // If no token exists, check if the route is unprotected
      if (!permittedRoutes.includes(pathname || "/")) {
        router.push("/login"); // Redirect to home page
      }
      return;
    }

    try {
      // Decode the token and verify its expiration
      const decoded: DecodedToken = jwtDecode(userToken);
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (decoded.exp < currentTime) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        // Token expired, redirect to the home page "/"
        router.push("/");
      }
    } catch (error) {
      // Handle decoding errors by redirecting to the home page "/"
      console.error("Error decoding token:", error);
      router.push("/");
    }
  }, [pathname, permittedRoutes, router]);

  return <>{children}</>;
};

export default ProtectedRoute;
