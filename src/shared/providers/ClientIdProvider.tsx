"use client";

import { useEffect } from "react";
import { registerCookie } from "../actions/register-cookie";

export default function ClientIdProvider() {
  const getClientId = async () => {
    const clientId = await registerCookie();
    
    await fetch("/api/client/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: clientId }),
    });
  };

  useEffect(() => {
    getClientId();
  }, []);

  return null;
}