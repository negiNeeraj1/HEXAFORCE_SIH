import config from "./config.js";

const API_BASE = config.API_BASE_URL;

class EcoChallengeService {
  // Get authentication headers
  getAuthHeaders() {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found. Please log in again.");
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  }

  async getAllChallenges(options = {}) {
    try {
      const { page = 1, limit = 10, category, difficulty, search } = options;

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });

      if (category) params.append("category", category);
      if (difficulty) params.append("difficulty", difficulty);
      if (search) params.append("search", search);

      const response = await fetch(`${API_BASE}/eco/challenges?${params}`);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(`Failed to fetch challenges: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Eco challenge service error:", error);
      throw error;
    }
  }

  // Get challenge by ID
  async getChallengeById(challengeId) {
    try {
      const response = await fetch(`${API_BASE}/eco/challenges/${challengeId}`);

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(`Failed to fetch challenge: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Eco challenge service error:", error);
      throw error;
    }
  }

  // Join a challenge
  async joinChallenge(challengeId) {
    try {
      const response = await fetch(
        `${API_BASE}/eco/challenges/${challengeId}/join`,
        {
          method: "POST",
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(`Failed to join challenge: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Eco challenge service error:", error);
      throw error;
    }
  }

  async completeDailyTask(challengeId, impact = {}) {
    try {
      // Validate challenge ID
      if (!challengeId || challengeId === "undefined") {
        throw new Error("Invalid challenge ID provided");
      }

      const response = await fetch(
        `${API_BASE}/eco/challenges/${challengeId}/complete`,
        {
          method: "POST",
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ impact }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        } else if (response.status === 429) {
          throw new Error(
            "Too many requests. Please wait a moment and try again."
          );
        } else if (response.status === 500) {
          throw new Error("Server error. Please try again later.");
        }
        throw new Error(
          `Failed to complete daily task: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Eco challenge service error:", error);
      throw error;
    }
  }

  // Get user's challenges
  async getUserChallenges(status = "active") {
    try {
      const response = await fetch(
        `${API_BASE}/eco/user/challenges?status=${status}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(
          `Failed to fetch user challenges: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Eco challenge service error:", error);
      throw error;
    }
  }

  // Get user's points and achievements
  async getUserPoints() {
    try {
      const response = await fetch(`${API_BASE}/eco/user/points`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(`Failed to fetch user points: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Eco challenge service error:", error);
      throw error;
    }
  }

  // Get leaderboard
  async getLeaderboard(limit = 10) {
    try {
      const response = await fetch(
        `${API_BASE}/eco/leaderboard?limit=${limit}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch leaderboard: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Eco challenge service error:", error);
      throw error;
    }
  }

  // Mark challenge as favorite
  async toggleFavorite(challengeId) {
    try {
      const response = await fetch(
        `${API_BASE}/eco/user/challenges/${challengeId}/favorite`,
        {
          method: "PATCH",
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(`Failed to toggle favorite: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Eco challenge service error:", error);
      throw error;
    }
  }

  // Get challenge progress
  async getChallengeProgress(challengeId) {
    try {
      const response = await fetch(
        `${API_BASE}/eco/user/challenges/${challengeId}/progress`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(
          `Failed to fetch challenge progress: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Eco challenge service error:", error);
      throw error;
    }
  }

  // Abandon challenge
  async abandonChallenge(challengeId) {
    try {
      const response = await fetch(
        `${API_BASE}/eco/user/challenges/${challengeId}/abandon`,
        {
          method: "PATCH",
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(`Failed to abandon challenge: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Eco challenge service error:", error);
      throw error;
    }
  }

  // Fun Challenge Methods
  async completeFunChallenge(challengeId, title, category, impact = {}) {
    try {
      const response = await fetch(
        `${API_BASE}/fun/challenges/${challengeId}/complete`,
        {
          method: "POST",
          headers: this.getAuthHeaders(),
          body: JSON.stringify({ title, category, impact }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(
          `Failed to complete fun challenge: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Fun challenge service error:", error);
      throw error;
    }
  }

  async getUserFunChallenges(status = "all") {
    try {
      const response = await fetch(
        `${API_BASE}/fun/user/challenges?status=${status}`,
        {
          headers: this.getAuthHeaders(),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(
          `Failed to fetch fun challenges: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Fun challenge service error:", error);
      throw error;
    }
  }

  async getFunChallengeStats() {
    try {
      const response = await fetch(`${API_BASE}/fun/user/stats`, {
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(
          `Failed to fetch fun challenge stats: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Fun challenge service error:", error);
      throw error;
    }
  }

  async resetFunChallenges() {
    try {
      const response = await fetch(`${API_BASE}/fun/user/challenges/reset`, {
        method: "DELETE",
        headers: this.getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(
          `Failed to reset fun challenges: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Fun challenge service error:", error);
      throw error;
    }
  }

  // Complete challenge with photo verification
  async completeChallengeWithVerification(
    challengeId,
    challengeTitle,
    category,
    verificationData
  ) {
    try {
      const formData = new FormData();
      formData.append("challengeId", challengeId);
      formData.append("title", challengeTitle);
      formData.append("category", category);
      formData.append("verificationData", JSON.stringify(verificationData));

      // Add the photo if it exists
      if (verificationData.photo) {
        formData.append("photo", verificationData.photo);
      }

      const response = await fetch(
        `${API_BASE}/fun/challenges/${challengeId}/complete-verified`,
        {
          method: "POST",
          headers: {
            Authorization: this.getAuthHeaders().Authorization,
          },
          body: formData,
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Authentication failed. Please log in again.");
        }
        throw new Error(
          `Failed to complete verified challenge: ${response.statusText}`
        );
      }

      return await response.json();
    } catch (error) {
      console.error("Verified challenge completion error:", error);
      throw error;
    }
  }
}

const ecoChallengeService = new EcoChallengeService();
export default ecoChallengeService;
