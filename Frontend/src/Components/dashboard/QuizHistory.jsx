import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  Trophy,
  Target,
  ChevronRight,
  Calendar,
  BookOpen,
  TrendingUp,
  Award,
  Eye,
  BarChart3,
  Filter,
  RefreshCw,
} from "lucide-react";
import quizAttemptService from "../../services/quizAttemptService";

const QuizHistory = ({ showAll = false, limit = 5 }) => {
  const [quizHistory, setQuizHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    subject: "",
    difficulty: "",
    passed: "",
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadQuizHistory();
  }, [currentPage, filters, limit]);

  const loadQuizHistory = async () => {
    try {
      setLoading(true);
      setError("");

      const options = {
        page: currentPage,
        limit: showAll ? 10 : limit,
        ...filters,
      };

      // Remove empty filters
      Object.keys(options).forEach((key) => {
        if (options[key] === "") delete options[key];
      });

      const response = await quizAttemptService.getUserQuizHistory(options);

      if (response.success) {
        console.log("Raw response data:", response.data);
        console.log("Original attempts count:", response.data.attempts.length);
        console.log("Raw attempts:", response.data.attempts);

        // Deduplicate attempts to prevent showing the same quiz multiple times
        const uniqueAttempts = response.data.attempts.filter(
          (attempt, index, self) => {
            // Check by _id first (most reliable)
            const idIndex = self.findIndex((t) => t._id === attempt._id);
            if (index !== idIndex) {
              console.log(
                `Duplicate found by ID: ${attempt._id} at index ${index}`
              );
              return false;
            }

            // Also check for exact duplicates by comparing key fields
            const exactDuplicateIndex = self.findIndex(
              (t) =>
                t._id === attempt._id &&
                t.subject?.name === attempt.subject?.name &&
                t.difficulty?.id === attempt.difficulty?.id &&
                t.score?.correct === attempt.score?.correct &&
                t.score?.total === attempt.score?.total &&
                t.completedAt === attempt.completedAt
            );

            if (index !== exactDuplicateIndex) {
              console.log(`Exact duplicate found at index ${index}`);
              return false;
            }

            return true;
          }
        );

        console.log("After deduplication count:", uniqueAttempts.length);
        console.log("Unique attempts:", uniqueAttempts);

        // Apply limit after deduplication to ensure we show exactly the requested number
        const limitedAttempts = showAll
          ? uniqueAttempts
          : uniqueAttempts.slice(0, limit);

        console.log("Final limited attempts count:", limitedAttempts.length);
        console.log("Limit requested:", limit);
        console.log("Final attempts to display:", limitedAttempts);

        // Additional safety check - ensure we don't have more items than the limit
        if (!showAll && limitedAttempts.length > limit) {
          console.warn(
            `Warning: Got ${limitedAttempts.length} items but limit is ${limit}. Truncating.`
          );
          limitedAttempts.splice(limit);
        }

        setQuizHistory(
          limitedAttempts.map((attempt) =>
            quizAttemptService.formatQuizAttempt(attempt)
          )
        );

        // Final safety check - if we still have more items than expected, force the limit
        if (!showAll && limitedAttempts.length > limit) {
          console.error(
            `CRITICAL: Still have ${limitedAttempts.length} items after deduplication. Forcing limit.`
          );
          const forcedLimited = limitedAttempts.slice(0, limit);
          setQuizHistory(
            forcedLimited.map((attempt) =>
              quizAttemptService.formatQuizAttempt(attempt)
            )
          );
        }

        setTotalPages(response.data.pagination.totalPages);
        setError("");
      }
    } catch (err) {
      console.error("Failed to load quiz history:", err);
      
      // Provide more user-friendly error messages
      let errorMessage = "Failed to load quiz history";
      
      if (err.message.includes("Backend server is not available")) {
        errorMessage = "Server is currently unavailable. Please try again later.";
      } else if (err.message.includes("Authentication failed")) {
        errorMessage = "Your session has expired. Please log in again.";
      } else if (err.message.includes("No authentication token found")) {
        errorMessage = "Please log in to view your quiz history.";
      } else if (err.message.includes("Failed to fetch")) {
        errorMessage = "Unable to connect to the server. Please check your internet connection.";
      }
      
      setError(errorMessage);
      setQuizHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case "beginner":
        return <Target className="w-4 h-4 text-green-600" />;
      case "intermediate":
        return <Award className="w-4 h-4 text-orange-600" />;
      case "advanced":
        return <Trophy className="w-4 h-4 text-purple-600" />;
      default:
        return <BookOpen className="w-4 h-4 text-gray-600" />;
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1); // Reset to first page when filtering
  };

  const clearFilters = () => {
    setFilters({
      subject: "",
      difficulty: "",
      passed: "",
    });
    setCurrentPage(1);
  };

  if (loading && currentPage === 1) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
          <p className="text-gray-600">Loading quiz history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-600 mb-2">⚠️ {error}</div>
        <button
          onClick={loadQuizHistory}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  if (quizHistory.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          No Quiz History Yet
        </h3>
        <p className="text-gray-500 mb-4">
          Start taking quizzes to see your progress and performance!
        </p>
        <a
          href="/quizzes"
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          <Trophy className="w-4 h-4 mr-2" />
          Take Your First Quiz
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Filters (only for full view) */}
      {showAll && (
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Quiz History</h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
            <button
              onClick={loadQuizHistory}
              className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      )}

      {/* Filters Panel */}
      {showAll && showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gray-50 rounded-lg p-4 border"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject
              </label>
              <select
                value={filters.subject}
                onChange={(e) => handleFilterChange("subject", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Subjects</option>
                <option value="Climate Change & Global Warming">
                  Climate Change & Global Warming
                </option>
                <option value="Biodiversity & Ecosystems">
                  Biodiversity & Ecosystems
                </option>
                <option value="Renewable Energy Sources">
                  Renewable Energy Sources
                </option>
                <option value="Waste Management & Recycling">
                  Waste Management & Recycling
                </option>
                <option value="Water Conservation & Pollution">
                  Water Conservation & Pollution
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                value={filters.difficulty}
                onChange={(e) =>
                  handleFilterChange("difficulty", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={filters.passed}
                onChange={(e) => handleFilterChange("passed", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Results</option>
                <option value="true">Passed</option>
                <option value="false">Failed</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={clearFilters}
                className="w-full px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quiz History List */}
      <div className="space-y-4">
        {quizHistory.map((attempt, index) => (
          <motion.div
            key={`${attempt._id}-${attempt.completedAt}-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  {/* Subject and Difficulty */}
                  <div className="flex items-center space-x-3 mb-2">
                    {getDifficultyIcon(attempt.difficulty.id)}
                    <h3 className="text-lg font-semibold text-gray-900">
                      {attempt.subject.name}
                    </h3>
                    <span
                      className={`text-sm font-medium ${attempt.difficultyColor}`}
                    >
                      {attempt.difficulty.name}
                    </span>
                  </div>

                  {/* Score and Status */}
                  <div className="flex items-center space-x-4 mb-3">
                    <div className="flex items-center">
                      <Trophy className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium text-gray-700">
                        {attempt.scoreDisplay}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-blue-500 mr-1" />
                      <span className="text-sm text-gray-600">
                        {attempt.duration}
                      </span>
                    </div>
                    <span
                      className={`text-sm font-medium ${attempt.statusColor}`}
                    >
                      {attempt.status}
                    </span>
                  </div>

                  {/* Date and Insights */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {attempt.formattedDate} at {attempt.formattedTime}
                    </div>

                    {attempt.insights && attempt.insights.length > 0 && (
                      <div className="flex items-center space-x-2">
                        {attempt.insights.slice(0, 2).map((insight, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                          >
                            {insight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                {showAll && (
                  <div className="ml-4">
                    <button
                      onClick={() => {
                        // Navigate to detailed view
                        window.location.href = `/quiz-history/${attempt._id}`;
                      }}
                      className="flex items-center px-4 py-2 text-blue-600 hover:text-blue-800 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Performance Bar */}
            <div className="bg-gray-50 px-6 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Performance</span>
                <span className="text-sm font-medium text-gray-900">
                  {attempt.score.percentage}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${
                    attempt.score.percentage >= 80
                      ? "bg-green-500"
                      : attempt.score.percentage >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${attempt.score.percentage}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination (only for full view) */}
      {showAll && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {/* View All Link (only for limited view) */}
      {!showAll && quizHistory.length >= limit && (
        <div className="text-center">
          <a
            href="/quiz-history"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            View All Quiz History
            <ChevronRight className="w-4 h-4 ml-1" />
          </a>
        </div>
      )}
    </div>
  );
};

export default QuizHistory;
