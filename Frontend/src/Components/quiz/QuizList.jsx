import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Thermometer,
  TreePine,
  Zap,
  Recycle,
  Droplets,
  Wind,
  Sprout,
  Trees,
  Fish,
  Building,
  FileText,
  Footprints,
  PawPrint,
  MapPin,
  Scale,
  Cpu,
  Car,
  Heart,
  Mountain,
  Shield,
  Home,
  GraduationCap,
  Users,
  Briefcase,
  Star,
  Trophy,
  Target,
} from "lucide-react";

// Comprehensive list of environmental subjects for students
const SUBJECTS = [
  {
    id: 1,
    name: "Climate Change & Global Warming",
    icon: <Thermometer className="w-8 h-8" />,
    color: "from-red-500 to-red-700",
    description:
      "Greenhouse gases, temperature rise, climate impacts, mitigation strategies",
    difficulty: "Core",
    popularity: 95,
  },
  {
    id: 2,
    name: "Biodiversity & Ecosystems",
    icon: <TreePine className="w-8 h-8" />,
    color: "from-green-500 to-green-700",
    description:
      "Species diversity, ecosystem services, habitat loss, conservation",
    difficulty: "Core",
    popularity: 90,
  },
  {
    id: 3,
    name: "Renewable Energy Sources",
    icon: <Zap className="w-8 h-8" />,
    color: "from-yellow-500 to-yellow-700",
    description: "Solar, wind, hydro, geothermal, biomass energy systems",
    difficulty: "Core",
    popularity: 88,
  },
  {
    id: 4,
    name: "Waste Management & Recycling",
    icon: <Recycle className="w-8 h-8" />,
    color: "from-blue-500 to-blue-700",
    description:
      "Waste reduction, circular economy, composting, plastic alternatives",
    difficulty: "Core",
    popularity: 85,
  },
  {
    id: 5,
    name: "Water Conservation & Pollution",
    icon: <Droplets className="w-8 h-8" />,
    color: "from-cyan-500 to-cyan-700",
    description:
      "Water scarcity, pollution sources, conservation methods, treatment",
    difficulty: "Core",
    popularity: 87,
  },
  {
    id: 6,
    name: "Air Quality & Pollution",
    icon: <Wind className="w-8 h-8" />,
    color: "from-gray-500 to-gray-700",
    description:
      "Air pollutants, health impacts, monitoring, clean air solutions",
    difficulty: "Applied",
    popularity: 92,
  },
  {
    id: 7,
    name: "Sustainable Agriculture",
    icon: <Sprout className="w-8 h-8" />,
    color: "from-emerald-500 to-emerald-700",
    description: "Organic farming, soil health, crop rotation, agroecology",
    difficulty: "Applied",
    popularity: 82,
  },
  {
    id: 8,
    name: "Forest Conservation",
    icon: <Trees className="w-8 h-8" />,
    color: "from-green-600 to-green-800",
    description:
      "Deforestation, reforestation, forest management, carbon sequestration",
    difficulty: "Applied",
    popularity: 89,
  },
  {
    id: 9,
    name: "Ocean & Marine Life",
    icon: <Fish className="w-8 h-8" />,
    color: "from-blue-600 to-blue-800",
    description:
      "Marine ecosystems, ocean acidification, plastic pollution, conservation",
    difficulty: "Advanced",
    popularity: 78,
  },
  {
    id: 10,
    name: "Green Building & Architecture",
    icon: <Building className="w-8 h-8" />,
    color: "from-teal-500 to-teal-700",
    description:
      "Energy efficiency, sustainable materials, green certifications, design",
    difficulty: "Applied",
    popularity: 85,
  },
  {
    id: 11,
    name: "Environmental Policy & Laws",
    icon: <FileText className="w-8 h-8" />,
    color: "from-indigo-500 to-indigo-700",
    description:
      "Environmental regulations, international agreements, policy frameworks",
    difficulty: "Advanced",
    popularity: 75,
  },
  {
    id: 12,
    name: "Carbon Footprint & Offsetting",
    icon: <Footprints className="w-8 h-8" />,
    color: "from-purple-500 to-purple-700",
    description:
      "Carbon calculation, reduction strategies, offset projects, verification",
    difficulty: "Advanced",
    popularity: 80,
  },
  {
    id: 13,
    name: "Wildlife Conservation",
    icon: <PawPrint className="w-8 h-8" />,
    color: "from-orange-500 to-orange-700",
    description:
      "Endangered species, habitat protection, wildlife corridors, monitoring",
    difficulty: "Applied",
    popularity: 83,
  },
  {
    id: 14,
    name: "Urban Sustainability",
    icon: <MapPin className="w-8 h-8" />,
    color: "from-slate-500 to-slate-700",
    description:
      "Smart cities, green infrastructure, urban planning, community gardens",
    difficulty: "Applied",
    popularity: 86,
  },
  {
    id: 15,
    name: "Environmental Justice",
    icon: <Scale className="w-8 h-8" />,
    color: "from-rose-500 to-rose-700",
    description:
      "Environmental racism, community rights, fair access to resources",
    difficulty: "Advanced",
    popularity: 72,
  },
  {
    id: 16,
    name: "Green Technology",
    icon: <Cpu className="w-8 h-8" />,
    color: "from-lime-500 to-lime-700",
    description:
      "Clean tech innovations, energy storage, smart grids, IoT solutions",
    difficulty: "Advanced",
    popularity: 88,
  },
  {
    id: 17,
    name: "Sustainable Transportation",
    icon: <Car className="w-8 h-8" />,
    color: "from-amber-500 to-amber-700",
    description: "Electric vehicles, public transit, cycling, fuel efficiency",
    difficulty: "Applied",
    popularity: 84,
  },
  {
    id: 18,
    name: "Environmental Health",
    icon: <Heart className="w-8 h-8" />,
    color: "from-pink-500 to-pink-700",
    description:
      "Health impacts of pollution, environmental toxins, prevention",
    difficulty: "Advanced",
    popularity: 79,
  },
  {
    id: 19,
    name: "Natural Resource Management",
    icon: <Mountain className="w-8 h-8" />,
    color: "from-stone-500 to-stone-700",
    description: "Resource extraction, sustainable use, conservation planning",
    difficulty: "Advanced",
    popularity: 77,
  },
  {
    id: 20,
    name: "Climate Adaptation",
    icon: <Shield className="w-8 h-8" />,
    color: "from-violet-500 to-violet-700",
    description:
      "Resilience strategies, adaptation planning, community preparedness",
    difficulty: "Advanced",
    popularity: 81,
  },
  {
    id: 21,
    name: "Eco-Friendly Living",
    icon: <Home className="w-8 h-8" />,
    color: "from-emerald-400 to-emerald-600",
    description: "Sustainable lifestyle choices, zero waste, green products",
    difficulty: "Core",
    popularity: 93,
  },
  {
    id: 22,
    name: "Environmental Education",
    icon: <GraduationCap className="w-8 h-8" />,
    color: "from-sky-500 to-sky-700",
    description: "Teaching methods, curriculum development, community outreach",
    difficulty: "Applied",
    popularity: 87,
  },
  {
    id: 23,
    name: "Green Business Practices",
    icon: <Briefcase className="w-8 h-8" />,
    color: "from-green-400 to-green-600",
    description: "Corporate sustainability, green supply chains, ESG reporting",
    difficulty: "Advanced",
    popularity: 85,
  },
  {
    id: 24,
    name: "Community Environmental Action",
    icon: <Users className="w-8 h-8" />,
    color: "from-blue-400 to-blue-600",
    description:
      "Local initiatives, community organizing, grassroots movements",
    difficulty: "Applied",
    popularity: 89,
  },
];

