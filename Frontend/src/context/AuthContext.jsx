import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load from localStorage on mount
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const signup = async (name, school, email, password) => {
    try {
      const res = await api.post("/auth/signup", { name, school, email, password });
      const data = res.data;

      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        error:
          error.response?.data?.error || "Signup failed. Please try again.",
      };
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const data = res.data;

      console.log("Login response user data:", data.user); // Debug log
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.error || "Login failed. Please try again.",
      };
    }
  };

  // Function to refresh user data from backend
  const refreshUserData = async () => {
    try {
      if (!token) return;
      
      const res = await api.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (res.data.user) {
        console.log("Refreshed user data:", res.data.user); // Debug log
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, signup, login, logout, refreshUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};
