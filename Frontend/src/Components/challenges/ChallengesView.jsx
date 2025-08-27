import React, { useState } from "react";
import ChallengeCard from "./ChallengeCard";
import ChallengeDetailView from "./ChallengeDetailView";
import ChallengeVerificationModal from "./ChallengeVerificationModal";

const ChallengesView = ({
  challenges,
  onChallengeUpdated,
  onChallengeCompleted,
  loading,
  error,
}) => {
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationChallenge, setVerificationChallenge] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleChallengePress = (challenge) => {
    setSelectedChallenge(challenge);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedChallenge(null);
  };

  const handleVerifyChallenge = (challenge) => {
    setVerificationChallenge(challenge);
    setShowVerificationModal(true);
  };

  const handleCloseVerificationModal = () => {
    setShowVerificationModal(false);
    setVerificationChallenge(null);
  };

  const handleChallengeUpdated = (updatedChallenge) => {
    onChallengeUpdated(updatedChallenge);
  };

  const handleVerificationSuccess = async (image, verificationResult) => {
    try {
      // Here you would typically call your API to complete the challenge
      // For now, we'll just close the modal and update the UI
      console.log("Challenge verified successfully:", {
        challenge: verificationChallenge,
        image,
        verificationResult,
      });

      // Update the challenge as completed
      const updatedChallenge = {
        ...verificationChallenge,
        isStarted: true,
        completedAt: new Date(),
      };

      onChallengeUpdated(updatedChallenge);
      handleCloseVerificationModal();

      // Show success message
      alert(`Challenge completed! +${verificationChallenge.points} points`);
    } catch (error) {
      console.error("Failed to complete challenge:", error);
      alert("Failed to complete challenge. Please try again.");
    }
  };

  const filteredChallenges =
    selectedCategory === "all"
      ? challenges
      : challenges.filter(
          (challenge) => challenge.category === selectedCategory
        );

  const categories = [
    { id: "all", label: "All", icon: "🌍" },
    { id: "water", label: "Water", icon: "💧" },
    { id: "energy", label: "Energy", icon: "⚡" },
    { id: "recycling", label: "Recycling", icon: "♻️" },
    { id: "transportation", label: "Transportation", icon: "🚗" },
    { id: "nature", label: "Nature", icon: "🌿" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Fun Challenges
              </h1>
              <p className="text-gray-600">
                Complete eco-friendly challenges and earn points!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex space-x-4 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-5 py-3 rounded-full font-medium transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === category.id
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Challenges Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                challenge={challenge}
                onPress={handleChallengePress}
                onVerifyChallenge={handleVerifyChallenge}
              />
            ))}
          </div>
        )}

        {/* Progress Summary */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Your Progress
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {challenges.filter((c) => c.isStarted).length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {challenges.filter((c) => !c.isStarted).length}
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {challenges.filter((c) => c.isStarted).length * 50}
              </div>
              <div className="text-sm text-gray-600">Points Earned</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(
                  (challenges.filter((c) => c.isStarted).length /
                    challenges.length) *
                    100
                )}
                %
              </div>
              <div className="text-sm text-gray-600">Progress</div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No challenges found
            </h3>
            <p className="text-gray-500">
              Try selecting a different category or check back later for new
              challenges.
            </p>
          </div>
        )}
      </div>

      {/* Challenge Detail Modal */}
      {showModal && selectedChallenge && (
        <ChallengeDetailView
          challenge={selectedChallenge}
          onChallengeUpdated={handleChallengeUpdated}
          onClose={handleCloseModal}
          onChallengeCompleted={onChallengeCompleted}
        />
      )}

      {/* Challenge Verification Modal */}
      {showVerificationModal && verificationChallenge && (
        <ChallengeVerificationModal
          challenge={verificationChallenge}
          isOpen={showVerificationModal}
          onClose={handleCloseVerificationModal}
          onVerificationSuccess={handleVerificationSuccess}
        />
      )}
    </div>
  );
};

export default ChallengesView;