// Difficulty levels with enhanced options
const DIFFICULTY_LEVELS = [
  {
    id: "beginner",
    name: "Beginner",
    icon: <Star className="w-6 h-6" />,
    color: "from-green-500 to-emerald-600",
    description: "Foundation concepts and basic understanding",
    timePerQuestion: "2 minutes",
    passingScore: 60,
  },
  {
    id: "intermediate",
    name: "Intermediate",
    icon: <Trophy className="w-6 h-6" />,
    color: "from-orange-500 to-amber-600",
    description: "Applied knowledge and problem solving",
    timePerQuestion: "3 minutes",
    passingScore: 70,
  },
  {
    id: "advanced",
    name: "Advanced",
    icon: <Target className="w-6 h-6" />,
    color: "from-purple-500 to-violet-600",
    description: "Complex scenarios and expert level concepts",
    timePerQuestion: "4 minutes",
    passingScore: 80,
  },
];

// Question count options
const QUESTION_COUNTS = [
  {
    value: 10,
    label: "10 Questions",
    duration: "20-30 min",
    difficulty: "Quick",
  },
  {
    value: 20,
    label: "20 Questions",
    duration: "40-60 min",
    difficulty: "Standard",
  },
  {
    value: 30,
    label: "30 Questions",
    duration: "60-90 min",
    difficulty: "Comprehensive",
  },
];

