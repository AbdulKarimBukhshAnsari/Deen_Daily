import React, { useState, useEffect } from "react";
import { useMoodContext } from "../../../config/context/MoodProvider";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

function FeelingInput() {
  const [inputValue, setInputValue] = useState("");
  const { setMood, mood } = useMoodContext();

  const [promptResponse, setPromptResponse] = useState([]);

  const prompt = `
    Based on the following mood: ${inputValue}, suggest 5 Islamic good deeds that are spiritually uplifting and can be done in a very short time.

Each good deed must:
- Be relevant to the given feeling
- Be 10 words or fewer
- Be written in plain English

Also provide:
1. One Hadith:
   - Arabic text (max 10 words)
   - English translation (translation of that Arabic)
   - Proper reference (e.g., Sahih al-Bukhari 94:5)

2. One Quranic Ayah:
   - Arabic text (max 10 words)
   - English translation (translation of that Arabic)
   - Proper reference (e.g., Surah Ash-Sharh 94:5-6)

The response should be formatted strictly as valid JSON like this:

[
  {
    "goodDeeds": [
      "Short good deed 1",
      "Short good deed 2",
      "Short good deed 3",
      "Short good deed 4",
      "Short good deed 5"
    ]
  },
  {
    "hadees": {
      "arabic": "Arabic text",
      "english": "English translation",
      "reference": "Reference text"
    }
  },
  {
    "Quran": {
      "arabic": "Arabic ayah",
      "english": "English translation",
      "reference": "Reference text"
    }
  }
]

Only respond with JSON, no explanation.  
  `;


  // for getting the response from Gemini AI 
  const getResponse = async () => {
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.0-flash", 
        generationConfig: {
          temperature: 0.9,
          topK: 1,
          topP: 1,
          maxOutputTokens: 2048,
        },
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Remove any markdown formatting and parse JSON
      const cleanText = text.replace(/```json\n|\n```/g, '').trim();
      const jsonData = JSON.parse(cleanText);
      setPromptResponse(jsonData);
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  useEffect(() => {
    console.log("response:", promptResponse);
  }, [promptResponse]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMood(inputValue);
    getResponse();
  };

  return (
    <>
      <section className="bg-white  p-6 rounded-lg shadow-md animate-fade-in">
        <h2 className="text-xl md:text-2xl font-serif text-[#74512D] mb-4 text-center">
          How are you feeling today?
        </h2>
        {/* For for handling the submission of the input  */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Express your feelings here..."
              className={`text-lg w-full p-4 border border-[#9B7E5D] rounded-md bg-[#F8F4E1] focus:outline-none focus:ring-2 focus:ring-[#74512D] transition-all min-h-[120px] text-[#4E1F00]
              }`}
              autoFocus
            />
            <div className="absolute bottom-2 right-2 text-xs text-[#9B7E5D]/70">
              Your feelings are valid
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#74512D] text-white rounded-md hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#9B7E5D] font-medium"
          >
            Reflect
          </button>
        </form>
      </section>
    </>
  );
}

export default FeelingInput;
