import { Star, Trophy, Book, Table2, Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { formatDate } from "../../../utils/dateUtils";
import { format } from "date-fns";
import ChartComponent from "../Charts/ChartComponent";


function StreakAndCharts() {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    bestStreak: 0,
    quranStreak: 0,
  });

  const [trackerData, setTrackerData] = useState({
    prayerData: {},
    quranData: {},
  });

  const [showTable, setShowTable] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [records, setRecords] = useState([]);

  const loadTrackerData = () => {
    const prayerData = JSON.parse(localStorage.getItem("prayerTrackerData") || "{}");
    const quranData = JSON.parse(localStorage.getItem("QuranTrackerData") || "{}");
    setTrackerData({ prayerData, quranData });
  };

  useEffect(() => {
    loadTrackerData(); // 1st: load from localStorage and set state
  }, []);

  useEffect(() => {
    // 2nd: once trackerData is updated, then calculate streaks
    if (
      trackerData.prayerData &&
      trackerData.quranData &&
      (Object.keys(trackerData.prayerData).length > 0 || Object.keys(trackerData.quranData).length > 0)
    ) {
      console.log('Tracker Data' , trackerData);
      calculateStreaks(trackerData);
    }
  }, [trackerData]);

  const calculateStreaks = (data) => {
    const { prayerData, quranData } = data;

    // Initialize with zeros
    let currentStreak = 0;
    let bestStreak = 0;
    let quranStreak = 0;

    // Only calculate if history exists and has entries
    if (prayerData.history && Object.keys(prayerData.history).length > 0) {
        const dates = Object.keys(prayerData.history).sort();
        let tempStreak = 0;

        for (let i = dates.length - 1; i >= 0; i--) {
            const prayers = prayerData.history[dates[i]];

            if (prayers == 5) {
                tempStreak++;
                bestStreak = Math.max(bestStreak, tempStreak);
                if (i === dates.length - 1) {
                    currentStreak = tempStreak;
                }
            } else {
                tempStreak = 0;
            }
        }

        // Check today's prayers only if there's history
        if (prayerData.prayers) {
            const todayPrayers = prayerData.prayers.filter((p) => p.completed).length;
            if (todayPrayers == 5) {
                currentStreak++;
                bestStreak = Math.max(bestStreak, currentStreak);
            }
        }
    }

    // Calculate Quran Streak only if history exists
    if (quranData.history && Object.keys(quranData.history).length > 0) {
        let tempStreak = 0;
        const dates = Object.keys(quranData.history).sort();

        for (let i = dates.length - 1; i >= 0; i--) {
            if (quranData.history[dates[i]] > 0) {
                tempStreak++;
            } else {
                break;
            }
        }

        if (
            quranData.currentDate === formatDate(new Date()) &&
            quranData.tilawatPages > 0
        ) {
            tempStreak++;
        }

        quranStreak = tempStreak;
    }

    setStreakData({
        currentStreak,
        bestStreak,
        quranStreak,
    });
  };

  const prepareMonthlyRecords = (prayerHistory, quranHistory, month) => {
    const currentYear = new Date().getFullYear();
    const records = [];
    
    // Get all unique dates from both histories
    const allDates = new Set([
      ...Object.keys(prayerHistory || {}),
      ...Object.keys(quranHistory || {})
    ]);

    // Convert to array and sort
    const sortedDates = Array.from(allDates).sort((a, b) => new Date(b) - new Date(a));

    // Filter for selected month
    const filteredDates = sortedDates.filter(date => {
      const dateObj = new Date(date);
      return dateObj.getMonth() === month && dateObj.getFullYear() === currentYear;
    });

    // Create records
    filteredDates.forEach(date => {
      records.push({
        date: date,
        prayersCompleted: prayerHistory?.[date] || 0,
        quranPages: quranHistory?.[date] || 0
      });
    });

    return records;
  };

  useEffect(() => {
    if (trackerData.prayerData.history || trackerData.quranData.history) {
      const monthlyRecords = prepareMonthlyRecords(
        trackerData.prayerData.history,
        trackerData.quranData.history,
        selectedMonth
      );
      setRecords(monthlyRecords);
    }
  }, [selectedMonth, trackerData]);

  return (
    <div className="w-full bg-white/70 p-4 sm:p-6 rounded-lg shadow-xl backdrop-blur-sm space-y-6">
      {/* Streaks Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Current Streak */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#74512D0D] to-[#74512D1A] rounded-lg border-2 border-[#74512D1A]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-[#74512D33] rounded-full">
              <Star className="text-[#74512D] h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div>
              <p className="text-[#9B7E5D] text-base sm:text-lg">Current Streak</p>
              <p className="text-2xl sm:text-4xl font-bold text-[#74512D]">
                {streakData.currentStreak} days
              </p>
            </div>
          </div>
        </div>

        {/* Best Streak */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#74512D0D] to-[#74512D1A] rounded-lg border-2 border-[#74512D1A]">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-[#74512D33] rounded-full">
              <Trophy className="text-[#74512D] h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div>
              <p className="text-[#9B7E5D] text-base sm:text-lg">Best Streak</p>
              <p className="text-2xl sm:text-4xl font-bold text-[#74512D]">
                {streakData.bestStreak} days
              </p>
            </div>
          </div>
        </div>

        {/* Quran Streak */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#74512D0D] to-[#74512D1A] rounded-lg border-2 border-[#74512D1A] sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-3 sm:p-4 bg-[#74512D33] rounded-full">
              <Book className="text-[#74512D] h-6 w-6 sm:h-8 sm:w-8" />
            </div>
            <div>
              <p className="text-[#9B7E5D] text-base sm:text-lg">Quran Streak</p>
              <p className="text-2xl sm:text-4xl font-bold text-[#74512D]">
                {streakData.quranStreak} days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {trackerData.prayerData.history && Object.keys(trackerData.prayerData.history).length > 6 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="w-full h-[350px] sm:h-[400px] p-4 bg-gradient-to-r from-[#74512D0D] to-[#74512D1A] rounded-lg border-2 border-[#74512D1A]">
                  <ChartComponent 
                      data={trackerData.prayerData} 
                      chartTitle="🕌 Namaz Tracker - Last 7 Days"
                      axisValue="Prayers Completed"
                      mainColor="#4F7942"
                      type="Namaz"
                  />
              </div>
              <div className="w-full h-[350px] sm:h-[400px] p-4 bg-gradient-to-r from-[#74512D0D] to-[#74512D1A] rounded-lg border-2 border-[#74512D1A]">
                  <ChartComponent 
                      data={trackerData.quranData} 
                      chartTitle="📖 Quran Reading - Last 7 Days"
                      axisValue="Pages Read"
                      mainColor="#74512D"
                      type="Quran"
                  />
              </div>
          </div>
      ) : (
          <div className="p-6 bg-[#74512D0D] rounded-lg text-center">
              <p className="text-[#74512D] text-lg">Start tracking your prayers and Quran reading to see your progress charts!</p>
          </div>
      )}

      {/* Records View */}
      <div className="mt-6">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setShowTable(!showTable)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300 bg-[#74512D] text-white hover:bg-[#5A3E22] cursor-pointer"
          >
            <Table2 className="h-5 w-5" />
            {showTable ? 'Hide Records' : 'View Records'}
          </button>

          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-[#74512D]" />
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
              className="p-2 rounded-lg border-2 border-[#74512D33] bg-white/50 text-[#74512D]"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i} value={i}>
                  {new Date(2024, i).toLocaleString('default', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Records Table */}
        {showTable && (
          <div className="mt-6 overflow-x-auto">
            {(!trackerData.prayerData.history || !trackerData.quranData.history || 
              (Object.keys(trackerData.prayerData.history).length === 0 && 
               Object.keys(trackerData.quranData.history).length === 0)) ? (
                <div className="text-center p-6 bg-[#74512D0D] rounded-lg">
                    <p className="text-[#74512D] text-lg">
                        Start your journey by tracking your daily prayers and Quran reading!
                    </p>
                </div>
            ) : records.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-[#74512D1A]">
                    <th className="p-3 text-left font-serif text-[#74512D]">Date</th>
                    <th className="p-3 text-left font-serif text-[#74512D]">Prayers Completed</th>
                    <th className="p-3 text-left font-serif text-[#74512D]">Quran Pages</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, index) => (
                    <tr key={index} className="border-b border-[#74512D1A] hover:bg-[#74512D0D]">
                      <td className="p-3 text-[#4E1F00]">
                        {format(new Date(record.date), 'dd MMM yyyy')}
                      </td>
                      <td className="p-3 text-[#4E1F00]">{record.prayersCompleted}/5</td>
                      <td className="p-3 text-[#4E1F00]">{record.quranPages}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center p-6 bg-[#74512D0D] rounded-lg">
                <p className="text-[#74512D] text-lg">
                  No records available for {new Date(2024, selectedMonth).toLocaleString('default', { month: 'long' })}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default StreakAndCharts;
