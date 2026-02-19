// src/services/authService.js
import axios from "axios";

// const API_URL = "http://localhost:7500/api/auth";
// // src/services/authService.js
const API_URL = "http://192.168.50.171:7500/api/auth";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const authService = {
updateProfile: async (userData) => {
    try {
      const response = await api.put("/update-profile", userData);
      
      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      
      return response.data;
    } catch (error) {
      console.error("Update Profile Error:", error);
      throw error.response?.data?.message || error.response?.data?.error || "Erreur lors de la mise à jour du profil";
    }
  },
updatePassword: async (passwords) => {
    try {
      const response = await api.put("/update-password", passwords);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || error.response?.data?.error || "Erreur lors de la mise à jour";
    }
  },
  // Inscription
  register: async (userData) => {
    console.log(userData)
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || "Erreur lors de l'inscription";
    }
  },

  // Connexion
  login: async (credentials) => {
    console.log(credentials)
    try {
      const response = await api.post("/login", credentials);
      if (response.data.token) {
        console.log(response.data)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.log(error)
      throw error.error || "Erreur lors de la connexion";
    }
  },
  verifyOtp: async (email, otp) => {
    try {
      const response = await api.post("/verify-otp", { 
        email, 
        otp 
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.error || "Erreur lors de la vérification");
    }
  },

  // Déconnexion
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
};