# Challenge Verification System Setup Guide

This guide will help you set up the real-time camera capture and Google Vision API verification system for your eco-challenges.

## 🚀 Features

- **Real-time Camera Capture**: Users can take photos directly from their device
- **AI-Powered Verification**: Google Vision API analyzes images to verify challenge completion
- **Smart Matching**: Compares image content with challenge titles for accuracy
- **User-Friendly Interface**: Step-by-step verification process with clear feedback

## 📋 Prerequisites

1. **Google Cloud Account** with billing enabled
2. **Google Vision API** enabled
3. **Service Account Key** downloaded as JSON file
4. **Node.js** and **npm** installed

## 🔧 Backend Setup

### 1. Install Dependencies

```bash
cd Backend
npm install @google-cloud/vision multer
```

### 2. Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the **Cloud Vision API**
4. Create a **Service Account**
5. Download the JSON key file
6. Place it in your `Backend` folder as `google-credentials.json`

### 3. Environment Variables

Create a `.env` file in your `Backend` folder:

```env
# Database Configuration
MONGODB_URI=your_mongodb_connection_string
PORT=5000

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=30d

# Google Vision API Configuration
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
GOOGLE_CLOUD_PROJECT_ID=your_project_id
```

### 4. Update Server Configuration

Make sure your `server.js` includes the AI routes:

```javascript
const aiRoutes = require("./routes/aiRoutes");
app.use("/api", aiRoutes);
```

## 🎯 Frontend Setup

### 1. Install Dependencies

```bash
cd Frontend
npm install lucide-react
```

### 2. Components Created

- `ChallengeCamera.jsx` - Camera capture interface
- `ChallengeVerificationModal.jsx` - Verification workflow
- `imageAnalysisService.js` - API communication service

### 3. Integration

The verification system is automatically integrated into:

- `ChallengeCard.jsx` - Shows verification button
- `ChallengesView.jsx` - Handles verification workflow

## 🔍 How It Works

### 1. User Flow

1. User clicks verification button on challenge card
2. Camera opens for photo capture
3. User takes photo and confirms
4. Image is sent to Google Vision API for analysis
5. AI compares image content with challenge title
6. Challenge is verified or rejected based on AI analysis

### 2. Verification Logic

- Extracts objects, text, and labels from image
- Compares with challenge title keywords
- Calculates confidence score
- Requires minimum 60% confidence and keyword matches

### 3. API Endpoints

- `POST /api/analyze-image` - Image analysis and verification
- `POST /api/fun/challenges/:id/complete-verified` - Complete verified challenge

## 🎨 Customization

### Challenge Verification Rules

Edit the verification logic in `Backend/routes/aiRoutes.js`:

```javascript
function verifyChallengeMatch(challengeTitle, analysisResult) {
  // Customize verification rules here
  const confidence = matchCount > 0 ? totalConfidence / matchCount : 0;
  const isVerified =
    matchCount >= Math.max(1, Math.ceil(titleWords.length * 0.3)) &&
    confidence > 0.6;

  return { isVerified, confidence, description, matchedKeywords };
}
```

### UI Customization

Modify the verification modal appearance in `ChallengeVerificationModal.jsx`:

```javascript
// Customize success/failure thresholds
const isVerified = verificationResult.confidence > 0.7;

// Customize UI colors and styling
<div className="bg-green-50 p-4 rounded-lg">{/* Custom success UI */}</div>;
```

## 🧪 Testing

### 1. Test Camera Access

- Ensure camera permissions are granted
- Test on both mobile and desktop devices

### 2. Test Image Analysis

- Try different challenge types
- Test with various image qualities
- Verify confidence scoring

### 3. Test Error Handling

- Test with invalid images
- Test network failures
- Test API quota limits

## 🚨 Troubleshooting

### Common Issues

1. **Camera Not Working**

   - Check browser permissions
   - Ensure HTTPS in production
   - Test on different devices

2. **Google Vision API Errors**

   - Verify service account key
   - Check API quotas
   - Verify billing is enabled

3. **Image Analysis Failing**
   - Check image file size (max 5MB)
   - Verify image format (JPEG, PNG)
   - Check network connectivity

### Debug Mode

Enable detailed logging in `imageAnalysisService.js`:

```javascript
console.log("Image analysis request:", {
  challengeTitle,
  imageSize: imageBlob.size,
});
console.log("Analysis result:", result);
```

## 📱 Mobile Optimization

- Camera access optimized for mobile devices
- Touch-friendly interface
- Responsive design for all screen sizes
- Back camera preferred for better quality

## 🔒 Security Considerations

- Image files are processed in memory only
- No permanent storage of user photos
- Authentication required for all API calls
- File size and type validation

## 🎯 Next Steps

1. **Deploy to production** with proper environment variables
2. **Monitor API usage** and costs
3. **Collect user feedback** on verification accuracy
4. **Implement additional verification methods** (GPS, time-based)
5. **Add admin review system** for complex challenges

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review Google Cloud Console logs
3. Check browser console for frontend errors
4. Verify all dependencies are installed

---

**Happy Coding! 🌱✨**
