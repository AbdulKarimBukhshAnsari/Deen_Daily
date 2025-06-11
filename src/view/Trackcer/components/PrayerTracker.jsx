import { useState, useEffect } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { formatDate, getDaysBetweenDates } from "../../../utils/dateUtils";

function PrayerTracker() {
  const initialPrayers = [
    { name: "Fajr", completed: false },
    { name: "Dhuhr", completed: false },
    { name: "Asr", completed: false },
    { name: "Maghrib", completed: false },
    { name: "Isha", completed: false },
  ];

  const [prayers, setPrayers] = useState(() => {
    const today = formatDate(new Date());
    const savedData = localStorage.getItem("prayerTrackerData");
    
    // checking whether the history exists or not in the local Storage 
    if (!savedData) {
      return {
        currentDate: today,
        prayers: initialPrayers,
        history: {}
      };
    }

    const parsedData = JSON.parse(savedData);
    
    // If it's a new day, save previous day's data and start fresh
    if (parsedData.currentDate !== today) {
      const completedCount = parsedData.prayers.filter(p => p.completed).length;
      
      // Fill in missing days
      const daysBetween = getDaysBetweenDates(new Date(parsedData.currentDate), new Date(today));
      const newHistory = { ...parsedData.history };
      
      // Save last recorded day
      newHistory[parsedData.currentDate] = completedCount;
      
      // Fill gaps with zeros
      for (let i = 1; i < daysBetween; i++) {
        const date = formatDate(new Date(new Date(parsedData.currentDate).getTime() + (i * 24 * 60 * 60 * 1000)));
        newHistory[date] = 0;
      }

      return {
        currentDate: today,
        prayers: initialPrayers,
        history: newHistory
      };
    }

    return parsedData;
  });

  const togglePrayer = (index) => {
    setPrayers(prev => ({
      ...prev,
      prayers: prev.prayers.map((prayer, i) => 
        i === index ? { ...prayer, completed: !prayer.completed } : prayer
      )
    }));
  };

  useEffect(() => {
    localStorage.setItem("prayerTrackerData", JSON.stringify(prayers));
  }, [prayers]);

  // Stats component to show prayer history
  const renderStats = () => {
    const today = prayers.prayers.filter(p => p.completed).length;
    const yesterdayDate = formatDate(new Date(Date.now() - 86400000));
    const yesterday = prayers.history[yesterdayDate] || 0;

    return (
      <div className="mt-3 md:mt-4 p-3 md:p-4 bg-amber-50 rounded-lg">
        <h4 className="text-base md:text-lg font-medium text-[#74512D]">Statistics</h4>
        <p className="text-sm md:text-base">Today: {today}/5 prayers completed</p>
        <p className="text-sm md:text-base">Yesterday: {yesterday}/5 prayers completed</p>
      </div>
    );
  };

  return (
    <div className="bg-white/70 bg-opacity-80 p-4 md:p-6 rounded-lg shadow-xl border-2 border-[#74512D33] backdrop-blur-sm w-full md:w-[50%]">
      <h3 className="text-xl md:text-2xl font-serif text-[#74512D] mb-4 md:mb-6">
        Track Your Prayers ({prayers.currentDate})
      </h3>
      <div className="space-y-3 md:space-y-4">
        {prayers.prayers.map((prayer, index) => (
          <button
            key={prayer.name}
            onClick={() => togglePrayer(index)}
            className={`flex items-center w-full p-3 md:p-4 rounded-lg transition-all duration-300 ${
              prayer.completed
                ? "bg-gradient-to-r from-[#74512D33] to-[#74512D4D] border-2 border-[#74512D] shadow-inner"
                : "border-2 border-[#74512D33] hover:bg-[#74512D0D]"
            }`}
          >
            <span className="text-[#74512D] mr-3 md:mr-4">
              {prayer.completed ? (
                <CheckCircle2 className="h-6 w-6 md:h-7 md:w-7" />
              ) : (
                <Circle className="h-6 w-6 md:h-7 md:w-7" />
              )}
            </span>
            <span className={`text-base md:text-lg font-medium ${
              prayer.completed ? "text-[#74512D]" : "text-[#4E1F00]"
            }`}>
              {prayer.name}
            </span>
          </button>
        ))}
      </div>
      {renderStats()}
    </div>
  );
}

export default PrayerTracker;
