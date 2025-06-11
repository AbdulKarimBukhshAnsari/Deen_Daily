import { useState} from "react";
import { Book, Save } from "lucide-react";
import { formatDate, getDaysBetweenDates } from "../../../utils/dateUtils";

function QuranTracker() {
  const [tilawatTracker, setTilawatTracker] = useState(() => {
    const todayDate = formatDate(new Date()); 
    const savedData = localStorage.getItem('QuranTrackerData');
    
    if(!savedData) {
      return {
        currentDate : todayDate ,
        history :  {},
        tilawatPages : 0 
      }
    }

    const parsedData = JSON.parse(savedData)

    if(savedData !== todayDate) {
      const daysBetween = getDaysBetweenDates(new Date(parsedData.currentDate), new Date(todayDate));
      const newHistory = { ...parsedData.history };
      
      // Save last recorded day
      newHistory[parsedData.currentDate] = parsedData.tilawatPages;
      
      // Fill gaps with zeros
      for (let i = 1; i < daysBetween; i++) {
        const date = formatDate(new Date(new Date(parsedData.currentDate).getTime() + (i * 24 * 60 * 60 * 1000)));
        newHistory[date] = 0;
      }

      return {
        currentDate : todayDate,
        history : newHistory ,
        tilawatPages : 0 
      }

    }


    return parsedData ;
    
  });
  
  // to save the data of the Quran Reading in the local storage 
  const saveTilawatPages = () => {
    localStorage.setItem('QuranTrackerData', JSON.stringify(tilawatTracker));
  };

  return (
    <div className="bg-white/70 p-6 rounded-lg shadow-xl border-2 border-[#74512D]/20 backdrop-blur-sm flex flex-col lg:flex-row items-center justify-between gap-6">
      <div className="w-full lg:w-auto">
        <h3 className="text-xl md:text-2xl font-serif text-[#74512D] mb-6 flex items-center gap-3">
          <Book className="h-6 w-6" />
          Track Quran Reading
        </h3>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="number"
            min="1"
            value={tilawatTracker.tilawatPages}
            onChange={(e) =>
                setTilawatTracker(()=> ({...tilawatTracker , tilawatPages : e.target.value }))
            }
            className="w-24 md:w-32 p-2 md:p-3 border-2 border-[#74512D]/20 rounded-lg bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#74512D] focus:border-[#74512D] transition-all text-base md:text-lg"
            placeholder="Pages"
          />
          <button
            onClick={saveTilawatPages}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-[#74512D] text-white rounded-lg hover:bg-[#5A3E22] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm md:text-base"
            disabled={tilawatTracker.tilawatPages < 1 || !tilawatTracker.tilawatPages}
          >
            <Save className="h-4 md:h-5 w-4 md:w-5" />
            Save Today's Progress
          </button>
        </div>
        <p className="text-[#74512D] text-base md:text-lg">
          Enter the number of pages you've read today
        </p>
      </div>
      
      <div className="text-center lg:text-right">
        <p className="leading-relaxed font-serif text-3xl md:text-4xl lg:text-5xl text-[#74512D] mb-2">
          إِنَّ هَـٰذَا ٱلْقُرْءَانَ يَهْدِى لِلَّتِى هِىَ أَقْوَمُ
        </p>
        <p className="text-[#74512D]/80 text-sm md:text-base italic">
          "Indeed, this Quran guides to that which is most suitable."
          <span className="text-xs md:text-sm block mt-1">[Surah Al-Isra: 9]</span>
        </p>
      </div>
    </div>
  );
}

export default QuranTracker;
