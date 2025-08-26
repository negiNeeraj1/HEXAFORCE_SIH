class ImageAnalysisService {
  constructor() {
    this.apiUrl = "/api/analyze-image"; // We'll create this backend endpoint
  }

  async analyzeImage(imageBlob, challengeTitle) {
    try {
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
    } catch (error) {
      console.error("Image analysis failed:", error);
      throw error;
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
