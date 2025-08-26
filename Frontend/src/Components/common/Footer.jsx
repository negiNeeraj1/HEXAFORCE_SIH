// Footer.jsx
import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-600 text-white px-6 py-6 mt-8 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Footer Title / Brand */}
        <div className="text-2xl font-bold tracking-wider drop-shadow-lg mb-4 md:mb-0">
          🌱 EcoChallenge Hub
        </div>

        {/* Social Buttons */}
        <div className="flex space-x-4">
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 bg-pink-500 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
            title="Instagram"
          >
            <FaInstagram className="w-5 h-5 text-white" />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 bg-blue-400 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
            title="Twitter"
          >
            <FaTwitter className="w-5 h-5 text-white" />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 bg-blue-700 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
            title="LinkedIn"
          >
            <FaLinkedin className="w-5 h-5 text-white" />
          </a>
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 bg-green-800 rounded-full shadow-md hover:scale-110 transition-transform duration-300"
            title="WhatsApp"
          >
            <FaWhatsapp className="w-5 h-5 text-white" />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-white text-sm mt-4">
        © 2025 EcoChallenge Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
