import React from 'react';

const CongratulationsView = ({ challengeTitle, onDismiss }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
        {/* Star Icon */}
        <div className="text-6xl text-yellow-500 mb-6">
          ⭐
        </div>

        {/* Congratulations Text */}
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Congratulations!
        </h2>

        <p className="text-xl text-gray-700 mb-4 leading-relaxed">
          You've completed your eco adventure with the <span className="font-semibold">{challengeTitle}</span> challenge!
        </p>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Remember, every small action counts. You're making a difference!
        </p>

        {/* Gift Icon */}
        <div className="text-3xl text-green-500 mb-4">
          🎁
        </div>

        {/* Points Gained */}
        <p className="text-sm text-black font-medium mb-6">
          You've gained +50 points
        </p>

        {/* Back Button */}
        <button
          onClick={onDismiss}
          className="w-full py-4 px-6 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
        >
          Back to Challenges
        </button>
      </div>
    </div>
  );
};

export default CongratulationsView;
