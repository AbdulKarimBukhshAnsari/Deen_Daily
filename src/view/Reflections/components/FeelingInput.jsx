import React, { useState, useEffect } from "react";
import { useMoodContext } from "../../../config/context/MoodProvider";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

function FeelingInput() {
  const [inputValue, setInputValue] = useState(JSON.parse(localStorage.getItem('mood')) || '');
  const { setMood, mood } = useMoodContext();
  const [promptResponse, setPromptResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const prompt = `
    Based on the following mood: ${inputValue}, suggest 5 Islamic good deeds that are spiritually uplifting and can be done in a very short time.

Each good deed must:
- Be relevant to the given feeling
- Be 15 words or fewer
- Be written in plain English

Also provide:
1. One Hadith:
   - Arabic text (max 20 words)
   - English translation (translation of that Arabic)
   - Proper reference (e.g., Sahih al-Bukhari 94:5)

2. One Quranic Ayah:
   - Arabic text (max 20 words)
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
    setIsLoading(true);
    setError(null);

    try {
      if (!API_KEY) {
        throw new Error('API key is not configured');
      }

      if (!inputValue.trim()) {
        throw new Error('Please enter your feelings first');
      }

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
      
      if (!result || !result.response) {
        throw new Error('No response received from AI');
      }

      const response = await result.response;
      const text = response.text();
      
      // Remove any markdown formatting and parse JSON
      const cleanText = text.replace(/```json\n|\n```/g, '').trim();
      
      try {
        const jsonData = JSON.parse(cleanText);
        setPromptResponse(jsonData);
      } catch (jsonError) {
        throw new Error('Failed to parse AI response');
      }

    } catch (error) {
      console.error("Error generating content:", error);
      setError(error.message || 'Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // for Saving Prompts into the local storage 
  useEffect(() => {
    if(promptResponse !== '') {
      console.log(promptResponse);
      const deeds = promptResponse[0].goodDeeds.map((deed) => ({
        deed: deed,
        done: false
      }));
      console.log(deeds);
      localStorage.setItem('deeds', JSON.stringify(deeds));
      localStorage.setItem('hadees' , JSON.stringify(promptResponse[1]))
      localStorage.setItem('quran' , JSON.stringify(promptResponse[2]))
      window.dispatchEvent(new Event('localStorageUpdated')); 
      
    }
  }, [promptResponse]);
  
  // handle the form submission 
  const handleSubmit = (e) => {
    e.preventDefault();
    setMood(inputValue);
    localStorage.setItem('mood' , JSON.stringify(inputValue));
    getResponse();
  };

  return (
    <>
      <section className="bg-white/70 p-6 rounded-lg shadow-md animate-fade-in">
        <h2 className="text-xl md:text-2xl font-serif text-[#74512D] mb-4 text-center">
          How are you feeling today?
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Express your feelings here..."
              className={`text-lg w-full p-4 border border-[#9B7E5D] rounded-md bg-[#F8F4E1] focus:outline-none focus:ring-2 focus:ring-[#74512D] transition-all min-h-[120px] text-[#4E1F00]
              ${error ? 'border-red-500' : ''}`}
              disabled={isLoading}
              autoFocus
            />
            <div className="absolute bottom-2 right-2 text-xs text-[#9B7E5D]/70">
              Your feelings are valid
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm mt-2">
              {error}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 bg-[#74512D] text-white rounded-md hover:bg-primary-dark transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#9B7E5D] font-medium
            ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Reflect'}
          </button>
        </form>
      </section>
    </>
  );
}

export default FeelingInput;
