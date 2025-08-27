import api from "./api";

const badgeService = {
  // Get all badges
  getAllBadges: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.category) params.append("category", filters.category);
      if (filters.rarity) params.append("rarity", filters.rarity);
      
      const response = await api.get(`/badges?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching badges:", error);
      throw error;
    }
  },

  // Get badges by category
  getBadgesByCategory: async (category) => {
    try {
      const response = await api.get(`/badges/category/${category}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching badges by category:", error);
      throw error;
    }
  },

  // Get user's earned badges
  getUserBadges: async () => {
    try {
      const response = await api.get("/badges/user");
      return response.data;
    } catch (error) {
      console.error("Error fetching user badges:", error);
      throw error;
    }
  },

  // Get badge progress for user
  getBadgeProgress: async (category = null) => {
    try {
      const params = category ? `?category=${category}` : "";
      const response = await api.get(`/badges/progress${params}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching badge progress:", error);
      throw error;
    }
  },

  // Create default badges (admin only)
  createDefaultBadges: async () => {
    try {
      const response = await api.post("/badges/create-defaults");
      return response.data;
    } catch (error) {
      console.error("Error creating default badges:", error);
      throw error;
    }
  },
};

export default badgeService;