const QuizList = ({ onQuizStart }) => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("all");

  // Filter subjects based on search and difficulty
  const filteredSubjects = SUBJECTS.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty =
      filterDifficulty === "all" ||
      subject.difficulty.toLowerCase() === filterDifficulty.toLowerCase();
    return matchesSearch && matchesDifficulty;
  });

  // Handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setCurrentStep(2);
  };

  // Handle difficulty selection
  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setCurrentStep(3);
  };

  // Handle question count selection
  const handleQuestionCountSelect = (count) => {
    setSelectedQuestionCount(count);
    // Call parent function to start quiz
    if (onQuizStart) {
      onQuizStart({
        subject: selectedSubject,
        difficulty: selectedDifficulty,
        questionCount: count,
      });
    }
  };

  // Reset to start
  const resetSelection = () => {
    setSelectedSubject(null);
    setSelectedDifficulty(null);
    setSelectedQuestionCount(null);
    setCurrentStep(1);
  };

  // Step 1: Subject Selection
  const SubjectSelection = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold text-gray-800 mb-4"
        >
          🎓 Choose Your Subject
        </motion.h2>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600"
        >
          Select a subject to test your knowledge and enhance your skills
        </motion.p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder=" Search subjects..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => {
              e.preventDefault();
              setSearchTerm(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </div>
        <div>
          <select
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="core">Core Environmental Topics</option>
            <option value="applied">Applied Sustainability</option>
            <option value="advanced">Advanced Environmental Science</option>
          </select>
        </div>
      </div>

      {/* Subject Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.1,
            },
          },
        }}
      >
        {filteredSubjects.map((subject) => (
          <motion.div
            key={subject.id}
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className={`relative cursor-pointer bg-gradient-to-br ${subject.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
            onClick={() => handleSubjectSelect(subject)}
          >
            {/* Popularity Badge */}
            <div className="absolute top-2 right-2 bg-white bg-opacity-20 rounded-full px-2 py-1 text-xs font-semibold">
              ⭐ {subject.popularity}%
            </div>

            {/* Icon */}
            <div className="mb-4">{subject.icon}</div>

            {/* Subject Name */}
            <h3 className="text-xl font-bold mb-2">{subject.name}</h3>

            {/* Description */}
            <p className="text-white text-opacity-90 text-sm mb-3">
              {subject.description}
            </p>

            {/* Difficulty Badge */}
            <div className="flex justify-between items-center">
              <span className="bg-white bg-opacity-20 rounded-full px-3 py-1 text-xs font-medium">
                {subject.difficulty}
              </span>
              <span className="text-lg">→</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredSubjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No subjects found
          </h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </motion.div>
      )}
    </motion.div>
  );

  // Step 2: Difficulty Selection
  const DifficultySelection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center mb-4"
        >
          <button
            onClick={() => setCurrentStep(1)}
            className="mr-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Subjects
          </button>
          <h2 className="text-3xl font-bold text-gray-800">
            ⚡ Choose Difficulty Level
          </h2>
        </motion.div>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600"
        >
          Selected:{" "}
          <span className="font-semibold">{selectedSubject?.name}</span>
        </motion.p>
      </div>

      {/* Difficulty Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {DIFFICULTY_LEVELS.map((difficulty) => (
          <motion.div
            key={difficulty.id}
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer bg-gradient-to-br ${difficulty.color} rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
            onClick={() => handleDifficultySelect(difficulty)}
          >
            {/* Icon */}
            <div className="flex justify-center mb-4">{difficulty.icon}</div>

            {/* Difficulty Name */}
            <h3 className="text-2xl font-bold text-center mb-3">
              {difficulty.name}
            </h3>

            {/* Description */}
            <p className="text-white text-opacity-90 text-center text-sm mb-4">
              {difficulty.description}
            </p>

            {/* Stats */}
            <div className="space-y-2 text-sm text-white text-opacity-80">
              <div className="flex justify-between">
                <span>Time per question:</span>
                <span className="font-semibold">
                  {difficulty.timePerQuestion}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Passing score:</span>
                <span className="font-semibold">
                  {difficulty.passingScore}%
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  // Step 3: Question Count Selection
  const QuestionCountSelection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center justify-center mb-4"
        >
          <button
            onClick={() => setCurrentStep(2)}
            className="mr-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Difficulty
          </button>
          <h2 className="text-3xl font-bold text-gray-800">
            📊 Choose Question Count
          </h2>
        </motion.div>
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-gray-600"
        >
          <span className="font-semibold">{selectedSubject?.name}</span> •{" "}
          <span className="font-semibold">
            {selectedDifficulty?.name} Level
          </span>
        </motion.p>
      </div>

      {/* Question Count Cards */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              delayChildren: 0.2,
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {QUESTION_COUNTS.map((count, index) => (
          <motion.div
            key={count.value}
            variants={{
              hidden: { y: 30, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
            whileTap={{ scale: 0.95 }}
            className={`cursor-pointer bg-gradient-to-br ${
              index === 0
                ? "from-blue-500 to-blue-700"
                : index === 1
                ? "from-green-500 to-green-700"
                : "from-purple-500 to-purple-700"
            } rounded-xl p-8 text-white shadow-lg hover:shadow-xl transition-all duration-300`}
            onClick={() => handleQuestionCountSelect(count)}
          >
            {/* Question Count */}
            <div className="text-center mb-4">
              <div className="text-4xl font-bold mb-2">{count.value}</div>
              <h3 className="text-xl font-semibold">{count.label}</h3>
            </div>

            {/* Duration */}
            <div className="text-center text-white text-opacity-90 mb-4">
              <div className="text-sm">Estimated Duration</div>
              <div className="font-semibold">{count.duration}</div>
            </div>

            {/* Difficulty */}
            <div className="text-center">
              <span className="bg-white bg-opacity-20 rounded-full px-4 py-2 text-sm font-medium">
                {count.difficulty}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Start Quiz Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8"
      >
        <button
          onClick={resetSelection}
          className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200"
        >
          🔄 Start Over
        </button>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Steps */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step}
                </div>
                {step < 3 && (
                  <div
                    className={`w-12 h-1 ${
                      currentStep > step ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step Content */}
        {currentStep === 1 && <SubjectSelection />}
        {currentStep === 2 && <DifficultySelection />}
        {currentStep === 3 && <QuestionCountSelection />}
      </div>
    </div>
  );
};

export default QuizList;
