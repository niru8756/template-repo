"use client";
import React, { createContext, useContext, useState } from "react";

type AuthContextType = {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  clearAuthData: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearAuthData = () => {
    setEmail("");
    setPassword("");
  };

  return (
    <AuthContext.Provider
      value={{ email, password, setEmail, setPassword, clearAuthData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
