import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  Target,
  Trophy,
  Users,
  Calendar,
  Star,
  Filter,
  Search,
  TrendingUp,
  Award,
  Sparkles,
} from "lucide-react";
import ecoChallengeService from "../services/ecoChallengeService";
import {
  ChallengesView,
  useChallengesViewModel,
} from "../Components/challenges";

const EcoChallenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showFunChallenges, setShowFunChallenges] = useState(false);

  const {
    challenges: funChallenges,
    startChallenge,
    points,
    activeChallenges,
    resetChallenges,
    loading: funChallengesLoading,
    error: funChallengesError,
    refreshData: refreshFunChallenges,
  } = useChallengesViewModel();

  useEffect(() => {
    loadChallenges();
  }, [currentPage, filters]);

  const loadChallenges = async () => {
    try {
      setLoading(true);
      const response = await ecoChallengeService.getAllChallenges({
        page: currentPage,
        limit: 12,
        ...filters,
      });

      if (response.success) {
        setChallenges(response.data.challenges);
        setTotalPages(response.data.pagination.totalPages);
        setError("");
      }
    } catch (err) {
      console.error("Failed to load challenges:", err);
      setError("Failed to load challenges");
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleJoinChallenge = async (challengeId) => {
    try {
      const response = await ecoChallengeService.joinChallenge(challengeId);
      if (response.success) {
        setChallenges((prev) =>
          prev.map((challenge) =>
            challenge._id === challengeId
              ? { ...challenge, isJoined: true }
              : challenge
          )
        );
        alert("Successfully joined the challenge!");
      }
    } catch (err) {
      console.error("Failed to join challenge:", err);
      alert(err.message || "Failed to join challenge");
    }
  };

  // Function to refresh dashboard data after challenge completion
  const handleChallengeCompleted = async (completionData) => {
    try {
      console.log("Challenge completed, refreshing data...", completionData);
      
      // Refresh challenges data
      await loadChallenges();
      
      // You can also trigger a dashboard refresh here if needed
      // This will be handled by the parent component
    } catch (error) {
      console.error("Failed to refresh data after challenge completion:", error);
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      "Waste Reduction": "♻️",
      "Energy Conservation": "⚡",
      "Water Conservation": "💧",
      Transportation: "🚲",
      "Food & Diet": "🥗",
      Recycling: "🔄",
      "Plant Care": "🌱",
      Education: "📚",
    };
    return icons[category] || "🌍";
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: "bg-green-100 text-green-800",
      Intermediate: "bg-yellow-100 text-yellow-800",
      Advanced: "bg-red-100 text-red-800",
    };
    return colors[difficulty] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Eco Challenges
              </h1>
              <p className="text-gray-600">
                Join sustainability challenges and become an eco-hero!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Challenge Type Toggle */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Choose Challenge Type
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Backend Challenges</span>
              <button
                onClick={() => setShowFunChallenges(!showFunChallenges)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  showFunChallenges ? "bg-green-600" : "bg-gray-200"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    showFunChallenges ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className="text-sm text-gray-600">Fun Challenges</span>
            </div>
          </div>

          {showFunChallenges && (
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    Fun Challenges Active
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  {funChallengesLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                      <span className="text-green-700">Loading...</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-green-700">
                        🏆 Points: {points}
                      </span>
                      <span className="text-green-700">
                        ✅ Completed: {activeChallenges.length}
                      </span>
                      <button
                        onClick={resetChallenges}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs"
                      >
                        Reset All
                      </button>
                      <button
                        onClick={refreshFunChallenges}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xs"
                      >
                        Refresh
                      </button>
                    </>
                  )}
                </div>
              </div>
              <p className="text-green-700 text-sm">
                Interactive eco-challenges for kids and families. Complete
                challenges to earn points and learn about sustainability!
              </p>
              {funChallengesError && (
                <div className="mt-3 p-2 bg-red-100 border border-red-300 rounded-lg">
                  <p className="text-red-700 text-sm">{funChallengesError}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Show Fun Challenges or Backend Challenges */}
        {showFunChallenges ? (
          <ChallengesView
            challenges={funChallenges}
            onChallengeUpdated={startChallenge}
            loading={funChallengesLoading}
            error={funChallengesError}
          />
        ) : (
          <>
            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search challenges..."
                    value={filters.search}
                    onChange={(e) =>
                      handleFilterChange("search", e.target.value)
                    }
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={filters.category}
                  onChange={(e) =>
                    handleFilterChange("category", e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  <option value="Waste Reduction">Waste Reduction</option>
                  <option value="Energy Conservation">
                    Energy Conservation
                  </option>
                  <option value="Water Conservation">Water Conservation</option>
                  <option value="Transportation">Transportation</option>
                  <option value="Food & Diet">Food & Diet</option>
                  <option value="Recycling">Recycling</option>
                  <option value="Plant Care">Plant Care</option>
                  <option value="Education">Education</option>
                </select>

                {/* Difficulty Filter */}
                <select
                  value={filters.difficulty}
                  onChange={(e) =>
                    handleFilterChange("difficulty", e.target.value)
                  }
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Difficulties</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>

                {/* Clear Filters */}
                <button
                  onClick={() =>
                    setFilters({ category: "", difficulty: "", search: "" })
                  }
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Challenges Grid */}
            {error ? (
              <div className="text-center py-12">
                <p className="text-red-600 text-lg">{error}</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {challenges.map((challenge) => (
                    <motion.div
                      key={challenge._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      {/* Challenge Header */}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">
                              {getCategoryIcon(challenge.category)}
                            </span>
                            <span
                              className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(
                                challenge.difficulty
                              )}`}
                            >
                              {challenge.difficulty}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1 text-yellow-500">
                            <Star className="h-4 w-4 fill-current" />
                            <span className="text-sm font-medium">
                              {challenge.points}
                            </span>
                          </div>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {challenge.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {challenge.description}
                        </p>

                        {/* Challenge Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{challenge.duration} days</span>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-gray-500">
                            <Users className="h-4 w-4" />
                            <span>{challenge.currentParticipants}</span>
                          </div>
                        </div>

                        {/* Impact Preview */}
                        {challenge.impact && (
                          <div className="bg-green-50 rounded-lg p-3 mb-4">
                            <div className="flex items-center space-x-2 text-sm text-green-700">
                              <TrendingUp className="h-4 w-4" />
                              <span>Daily Impact</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                              {challenge.impact.co2Reduced > 0 && (
                                <span>
                                  🌱 {challenge.impact.co2Reduced}kg CO₂
                                </span>
                              )}
                              {challenge.impact.waterSaved > 0 && (
                                <span>💧 {challenge.impact.waterSaved}L</span>
                              )}
                            </div>
                          </div>
                        )}

                        {/* Action Button */}
                        <button
                          onClick={() => handleJoinChallenge(challenge._id)}
                          disabled={challenge.isJoined}
                          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                            challenge.isJoined
                              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                              : "bg-green-600 text-white hover:bg-green-700"
                          }`}
                        >
                          {challenge.isJoined
                            ? "Already Joined"
                            : "Join Challenge"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex space-x-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                              currentPage === page
                                ? "bg-green-600 text-white"
                                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EcoChallenges;
