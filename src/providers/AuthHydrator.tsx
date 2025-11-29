"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

const AuthHydrator = () => {
  const loadUser = useAuthStore((s) => s.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return null;
};

export default AuthHydrator;
