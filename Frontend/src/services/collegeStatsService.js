import api from "./api";

export const collegeStatsService = {
  // Get college statistics (public route)
  getCollegeStats: async () => {
    try {
      const response = await api.get("/college/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching college stats:", error);
      throw error;
    }
  },

  // Get college statistics for non-admin users (if needed)
  getPublicCollegeStats: async () => {
    try {
      const response = await api.get("/college/stats");
      return response.data;
    } catch (error) {
      console.error("Error fetching public college stats:", error);
      throw error;
    }
  },
};
