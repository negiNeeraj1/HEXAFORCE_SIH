import { useState } from "react";
import { Leaf, Star, CheckCircle2, MessageSquare, Target } from "lucide-react";

 function EcoFeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    classYear: '',
    email: '',
    quizEngagement: '',
    learningImpact: '',
    ecoAwareness: '',
    practiceMotivation: '',
    knowledgeGain: '',
    funRating: '',
    suggestions: '',
    commitmentAction: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // In a real app, you'd send this data to your backend
    console.log('Form submitted:', formData);
  };

  const StarRating = ({ value, onChange, label }) => {
    return (
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className={`p-1 transition-colors ${
                star <= value ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-200'
              }`}
            >
              <Star className="w-6 h-6 fill-current" />
            </button>
          ))}
        </div>
        <span className="text-xs text-gray-500">
          {value ? `${value}/5` : 'Click to rate'}
        </span>
      </div>
    );
  };

  const LikertScale = ({ value, onChange, statement }) => {
    const options = [
      { value: 5, label: 'Strongly Agree' },
      { value: 4, label: 'Agree' },
      { value: 3, label: 'Neutral' },
      { value: 2, label: 'Disagree' },
      { value: 1, label: 'Strongly Disagree' }
    ];

    return (
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700">{statement}</p>
        <div className="flex flex-wrap gap-2">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`px-3 py-2 rounded-full text-sm transition-all ${
                value === option.value
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center space-y-4">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-900">Thank You!</h2>
          <p className="text-gray-600">
            Your feedback has been submitted successfully. Together, we're building a more sustainable future! 🌱
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Leaf className="w-8 h-8 text-green-500" />
          <h1 className="text-3xl font-bold text-gray-900">Eco Learning Feedback</h1>
        </div>
        <p className="text-gray-600">Help us improve your environmental learning experience!</p>
      </div>

      <div onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-blue-500" />
            Basic Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class/Year *
              </label>
              <input
                type="text"
                required
                value={formData.classYear}
                onChange={(e) => handleInputChange('classYear', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="e.g., Grade 10 or Year 2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="your.email@example.com"
              />
            </div>
          </div>
        </div>

        {/* Quiz Experience */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-500" />
            Quiz Experience
          </h2>
          <StarRating
            value={formData.quizEngagement}
            onChange={(value) => handleInputChange('quizEngagement', value)}
            label="How engaging did you find the quizzes?"
          />
        </div>

        {/* Learning Impact */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <CheckCircle2 className="w-5 h-5 mr-2 text-green-500" />
            Learning Impact
          </h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">
                Did the quizzes help you understand environmental issues better?
              </p>
              <div className="flex space-x-4">
                {['Yes', 'No', 'Maybe'].map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleInputChange('learningImpact', option)}
                    className={`px-6 py-2 rounded-lg transition-all ${
                      formData.learningImpact === option
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mindset Change */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Leaf className="w-5 h-5 mr-2 text-purple-500" />
            Mindset Change
          </h2>
          <div className="space-y-6">
            <LikertScale
              value={formData.ecoAwareness}
              onChange={(value) => handleInputChange('ecoAwareness', value)}
              statement="I am now more aware of eco-friendly practices."
            />
            <LikertScale
              value={formData.practiceMotivation}
              onChange={(value) => handleInputChange('practiceMotivation', value)}
              statement="I feel motivated to adopt sustainable practices in my daily life."
            />
            <LikertScale
              value={formData.knowledgeGain}
              onChange={(value) => handleInputChange('knowledgeGain', value)}
              statement="The platform significantly increased my environmental knowledge."
            />
          </div>
        </div>

        {/* Fun & Interactivity */}
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Star className="w-5 h-5 mr-2 text-orange-500" />
            Fun & Interactivity
          </h2>
          <StarRating
            value={formData.funRating}
            onChange={(value) => handleInputChange('funRating', value)}
            label="How enjoyable did you find the activities and quizzes?"
          />
        </div>

        {/* Suggestions */}
        <div className="bg-indigo-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-indigo-500" />
            Suggestions for Improvement
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to see in future quizzes or activities?
            </label>
            <textarea
              value={formData.suggestions}
              onChange={(e) => handleInputChange('suggestions', e.target.value)}
              rows="4"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Share your ideas for new topics, features, or improvements..."
            />
          </div>
        </div>

        {/* Commitment to Action */}
        <div className="bg-teal-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2 text-teal-500" />
            Your Eco Commitment
          </h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              After this program, what eco-friendly action will you try to take in your daily life?
            </label>
            <textarea
              value={formData.commitmentAction}
              onChange={(e) => handleInputChange('commitmentAction', e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Describe one specific eco-friendly action you'll commit to..."
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center pt-6">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-colors shadow-lg hover:shadow-xl"
          >
            Submit Feedback 🌱
          </button>
        </div>
      </div>
    </div>
  );
};
export default EcoFeedbackForm;
