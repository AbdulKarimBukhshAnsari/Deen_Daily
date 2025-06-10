import { Clock } from "lucide-react"
import { format } from "date-fns";

function PrayerTimes({prayerTimes}) {
  // Remove Sunrise from regular prayers as it's handled differently
  const prayerNames = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha', 'Sunrise'];
  
  const getPrayerTime = (prayerName) => {
    const prayer = prayerTimes.find(p => p.name === prayerName);
    if (!prayer || !prayer.start) return "N/A";
    return format(prayer.start, "hh:mm a");
  };

  return (
    <div className="prayerTimes bg-white/70 p-4 md:p-6 rounded-lg shadow-xl border-2 border-[#74512D]/20 backdrop-blur-sm w-full md:w-[50%] flex flex-col gap-2 md:gap-3.5">
      <div className="flex gap-3">
        <Clock className="h-5 w-5 md:h-6 md:w-6 text-[#74512D]" />
        <div className="text-[#74512D] font-serif text-lg md:text-xl">Prayer Times</div>
      </div>
      {prayerNames.map((prayer) => (
        <div
          key={prayer}
          className="bg-[#74512D]/7 py-2 md:py-4 px-2.5 md:px-3.5 hover:bg-[#74512D]/10 transition-all duration-300 ease-in-out rounded-lg font-serif text-sm md:text-base text-[#74512D] cursor-pointer flex justify-between items-center"
        >
          <span>{prayer}</span>
          <span className="bg-white/70 px-1.5 md:px-2 py-1.5 md:py-2 rounded-2xl text-sm">
            {getPrayerTime(prayer)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default PrayerTimes