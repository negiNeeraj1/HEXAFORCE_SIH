class ImageAnalysisService {
  constructor() {
    this.apiUrl = "/api/analyze-image"; // We'll create this backend endpoint
  }

  async analyzeImage(imageBlob, challengeTitle) {
    try {
      // For now, use mock analysis since backend endpoint doesn't exist
      return this.mockImageAnalysis(imageBlob, challengeTitle);
      
      // TODO: Uncomment when backend is ready
      /*
      const formData = new FormData();
      formData.append("image", imageBlob);
      formData.append("challengeTitle", challengeTitle);

      const response = await fetch(this.apiUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Image analysis failed");
      }

      const result = await response.json();
      return result;
      */
    } catch (error) {
      console.error("Image analysis failed:", error);
      // Fallback to mock analysis
      return this.mockImageAnalysis(imageBlob, challengeTitle);
    }
  }

  mockImageAnalysis(imageBlob, challengeTitle) {
    // Simulate AI analysis with realistic delays and results
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock verification logic based on challenge title
        const isVerified = this.mockVerificationLogic(challengeTitle);
        
        if (isVerified) {
          resolve({
            isVerified: true,
            description: "Environmental action detected in image",
            confidence: 0.85 + Math.random() * 0.1, // 85-95% confidence
            matchedKeywords: ["environment", "action", "challenge", "completion"],
            analysisType: "mock"
          });
        } else {
          resolve({
            isVerified: false,
            description: "Image does not clearly show challenge completion",
            confidence: 0.3 + Math.random() * 0.2, // 30-50% confidence
            matchedKeywords: ["image", "unclear"],
            analysisType: "mock"
          });
        }
      }, 2000 + Math.random() * 1000); // 2-3 second delay to simulate processing
    });
  }

  mockVerificationLogic(challengeTitle) {
    // Simple mock logic - you can enhance this
    const title = challengeTitle.toLowerCase();
    
    // Challenges that are more likely to be verified
    const easyChallenges = [
      "plant", "tree", "garden", "flower", "recycle", "compost", 
      "clean", "pick", "water", "grow", "sow", "seed"
    ];
    
    // Challenges that are harder to verify
    const hardChallenges = [
      "energy", "transport", "reduce", "conserve", "sustainable", 
      "carbon", "emission", "footprint"
    ];
    
    // Check if challenge title contains easy verification keywords
    const hasEasyKeywords = easyChallenges.some(keyword => title.includes(keyword));
    const hasHardKeywords = hardChallenges.some(keyword => title.includes(keyword));
    
    if (hasEasyKeywords) {
      return Math.random() > 0.2; // 80% success rate for easy challenges
    } else if (hasHardKeywords) {
      return Math.random() > 0.7; // 30% success rate for hard challenges
    } else {
      return Math.random() > 0.5; // 50% success rate for unknown challenges
    }
  }

  async blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}

export const imageAnalysisService = new ImageAnalysisService();
export default imageAnalysisService;
