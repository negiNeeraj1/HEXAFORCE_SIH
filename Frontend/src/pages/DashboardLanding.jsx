import React, { useState, useEffect } from "react";
import {
  Leaf,
  Recycle,
  Trophy,
  TrendingUp,
  Quote,
  Sparkles,
  Target,
  Clock,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const StudyAIDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useAuth();

  const userName = user?.name ? user.name.split(" ")[0] : "User";

  const motivationalQuotes = [
    "Small sustainable actions create big impacts over time.",
    "The future is green energy, sustainability, and environmental stewardship.",
    "Act locally, think globally.",
    "We do not inherit the Earth from our ancestors; we borrow it from our children.",
  ];

  const stats = [
    {
      label: "Eco Streak",
      value: "7 days",
      icon: Target,
      color: "text-green-600",
    },
    {
      label: "Challenges Done",
      value: "12",
      icon: Trophy,
      color: "text-blue-600",
    },
    {
      label: "Hours Learned",
      value: "18h 40m",
      icon: Clock,
      color: "text-emerald-600",
    },
    { label: "Team Members", value: "9", icon: Users, color: "text-teal-600" },
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-100 overflow-hidden flex flex-col pt-16">
      <div className="flex-1">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-full mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent mb-2">
              {getGreeting()}, {userName}!
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ready to make an eco impact today? Learn, act, and track your
              sustainability journey.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-white/80"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-r from-green-100 to-blue-100">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Motivational Quote */}
          <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl p-8 mb-12 border border-white/20 text-center">
            <Quote className="w-8 h-8 text-green-500 mx-auto mb-4" />
            <p className="text-lg italic text-gray-700 mb-2">
              "
              {
                motivationalQuotes[
                  Math.floor(Math.random() * motivationalQuotes.length)
                ]
              }
              "
            </p>
            <p className="text-sm text-gray-500">
              — Your daily eco inspiration
            </p>
          </div>

          {/* Eco Actions */}
          <div className="mb-12 rounded-2xl bg-gradient-to-r from-[#D1FAE5] to-[#BFDBFE] p-8 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Suggested Eco Actions
              </h2>
              <p className="text-gray-600">
                Try a simple action today: carry a reusable bottle, cycle short
                distances, or segregate waste.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "Recycle at home",
                "Plant a sapling",
                "Use public transport",
              ].map((action, i) => (
                <div
                  key={i}
                  className="bg-white/70 rounded-xl p-6 border border-white/50"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <h3 className="font-semibold">{action}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Log this action in your next quiz reflection to earn eco
                    points.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyAIDashboard;
