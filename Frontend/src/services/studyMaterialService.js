// src/services/studyMaterialService.js
import config from "../config.js";

const API_BASE = config.API_BASE_URL;

const studyMaterialService = {
  // Get all study materials
  getAllMaterials: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE}/study-materials`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch study materials: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching study materials:", error);
      throw error;
    }
  },

  // Get study materials by category
  getMaterialsByCategory: async (category) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_BASE}/study-materials/category/${category}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${category} study materials: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error(`Error fetching ${category} study materials:`, error);
      throw error;
    }
  },

  // Get a single study material by ID
  getMaterialById: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE}/study-materials/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch study material details: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Error fetching study material details:", error);
      throw error;
    }
  },

  // Download a study material
  downloadMaterial: async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_BASE}/study-materials/${id}/download`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to download study material: ${response.statusText}`
        );
      }

      return await response.blob();
    } catch (error) {
      console.error("Error downloading study material:", error);
      throw error;
    }
  },
};

export default studyMaterialService;
