import axios from "axios";

const API_URL = "https://mon-compagnon-du-careme-backend.vercel.app/api/challenges";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const challengeService = {
  getTodayChallenge: async () => {
    try {
      const response = await api.get("/today");
      return response.data;
    } catch (error) {
      throw error.response?.data || "Erreur lors du chargement du défi du jour";
    }
  },
  getAllChallenges: async () => {
    try {
      const response = await api.get("/all");
      return response.data;
    } catch (error) {
      throw error.response?.data || "Erreur lors du chargement des défis";
    }
  },

  completeChallenge: async (challengeId) => {
    try {
      const response = await api.post("/complete", { challengeId });
      return response.data;
    } catch (error) {
      throw error.response?.data || "Erreur lors de la validation du défi";
    }
  }
};