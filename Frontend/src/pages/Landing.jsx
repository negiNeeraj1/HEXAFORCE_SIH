import React, { useState, useEffect } from "react";
import Navbar from "../Components/common/Navbar";
import Footer from "../Components/common/Footer";
import { FaLeaf, FaRecycle, FaTree, FaSmile, FaCheckCircle } from "react-icons/fa";
import { MdOutlinePhotoCamera } from "react-icons/md";
import { Link } from "react-router-dom";

const EcoLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const features = [
    {
      icon: <FaTree className="w-10 h-10 text-green-600" />,
      title: "Plant Trees",
      description: "Learn the importance of greenery and plant trees in your community.",
    },
    {
      icon: <FaRecycle className="w-10 h-10 text-green-600" />,
      title: "Recycle Properly",
      description: "Understand recycling and contribute to a cleaner environment.",
    },
    {
      icon: <FaSmile className="w-10 h-10 text-green-600" />,
      title: "Community Activities",
      description: "Join eco-friendly activities and make a positive impact.",
    },
  ];

  const stats = [
    { icon: <FaLeaf className="w-6 h-6 text-green-600" />, value: "10K+", label: "Trees Planted" },
    { icon: <FaRecycle className="w-6 h-6 text-green-600" />, value: "5K+", label: "Recycled Items" },
    { icon: <FaSmile className="w-6 h-6 text-green-600" />, value: "8K+", label: "Happy Participants" },
  ];

  return (
    <>
      {/* <Navbar /> */}
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-blue-50 relative overflow-hidden">
        {/* Animated Background */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute w-96 h-96 bg-green-200/20 rounded-full blur-3xl animate-pulse"
            style={{ left: mousePosition.x / 20, top: mousePosition.y / 20 }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 px-6 py-24 text-center">
          <h1 className="text-6xl md:text-7xl font-bold text-green-800 mb-6">
            🌱 EcoChallenge Hub
          </h1>
          <p className="text-xl text-green-700 mb-10 max-w-2xl mx-auto">
            Participate in fun environmental challenges, track your progress, and earn points for making the world greener.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              to="/signup"
              className="px-8 py-4 bg-green-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-green-700 transition-all"
            >
              Join Now
            </Link>
            <Link
              to="/login"
              className="px-8 py-4 bg-white text-green-600 rounded-full font-semibold text-lg shadow hover:bg-gray-100 transition-all"
            >
              Sign In
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 relative z-10">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
            Why Join EcoChallenge?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-green-200 hover:shadow-xl transform hover:-translate-y-2 transition-all"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-green-700 mb-2 text-center">{feature.title}</h3>
                <p className="text-green-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="px-6 py-20 relative z-10 bg-green-100">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-green-200 hover:shadow-lg transform hover:-translate-y-2 transition-all"
              >
                <div className="mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl font-bold text-green-800 mb-1">{stat.value}</div>
                <div className="text-green-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Call-to-Action Section */}
        <section className="px-6 py-20 text-center relative z-10">
          <h2 className="text-4xl font-bold text-green-800 mb-6">
            Start Making a Difference Today
          </h2>
          <p className="text-green-700 mb-8 max-w-2xl mx-auto">
            Join EcoChallenge Hub, complete fun challenges, earn points, and help the planet grow greener every day.
          </p>
          <Link
            to="/signup"
            className="px-10 py-4 bg-green-600 text-white rounded-full font-semibold text-lg shadow-lg hover:bg-green-700 transition-all"
          >
            Get Started
          </Link>
        </section>
      </div>
     
    </>
  );
};

export default EcoLanding;
