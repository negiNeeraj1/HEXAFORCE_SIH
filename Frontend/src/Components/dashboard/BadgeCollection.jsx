import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Filter, Search, Award, Star, Zap, Target, Leaf } from "lucide-react";
import BadgeCard from "./BadgeCard";
import badgeService from "../../services/badgeService";

const BadgeCollection = () => {
  const [badges, setBadges] = useState([]);
  const [userBadges, setUserBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRarity, setSelectedRarity] = useState("all");

  const categories = [
    { id: "all", name: "All Badges", icon: Trophy, color: "text-blue-600" },
    { id: "quiz", name: "Quiz Badges", icon: Target, color: "text-green-600" },
    { id: "challenge", name: "Challenge Badges", icon: Leaf, color: "text-emerald-600" },
    { id: "streak", name: "Streak Badges", icon: Zap, color: "text-orange-600" },
    { id: "achievement", name: "Achievement Badges", icon: Star, color: "text-purple-600" },
    { id: "special", name: "Special Badges", icon: Award, color: "text-pink-600" },
  ];

  const rarityOptions = [
    { id: "all", name: "All Rarities", color: "text-gray-600" },
    { id: "common", name: "Common", color: "text-gray-600" },
    { id: "rare", name: "Rare", color: "text-blue-600" },
    { id: "epic", name: "Epic", color: "text-purple-600" },
    { id: "legendary", name: "Legendary", color: "text-yellow-600" },
  ];

  useEffect(() => {
    loadBadges();
  }, []);

  const loadBadges = async () => {
    try {
      setLoading(true);
      const [badgesResponse, userBadgesResponse] = await Promise.all([
        badgeService.getAllBadges(),
        badgeService.getUserBadges(),
      ]);

      if (badgesResponse.success && userBadgesResponse.success) {
        setBadges(badgesResponse.data.badges);
        setUserBadges(userBadgesResponse.data.badges);
      }
    } catch (err) {
      console.error("Failed to load badges:", err);
      setError("Failed to load badges");
    } finally {
      setLoading(false);
    }
  };

  const filteredBadges = badges.filter((badge) => {
    const matchesCategory = selectedCategory === "all" || badge.category === selectedCategory;
    const matchesRarity = selectedRarity === "all" || badge.rarity === selectedRarity;
    const matchesSearch = badge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         badge.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesRarity && matchesSearch;
  });

  const earnedBadges = userBadges.length;
  const totalBadges = badges.length;
  const completionRate = totalBadges > 0 ? Math.round((earnedBadges / totalBadges) * 100) : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 shadow-lg animate-pulse"
            >
              <div className="h-16 w-16 bg-gray-200 rounded-full mx-auto mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-3"></div>
              <div className="h-2 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-lg text-center">
        <div className="text-red-600 mb-2">⚠️ {error}</div>
        <button
          onClick={loadBadges}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Badge Collection</h2>
            <p className="text-gray-600">
              Track your achievements and unlock new badges through your learning journey
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{earnedBadges}</div>
            <div className="text-sm text-gray-500">Badges Earned</div>
            <div className="text-xs text-gray-400">{completionRate}% Complete</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <category.icon className="w-4 h-4" />
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Rarity Filter */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rarity
            </label>
            <div className="flex flex-wrap gap-2">
              {rarityOptions.map((rarity) => (
                <button
                  key={rarity.id}
                  onClick={() => setSelectedRarity(rarity.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedRarity === rarity.id
                      ? "bg-purple-100 text-purple-700 border border-purple-200"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {rarity.name}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search badges..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Badges Grid */}
      {filteredBadges.length === 0 ? (
        <div className="bg-white rounded-xl p-8 text-center shadow-lg border border-gray-100">
          <Trophy className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No badges found
          </h3>
          <p className="text-gray-500 mb-4">
            Try adjusting your filters or search terms
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSelectedRarity("all");
              setSearchTerm("");
            }}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBadges.map((badge) => {
            const userBadge = userBadges.find(ub => ub.id === badge._id);
            const earned = !!userBadge;
            
            return (
              <BadgeCard
                key={badge._id}
                badge={badge}
                earned={earned}
                progress={earned ? 100 : 0}
                progressText={earned ? "Earned!" : "Not earned yet"}
                onClick={() => {
                  // Could open a modal with badge details
                  console.log("Badge clicked:", badge);
                }}
              />
            );
          })}
        </div>
      )}

      {/* Results Summary */}
      <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>
            Showing {filteredBadges.length} of {totalBadges} badges
          </span>
          <span>
            {earnedBadges} earned • {totalBadges - earnedBadges} remaining
          </span>
        </div>
      </div>
    </div>
  );
};

export default BadgeCollection;
