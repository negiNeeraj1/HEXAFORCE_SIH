import React from 'react';
import ChallengeImage from './ChallengeImage';

const ChallengeCard = ({ challenge, onPress }) => {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-lg border border-white/50 overflow-hidden transition-all duration-300 cursor-pointer ${
        challenge.isStarted ? 'opacity-50' : 'hover:shadow-xl hover:scale-105'
      }`}
      onClick={() => onPress(challenge)}
    >
      <div className="relative">
        {/* Image Section */}
        <div className="h-30 relative overflow-hidden">
          {challenge.isSystemImage ? (
            <div className="w-full h-full bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
              <i className={`${challenge.imageName} text-6xl text-green-600`}></i>
            </div>
          ) : (
            <ChallengeImage 
              imageName={challenge.imageName}
              title={challenge.title}
              className="w-full h-30"
            />
          )}
        </div>
        
        {/* White divider */}
        <div className="h-0.5 bg-white"></div>
        
        {/* Title Section */}
        <div className="p-2 bg-white">
          <h3 className="text-lg font-semibold text-black text-center">
            {challenge.title}
          </h3>
        </div>
        
        {/* Challenge Status */}
        {challenge.isStarted && (
          <div className="bg-green-100 text-black text-sm text-center py-1.5 px-3">
            Challenge Completed
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCard;
