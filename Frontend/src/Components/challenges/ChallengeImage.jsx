import React, { useState } from 'react';

const ChallengeImage = ({ imageName, title, className = "w-full h-full object-cover" }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Generate a placeholder color based on the image name
  const getPlaceholderColor = (name) => {
    const colors = [
      'bg-gradient-to-br from-green-100 to-blue-100',
      'bg-gradient-to-br from-blue-100 to-purple-100',
      'bg-gradient-to-br from-yellow-100 to-orange-100',
      'bg-gradient-to-br from-pink-100 to-red-100',
      'bg-gradient-to-br from-teal-100 to-green-100',
      'bg-gradient-to-br from-indigo-100 to-blue-100'
    ];
    
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Get appropriate icon based on challenge category
  const getCategoryIcon = (name) => {
    const icons = {
      water: '💧',
      energy: '⚡',
      recycling: '♻️',
      transportation: '🚗',
      nature: '🌿'
    };
    
    for (const [category, icon] of Object.entries(icons)) {
      if (name.toLowerCase().includes(category)) {
        return icon;
      }
    }
    
    return '🌱'; // Default icon
  };

  if (imageError) {
    return (
      <div className={`${getPlaceholderColor(imageName)} flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="text-4xl mb-2">{getCategoryIcon(imageName)}</div>
          <div className="text-xs text-gray-600 font-medium">{title}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <img
        src={`/images/${imageName}.jpg`}
        alt={title}
        className={`${className} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
      />
      {!imageLoaded && !imageError && (
        <div className={`${getPlaceholderColor(imageName)} flex items-center justify-center ${className} absolute inset-0`}>
          <div className="animate-pulse">
            <div className="text-4xl">{getCategoryIcon(imageName)}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChallengeImage;
