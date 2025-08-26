import React, { useState } from 'react';
import { FaLeaf, FaRecycle, FaTree, FaSmile, FaCheckCircle } from 'react-icons/fa';
import { MdOutlinePhotoCamera } from 'react-icons/md';
const categories = {
  '🌱 Environmental Activity': [
    { title: 'Plant a Tree', description: 'Find a suitable spot and plant a new tree or sapling.', icon: FaTree, points: 50 },
    { title: 'Cleanup Crew', description: 'Pick up litter in your local area.', icon: FaSmile, points: 30 },
    { title: 'Nature Walk', description: 'Take a walk in nature and document plants or animals.', icon: FaLeaf, points: 20 },
  ],
  '♻️ Recycling': [
    { title: 'Recycle Right', description: 'Sort your household waste correctly.', icon: FaRecycle, points: 25 },
    { title: 'DIY Upcycle', description: 'Turn old items into something useful.', icon: FaRecycle, points: 35 },
    { title: 'Plastic-Free Day', description: 'Avoid single-use plastics for a day.', icon: FaLeaf, points: 40 },
  ],
  '🍃 Daily Habits': [
    { title: 'Lights Out', description: 'Turn off lights when leaving a room.', icon: FaLeaf, points: 10 },
    { title: 'Short Showers', description: 'Take shorter showers to save water.', icon: FaLeaf, points: 15 },
    { title: 'Eco-Friendly Commute', description: 'Walk, cycle, or use public transport.', icon: FaSmile, points: 20 },
  ],
  '🏫 School/Community': [
    { title: 'Eco-Hero Poster', description: 'Create a poster to raise awareness.', icon: FaSmile, points: 30 },
    { title: 'Community Garden', description: 'Help at a community garden.', icon: FaTree, points: 45 },
    { title: 'Clean-Up Drive', description: 'Organize a clean-up drive.', icon: FaRecycle, points: 50 },
  ],
  '📱 Digital Knowledge': [
    { title: 'Digital Detox', description: 'Spend time offline in nature.', icon: FaLeaf, points: 20 },
    { title: 'Eco-App Explorer', description: 'Use an app to live sustainably.', icon: FaLeaf, points: 15 },
    { title: 'Online Learning Challenge', description: 'Research an environmental topic online.', icon: FaSmile, points: 25 },
  ],
  '🏅 Long-Term': [
    { title: 'Compost Champion', description: 'Start a small compost pile.', icon: FaLeaf, points: 60 },
    { title: 'Energy Saver', description: 'Track energy usage for a month.', icon: FaLeaf, points: 55 },
    { title: 'Water Watcher', description: 'Monitor water usage for a week.', icon: FaTree, points: 50 },
  ],
};
//card component
const ChallengeCard = ({ title, description, points }) => {
  const [proof, setProof] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024) {
      setProof(URL.createObjectURL(file));
      setIsSubmitted(false);
    } else {
      alert('Invalid file. Use JPG/PNG, max 5MB.');
    }
  };

  const handleSubmit = () => {
    if (proof) {
      setIsSubmitted(true);
      setTimeout(() => {
        console.log(`Proof submitted for: ${title} (+${points} pts)`);
      }, 500);
    }
  };

  return (
    <div className="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-3xl shadow-lg border-2 border-green-300 transform transition-transform hover:scale-105 relative">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FaLeaf className="text-green-500 text-3xl mr-2" />
          <h3 className="font-lilita text-2xl text-green-700">{title}</h3>
        </div>
        <div className="bg-yellow-400 text-yellow-800 font-bold py-1 px-3 rounded-full text-sm shadow-inner">{points} pts</div>
      </div>
      <p className="text-gray-600 mb-4 font-dosis">{description}</p>

      <div className="border-2 border-dashed border-green-400 rounded-xl p-4 mb-4 text-center bg-white/70">
        {proof ? (
          <img src={proof} alt="Proof" className="w-full h-32 object-cover rounded-lg mb-2" />
        ) : (
          <div className="flex flex-col items-center">
            <div className="text-green-500 text-4xl mb-2">
              <MdOutlinePhotoCamera />
            </div>
            <p className="text-gray-500 font-dosis">Upload or take photo proof</p>
          </div>
        )}
        <input
          type="file"
          id={`file-upload-${title}`}
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleFileChange}
        />
        <button
          onClick={() => document.getElementById(`file-upload-${title}`).click()}
          className="bg-blue-400 text-white py-2 px-4 rounded-full mt-4 inline-flex items-center justify-center cursor-pointer hover:bg-blue-500 transition-colors font-dosis"
        >
          <MdOutlinePhotoCamera className="mr-2" /> Take Photo
        </button>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!proof || isSubmitted}
        className={`w-full py-3 rounded-full font-bold transition-all transform hover:scale-105 ${
          proof && !isSubmitted ? 'bg-green-500 text-white shadow-md hover:bg-green-600' : 'bg-green-300 text-green-700 cursor-not-allowed'
        }`}
      >
        {isSubmitted ? (
          <span className="flex items-center justify-center">
            <FaCheckCircle className="mr-2" /> Submitted!
          </span>
        ) : (
          'Submit Proof'
        )}
      </button>
    </div>
  );
};
const EcoLearningPlatform = () => {
  return (
    <div className="min-h-screen bg-green-50 font-dosis p-8">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-lilita text-green-800 mb-2">Eco-Challenge Hub!</h1>
        <p className="text-xl text-gray-600 font-dosis">Help the planet, one challenge at a time. 🌱</p>
      </header>

      {Object.entries(categories).map(([category, challenges]) => (
        <div key={category} className="mb-12">
          <div className="flex items-center mb-6">
            <FaLeaf className="text-green-500 text-4xl mr-2" />
            <h2 className="text-3xl font-lilita text-green-600 border-b-4 border-green-400 pb-2 inline-block">{category}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.title}
                title={challenge.title}
                description={challenge.description}
                points={challenge.points}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EcoLearningPlatform;
