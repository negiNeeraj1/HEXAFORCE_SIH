import { useState, useCallback } from 'react';

// Sample challenges data converted from SwiftUI
export const sampleChallenges = [
  {
    id: '1',
    imageName: 'conservewater',
    title: 'Water Wizard',
    isSystemImage: false,
    category: 'water',
    description: 'Water is precious! By using less water, we can help save this important resource for everyone and everything on Earth.',
    benefits: 'Saving water helps protect rivers and lakes, saves energy used to clean and transport water, and ensures there\'s enough for all living things.',
    kidChallenge: 'This week, try to take shorter showers. Set a timer for 5 minutes and see if you can finish before it goes off!',
    isStarted: false
  },
  {
    id: '2',
    imageName: 'reusablebags',
    title: 'Use Reusable Bags',
    isSystemImage: false,
    category: 'recycling',
    description: 'Plastic bags can harm animals and pollute our oceans. By using reusable bags, we can help keep our planet clean and safe for all creatures!',
    benefits: 'Using reusable bags reduces plastic waste, saves energy, and protects wildlife. It\'s a simple way to make a big difference!',
    kidChallenge: 'For one week, remember to bring your own reusable bag whenever you go shopping with your family. Count how many times you use it!',
    isStarted: false
  },
  {
    id: '3',
    imageName: 'saveelectricity',
    title: 'Energy Detective',
    isSystemImage: false,
    category: 'energy',
    description: 'Saving electricity is like giving the Earth a big hug! It helps reduce pollution and conserve valuable resources.',
    benefits: 'Using less electricity means we burn less fossil fuels, which helps keep our air clean and reduces climate change.',
    kidChallenge: 'Become an energy detective in your home! Count how many lights and electronics you can turn off when not in use for a day.',
    isStarted: false
  },
  {
    id: '4',
    imageName: 'carpool',
    title: 'Carpool Captain',
    isSystemImage: false,
    category: 'transportation',
    description: 'Sharing rides is fun and good for the planet! It means fewer cars on the road, which helps keep our air clean.',
    benefits: 'Carpooling reduces air pollution, saves fuel, and can even help make new friends! It\'s a great way to travel and care for the Earth.',
    kidChallenge: 'Next time you go to school or an activity, try to carpool with a friend. Keep a log of how many times you carpool in a month!',
    isStarted: false
  },
  {
    id: '5',
    imageName: 'recyclewaste',
    title: 'Recycling Hero',
    isSystemImage: false,
    category: 'recycling',
    description: 'Recycling is like giving trash a second chance to be useful! It helps save resources and reduce waste in landfills.',
    benefits: 'Recycling conserves natural resources, saves energy, reduces pollution, and helps protect wildlife habitats.',
    kidChallenge: 'Create a recycling station at home with different bins for paper, plastic, and metal. Help your family sort the recyclables for a week!',
    isStarted: false
  },
  {
    id: '6',
    imageName: 'plantatree',
    title: 'Tree Champion',
    isSystemImage: false,
    category: 'nature',
    description: 'Trees are like superheroes for our planet! They clean the air, provide homes for animals, and make oxygen for us to breathe.',
    benefits: 'Planting trees helps fight climate change, prevents soil erosion, provides habitat for wildlife, and makes our neighborhoods beautiful!',
    kidChallenge: 'Plant a small tree or a seed in your yard or a pot. Take care of it and watch it grow over time. Name your tree!',
    isStarted: false
  },
  {
    id: '7',
    imageName: 'noplastic',
    title: 'Plastic Buster',
    isSystemImage: false,
    category: 'recycling',
    description: 'Single-use plastics can harm animals and pollute our environment. By avoiding them, we can help keep our planet clean and safe!',
    benefits: 'Reducing plastic use helps protect marine life, reduces pollution in oceans and landfills, and saves energy used to produce plastics.',
    kidChallenge: 'For one week, try to avoid using single-use plastics like straws or plastic water bottles. Keep a tally of how many times you say \'No thanks!\' to plastic.',
    isStarted: false
  },
  {
    id: '8',
    imageName: 'gosolar',
    title: 'Solar Explorer',
    isSystemImage: false,
    category: 'energy',
    description: 'The sun gives us free, clean energy! Learning about solar power helps us understand how we can use this amazing resource.',
    benefits: 'Solar energy is clean, renewable, and doesn\'t produce harmful gases. It helps fight climate change and can be used almost anywhere!',
    kidChallenge: 'Build a simple solar oven using a pizza box and aluminum foil. Try to melt a marshmallow in it on a sunny day!',
    isStarted: false
  },
  {
    id: '9',
    imageName: 'turnofftaps',
    title: 'Tap Tamer',
    isSystemImage: false,
    category: 'water',
    description: 'Every drop of water counts! By turning off the tap when brushing your teeth, you can save a lot of water.',
    benefits: 'Turning off the tap helps conserve water and saves energy, ensuring that there\'s plenty of clean water for everyone.',
    kidChallenge: 'For this week, remember to turn off the tap while brushing your teeth. Count how many times you remember to do it!',
    isStarted: false
  },
  {
    id: '10',
    imageName: 'bikeadventures',
    title: 'Biking Buddy',
    isSystemImage: false,
    category: 'transportation',
    description: 'Biking is not only fun, but it\'s also a great way to help the environment by reducing pollution!',
    benefits: 'Biking instead of driving helps reduce carbon emissions, keeps our air clean, and is a healthy way to get around.',
    kidChallenge: 'Plan a bike ride with your family or friends this weekend. Count how many miles you ride together!',
    isStarted: false
  },
  {
    id: '11',
    imageName: 'plantflowers',
    title: 'Flower Friend',
    isSystemImage: false,
    category: 'nature',
    description: 'Flowers make the world beautiful and provide food for bees and butterflies! Let\'s grow more flowers.',
    benefits: 'Planting flowers supports local wildlife, improves air quality, and beautifies our neighborhoods.',
    kidChallenge: 'Choose a spot in your garden or a pot and plant some flower seeds. Keep track of how many flowers bloom!',
    isStarted: false
  },
  {
    id: '12',
    imageName: 'showerparty',
    title: 'Shower Star',
    isSystemImage: false,
    category: 'water',
    description: 'Taking shorter showers saves water, which is essential for our planet\'s health.',
    benefits: 'Using less water in the shower conserves this vital resource and reduces energy consumption.',
    kidChallenge: 'Set a timer for 4 minutes and try to finish your shower before it goes off for the next week. Track how often you succeed!',
    isStarted: false
  },
  {
    id: '13',
    imageName: 'turnofflights',
    title: 'Light Saver',
    isSystemImage: false,
    category: 'energy',
    description: 'Turning off lights when you leave a room helps save energy and reduces electricity bills!',
    benefits: 'By using less electricity, we can help reduce pollution and conserve valuable resources for our planet.',
    kidChallenge: 'Make a game out of it! For a week, try to turn off lights whenever you leave a room and count how many times you remember!',
    isStarted: false
  },
  {
    id: '14',
    imageName: 'veggiegarden',
    title: 'Garden Guardian',
    isSystemImage: false,
    category: 'nature',
    description: 'Growing your own vegetables is a fun way to learn about where food comes from and how to care for the Earth.',
    benefits: 'Home gardening reduces the need for store-bought produce, saving packaging and transportation energy.',
    kidChallenge: 'Plant some vegetable seeds in a garden or pot. Water them daily and keep track of their growth over the next month!',
    isStarted: false
  },
  {
    id: '15',
    imageName: 'ecoart',
    title: 'Eco Artist',
    isSystemImage: false,
    category: 'recycling',
    description: 'You can create beautiful art using recycled materials! It\'s a fun way to express yourself while helping the planet.',
    benefits: 'Recycling materials for art reduces waste and encourages creativity. It\'s a win-win for you and the Earth!',
    kidChallenge: 'Gather old newspapers, cardboard, or plastic bottles and create a piece of art. Share your creation with friends and family!',
    isStarted: false
  },
  {
    id: '16',
    imageName: 'naturewalk',
    title: 'Nature Explorer',
    isSystemImage: false,
    category: 'nature',
    description: 'Exploring nature helps us appreciate the beauty of the Earth and understand how to protect it.',
    benefits: 'Spending time in nature promotes physical health, boosts mood, and fosters a connection with the environment.',
    kidChallenge: 'Go for a nature walk with your family and identify at least 5 different plants or animals you see. Create a mini nature journal!',
    isStarted: false
  },
  {
    id: '17',
    imageName: 'homemadecompost',
    title: 'Compost Champion',
    isSystemImage: false,
    category: 'recycling',
    description: 'Composting helps reduce waste and creates rich soil for plants! It\'s a great way to recycle food scraps.',
    benefits: 'Composting cuts down on landfill waste, reduces greenhouse gas emissions, and enriches soil for gardening.',
    kidChallenge: 'Start a small compost bin at home with fruit peels and vegetable scraps. Track how quickly your compost pile grows!',
    isStarted: false
  }
];

export const useChallengesViewModel = () => {
  const [activeChallenges, setActiveChallenges] = useState([]);
  const [points, setPoints] = useState(0);
  const [challenges, setChallenges] = useState(sampleChallenges);

  const startChallenge = useCallback((challenge) => {
    setChallenges(prevChallenges => {
      const updatedChallenges = prevChallenges.map(c => 
        c.id === challenge.id ? { ...c, isStarted: true } : c
      );
      
      // Update active challenges
      setActiveChallenges(updatedChallenges.filter(c => c.isStarted));
      
      // Add points if challenge is completed
      if (challenge.isStarted) {
        setPoints(prev => prev + 50);
      }
      
      return updatedChallenges;
    });
  }, []);

  const resetChallenges = useCallback(() => {
    setChallenges(sampleChallenges.map(c => ({ ...c, isStarted: false })));
    setActiveChallenges([]);
    setPoints(0);
  }, []);

  return {
    activeChallenges,
    points,
    challenges,
    startChallenge,
    resetChallenges
  };
};
