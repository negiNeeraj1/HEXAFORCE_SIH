import React, { useState } from 'react';
import { Star, Send, BookOpen, Users, Lightbulb, Headphones, CheckCircle, GraduationCap, Trophy, Zap, Heart } from 'lucide-react';

const StarRating = ({ rating, setRating, label }) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700">{label}</label>
      <div className="flex space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className={`p-2 rounded-full transition-all duration-300 transform hover:scale-110 ${
              star <= rating
                ? 'text-yellow-400 hover:text-yellow-500 shadow-lg'
                : 'text-gray-300 hover:text-gray-400'
            }`}
          >
            <Star className="w-7 h-7 fill-current" />
          </button>
        ))}
      </div>
    </div>
  );
};

const FloatingElement = ({ children, delay = 0, duration = 6 }) => (
  <div 
    className="absolute opacity-20"
    style={{
      animation: `float ${duration}s ease-in-out infinite`,
      animationDelay: `${delay}s`
    }}
  >
    {children}
  </div>
);

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    grade: '',
    overallRating: 0,
    teachingQuality: 0,
    contentClarity: 0,
    supportRating: 0,
    feedbackType: '',
    comments: '',
    wouldRecommend: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        grade: '',
        overallRating: 0,
        teachingQuality: 0,
        contentClarity: 0,
        supportRating: 0,
        feedbackType: '',
        comments: '',
        wouldRecommend: ''
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 flex items-center justify-center p-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute w-64 h-64 bg-white/10 rounded-full -top-32 -left-32 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-white/5 rounded-full -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center max-w-md w-full relative z-10 border border-white/20">
          <div className="relative">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6 animate-bounce" />
            <div className="absolute inset-0 bg-green-500/20 rounded-full w-20 h-20 mx-auto animate-ping"></div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Awesome!
          </h2>
          <p className="text-gray-600 mb-6 text-lg">Your feedback has been received. You're helping us create better learning experiences!</p>
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-teal-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-teal-500 py-8 px-4 relative overflow-hidden">
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3); }
          50% { box-shadow: 0 0 40px rgba(139, 92, 246, 0.6); }
        }
        .pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background Elements */}
      <FloatingElement delay={0} duration={8}>
        <BookOpen className="w-16 h-16 text-white" style={{top: '10%', left: '5%'}} />
      </FloatingElement>
      <FloatingElement delay={2} duration={10}>
        <GraduationCap className="w-20 h-20 text-white" style={{top: '20%', right: '10%'}} />
      </FloatingElement>
      <FloatingElement delay={4} duration={7}>
        <Trophy className="w-14 h-14 text-yellow-300" style={{bottom: '30%', left: '8%'}} />
      </FloatingElement>
      <FloatingElement delay={1} duration={9}>
        <Zap className="w-12 h-12 text-yellow-400" style={{top: '60%', right: '5%'}} />
      </FloatingElement>
      <FloatingElement delay={3} duration={6}>
        <Heart className="w-10 h-10 text-pink-300" style={{bottom: '15%', right: '15%'}} />
      </FloatingElement>

      {/* Geometric Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 bg-white/10 rounded-full -top-32 -left-32 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-white/5 rounded-full -bottom-48 -right-48 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute w-48 h-48 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full top-1/2 left-1/4 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-50 animate-pulse"></div>
              <div className="relative bg-white/20 backdrop-blur-lg p-4 rounded-full border border-white/30">
                <BookOpen className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white ml-6 drop-shadow-lg">
              Smart Education
            </h1>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
            <p className="text-2xl text-white font-semibold mb-2">📝 Share Your Learning Journey!</p>
            <p className="text-white/80 text-lg">Your feedback shapes the future of education</p>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20 pulse-glow">
          {/* Basic Information with Images */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="relative group">
              <div className="absolute -top-3 -left-3 w-full h-full bg-gradient-to-r from-purple-400 to-blue-400 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-bold text-lg">👤</span>
                  </div>
                  <label className="block text-sm font-semibold text-gray-700">Your Name</label>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-lg"
                  placeholder="Enter your awesome name"
                  required
                />
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -top-3 -right-3 w-full h-full bg-gradient-to-r from-blue-400 to-teal-400 rounded-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mr-3">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <label className="block text-sm font-semibold text-gray-700">Grade/Class</label>
                </div>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-lg"
                  required
                >
                  <option value="">🎓 Select Your Grade</option>
                  <option value="6">Grade 6 🌟</option>
                  <option value="7">Grade 7 ⭐</option>
                  <option value="8">Grade 8 🚀</option>
                  <option value="9">Grade 9 💫</option>
                  <option value="10">Grade 10 🏆</option>
                  <option value="11">Grade 11 🎯</option>
                  <option value="12">Grade 12 🎉</option>
                </select>
              </div>
            </div>
          </div>

          {/* Enhanced Rating Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4 flex items-center justify-center">
                <Star className="w-8 h-8 text-yellow-500 mr-3" />
                Rate Your Amazing Experience
              </h3>
              <p className="text-gray-600 text-lg">Tell us how we're doing! ⭐</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border-2 border-purple-100">
                  <StarRating
                    rating={formData.overallRating}
                    setRating={(rating) => setFormData(prev => ({ ...prev, overallRating: rating }))}
                    label="🌟 Overall Learning Experience"
                  />
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border-2 border-blue-100">
                  <StarRating
                    rating={formData.teachingQuality}
                    setRating={(rating) => setFormData(prev => ({ ...prev, teachingQuality: rating }))}
                    label="👩‍🏫 Teaching Quality"
                  />
                </div>
              </div>
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-2xl p-6 border-2 border-teal-100">
                  <StarRating
                    rating={formData.contentClarity}
                    setRating={(rating) => setFormData(prev => ({ ...prev, contentClarity: rating }))}
                    label="📚 Content Clarity"
                  />
                </div>
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-100">
                  <StarRating
                    rating={formData.supportRating}
                    setRating={(rating) => setFormData(prev => ({ ...prev, supportRating: rating }))}
                    label="🎮 Gamified Experience"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Feedback Type */}
          <div className="mb-10">
            <h4 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              What's on your mind? 💭
            </h4>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { value: 'suggestion', label: 'Suggestion', icon: Lightbulb, emoji: '💡', color: 'from-yellow-400 to-orange-400' },
                { value: 'compliment', label: 'Compliment', icon: Users, emoji: '👏', color: 'from-green-400 to-teal-400' },
                { value: 'complaint', label: 'Issue', icon: Headphones, emoji: '🔧', color: 'from-red-400 to-pink-400' },
                { value: 'question', label: 'Question', icon: BookOpen, emoji: '❓', color: 'from-blue-400 to-purple-400' }
              ].map(({ value, label, icon: Icon, emoji, color }) => (
                <label key={value} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="feedbackType"
                    value={value}
                    checked={formData.feedbackType === value}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className={`relative p-6 rounded-2xl border-3 transition-all duration-300 text-center transform group-hover:scale-105 ${
                    formData.feedbackType === value
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-blue-50 shadow-xl'
                      : 'border-gray-200 hover:border-gray-300 bg-white shadow-lg'
                  }`}>
                    <div className={`w-16 h-16 bg-gradient-to-r ${color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <span className="text-2xl">{emoji}</span>
                    </div>
                    <Icon className="w-6 h-6 mx-auto mb-3 text-gray-600" />
                    <span className="text-lg font-semibold text-gray-700">{label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Enhanced Comments */}
          <div className="mb-10">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border-2 border-purple-100">
              <label className="block text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <span className="text-2xl mr-3">💬</span>
                Share Your Thoughts
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleInputChange}
                rows="5"
                className="w-full px-6 py-4 rounded-xl border-2 border-gray-200 focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all resize-none text-lg"
                placeholder="We'd love to hear your detailed feedback! Share what you loved, what could be better, or any ideas you have... ✨"
                required
              ></textarea>
            </div>
          </div>

          {/* Enhanced Recommendation */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <label className="block text-xl font-semibold text-gray-700 mb-4">
                Would you recommend Smart Education to your friends? 🤝
              </label>
            </div>
            <div className="flex justify-center space-x-8">
              {[
                { value: 'yes', label: 'Yes!', emoji: '🎉', color: 'from-green-400 to-teal-400' },
                { value: 'no', label: 'Not Yet', emoji: '🤔', color: 'from-red-400 to-pink-400' },
                { value: 'maybe', label: 'Maybe', emoji: '🤷‍♀️', color: 'from-yellow-400 to-orange-400' }
              ].map(({ value, label, emoji, color }) => (
                <label key={value} className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="wouldRecommend"
                    value={value}
                    checked={formData.wouldRecommend === value}
                    onChange={handleInputChange}
                    className="sr-only"
                    required
                  />
                  <div className={`flex items-center px-6 py-4 rounded-xl border-2 transition-all duration-300 ${
                    formData.wouldRecommend === value
                      ? 'border-purple-500 bg-gradient-to-r from-purple-50 to-blue-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}>
                    <div className={`w-10 h-10 bg-gradient-to-r ${color} rounded-full flex items-center justify-center mr-3`}>
                      <span className="text-lg">{emoji}</span>
                    </div>
                    <span className="text-lg font-semibold text-gray-700">{label}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Enhanced Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 text-white px-12 py-5 rounded-2xl font-bold text-xl hover:from-purple-700 hover:via-blue-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 shadow-2xl flex items-center justify-center mx-auto group"
            >
              <Send className="w-6 h-6 mr-3 group-hover:translate-x-1 transition-transform" />
              🚀 Submit My Awesome Feedback
            </button>
            <p className="text-gray-500 mt-4 text-lg">Ready to make education even better? 🌟</p>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 max-w-2xl mx-auto">
            <p className="text-white text-lg font-semibold mb-2">✨ Thank you for being part of our learning community! ✨</p>
            <p className="text-white/80">Your voice helps us create magical learning experiences for everyone!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;``