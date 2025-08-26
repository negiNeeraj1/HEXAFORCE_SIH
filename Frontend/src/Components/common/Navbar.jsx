import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Leaf,
  BookOpen,
  Trophy,
  Bot,
  LayoutDashboard,
  LogOut,
  User,
  Menu,
  X,
  TreePine,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import NotificationBell from "../notifications/NotificationBell";

const navItems = [
  {
    path: "/dashboard",
    label: "Eco Dashboard",
    icon: LayoutDashboard,
    gradient: "from-green-500 to-green-600",
  },
  
  {
    path: "/quizzes",
    label: "Eco Quizzes",
    icon: Trophy,
    gradient: "from-green-600 to-blue-600",
  },
  {
    path: "/assistant",
    label: "AI Eco Assistant",
    icon: Bot,
    gradient: "from-blue-600 to-green-600",
  },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center shadow-lg transition-all duration-300 ${
        isScrolled ? "bg-[#35404A]/95 backdrop-blur-md" : "bg-[#35404A]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <TreePine className="absolute -top-1 -right-1 w-4 h-4 text-green-500 animate-pulse" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              EcoLearn
            </span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-xl font-medium transition-all duration-300 group ${
                      isActive(item.path)
                        ? "text-white shadow-lg"
                        : "text-gray-700 hover:text-gray-900 hover:bg-white/50"
                    }`}
                  >
                    {isActive(item.path) && (
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.gradient} rounded-xl shadow-lg`}
                      />
                    )}
                    <div className="relative flex items-center space-x-2">
                      <Icon
                        className={`w-4 h-4 ${
                          isActive(item.path)
                            ? "text-white"
                            : "text-gray-600 group-hover:text-gray-800"
                        } transition-colors duration-300`}
                      />
                      <span>{item.label}</span>
                    </div>
                    {isActive(item.path) && (
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {user && <NotificationBell />}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm rounded-full pr-4 pl-2 py-2 shadow-md hover:shadow-lg hover:bg-white/70 transition-all duration-300 group"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-gray-700 font-medium group-hover:text-gray-900">
                    {user.name}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown */}
                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 py-2 animate-fade-in">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-left text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </button>
          </div>
        </div>
        <div className="text-2xl font-bold tracking-wider drop-shadow-lg hover:scale-105 transition-transform duration-300 text-white">
          EcoChallenge Hub
        </div>
       

      {/* Desktop Buttons */}
      <div className="hidden md:flex space-x-4">
        <Link
          to="/login"
          className="flex items-center bg-white text-[#35404A] font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transform transition-all duration-300"
        >
          <FaSignInAlt className="mr-2 text-lg" />
          Login
        </Link>

        <Link
          to="/signup"
          className="flex items-center bg-green-600 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg hover:bg-green-700 transform transition-all duration-300"
        >
          <FaUserPlus className="mr-2 text-lg" />
          Sign Up
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white p-2 rounded-md focus:outline-none"
        >
          {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2 bg-[#35404A]/95 backdrop-blur-sm p-4 rounded-xl shadow-lg">
          <Link
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center bg-white text-[#35404A] font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg hover:bg-gray-100 transform transition-all duration-300"
          >
            <FaSignInAlt className="mr-2 text-lg" />
            Login
          </Link>

          <Link
            to="/signup"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center bg-green-600 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg hover:bg-green-700 transform transition-all duration-300"
          >
            <FaUserPlus className="mr-2 text-lg" />
            Sign Up
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
