import React from "react";
import { Heart } from "lucide-react";
import FeelingInput from "./components/feelingInput";
import PageDecorator from "./ui/PageDecorator";
import MoodProvider from "../../config/context/MoodProvider";

function Reflections() {
  return (
    <MoodProvider>
      <div className="bg-[#F8F4E1] flex justify-center min-h-screen">
        <div className="max-w-4xl w-full px-4 mt-4">
          <h1 className="font-serif text-2xl md:text-3xl text-[#74512D] flex items-center gap-2 justify-center text-center my-3.5 font-bold">
            Mindful Moments <Heart size={24} className="text-[#9B7E5D]" />
          </h1>
          <PageDecorator />
          <FeelingInput />
        </div>
      </div>
    </MoodProvider>
  );
}

export default Reflections;
