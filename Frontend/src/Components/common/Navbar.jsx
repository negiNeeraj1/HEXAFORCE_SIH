import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaLeaf, FaSignInAlt, FaUserPlus, FaBars, FaTimes } from "react-icons/fa";

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
      {/* Logo */}
      <Link to="/" className="flex items-center space-x-2 cursor-pointer">
        <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transform transition-transform duration-300">
          <FaLeaf className="text-white w-5 h-5" />
        </div>
        <div className="text-2xl font-bold tracking-wider drop-shadow-lg hover:scale-105 transition-transform duration-300 text-white">
          EcoChallenge Hub
        </div>
      </Link>

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
