import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Lock, TrendingUp } from "lucide-react";

const BadgeCard = ({ badge, earned, progress, progressText, onClick }) => {
  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "border-gray-300 bg-gray-50";
      case "rare":
        return "border-blue-300 bg-blue-50";
      case "epic":
        return "border-purple-300 bg-purple-50";
      case "legendary":
        return "border-yellow-300 bg-yellow-50";
      default:
        return "border-gray-300 bg-gray-50";
    }
  };

  const getRarityText = (rarity) => {
    switch (rarity) {
      case "common":
        return "Common";
      case "rare":
        return "Rare";
      case "epic":
        return "Epic";
      case "legendary":
        return "Legendary";
      default:
        return "Common";
    }
  };

  return (
    <motion.div
      whileHover={{ scale: earned ? 1.02 : 1.01 }}
      className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-300 ${
        earned
          ? "shadow-lg hover:shadow-xl"
          : "opacity-70 hover:opacity-90"
      } ${getRarityColor(badge.rarity)}`}
      onClick={onClick}
    >
      {/* Rarity Badge */}
      <div className="absolute -top-2 -right-2">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          badge.rarity === "legendary" ? "bg-yellow-100 text-yellow-800" :
          badge.rarity === "epic" ? "bg-purple-100 text-purple-800" :
          badge.rarity === "rare" ? "bg-blue-100 text-blue-800" :
          "bg-gray-100 text-gray-800"
        }`}>
          {getRarityText(badge.rarity)}
        </span>
      </div>

      {/* Badge Icon */}
      <div className="text-center mb-3">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full text-3xl ${
          earned ? "bg-white shadow-md" : "bg-gray-200"
        }`}>
          {badge.icon}
        </div>
      </div>

      {/* Badge Info */}
      <div className="text-center">
        <h3 className={`font-semibold text-lg mb-1 ${
          earned ? "text-gray-900" : "text-gray-600"
        }`}>
          {badge.name}
        </h3>
        <p className={`text-sm mb-3 ${
          earned ? "text-gray-600" : "text-gray-500"
        }`}>
          {badge.description}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className={`h-2 rounded-full transition-all duration-500 ${
              earned
                ? "bg-green-500"
                : progress >= 50
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Text */}
        <div className="flex items-center justify-center gap-2 text-sm">
          {earned ? (
            <>
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-green-600 font-medium">Earned!</span>
            </>
          ) : (
            <>
              {progress > 0 ? (
                <TrendingUp className="w-4 h-4 text-blue-600" />
              ) : (
                <Lock className="w-4 h-4 text-gray-400" />
              )}
              <span className={progress > 0 ? "text-blue-600" : "text-gray-500"}>
                {progressText}
              </span>
            </>
          )}
        </div>

        {/* Points Reward */}
        {badge.pointsReward > 0 && (
          <div className="mt-2 text-xs text-gray-500">
            +{badge.pointsReward} points reward
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default BadgeCard;
