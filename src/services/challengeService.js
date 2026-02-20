import axios from "axios";

// URL dynamique selon l'environnement
const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:7500/api/challenges" 
  : "https://mon-compagnon-du-careme-backend.vercel.app/api/challenges";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const challengeService = {
  getTodayChallenge: async () => {
    try {
      const response = await api.get("/today");
      return response.data;
    } catch (error) {
      // On attrape la clé 'error' envoyée par le backend
      throw error.response?.data?.error || "Erreur lors du chargement du défi";
    }
  },

  getAllChallenges: async () => {
    try {
      const response = await api.get("/all");
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Erreur lors du chargement de la liste";
    }
  },

  completeChallenge: async () => {
    try {
      const response = await api.post("/complete");
      return response.data;
    } catch (error) {
      throw error.response?.data?.error || "Erreur lors de la validation";
    }
  }
};