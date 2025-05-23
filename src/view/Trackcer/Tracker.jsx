import { useState, useEffect } from "react";
import PageDecorator from "../../components/ui/PageDecorator";
import { Heart } from "lucide-react";
import HeaderNextPrayer from "./components/HeaderNextPrayer";
import PrayerTimes from "./components/PrayerTimes";

function Tracker() {
  const [prayerTimes, setPrayerTimes] = useState({});

  

  return (
    <div className="bg-[#F8F4E1] flex justify-center min-h-screen pb-4">
      <div className="max-w-7xl w-full px-4 mt-4">
        <h1 className="font-serif text-2xl md:text-3xl text-[#74512D] flex items-center gap-2 justify-center text-center my-3.5 font-bold">
          Ibadah Tracker <Heart size={24} className="text-[#9B7E5D]" />
        </h1>
        <PageDecorator />
        <div className="flex flex-col gap-7">
          <HeaderNextPrayer prayerTimes={prayerTimes} setPrayerTimes={setPrayerTimes} />
          <div className="prayerTime-prayersTracker">
            <PrayerTimes prayerTimes = {prayerTimes} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default Tracker;
