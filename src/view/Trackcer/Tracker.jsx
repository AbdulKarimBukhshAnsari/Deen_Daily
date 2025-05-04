import { useState, useEffect } from "react";
import PageDecorator from "../../components/ui/PageDecorator";
import { Heart } from "lucide-react";
import HeaderNextPrayer from "./components/HeaderNextPrayer";


function Tracker() {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const animation = {
    'fade-in': 'fadeIn 0.5s ease-in',
    'slide-up': 'slideUp 0.5s ease-out',
    'pulse-once': 'pulse 1s ease-in-out',
    'float': 'float 6s ease-in-out infinite',
    'glow': 'glow 2s ease-in-out infinite',
  }
  

  return (
    <div className="bg-[#F8F4E1] flex justify-center min-h-screen pb-4">
      <div className="max-w-4xl w-full px-4 mt-4">
        <h1 className="font-serif text-2xl md:text-3xl text-[#74512D] flex items-center gap-2 justify-center text-center my-3.5 font-bold">
          Ibadah Tracker <Heart size={24} className="text-[#9B7E5D]" />
        </h1>
        <PageDecorator />
        <div className="flex flex-col gap-7">
          <HeaderNextPrayer prayerTimes={prayerTimes} setPrayerTimes={setPrayerTimes} animation = {animation} />
        </div>
      </div>
    </div>
  );
}

export default Tracker;
