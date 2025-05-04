import React, { useState, useEffect } from "react";
import { PrayerTimes, Coordinates, CalculationMethod } from "adhan";
import { format, formatDistanceToNow } from "date-fns";
import { Calendar , Moon , Clock} from "lucide-react";


function HeaderNextPrayer({prayerTimes , setPrayerTimes , animation }) {
  const [currentDate, setCurrentDate] = useState();
  const [currentTime, setCurrentTime] = useState(null);
  const [currentPrayer, setcurrentPrayer] = useState(null); // default value
  const [timeRemaining, setTimeRemaining] = useState("1 hour"); // default value
  const [currentIslamicDate, setCurrentIslamicDate] = useState(null);

  useEffect(() => {
    // for getting the prayer times
    const getPrayerData = (latitude, longitude) => {
      const coordinates = new Coordinates(latitude, longitude);
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      const todayTimes = new PrayerTimes(
        coordinates,
        today,
        CalculationMethod.MuslimWorldLeague()
      );
      const tomorrowTimes = new PrayerTimes(
        coordinates,
        tomorrow,
        CalculationMethod.MuslimWorldLeague()
      );

      const fullPrayerTimes = {
        Fajr: { start: todayTimes.fajr, end: todayTimes.sunrise },
        Dhuhr: { start: todayTimes.dhuhr, end: todayTimes.asr },
        Asr: { start: todayTimes.asr, end: todayTimes.maghrib },
        Maghrib: { start: todayTimes.maghrib, end: todayTimes.isha },
        Isha: { start: todayTimes.isha, end: tomorrowTimes.fajr }, // spans into next day
      };

      setPrayerTimes(fullPrayerTimes);
    };
    // find the location to find the coordiantes so that we can find the prayers time according to the location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getPrayerData(latitude, longitude);
        },
        (error) => {
          console.warn("Location error:", error.message);
          getPrayerData(24.8607, 67.0011); // Fallback to Karachi
        },
        {
          timeout: 5000, // 5 seconds
          maximumAge: 0,
          enableHighAccuracy: false,
        }
      );
    } else {
      console.warn("Geolocation not supported, using Karachi fallback.");
      // Fallback if geolocation is not supported
      getPrayerData(24.8607, 67.0011);
    }

    // for getting the islamic date and the georgian date
    const fetchIslamicDate = async () => {
      const dateData = await fetch(
        "https://api.aladhan.com/v1/gToH?city=Karachi&country=Pakistan"
      );
      const dataFinal = await dateData.json();
      console.log(dataFinal);
      setCurrentIslamicDate(
        `${dataFinal.data.hijri.day}/${dataFinal.data.hijri.month.number}/${dataFinal.data.hijri.year} Hijri`
      );
    };
    fetchIslamicDate();
    setCurrentDate(format(new Date(), "EEEE, MMMM d, yyyy"));
  }, [setPrayerTimes]);

  // for getting the data that which prayers time right now
  useEffect(() => {
    if (prayerTimes && currentTime) {
      const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
      const now = currentTime;
      console.log(prayerTimes);
      const recent = prayers.find((prayer) => {
        return (
          prayerTimes[prayer].start <= now && prayerTimes[prayer].end > now
        );
      });
      setcurrentPrayer(recent);
    }
  }, [prayerTimes, currentTime]);

  // for setting and properly updating the time after each and every sec
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let timer = null;
  
    if (currentPrayer && prayerTimes) {
      timer = setInterval(() => {
        const time = formatDistanceToNow(prayerTimes[currentPrayer].end, {
          addSuffix: true,
        });
        setTimeRemaining(time);
      }, 1000);
    }
  
    return () => clearInterval(timer);
  }, [currentPrayer, prayerTimes]);
  

  return (
    <section className="bg-white p-6 rounded-lg shadow-xl border-2 border-[#74512D]/20 backdrop-blur-sm">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex items-center gap-3">
        <Calendar className={`text-[#74512D] h-6 w-6 ${animation['float']} `} />
        <div>
          <h2 className="text-xl font-serif text-[#74512D]">
            {format(currentTime, 'EEEE, MMMM d, yyyy')}
          </h2>
          <div className="flex items-center gap-2 text-[#9B7E5D] font-serif mt-2">
            <Moon className={`h-5 w-5 ${animation['glow']}`} />
            {currentIslamicDate}
          </div>
        </div>
      </div>

      {currentPrayer && (
        <div className="flex items-center gap-4">
          <Clock className="h-6 w-6 text-[#74512D] animate-float" />
          <div>
            <h3 className="text-xl font-serif text-[#74512D]">Current Prayer: {currentPrayer}</h3>
            <div className="text-lg text-[#9B7E5D]">Time Remaining {timeRemaining}</div>
            <div className="text-[#4E1F00] mt-1 font-medium">
              {format(prayerTimes[currentPrayer].end , 'h:mm a')}
            </div>
          </div>
        </div>
      )}
    </div>
  </section>
  );
}

export default HeaderNextPrayer;
