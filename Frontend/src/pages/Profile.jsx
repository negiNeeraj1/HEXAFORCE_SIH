import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Trophy,
  Award,
  Target,
  TrendingUp,
  Calendar,
  Star,
  Zap,
  Leaf,
  BookOpen,
  Clock,
  BarChart3,
  Crown,
  Medal,
  Badge,
  Settings,
  Edit,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import BadgeCollection from "../Components/dashboard/BadgeCollection";
import badgeService from "../services/badgeService";
import ecoChallengeService from "../services/ecoChallengeService";

const Profile = () => {
  const { user, refreshUserData } = useAuth();
  const [userPoints, setUserPoints] = useState(null);
  const [recentBadges, setRecentBadges] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const [pointsResponse, badgesResponse, challengesResponse] = await Promise.all([
        ecoChallengeService.getUserPoints(),
        badgeService.getUserBadges(),
        ecoChallengeService.getUserChallenges(),
      ]);

      if (pointsResponse.success) {
        setUserPoints(pointsResponse.data.userPoints);
      }

      if (badgesResponse.success) {
        // Get recent badges (last 5 earned)
        const recent = badgesResponse.data.badges
          .sort((a, b) => new Date(b.dateEarned) - new Date(a.dateEarned))
          .slice(0, 5);
        setRecentBadges(recent);
      }

      if (challengesResponse.success) {
        setStats({
          totalChallenges: challengesResponse.data.userChallenges.length,
          completedChallenges: challengesResponse.data.userChallenges.filter(c => c.status === "completed").length,
        });
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    if (level >= 10) return "text-purple-600";
    if (level >= 7) return "text-blue-600";
    if (level >= 5) return "text-green-600";
    if (level >= 3) return "text-yellow-600";
    return "text-gray-600";
  };

  const getMedalIcon = (type) => {
    switch (type) {
      case "bronze":
        return "🥉";
      case "silver":
        return "🥈";
      case "gold":
        return "🥇";
      case "platinum":
        return "💎";
      default:
        return "🏅";
    }
  };

  const tabs = [
    { id: "overview", name: "Overview", icon: User },
    { id: "badges", name: "Badges", icon: Trophy },
    { id: "achievements", name: "Achievements", icon: Award },
    { id: "stats", name: "Statistics", icon: BarChart3 },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-100 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-32 bg-white rounded-xl"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-48 bg-white rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <h1 className="text-3xl font-bold">{user?.name || "User"}</h1>
                  <p className="text-blue-100 text-lg">🎓 {user?.school || "Institution"}</p>
                  <p className="text-blue-100">{user?.email}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold">{userPoints?.currentLevel || 1}</div>
                <div className="text-blue-100">Level</div>
                <div className="text-sm text-blue-200">
                  {userPoints?.levelTitle || "Beginner"}
                </div>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Progress to Level {userPoints?.currentLevel + 1 || 2}
              </span>
              <span className="text-sm text-gray-500">
                {userPoints?.totalPoints || 0} / {userPoints?.totalPoints + (userPoints?.pointsToNextLevel || 100)} points
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{
                  width: `${userPoints ? ((userPoints.totalPoints % 1000) / 1000) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userPoints?.totalPoints || 0}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Star className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Badges Earned</p>
                <p className="text-2xl font-bold text-gray-900">
                  {recentBadges.length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userPoints?.streak?.current || 0} days
                </p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Challenges</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completedChallenges || 0}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-lg">
                <Leaf className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Badges */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                      Recent Badges
                    </h3>
                    {recentBadges.length > 0 ? (
                      <div className="space-y-3">
                        {recentBadges.map((badge, index) => (
                          <div
                            key={badge.id}
                            className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200"
                          >
                            <div className="text-2xl">{badge.icon}</div>
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {badge.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {badge.description}
                              </div>
                            </div>
                            <div className="text-xs text-gray-400">
                              {new Date(badge.dateEarned).toLocaleDateString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-4">
                        No badges earned yet. Start learning to earn your first badge!
                      </p>
                    )}
                  </div>

                  {/* Medals */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Medal className="w-5 h-5 mr-2 text-yellow-600" />
                      Medals
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {["bronze", "silver", "gold", "platinum"].map((medalType) => (
                        <div
                          key={medalType}
                          className="text-center p-4 bg-white rounded-lg border border-gray-200"
                        >
                          <div className="text-3xl mb-2">
                            {getMedalIcon(medalType)}
                          </div>
                          <div className="text-sm font-medium text-gray-900 capitalize">
                            {medalType}
                          </div>
                          <div className="text-2xl font-bold text-gray-700">
                            {userPoints?.medals?.[medalType] || 0}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Impact Stats */}
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Leaf className="w-5 h-5 mr-2 text-green-600" />
                    Environmental Impact
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {userPoints?.stats?.totalImpact?.plasticSaved || 0} kg
                      </div>
                      <div className="text-sm text-gray-600">Plastic Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {userPoints?.stats?.totalImpact?.co2Reduced || 0} kg
                      </div>
                      <div className="text-sm text-gray-600">CO2 Reduced</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-600">
                        {userPoints?.stats?.totalImpact?.waterSaved || 0} L
                      </div>
                      <div className="text-sm text-gray-600">Water Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">
                        {userPoints?.stats?.totalImpact?.energySaved || 0} kWh
                      </div>
                      <div className="text-sm text-gray-600">Energy Saved</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Badges Tab */}
            {activeTab === "badges" && <BadgeCollection />}

            {/* Achievements Tab */}
            {activeTab === "achievements" && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Achievements Coming Soon
                  </h3>
                  <p className="text-gray-500">
                    Track your special achievements and milestones here
                  </p>
                </div>
              </div>
            )}

            {/* Statistics Tab */}
            {activeTab === "stats" && (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Detailed Statistics Coming Soon
                  </h3>
                  <p className="text-gray-500">
                    View your detailed learning analytics and progress charts
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
