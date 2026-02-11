
import { GoogleGenAI, Type } from "@google/genai";

export interface CVAnalysisResult {
  score: number;
  summary: string;
}

export const analyzeCV = async (base64Data: string, role: string): Promise<CVAnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Clean base64 string if it contains the data:image prefix
  const base64Content = base64Data.split(',')[1] || base64Data;
  const mimeType = base64Data.match(/data:([^;]+);/)?.[1] || 'image/png';

  const prompt = `You are a professional HR recruiter for ProAgo Marketing. 
  Analyze this CV image for the position of "${role}". 
  Provide a suitability score (0-100) and a concise 2-sentence summary of their key experience and why they fit (or don't fit) the role.
  Be critical and professional.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Content,
              mimeType: mimeType,
            },
          },
          { text: prompt },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: {
              type: Type.NUMBER,
              description: "A score from 0 to 100 based on role suitability.",
            },
            summary: {
              type: Type.STRING,
              description: "A 2-sentence professional summary of the candidate's profile.",
            },
          },
          required: ["score", "summary"],
        },
      },
    });

    const resultText = response.text;
    if (!resultText) throw new Error("AI returned empty response");
    
    return JSON.parse(resultText) as CVAnalysisResult;
  } catch (error) {
    console.error("Gemini CV Analysis Error:", error);
    return {
      score: 0,
      summary: "AI analysis was unavailable for this document.",
    };
  }
};
