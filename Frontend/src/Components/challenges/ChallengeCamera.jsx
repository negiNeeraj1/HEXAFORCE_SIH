import React, { useRef, useState, useEffect } from "react";
import { Camera, X, RotateCcw, Check, Upload, AlertCircle } from "lucide-react";

const ChallengeCamera = ({
  challengeTitle,
  onPhotoCaptured,
  onClose,
  isOpen,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Check browser compatibility first
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setError("Camera not supported in this browser. Please use a modern browser like Chrome, Firefox, or Safari.");
        return;
      }
      
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError("");
      
      console.log("Starting camera...");
      console.log("navigator.mediaDevices available:", !!navigator.mediaDevices);
      console.log("getUserMedia available:", !!navigator.mediaDevices?.getUserMedia);
      
      // Simple camera request - this should trigger permission prompt
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      console.log("Camera started successfully");
      console.log("Stream tracks:", mediaStream.getTracks());
      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
      setIsCameraActive(true);
      
    } catch (error) {
      console.error("Camera access failed:", error);
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      
      if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        setError("Camera access denied. Please allow camera permissions in your browser.");
      } else if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        setError("No camera found on your device.");
      } else if (error.name === 'NotReadableError') {
        setError("Camera is in use by another application. Please close other camera apps.");
      } else if (error.name === 'NotSupportedError') {
        setError("Camera not supported in this browser. Please use a modern browser.");
      } else {
        setError(`Camera error: ${error.message}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  };

  const capturePhoto = () => {
    if (!isCameraActive || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        setCapturedImage(blob);
      },
      "image/jpeg",
      0.9
    );
  };

  const retakePhoto = () => {
    setCapturedImage(null);
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      onPhotoCaptured(capturedImage);
      onClose();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setCapturedImage(file);
    } else {
      setError("Please select a valid image file.");
    }
  };

  const openFileUpload = () => {
    fileInputRef.current?.click();
  };

  const retryCamera = async () => {
    setError("");
    await startCamera();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Verify Challenge</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">
            Challenge: <span className="font-medium">{challengeTitle}</span>
          </p>
          <p className="text-xs text-gray-500">
            Take a clear photo that shows you completing this challenge
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            <div className="flex items-start gap-2">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">{error}</p>
                <div className="mt-2 text-xs">
                  <p><strong>To enable camera:</strong></p>
                  <p>• Look for a camera icon in your browser's address bar</p>
                  <p>• Click it and select "Allow"</p>
                  <p>• Or use "Upload Photo" instead</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="relative mb-4">
          {!capturedImage ? (
            <div className="relative">
              {isLoading ? (
                <div className="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                    <p className="text-sm">Starting camera...</p>
                  </div>
                </div>
              ) : isCameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 bg-gray-900 rounded-lg object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera size={48} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm opacity-75">Camera not active</p>
                  </div>
                </div>
              )}
              
              {isCameraActive && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="border-2 border-white border-dashed rounded-lg w-48 h-32 flex items-center justify-center">
                    <span className="text-white text-sm">
                      Frame your photo here
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative">
              <img
                src={URL.createObjectURL(capturedImage)}
                alt="Captured"
                className="w-full h-64 bg-gray-900 rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="text-white text-center">
                  <Check size={48} className="mx-auto mb-2" />
                  <p className="text-sm">Photo captured!</p>
                </div>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        {/* Camera Controls */}
        {!capturedImage && isCameraActive && (
          <div className="flex gap-2 justify-center mb-3">
            <button
              onClick={capturePhoto}
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Camera size={16} />
              Capture Photo
            </button>
          </div>
        )}

        {/* Fallback Options */}
        {!isCameraActive && !capturedImage && (
          <div className="space-y-3 mb-3">
            <button
              onClick={retryCamera}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Camera size={16} />
              {isLoading ? "Starting Camera..." : "Try Camera Again"}
            </button>
            
            <button
              onClick={openFileUpload}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Upload size={16} />
              Upload Photo Instead
            </button>
          </div>
        )}

        {/* File Upload Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {/* Photo Actions */}
        {capturedImage && (
          <div className="flex gap-2 justify-center">
            <button
              onClick={retakePhoto}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              <RotateCcw size={16} />
              Retake
            </button>
            <button
              onClick={confirmPhoto}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <Check size={16} />
              Use Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeCamera;
