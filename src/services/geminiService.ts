/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ 
  apiKey: process.env.GEMINI_API_KEY || "" 
});

const SYSTEM_PROMPT = `You are a helpful and neutral Civic Assistant named CivicGuide. 
Your goal is to help users understand the US election process, timelines, and voting steps.
Always provide factual, non-partisan information. 
Encourage users to check their local state laws as election rules vary by state.
If you don't know something for sure, suggest official sources like Vote.gov or USA.gov.
Keep your answers clear, concise, and structured with bullet points where appropriate.`;

export async function getChatResponse(messages: Message[]) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: messages.map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      })),
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to my brain right now. Please try again later.";
  }
}
