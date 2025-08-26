import React, { useState } from "react";
import { X, CheckCircle, XCircle, Loader2, Camera } from "lucide-react";
import ChallengeCamera from "./ChallengeCamera";
import imageAnalysisService from "../../services/imageAnalysisService";

const ChallengeVerificationModal = ({
  challenge,
  isOpen,
  onClose,
  onVerificationSuccess,
}) => {
  const [step, setStep] = useState("camera"); // camera, analyzing, result
  const [capturedImage, setCapturedImage] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [error, setError] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handlePhotoCaptured = async (imageBlob) => {
    setCapturedImage(imageBlob);
    setStep("analyzing");
    setIsAnalyzing(true);
    setError("");

    try {
      // Analyze image with Google Vision API
      const result = await imageAnalysisService.analyzeImage(
        imageBlob,
        challenge.title
      );

      setVerificationResult(result);
      setStep("result");
    } catch (error) {
      console.error("Verification failed:", error);
      setError("Image verification failed. Please try again.");
      setStep("camera");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleVerificationSuccess = () => {
    onVerificationSuccess(capturedImage, verificationResult);
    onClose();
  };

  const resetModal = () => {
    setStep("camera");
    setCapturedImage(null);
    setVerificationResult(null);
    setError("");
    setIsAnalyzing(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Verify Challenge Completion
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Challenge Info */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">
            {challenge.title}
          </h3>
          <p className="text-blue-700 text-sm">{challenge.description}</p>
          <div className="mt-2 flex items-center gap-4 text-sm text-blue-600">
            <span>Points: {challenge.points}</span>
            <span>Category: {challenge.category}</span>
          </div>
        </div>

        {/* Step 1: Camera Capture */}
        {step === "camera" && (
          <div className="text-center">
            <div className="mb-4">
              <Camera size={48} className="mx-auto text-blue-600 mb-2" />
              <h3 className="text-lg font-semibold mb-2">Take a Photo</h3>
              <p className="text-gray-600 text-sm">
                Capture a clear photo that shows you completing this challenge
              </p>
            </div>
            <ChallengeCamera
              challengeTitle={challenge.title}
              onPhotoCaptured={handlePhotoCaptured}
              onClose={handleClose}
              isOpen={true}
            />
          </div>
        )}

        {/* Step 2: Analyzing */}
        {step === "analyzing" && (
          <div className="text-center py-8">
            <Loader2
              size={48}
              className="mx-auto text-blue-600 mb-4 animate-spin"
            />
            <h3 className="text-lg font-semibold mb-2">Analyzing Your Photo</h3>
            <p className="text-gray-600 text-sm">
              Using AI to verify your challenge completion...
            </p>
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Result */}
        {step === "result" && verificationResult && (
          <div className="text-center">
            {verificationResult.isVerified ? (
              <div className="mb-6">
                <CheckCircle
                  size={64}
                  className="mx-auto text-green-600 mb-4"
                />
                <h3 className="text-xl font-bold text-green-900 mb-2">
                  Challenge Verified! 🎉
                </h3>
                <p className="text-green-700 mb-4">
                  Your photo successfully demonstrates the challenge completion
                </p>

                <div className="bg-green-50 p-4 rounded-lg mb-4 text-left">
                  <h4 className="font-semibold text-green-900 mb-2">
                    AI Analysis Results:
                  </h4>
                  <p className="text-green-800 text-sm mb-2">
                    <strong>Detected:</strong> {verificationResult.description}
                  </p>
                  <p className="text-green-800 text-sm mb-2">
                    <strong>Confidence:</strong>{" "}
                    {Math.round(verificationResult.confidence * 100)}%
                  </p>
                  <p className="text-green-800 text-sm">
                    <strong>Keywords Matched:</strong>{" "}
                    {verificationResult.matchedKeywords.join(", ")}
                  </p>
                </div>

                <button
                  onClick={handleVerificationSuccess}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 font-semibold"
                >
                  Complete Challenge (+{challenge.points} points)
                </button>
              </div>
            ) : (
              <div className="mb-6">
                <XCircle size={64} className="mx-auto text-red-600 mb-4" />
                <h3 className="text-xl font-bold text-red-900 mb-2">
                  Verification Failed
                </h3>
                <p className="text-red-700 mb-4">
                  Your photo doesn't clearly show the challenge completion
                </p>

                <div className="bg-red-50 p-4 rounded-lg mb-4 text-left">
                  <h4 className="font-semibold text-red-900 mb-2">
                    AI Analysis Results:
                  </h4>
                  <p className="text-red-800 text-sm mb-2">
                    <strong>Detected:</strong> {verificationResult.description}
                  </p>
                  <p className="text-red-800 text-sm mb-2">
                    <strong>Confidence:</strong>{" "}
                    {Math.round(verificationResult.confidence * 100)}%
                  </p>
                  <p className="text-red-800 text-sm">
                    <strong>Required:</strong> {challenge.title}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={resetModal}
                    className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700"
                  >
                    Try Again
                  </button>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeVerificationModal;
