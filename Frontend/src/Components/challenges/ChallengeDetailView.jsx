import React, { useState } from "react";
import CongratulationsView from "./CongratulationsView";
import ChallengeImage from "./ChallengeImage";

const ChallengeDetailView = ({ challenge, onChallengeUpdated, onClose }) => {
  const [currentChallenge, setCurrentChallenge] = useState(challenge);
  const [showCongratulations, setShowCongratulations] = useState(false);

  const handleCompleteChallenge = async () => {
    try {
      // Call the API to complete the challenge
      await onChallengeUpdated(currentChallenge);

      // Update local state
      const updatedChallenge = { ...currentChallenge, isStarted: true };
      setCurrentChallenge(updatedChallenge);
      setShowCongratulations(true);
    } catch (error) {
      console.error("Failed to complete challenge:", error);
      alert("Failed to complete challenge. Please try again.");
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      water: { icon: "💧", color: "text-blue-500" },
      energy: { icon: "⚡", color: "text-yellow-500" },
      recycling: { icon: "♻️", color: "text-green-500" },
      transportation: { icon: "🚗", color: "text-red-500" },
      nature: { icon: "🌿", color: "text-green-500" },
      all: { icon: "🌍", color: "text-gray-500" },
    };

    const iconData = icons[category] || icons.all;
    return <div className={`text-5xl ${iconData.color}`}>{iconData.icon}</div>;
  };

  if (showCongratulations) {
    return (
      <CongratulationsView
        challengeTitle={currentChallenge.title}
        onDismiss={() => onClose()}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>

          <div className="space-y-6">
            {/* Challenge Image */}
            <div className="flex justify-center">
              <div className="h-48 w-full rounded-lg overflow-hidden">
                <ChallengeImage
                  imageName={currentChallenge.imageName}
                  title={currentChallenge.title}
                  className="h-48 w-full rounded-lg"
                />
              </div>
            </div>

            {/* Category Icon */}
            <div className="flex justify-center">
              {getCategoryIcon(currentChallenge.category)}
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-gray-900">
              {currentChallenge.title}
            </h2>

            {/* Description */}
            <p className="text-gray-700 text-center leading-relaxed">
              {currentChallenge.description}
            </p>

            {/* Benefits Section */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2 text-center">
                Why is it good for the planet?
              </h3>
              <p className="text-green-700 text-center">
                {currentChallenge.benefits}
              </p>
            </div>

            {/* Challenge Section */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2 text-center">
                Your Challenge:
              </h3>
              <p className="text-blue-700 text-center">
                {currentChallenge.kidChallenge}
              </p>
            </div>
          </div>

          {/* Complete Button */}
          <button
            onClick={handleCompleteChallenge}
            disabled={currentChallenge.isStarted}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-colors mt-6 ${
              currentChallenge.isStarted
                ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                : "bg-green-600 text-white hover:bg-green-700"
            }`}
          >
            {currentChallenge.isStarted
              ? "Challenge Completed"
              : "Complete Challenge!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailView;
