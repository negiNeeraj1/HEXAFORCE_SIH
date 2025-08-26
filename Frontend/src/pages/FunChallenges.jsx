import React from 'react';
import { ChallengesView, useChallengesViewModel } from '../Components/challenges';

const FunChallenges = () => {
  const { challenges, startChallenge, points, activeChallenges, resetChallenges } = useChallengesViewModel();

  const handleChallengeUpdated = (updatedChallenge) => {
    startChallenge(updatedChallenge);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Stats Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🏆</span>
                <span className="text-lg font-semibold text-gray-700">Points: {points}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl">✅</span>
                <span className="text-lg font-semibold text-gray-700">Completed: {activeChallenges.length}</span>
              </div>
            </div>
            <button
              onClick={resetChallenges}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
            >
              Reset All
            </button>
          </div>
        </div>
      </div>

      {/* Main Challenges View */}
      <ChallengesView 
        challenges={challenges}
        onChallengeUpdated={handleChallengeUpdated}
      />
    </div>
  );
};

export default FunChallenges;
