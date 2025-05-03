import {useState , useEffect} from "react";
import PageDecorator from "../../components/ui/PageDecorator";
import { PrayerTimes , Coordinates , CalculationMethod } from "adhan";
import { Heart } from "lucide-react";
import { format } from "date-fns";

function Tracker() {
  const [currentDate, setCurrentDate] = useState(null);
  const [currentTime, setCurrentTime] = useState(second)
  const [nextPrayer, setNextPrayer] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [currentIslamicDate, setCurrentIslamicDate] = useState(null);


  // for getting the islamic date and the georgian date
  useEffect(() => {
      const fetchIslamicDate = async () =>{
         const dateData = await fetch('https://api.aladhan.com/v1/gToH?city=Karachi&country=Pakistan');
         const dataFinal = await dateData.json();
         console.log(dataFinal);
         setCurrentIslamicDate(`${dataFinal.data.hijri.day}/${dataFinal.data.hijri.month.number}/${dataFinal.data.hijri.year} Hijri`) 
      }
      fetchIslamicDate();
      setCurrentDate(format(new Date , 'EEEE, MMMM d, yyyy'))
   }, [])

   // for setting and properly updating the time after each and every sec
   useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);





  return (
    <div className="bg-[#F8F4E1] flex justify-center min-h-screen pb-4">
      <div className="max-w-4xl w-full px-4 mt-4">
        <h1 className="font-serif text-2xl md:text-3xl text-[#74512D] flex items-center gap-2 justify-center text-center my-3.5 font-bold">
          Ibadah Tracker <Heart size={24} className="text-[#9B7E5D]" />
        </h1>
        <PageDecorator />
        <div className="flex flex-col gap-7">

         
        </div>
      </div>
    </div>
  );
}

export default Tracker;
