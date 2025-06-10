import React, { useState, useEffect } from "react";
import { PrayerTimes, Coordinates, CalculationMethod } from "adhan";
import { format, formatDistanceToNow } from "date-fns";
import { Calendar, Moon, Clock } from "lucide-react";

const FALLBACK_LAT = 24.8607;
const FALLBACK_LNG = 67.0011;

function HeaderNextPrayer({ prayerTimes, setPrayerTimes}) {
  console.log('Hello')
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState("");
  const [currentIslamicDate, setCurrentIslamicDate] = useState("");

  // Get user's location and fetch prayer times
  useEffect(() => {
    const getPrayerData = (latitude, longitude) => {
      const coordinates = new Coordinates(latitude, longitude);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const method = CalculationMethod.MuslimWorldLeague();

      const todayTimes = new PrayerTimes(coordinates, today, method);

      const tomorrowTimes = new PrayerTimes(coordinates, tomorrow, method);
   
      console.log("Today Times" , todayTimes);

      const fullPrayerTimes = [
        { name: 'Fajr', start: todayTimes.fajr, end: todayTimes.sunrise },
        { name: 'Sunrise', start: todayTimes.sunrise, end: todayTimes.dhuhr },
        { name: 'Dhuhr', start: todayTimes.dhuhr, end: todayTimes.asr },
        { name: 'Asr', start: todayTimes.asr, end: todayTimes.maghrib },
        { name: 'Maghrib', start: todayTimes.maghrib, end: todayTimes.isha },
        { name: 'Isha', start: todayTimes.isha, end: tomorrowTimes.fajr },
      ];
      console.log('Full prayer times:', fullPrayerTimes);
      setPrayerTimes(fullPrayerTimes);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => getPrayerData(pos.coords.latitude, pos.coords.longitude),
        (err) => {
          console.warn("Geolocation error:", err.message);
          getPrayerData(FALLBACK_LAT, FALLBACK_LNG);
        },
        {
          timeout: 5000,
          maximumAge: 0,
          enableHighAccuracy: false,
        }
      );
    } else {
      console.warn("Geolocation not supported.");
      getPrayerData(FALLBACK_LAT, FALLBACK_LNG);
    }

    // Fetch Islamic date
    const fetchIslamicDate = async () => {
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/gToH?city=Karachi&country=Pakistan"
        );
        const data = await res.json();
        const hijri = data?.data?.hijri;
        setCurrentIslamicDate(
          `${hijri.day}/${hijri.month.number}/${hijri.year} Hijri`
        );
      } catch (error) {
        console.error("Failed to fetch Islamic date:", error);
        setCurrentIslamicDate("Islamic Date Not Found");
      }
    };

    fetchIslamicDate();
    setCurrentDate(format(new Date(), "EEEE, MMMM d, yyyy"));
  }, [setPrayerTimes]);


  
  // Update current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Determine current prayer
  useEffect(() => {
    if (prayerTimes && prayerTimes.length > 0 && currentTime) {
      const now = currentTime;

      const activePrayer = prayerTimes.find(prayer => {
        const { start, end } = prayer;
        if (!start || !end) return false;

        // Handle cases where the end time is on the next day
        let adjustedEnd = end;
        if (end < start) {
          adjustedEnd = new Date(end.getTime() + 24 * 60 * 60 * 1000);
        }

        return start <= now && now < adjustedEnd;
      });

      console.log('Active Prayer:', activePrayer?.name);
      setCurrentPrayer(activePrayer?.name || "None");
    }
  }, [prayerTimes, currentTime]);

  // Update time remaining
  useEffect(() => {
    let timer = null;

    if (currentPrayer && prayerTimes) {
      timer = setInterval(() => {
        const currentPrayerData = prayerTimes.find(prayer => prayer.name === currentPrayer);
        if (currentPrayerData?.end) {
          setTimeRemaining(formatDistanceToNow(currentPrayerData.end, { addSuffix: true }));
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [currentPrayer, prayerTimes]);

  return (
    <section className="bg-white/70 p-6 rounded-lg shadow-xl border-2 border-[#74512D]/20 backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center gap-3">
          <Calendar
            className={`text-[#74512D] h-6 w-6 float 6s ease-in-out infinite`}
          />
          <div>
            <h2 className="text-xl font-serif text-[#74512D]">
              {currentTime && format(currentTime, "EEEE, MMMM d, yyyy")}
            </h2>
            <div className="flex items-center gap-2 text-[#9B7E5D] font-serif mt-2">
              <Moon className={`h-5 w-5`} />
              {currentIslamicDate}
            </div>
          </div>
        </div>

        {prayerTimes && prayerTimes.length > 0 && (
          <div className="flex items-center gap-4">
            <Clock className="h-6 w-6 text-[#74512D] " />
            <div>
              <h3 className="text-xl font-serif text-[#74512D]">
                Current Prayer: {currentPrayer}
              </h3>
              <div className="text-lg text-[#9B7E5D]">
                Time Remaining : {timeRemaining}
              </div>
              <div className="text-[#4E1F00] mt-1 font-medium">
                {currentPrayer && format(prayerTimes.find(p => p.name === currentPrayer)?.end, "h:mm a")}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default HeaderNextPrayer;
