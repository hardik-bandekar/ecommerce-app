"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");

        if (!res.ok) return;

        const user = await res.json();
        dispatch(setUser(user));
      } catch {
        console.log("Not authenticated");
      }
    };

    fetchUser();
  }, [dispatch]);

  return null;
}
