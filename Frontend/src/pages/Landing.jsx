import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/common/Navbar";
import {
  ChevronRight,
  Brain,
  BookOpen,
  BarChart3,
  MessageCircle,
  Star,
  ArrowRight,
  Sparkles,
  Users,
  Trophy,
  Clock,
  Leaf,
  TreePine,
  Recycle,
  Globe,
} from "lucide-react";
import Footer from "../Components/common/Footer";

const EcoLearnLanding = () => {
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
      icon: <Leaf className="w-8 h-8" />,
      title: "Interactive Environmental Quizzes",
      description:
        "Gamified learning about climate change, sustainability, and local ecological issues through engaging quizzes.",
    },
    {
      icon: <TreePine className="w-8 h-8" />,
      title: "Real-World Eco Challenges",
      description:
        "Practical tasks like tree-planting, waste segregation, and community clean-up drives with digital tracking.",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "AI Eco Assistant",
      description:
        "Get instant answers about environmental issues, sustainable practices, and local ecological concerns.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Eco-Points Dashboard",
      description:
        "Track your environmental impact, earn badges, and compete with schools in sustainability challenges.",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Eco-Club Coordinator",
      content:
        "EcoLearn has transformed how our students engage with environmental issues. The gamified approach is brilliant!",
      rating: 5,
      avatar: "🌱",
    },
    {
      name: "Arjun Mehta",
      role: "High School Student",
      content:
        "I've learned so much about sustainability through the interactive quizzes. Now I'm leading our school's eco-initiative!",
      rating: 5,
      avatar: "🌍",
    },
    {
      name: "Dr. Kavita Patel",
      role: "Environmental Science Teacher",
      content:
        "The platform makes complex environmental concepts accessible and engaging. Students are actually excited to learn!",
      rating: 5,
      avatar: "🌿",
    },
  ];

  const stats = [
    {
      icon: <Users className="w-6 h-6" />,
      value: "25K+",
      label: "Eco-Warriors",
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      value: "500+",
      label: "Trees Planted",
    },
    {
      icon: <Recycle className="w-6 h-6" />,
      value: "2.5T",
      label: "Waste Diverted",
    },
    { icon: <Star className="w-6 h-6" />, value: "4.8", label: "User Rating" },
  ];

  // Custom smooth scroll handler for slower, smoother scroll
  const handleNavScroll = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const startY = window.scrollY;
    const endY = target.getBoundingClientRect().top + window.scrollY;
    const duration = 900; // ms, increase for slower scroll
    let startTime = null;

    function scrollStep(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const ease =
        progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress; // easeInOut
      window.scrollTo(0, startY + (endY - startY) * ease);
      if (progress < 1) {
        window.requestAnimationFrame(scrollStep);
      }
    }

    window.requestAnimationFrame(scrollStep);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-100 overflow-hidden flex flex-col pt-16">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 pointer-events-none">
          <div
            className="absolute w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"
            style={{
              left: mousePosition.x / 20,
              top: mousePosition.y / 20,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-green-400/10 rounded-full blur-2xl animate-bounce"
            style={{ animationDuration: "3s" }}
          />
          <div
            className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-green-400/10 to-emerald-400/10 rounded-full blur-2xl animate-pulse"
            style={{ animationDuration: "4s" }}
          />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 px-6 py-20 h-screen flex items-center">
          <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row justify-between items-center">
            {/* Left Side - Text Content */}
            <div
              className={`w-full lg:w-1/2 text-left transition-all duration-1000 delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent leading-tight">
                Learn to Save
                <br />
                <span className="relative inline-block">
                  Our Planet
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-10 max-w-2xl leading-relaxed">
                Join thousands of students learning about climate change,
                sustainability, and environmental protection through interactive
                quizzes and real-world challenges.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/signup"
                  className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Start Your Eco Journey
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-green-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                <Link
                  to="/login"
                  className="group px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 rounded-2xl font-semibold text-lg border border-gray-200/50 hover:bg-white hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="flex items-center">
                    Sign In
                    <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Side - Earth Image/Component */}
            <div className="w-full lg:w-1/2 flex justify-center items-center mt-16 lg:mt-0">
              {/* Replace this with your actual Earth component or image */}
              {/* <Design /> */}
              {/* <Icon /> */}
              {/* Example: <img src="/images/earth.png" alt="Earth" className="max-w-full h-auto" /> */}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="relative z-10 px-6 py-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/50 hover:bg-white/80 transition-all duration-300 hover:scale-105 opacity-100 translate-y-0`}
                  style={{}}
                >
                  <div
                    style={{
                      transitionDelay: isVisible
                        ? `${index * 100 + 400}ms`
                        : undefined,
                      transitionProperty: "opacity, transform",
                      transitionDuration: "1000ms",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0)"
                        : "translateY(32px)",
                    }}
                  >
                    <div className="text-blue-600 flex justify-center mb-2">
                      {stat.icon}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="relative z-10 px-6 py-20" id="features">
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Empower Environmental Action
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover innovative tools designed to make environmental
                learning engaging, practical, and impactful
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={
                    `group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 hover:bg-white/90 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105 opacity-100 translate-y-0` // always instant on hover
                  }
                  style={{}}
                >
                  <div
                    style={{
                      transitionDelay: isVisible
                        ? `${index * 150 + 600}ms`
                        : undefined,
                      transitionProperty: "opacity, transform",
                      transitionDuration: "1000ms",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0)"
                        : "translateY(32px)",
                    }}
                  >
                    <div className="text-blue-600 mb-4 group-hover:text-purple-600 transition-colors duration-300 group-hover:scale-110 transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="relative z-10 px-6 py-20" id="testimonials">
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Eco-Warrior Success Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of students who've transformed their
                environmental awareness and taken action for a sustainable
                future
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`group p-8 bg-white/70 backdrop-blur-sm rounded-3xl border border-white/50 hover:bg-white/90 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 hover:scale-105 opacity-100 translate-y-0`}
                  style={{}}
                >
                  <div
                    style={{
                      transitionDelay: isVisible
                        ? `${index * 150 + 800}ms`
                        : undefined,
                      transitionProperty: "opacity, transform",
                      transitionDuration: "1000ms",
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0)"
                        : "translateY(32px)",
                    }}
                  >
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="text-3xl mr-4">{testimonial.avatar}</div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative z-10 px-6 py-20" id="contact">
          <div className="max-w-4xl mx-auto text-center">
            <div
              className={`p-12 bg-gradient-to-r from-green-600/90 to-blue-600/90 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                Ready to Save Our Planet?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join EcoLearn today and become part of the solution to climate
                change
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="group px-8 py-4 bg-white text-blue-600 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    Start Your Eco Journey
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Link>
                <a
                  href="#about"
                  className="group px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default EcoLearnLanding;
