// src/services/authService.js
import axios from "axios";

// URL dynamique selon l'environnement
const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:7500/api/auth" 
  : "https://mon-compagnon-du-careme-backend.vercel.app/api/auth";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercepteur pour le Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authService = {
  updateProfile: async (userData) => {
    try {
      const response = await api.put("/update-profile", userData);
      if (response.data.user) localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Erreur profil";
    }
  },

  updatePassword: async (passwords) => {
    try {
      const response = await api.put("/update-password", passwords);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Erreur mot de passe";
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Erreur inscription";
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post("/login", credentials);
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      // On attrape ici le message précis (ex: "Mot de passe incorrect")
      throw error.response?.data?.error || "Erreur de connexion";
    }
  },

  verifyOtp: async (email, otp) => {
    try {
      const response = await api.post("/verify-otp", { email, otp });
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Code invalide";
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};