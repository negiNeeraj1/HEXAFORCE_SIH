import React, { useState, useRef } from "react";
import CongratulationsView from "./CongratulationsView";
import ChallengeImage from "./ChallengeImage";
import ecoChallengeService from "../../services/ecoChallengeService";
import { Camera, X } from "lucide-react";

const ChallengeDetailView = ({
  challenge,
  onChallengeUpdated,
  onClose,
  onChallengeCompleted,
}) => {
  const [currentChallenge, setCurrentChallenge] = useState(challenge);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [completing, setCompleting] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const handleCompleteChallenge = async () => {
    try {
      setCompleting(true);

      // Validate challenge data
      if (!challenge) {
        throw new Error("No challenge data provided");
      }

      // Get challenge ID
      const challengeId = challenge._id || challenge.id;
      if (!challengeId) {
        throw new Error("Challenge ID is missing");
      }

      console.log("Completing challenge with backend:", challengeId);

      // First, join the challenge if not already joined
      try {
        await ecoChallengeService.joinChallenge(challengeId);
        console.log("Successfully joined challenge");
      } catch (joinError) {
        // If already joined, that's fine
        if (joinError.message.includes("Already joined")) {
          console.log("Challenge already joined");
        } else {
          console.log(
            "Join challenge error (continuing anyway):",
            joinError.message
          );
        }
      }

      // Complete the daily task
      const response = await ecoChallengeService.completeDailyTask(
        challengeId,
        {
          plasticSaved: challenge.impact?.plasticSaved || 0,
          co2Reduced: challenge.impact?.co2Reduced || 0,
          waterSaved: challenge.impact?.waterSaved || 0,
          energySaved: challenge.impact?.energySaved || 0,
        }
      );

      if (response.success) {
        console.log(
          "Challenge completed successfully in backend:",
          response.data
        );

        // Update local state
        const updatedChallenge = {
          ...currentChallenge,
          isStarted: true,
          completedAt: new Date(),
        };
        setCurrentChallenge(updatedChallenge);
        setShowCongratulations(true);

        // Notify parent component about completion
        if (onChallengeUpdated) {
          onChallengeUpdated(updatedChallenge);
        }

        // Notify dashboard to update task count
        if (onChallengeCompleted) {
          onChallengeCompleted({
            challengeId: challengeId,
            title: currentChallenge.title,
            points: response.data.pointsEarned || currentChallenge.points || 50,
            completedAt: new Date(),
            backendData: response.data,
          });
        }
      } else {
        throw new Error(response.error || "Failed to complete challenge");
      }
    } catch (error) {
      console.error("Failed to complete challenge:", error);

      // Fallback to local completion if backend fails
      console.log("Falling back to local completion");

      const updatedChallenge = {
        ...currentChallenge,
        isStarted: true,
        completedAt: new Date(),
      };
      setCurrentChallenge(updatedChallenge);
      setShowCongratulations(true);

      if (onChallengeUpdated) {
        onChallengeUpdated(updatedChallenge);
      }

      if (onChallengeCompleted) {
        onChallengeCompleted({
          challengeId:
            currentChallenge._id || currentChallenge.id || Date.now(),
          title: currentChallenge.title,
          points: currentChallenge.points || 50,
          completedAt: new Date(),
          backendData: null,
        });
      }
    } finally {
      setCompleting(false);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera if available
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setShowCamera(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setCapturedImage(null);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(videoRef.current, 0, 0);

      canvas.toBlob(
        (blob) => {
          const imageUrl = URL.createObjectURL(blob);
          setCapturedImage(imageUrl);
          stopCamera();
        },
        "image/jpeg",
        0.8
      );
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      water: { icon: "💧", color: "text-blue-500" },
      energy: { icon: "⚡", color: "text-yellow-500" },
      recycling: { icon: "♻️", color: "text-green-500" },
      transportation: { icon: "🚗", color: "text-red-500" },
      nature: { icon: "🌿", color: "text-green-500" },
      all: { icon: "🌍", color: "text-gray-500" },
    };

    const iconData = icons[category] || icons.all;
    return <div className={`text-5xl ${iconData.color}`}>{iconData.icon}</div>;
  };

  if (showCongratulations) {
    return (
      <CongratulationsView
        challengeTitle={currentChallenge.title}
        onDismiss={() => onClose()}
      />
    );
  }

  if (showCamera) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">📸 Take Challenge Photo</h3>
            <button
              onClick={stopCamera}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="relative">
            {/* Camera Preview */}
            <div className="relative bg-gray-900 rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-64 object-cover"
                style={{ transform: 'scaleX(-1)' }} // Mirror the video for better UX
              />
              
              {/* Camera Loading Overlay */}
              {!videoRef.current?.readyState >= 2 && (
                <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-2"></div>
                    <p>Starting camera...</p>
                  </div>
                </div>
              )}
              
              {/* Camera Instructions */}
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 text-center text-sm">
                📱 Point camera at your completed challenge
              </div>
            </div>
            
            {/* Camera Controls */}
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={capturePhoto}
                disabled={!videoRef.current?.readyState >= 2}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              >
                <span className="text-xl">📸</span>
                <span>Capture Photo</span>
              </button>
              
              <button
                onClick={stopCamera}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <span>❌</span>
                <span>Cancel</span>
              </button>
            </div>
            
            {/* Camera Tips */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm text-center">
                💡 <strong>Tip:</strong> Make sure your challenge completion is clearly visible in the photo!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 rounded-full flex items-center justify-center transition-all duration-200 z-10"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="space-y-6">
            {/* Challenge Image */}
            <div className="flex justify-center">
              <div className="h-48 w-full rounded-lg overflow-hidden">
                <ChallengeImage
                  imageName={currentChallenge.imageName}
                  title={currentChallenge.title}
                  className="h-48 w-full rounded-lg"
                />
              </div>
            </div>

            {/* Category Icon */}
            <div className="flex justify-center">
              {getCategoryIcon(currentChallenge.category)}
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold text-center text-gray-900">
              {currentChallenge.title}
            </h2>

            {/* Description */}
            <p className="text-gray-700 text-center leading-relaxed">
              {currentChallenge.description}
            </p>

            {/* Benefits Section */}
            <div className="bg-green-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-2 text-center">
                Why is it good for the planet?
              </h3>
              <p className="text-green-700 text-center">
                {currentChallenge.benefits || currentChallenge.description}
              </p>
            </div>

            {/* Challenge Section */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-2 text-center">
                Your Challenge:
              </h3>
              <p className="text-blue-700 text-center">
                {currentChallenge.kidChallenge || currentChallenge.description}
              </p>
            </div>

            {/* Captured Image Display */}
            {capturedImage && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                  Photo Captured
                </h3>
                <div className="flex justify-center">
                  <img
                    src={capturedImage}
                    alt="Captured challenge completion"
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            {/* Camera Button */}
            <button
              onClick={startCamera}
              className="flex-1 py-4 px-6 rounded-xl font-semibold text-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
            >
              <Camera className="w-5 h-5" />
              <span>Take Photo</span>
            </button>

            {/* Complete Button */}
            <button
              onClick={handleCompleteChallenge}
              disabled={currentChallenge.isStarted || completing}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-colors ${
                currentChallenge.isStarted || completing
                  ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {completing ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </div>
              ) : currentChallenge.isStarted ? (
                "Challenge Completed"
              ) : (
                "Submit Challenge"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailView;
