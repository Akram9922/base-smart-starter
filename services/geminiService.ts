import { GoogleGenAI } from "@google/genai";
import { GEMINI_MODEL } from "../constants";

let aiClient: GoogleGenAI | null = null;

const getClient = () => {
  if (!aiClient) {
    const apiKey = process.env.API_KEY || '';
    // In a real prod app, you'd handle this more gracefully, 
    // but for the starter we assume the env is injected.
    if (apiKey) {
        aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
};

export const generateBaseResponse = async (prompt: string): Promise<string> => {
  const client = getClient();
  if (!client) {
    return "API Key not configured. Please set process.env.API_KEY.";
  }

  try {
    const systemInstruction = `
      You are an expert blockchain developer specializing in the Base L2 network (Coinbase) and Solidity.
      Your goal is to help users build on Base.
      - If users ask about 'wagmi/experimental' errors, explain that they should stick to stable wagmi v2 hooks or check their peer dependencies for @coinbase/onchainkit.
      - Provide concise, accurate code snippets for React, Wagmi, and Solidity.
      - Use markdown for code blocks.
      - Be encouraging and helpful.
    `;

    const response = await client.models.generateContent({
      model: GEMINI_MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    return response.text || "No response generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while thinking. Please try again.";
  }
};
