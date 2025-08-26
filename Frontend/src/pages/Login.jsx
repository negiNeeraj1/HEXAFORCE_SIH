import React, { useState } from "react";
import { Eye, EyeOff, Mail, Lock, XCircle, Loader2, Leaf, TreePine } from "lucide-react";

const EnvironmentalStudiesLogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError("");
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError("");
    const errs = {};
    if (!validateEmail(form.email))
      errs.email = "Please enter a valid email address";
    if (!form.password) errs.password = "Password is required";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setIsLoading(false);
      return;
    }
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Here you would integrate with your actual auth system
      console.log("Login attempt:", form.email);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating nature elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-green-200 opacity-20 animate-pulse">
          <Leaf className="h-16 w-16 transform rotate-12" />
        </div>
        <div className="absolute top-32 right-20 text-emerald-200 opacity-30 animate-bounce">
          <TreePine className="h-12 w-12 transform -rotate-12" />
        </div>
        <div className="absolute bottom-20 left-16 text-teal-200 opacity-25">
          <Leaf className="h-20 w-20 transform -rotate-45 animate-pulse" />
        </div>
        <div className="absolute bottom-32 right-12 text-green-200 opacity-20">
          <TreePine className="h-14 w-14 transform rotate-45 animate-bounce" />
        </div>
      </div>

      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 relative transform transition-all duration-300 hover:scale-105 hover:shadow-3xl border border-green-100">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-full shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            EcoLearn Portal
          </h1>
          <p className="text-gray-600">
            Access your Environmental Studies dashboard
          </p>
          <p className="text-sm text-green-600 font-medium mt-1">
            🌱 Learning for a Sustainable Future
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-green-400" />
              </div>
              <input
                type="email"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="your.email@university.edu"
                className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                  errors.email
                    ? "border-red-400 bg-red-50 animate-pulse"
                    : "border-gray-200 focus:border-green-500 hover:border-gray-300"
                }`}
              />
              {errors.email && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <XCircle className="h-5 w-5 text-red-400" />
                </div>
              )}
            </div>
            {errors.email && (
              <div className="mt-1 text-sm text-red-600 flex items-center animate-slideDown">
                <XCircle className="h-4 w-4 mr-1" />
                {errors.email}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-green-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
                placeholder="Enter your secure password"
                className={`w-full pl-10 pr-10 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20 ${
                  errors.password
                    ? "border-red-400 bg-red-50 animate-pulse"
                    : "border-gray-200 focus:border-green-500 hover:border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-green-400 hover:text-green-600 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
              {errors.password && (
                <div className="absolute inset-y-0 right-0 pr-10 flex items-center">
                  <XCircle className="h-5 w-5 text-red-400" />
                </div>
              )}
            </div>
            {errors.password && (
              <div className="mt-1 text-sm text-red-600 flex items-center animate-slideDown">
                <XCircle className="h-4 w-4 mr-1" />
                {errors.password}
              </div>
            )}
          </div>

          {formError && (
            <div className="text-red-600 text-sm flex items-center animate-slideDown bg-red-50 p-3 rounded-lg border border-red-200">
              <XCircle className="h-4 w-4 mr-2 flex-shrink-0" />
              {formError}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Accessing Portal...
              </>
            ) : (
              <>
                <Leaf className="h-5 w-5 mr-2" />
                Sign In to EcoLearn
              </>
            )}
          </button>
        </div>

        <div className="mt-6 text-center pt-6 border-t border-gray-200">
          <p className="text-gray-600 mb-2">
            New to Environmental Studies?{" "}
            <a
              href="#"
              className="text-green-600 hover:text-emerald-600 font-semibold transition-colors"
            >
              Register here
            </a>
          </p>
          <div className="text-xs text-gray-500 bg-green-50 p-2 rounded-lg">
            🌍 Join thousands of students learning about sustainability, climate science, and environmental protection
          </div>
        </div>

        <style>{`
          @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-slideDown { 
            animation: slideDown 0.3s ease-out; 
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-10px) rotate(5deg); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default EnvironmentalStudiesLogin;