import React, { useState, useEffect } from "react";
import { Check, CheckCircle2, Circle } from "lucide-react";

function DeedsList() {
  const [completed, setCompleted] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);

  // this use effect has been created of taking care of one thing that if the user has unselected the deed then the the deed status should be updated
  useEffect(() => {
    if (completed.length != 0) {
      if (completed.every((deed) => deed.done)) {
        setShowConfetti(true);
      } else {
        setShowConfetti(false);
      }
      localStorage.setItem("deeds", JSON.stringify(completed));
    }
  }, [completed]);



  useEffect(() => {
    // getting the deeds from the local stoarge at the start
    const storedDeeds = JSON.parse(localStorage.getItem("deeds"));
    if (storedDeeds) {
     
      setCompleted(storedDeeds);
    }
    // getting the deeds when the deeds will be updated
    const checkForUpdates = () => {
      const newDeeds = JSON.parse(localStorage.getItem("deeds"));
      if (newDeeds) {
    
        // Reset completion status when deeds change
        setCompleted(newDeeds);
      }
      else {
        setCompleted([]);
      }
    };

    window.addEventListener("storage", checkForUpdates);
    window.addEventListener("localStorageUpdated", checkForUpdates);

    return () => {
      window.removeEventListener("storage", checkForUpdates);
      window.removeEventListener("localStorageUpdated", checkForUpdates);
    };
  }, []);

  const toggleComplete = (index) => {
    setCompleted((prev) => {
      const newCompleted = [...prev];
      newCompleted[index].done = !newCompleted[index].done;

     

      // Check if all deeds are completed
      if (newCompleted.every((deed) => deed.done)) {
        setShowConfetti(true);
      }

      return newCompleted;
    });
  };

  if (!completed || completed.length === 0) return null;

  return (
    <section className="bg-white/70 p-6 rounded-lg shadow-md animate-slide-up">
      <h2 className="text-xl md:text-2xl font-serif text-[#74512D] mb-4 text-center">
        Here are some deeds that can uplift you
      </h2>

      <ul className="space-y-3">
        {completed.map((deed, index) => (
          <li
            key={index}
            className={`flex items-center p-3 border border-[#9B7E5D] rounded-md transition-all  ${
              completed[index].done
                ? "bg-[#74512D]/10 border-[#9B7E5D]"
                : "bg-[#F8F4E1] hover:bg-[#74512D]/5"
            }`}
          >
            <button
              onClick={() => toggleComplete(index)}
              className="flex items-center w-full text-left cursor-pointer"
            >
              <span className="mr-3 text-[#74512D] flex-shrink-0">
                {completed[index].done ? (
                  <CheckCircle2 className="h-5 w-5 text-[#4F7942]" />
                ) : (
                  <Circle className="h-5 w-5 " />
                )}
              </span>
              <span
                className={`flex-1 ${
                  completed[index].done
                    ? "line-through text-[#9B7E5D]"
                    : "text-[#4E1F00]"
                }`}
              >
                {deed.deed}
              </span>
              {completed[index].done && (
                <span className="ml-2 bg-[#4F7942] text-white text-xs font-bold py-1 px-2 rounded-full flex items-center">
                  <Check size={12} className="mr-1" /> Done
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>

      {showConfetti && (
        <div className="mt-4 p-3 bg-green-100 border border-green-300 rounded-md text-green-700 text-center">
          MashaAllah! You've completed all deeds!
        </div>
      )}
    </section>
  );
}

export default DeedsList;
