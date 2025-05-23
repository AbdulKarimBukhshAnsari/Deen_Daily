import { Clock } from "lucide-react"



function PrayerTimes({prayerTimes}) {
  return (
    <div className="prayerTimes bg-white/70 p-6 rounded-lg shadow-xl border-2 border-[#74512D]/20 backdrop-blur-sm">
     <div>
       <Clock className="h-6 w-6 text-[#74512D] " />
       
     </div>
    </div>
  )
}

export default PrayerTimes