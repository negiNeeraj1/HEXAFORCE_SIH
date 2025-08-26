import React, { useRef, useState, useEffect } from "react";
import { Camera, X, RotateCcw, Check } from "lucide-react";

const ChallengeCamera = ({
  challengeTitle,
  onPhotoCaptured,
  onClose,
  isOpen,
}) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
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
      setError("");
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      setStream(mediaStream);
      videoRef.current.srcObject = mediaStream;
      setIsCameraActive(true);
    } catch (error) {
      console.error("Camera access failed:", error);
      setError("Camera access denied. Please allow camera permissions.");
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
    if (!isCameraActive) return;

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

  const switchCamera = async () => {
    stopCamera();
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
            {error}
          </div>
        )}

        <div className="relative mb-4">
          {!capturedImage ? (
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-64 bg-gray-900 rounded-lg object-cover"
              />
              {isCameraActive && (
                <div className="absolute inset-0 flex items-center justify-center">
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

        <div className="flex gap-2 justify-center">
          {!capturedImage ? (
            <>
              <button
                onClick={switchCamera}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                <RotateCcw size={16} />
                Switch
              </button>
              <button
                onClick={capturePhoto}
                disabled={!isCameraActive}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                <Camera size={16} />
                Capture
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeCamera;
