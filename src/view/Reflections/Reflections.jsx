import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import FeelingInput from './components/FeelingInput'
import PageDecorator from "../../components/ui/PageDecorator";
import MoodProvider from "../../config/context/MoodProvider";
import DeedsList from "./components/DeedsList"
import Verses from "./components/Verses";

function Reflections() {
  const [quran, setQuran] = useState("");
  const [hadees, setHadees] = useState();

  // making track of the hadees and Quran Ayah chnages
  useEffect(() => {
    // getting the deeds from the local stoarge at the start
    const storedQuran = JSON.parse(localStorage.getItem("quran"));
    const storedHadees = JSON.parse(localStorage.getItem("hadees"));
    if (storedQuran) {
      setQuran(storedQuran);
    }

    if (storedHadees) {
      setHadees(storedHadees);
    }

    // getting the deeds when the deeds will be updated
    const checkForUpdates = () => {
      const newStoredQuran = JSON.parse(localStorage.getItem("quran"));
      const newStoredHadees = JSON.parse(localStorage.getItem("hadees"));
      if (newStoredHadees) {
        // Reset completion status when deeds change
        setHadees(newStoredHadees);
      } else {
        setHadees("");
      }
      if (newStoredQuran) {
        // Reset completion status when deeds change
        setQuran(newStoredQuran);
      } else {
        setQuran("");
      }
    };

    window.addEventListener("storage", checkForUpdates);
    window.addEventListener("localStorageUpdated", checkForUpdates);

    return () => {
      window.removeEventListener("storage", checkForUpdates);
      window.removeEventListener("localStorageUpdated", checkForUpdates);
    };
  }, []);

  return (
    <MoodProvider>
      <div className="bg-[#F8F4E1] flex justify-center min-h-screen pb-4">
        <div className="max-w-4xl w-full px-4 mt-4">
          <h1 className="font-serif text-2xl md:text-3xl text-[#74512D] flex items-center gap-2 justify-center text-center my-3.5 font-bold">
            Mindful Moments <Heart size={24} className="text-[#9B7E5D]" />
          </h1>
          <PageDecorator />
          <div className="flex flex-col gap-7">
            <FeelingInput />
            <DeedsList />
            {quran.Quran && hadees.hadees && (
              <>
                <Verses key={"Quran"} verse={quran.Quran} type={"Quran"} />
                <Verses key={"Hadees"} verse={hadees.hadees} type={"Hadees"} />
              </>
            )}
          </div>
        </div>
      </div>
    </MoodProvider>
  );
}



export default Reflections;
