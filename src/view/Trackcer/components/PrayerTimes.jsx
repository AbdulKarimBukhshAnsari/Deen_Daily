import { Clock, Key } from "lucide-react"
import { format } from "date-fns"



function PrayerTimes({prayerTimes}) {
  const prayerNames = ['Fajr' , 'Dhuhr' , 'Asr' , 'Maghrib' , 'Isha']
  console.log('Prayer Times' ,  prayerTimes);
  return (
    <div className="prayerTimes bg-white/70 p-6 rounded-lg shadow-xl border-2 border-[#74512D]/20 backdrop-blur-sm w-[50%] flex flex-col gap-3.5">
     <div className="flex gap-3 ">
       <Clock className="h-6 w-6 text-[#74512D] " />
       <div className=" text-[#74512D] font-serif text-xl  ">Prayer Times</div>
     </div>
     {prayerTimes && prayerNames.map((prayer) => (
        <div
        key={prayer}
        className="bg-[#74512D]/7 py-4 px-3.5 hover:bg-[#74512D]/10 transition-all duration-300 ease-in-out rounded-lg font-serif text-[#74512D] cursor-pointer">
            <span>
                {prayer}
            </span>
            <span className="bg-white/70 px-2 py-2">
            {prayerTimes[prayer].start}

            </span>
        </div>
     ))
        
     }
    </div>
  )
}

export default PrayerTimes