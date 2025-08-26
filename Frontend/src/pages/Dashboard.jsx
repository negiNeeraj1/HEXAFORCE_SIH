import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Trophy,
  Book,
  Star,
  Clock,
  Target,
  Award,
  Calendar,
  Leaf,
  TrendingUp,
  Zap,
  Droplets,
  Users,
} from "lucide-react";
import AchievementCard from "../Components/dashboard/AchievementCard";
import StatCard from "../Components/dashboard/StatCard";
import QuizStats from "../Components/dashboard/QuizStats";
import QuizHistory from "../Components/dashboard/QuizHistory";
import ecoChallengeService from "../services/ecoChallengeService";

const Dashboard = () => {
  const [userPoints, setUserPoints] = useState(null);
  const [userChallenges, setUserChallenges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEcoData();
  }, []);

  const loadEcoData = async () => {
    try {
      setLoading(true);
      const [pointsResponse, challengesResponse] = await Promise.all([
        ecoChallengeService.getUserPoints(),
        ecoChallengeService.getUserChallenges("active")
      ]);

      if (pointsResponse.success) {
        setUserPoints(pointsResponse.data.userPoints);
      }
      if (challengesResponse.success) {
        setUserChallenges(challengesResponse.data.userChallenges);
      }
    } catch (error) {
      console.error("Failed to load eco data:", error);
    } finally {
      setLoading(false);
    }
  };

  const performanceData = [
    { month: "Jan", score: 85 },
    { month: "Feb", score: 78 },
    { month: "Mar", score: 90 },
    { month: "Apr", score: 88 },
    { month: "May", score: 92 },
  ];

  const subjectScores = [
    { subject: "Climate Change", score: 85 },
    { subject: "Biodiversity", score: 78 },
    { subject: "Renewable Energy", score: 92 },
    { subject: "Waste Management", score: 88 },
  ];

  const getLevelColor = (level) => {
    if (level >= 10) return "text-purple-600";
    if (level >= 7) return "text-blue-600";
    if (level >= 5) return "text-green-600";
    if (level >= 3) return "text-yellow-600";
    return "text-gray-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Eco Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Track your environmental knowledge and sustainability progress
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <motion.a
              href="/eco-challenges"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
            >
              <Leaf className="w-4 h-4" />
              <span>Eco Challenges</span>
            </motion.a>
            <motion.a
              href="/quizzes"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Take Eco Quiz
            </motion.a>
            <motion.a
              href="/quiz-history"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
            >
              View History
            </motion.a>
          </div>
        </div>

        {/* Eco Challenge Stats */}
        {userPoints && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Points"
                value={userPoints.totalPoints}
                icon={<Star className="w-6 h-6 text-yellow-500" />}
                color="bg-yellow-50"
                textColor="text-yellow-700"
              />
              <StatCard
                title="Current Level"
                value={userPoints.currentLevel}
                subtitle={userPoints.levelTitle}
                icon={<Trophy className="w-6 h-6 text-purple-500" />}
                color="bg-purple-50"
                textColor="text-purple-700"
              />
              <StatCard
                title="Current Streak"
                value={userPoints.streak?.current || 0}
                subtitle="days"
                icon={<TrendingUp className="w-6 h-6 text-green-500" />}
                color="bg-green-50"
                textColor="text-green-700"
              />
              <StatCard
                title="Challenges Completed"
                value={userPoints.stats?.challengesCompleted || 0}
                icon={<Target className="w-6 h-6 text-blue-500" />}
                color="bg-blue-50"
                textColor="text-blue-700"
              />
            </div>
          </motion.div>
        )}

        {/* Environmental Impact */}
        {userPoints && userPoints.stats?.totalImpact && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
                <Leaf className="w-5 h-5 mr-2 text-green-600" />
                Your Environmental Impact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {userPoints.stats.totalImpact.co2Reduced.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">kg CO₂ Reduced</div>
                  <div className="text-xs text-gray-500 mt-1">🌱</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {userPoints.stats.totalImpact.waterSaved.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">Liters Saved</div>
                  <div className="text-xs text-gray-500 mt-1">💧</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {userPoints.stats.totalImpact.energySaved.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">kWh Saved</div>
                  <div className="text-xs text-gray-500 mt-1">⚡</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {userPoints.stats.totalImpact.plasticSaved.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">kg Plastic Saved</div>
                  <div className="text-xs text-gray-500 mt-1">♻️</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Challenges */}
        {userChallenges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Target className="w-5 h-5 mr-2 text-green-600" />
                  Active Eco Challenges
                </h2>
                <a
                  href="/eco-challenges"
                  className="text-green-600 hover:text-green-800 font-medium text-sm"
                >
                  View All
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userChallenges.slice(0, 3).map((userChallenge) => (
                  <div key={userChallenge._id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">
                        {userChallenge.challengeId?.title}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {userChallenge.progress?.currentStreak || 0} day streak
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {userChallenge.challengeId?.description}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Progress: {userChallenge.progress?.totalCompletions || 0}/{userChallenge.challengeId?.duration || 7}</span>
                      <span>{userChallenge.pointsEarned || 0} pts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Quiz Statistics */}
        <div className="mb-8">
          <QuizStats />
        </div>

        {/* Recent Quiz History */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                Recent Quiz Activity
              </h2>
              <a
                href="/quiz-history"
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                View All
              </a>
            </div>
            <QuizHistory showAll={false} limit={3} />
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AchievementCard
              title="Eco Warrior"
              progress={75}
              icon={<Trophy className="text-green-500" />}
            />
            <AchievementCard
              title="Sustainability Champion"
              progress={90}
              icon={<Target className="text-blue-500" />}
            />
            <AchievementCard
              title="Climate Expert"
              progress={60}
              icon={<Award className="text-purple-500" />}
            />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
