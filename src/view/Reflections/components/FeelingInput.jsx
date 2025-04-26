import React, { useState , useEffect } from "react";
import { useMoodContext } from "../../../config/context/MoodProvider";

function FeelingInput() {
  const [inputValue, setInputValue] = useState("");
  const {setMood , mood} = useMoodContext();

  useEffect(() => {
    console.log('Mood :' , mood)
  }, [mood])
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    setMood(inputValue);
  }

  return (
    <>
      <section className="bg-white  p-6 rounded-lg shadow-md animate-fade-in">
        <h2 className="text-xl md:text-2xl font-serif text-[#74512D] mb-4 text-center">
          How are you feeling today?
        </h2>
        {/* For for handling the submission of the input  */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Express your feelings here..."
              className={`w-full p-4 border border-[#9B7E5D] rounded-md bg-[#F8F4E1] focus:outline-none focus:ring-2 focus:ring-[#74512D] transition-all min-h-[120px] text-accent
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
