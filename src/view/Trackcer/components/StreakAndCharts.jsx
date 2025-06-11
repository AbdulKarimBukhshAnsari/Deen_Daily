import { Star, Trophy, Book } from "lucide-react";
import { useState, useEffect } from "react";
import { formatDate } from "../../../utils/dateUtils";

function StreakAndCharts() {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    bestStreak: 0,
    quranStreak: 0
  });

  useEffect(() => {
    calculateStreaks();
  }, []);

  const calculateStreaks = () => {
    // Get prayer tracker data
    const prayerData = JSON.parse(localStorage.getItem("prayerTrackerData") || "{}");
    const quranData = JSON.parse(localStorage.getItem("QuranTrackerData") || "{}");

    let currentStreak = 0;
    let bestStreak = 0;
    let quranStreak = 0;

    // Calculate Prayer Streaks
    if (prayerData.history) {
      const dates = Object.keys(prayerData.history).sort();
      let tempStreak = 0;

      for (let i = dates.length - 1; i >= 0; i--) {
        const prayers = prayerData.history[dates[i]];
        
        if (prayers == 3) { // Consider streak if at 5 prayers are completed
          tempStreak++;
          bestStreak = Math.max(bestStreak, tempStreak);
          if (i === dates.length - 1) { // If it's the most recent day
            currentStreak = tempStreak;
          }
        } else {
          tempStreak = 0;
        }
      }

      // Check today's prayers
      if (prayerData.prayers) {
        const todayPrayers = prayerData.prayers.filter(p => p.completed).length;
        if (todayPrayers == 3) {
          currentStreak++;
          bestStreak = Math.max(bestStreak, currentStreak);
        }
      }
    }

    // Calculate Quran Streak
    if (quranData.history) {
      let tempStreak = 0;
      const dates = Object.keys(quranData.history).sort();
      
      for (let i = dates.length - 1; i >= 0; i--) {
        if (quranData.history[dates[i]] > 0) {
          tempStreak++;
        } else {
          break;
        }
      }

      // Check today's reading
      if (quranData.currentDate === formatDate(new Date()) && quranData.tilawatPages > 0) {
        tempStreak++;
      }

      quranStreak = tempStreak;
    }

    setStreakData({
      currentStreak,
      bestStreak,
      quranStreak
    });
  };

  return (
    <div className="bg-white/70 p-6 rounded-lg shadow-xl border-2 border-[#74512D]/20 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Current Streak */}
        <div className="p-6 bg-gradient-to-r from-[#74512D0D] to-[#74512D1A] rounded-lg border-2 border-[#74512D1A]">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-[#74512D33] rounded-full">
              <Star className="text-[#74512D] h-8 w-8" />
            </div>
            <div>
              <p className="text-[#9B7E5D] text-lg">Current Streak</p>
              <p className="text-4xl font-bold text-[#74512D]">{streakData.currentStreak} days</p>
            </div>
          </div>
        </div>

        {/* Best Streak */}
        <div className="p-6 bg-gradient-to-r from-[#74512D0D] to-[#74512D1A] rounded-lg border-2 border-[#74512D1A]">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-[#74512D33] rounded-full">
              <Trophy className="text-[#74512D] h-8 w-8" />
            </div>
            <div>
              <p className="text-[#9B7E5D] text-lg">Best Streak</p>
              <p className="text-4xl font-bold text-[#74512D]">{streakData.bestStreak} days</p>
            </div>
          </div>
        </div>

        {/* Quran Streak */}
        <div className="p-6 bg-gradient-to-r from-[#74512D0D] to-[#74512D1A] rounded-lg border-2 border-[#74512D1A]">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-[#74512D33] rounded-full">
              <Book className="text-[#74512D] h-8 w-8" />
            </div>
            <div>
              <p className="text-[#9B7E5D] text-lg">Quran Streak</p>
              <p className="text-4xl font-bold text-[#74512D]">{streakData.quranStreak} days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreakAndCharts;
