import React, { useState } from "react";
import {
  Camera,
  Upload,
  CheckCircle,
  XCircle,
  Loader2,
  Image as ImageIcon,
} from "lucide-react";

const ImageVerificationDemo = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState("");

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        // 10MB
        setError("Image file is too large. Please use an image under 10MB.");
        return;
      }

      setError("");
      setSelectedImage(file);
      setVerificationResult(null);
    }
  };

  const handleVerification = async () => {
    if (!selectedImage) return;

    setIsVerifying(true);
    setError("");
    setVerificationResult(null);

    try {
      // Simulate verification process
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Simulate verification result
      const isSuccess = Math.random() > 0.3; // 70% success rate for demo

      setVerificationResult({
        isVerified: isSuccess,
        confidence: isSuccess
          ? 0.85 + Math.random() * 0.15
          : 0.2 + Math.random() * 0.3,
        description: isSuccess
          ? "Successfully detected environmental activity matching the challenge requirements."
          : "No clear evidence of challenge completion was detected in the image.",
        matchedKeywords: isSuccess
          ? ["plant", "garden", "environmental", "nature"]
          : ["indoor", "furniture", "room"],
        analysisSummary: {
          totalObjects: isSuccess ? 5 : 3,
          matchedObjects: isSuccess ? 3 : 0,
        },
      });
    } catch (error) {
      setError("Verification failed. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const resetDemo = () => {
    setSelectedImage(null);
    setVerificationResult(null);
    setError("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🖼️ Image Verification Demo
        </h2>
        <p className="text-gray-600 text-lg">
          Experience how AI-powered image verification works for environmental
          challenges
        </p>
      </div>

      {/* Demo Steps */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="text-center p-4 bg-blue-50 rounded-lg">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">1</span>
          </div>
          <h3 className="font-semibold text-blue-900 mb-2">Upload Image</h3>
          <p className="text-blue-700 text-sm">
            Select or capture an image of your challenge completion
          </p>
        </div>

        <div className="text-center p-4 bg-green-50 rounded-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">2</span>
          </div>
          <h3 className="font-semibold text-green-900 mb-2">AI Analysis</h3>
          <p className="text-green-700 text-sm">
            AI analyzes the image using DETR and CLIP models
          </p>
        </div>

        <div className="text-center p-4 bg-purple-50 rounded-lg">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">3</span>
          </div>
          <h3 className="font-semibold text-purple-900 mb-2">Verification</h3>
          <p className="text-purple-700 text-sm">
            Get instant results with detailed analysis
          </p>
        </div>
      </div>

      {/* Image Upload Section */}
      <div className="mb-8">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          {!selectedImage ? (
            <div>
              <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload an image to test verification
              </h3>
              <p className="text-gray-500 mb-4">
                Drag and drop an image here, or click to browse
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                id="image-upload"
              />
              <label
                htmlFor="image-upload"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors"
              >
                <Camera className="w-5 h-5 mr-2" />
                Choose Image
              </label>
            </div>
          ) : (
            <div>
              <div className="relative inline-block">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="w-64 h-48 object-cover rounded-lg border-2 border-gray-200"
                />
                <button
                  onClick={resetDemo}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <XCircle size={16} />
                </button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-3">
                  Selected: {selectedImage.name}
                </p>
                <button
                  onClick={handleVerification}
                  disabled={isVerifying}
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Start Verification
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md border border-red-200">
          <div className="flex items-center gap-2">
            <XCircle size={16} />
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Verification Progress */}
      {isVerifying && (
        <div className="mb-6 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Analyzing Your Image
            </h3>
            <p className="text-blue-700 text-sm mb-4">
              AI is processing your image to verify challenge completion...
            </p>

            {/* Progress Bar */}
            <div className="w-full bg-blue-200 rounded-full h-3 mb-4">
              <div
                className="bg-blue-600 h-3 rounded-full animate-pulse"
                style={{ width: "60%" }}
              ></div>
            </div>

            <p className="text-sm text-blue-600">
              Detecting objects and analyzing scene context...
            </p>
          </div>
        </div>
      )}

      {/* Verification Results */}
      {verificationResult && (
        <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="text-center mb-6">
            {verificationResult.isVerified ? (
              <div>
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-green-900 mb-2">
                  Verification Successful! 🎉
                </h3>
                <p className="text-green-700">
                  Your image successfully demonstrates challenge completion
                </p>
              </div>
            ) : (
              <div>
                <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-red-900 mb-2">
                  Verification Failed
                </h3>
                <p className="text-red-700">
                  Your image doesn't clearly show challenge completion
                </p>
              </div>
            )}
          </div>

          {/* Analysis Details */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">
              AI Analysis Results:
            </h4>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Confidence Score:</strong>
                </p>
                <p className="text-lg font-semibold">
                  {Math.round(verificationResult.confidence * 100)}%
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Objects Detected:</strong>
                </p>
                <p className="text-lg font-semibold">
                  {verificationResult.analysisSummary.totalObjects}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-1">
                <strong>Analysis Description:</strong>
              </p>
              <p className="text-gray-800">{verificationResult.description}</p>
            </div>

            <div>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Keywords Matched:</strong>
              </p>
              <div className="flex flex-wrap gap-2">
                {verificationResult.matchedKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      verificationResult.isVerified
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 text-center">
            <button
              onClick={resetDemo}
              className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mr-3"
            >
              Try Another Image
            </button>
            <button
              onClick={() => setVerificationResult(null)}
              className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
            >
              Hide Results
            </button>
          </div>
        </div>
      )}

      {/* Demo Info */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
        <div className="flex items-start gap-3">
          <div className="text-yellow-600 mt-1">
            <ImageIcon size={20} />
          </div>
          <div>
            <h4 className="font-semibold text-yellow-900 mb-2">
              Demo Information
            </h4>
            <p className="text-yellow-800 text-sm mb-2">
              This is a demonstration of the image verification system. In the
              real application:
            </p>
            <ul className="text-yellow-800 text-sm space-y-1">
              <li>• Images are analyzed using real AI models (DETR + CLIP)</li>
              <li>• Verification is based on actual challenge requirements</li>
              <li>• Results are stored and tracked for user progress</li>
              <li>• Points are awarded for successful verifications</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageVerificationDemo;
