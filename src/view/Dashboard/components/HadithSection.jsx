import  { useState, useEffect } from 'react';
import { BookOpen, ArrowRight, ArrowLeft } from 'lucide-react';

const hadiths = [
  {
    text: "The best among you are those who learn the Quran and teach it to others.",
    narrator: "Sahih al-Bukhari",
    reference: "5027"
  },
  {
    text: "The deeds are considered by the intentions, and a person will get the reward according to his intention.",
    narrator: "Sahih al-Bukhari & Muslim",
    reference: "1"
  },
  {
    text: "Whoever treads a path in search of knowledge, Allah will make easy for him the path to Paradise.",
    narrator: "Sahih Muslim",
    reference: "2699"
  },
  {
    text: "The most beloved deed to Allah is the most regular and constant even if it were little.",
    narrator: "Sahih al-Bukhari",
    reference: "6464"
  }
];

function HadithSection(){
  const [currentHadith, setCurrentHadith] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHadith(prev => (prev + 1) % hadiths.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setCurrentHadith(prev => (prev - 1 + hadiths.length) % hadiths.length);
  };

  const handleNext = () => {
    setCurrentHadith(prev => (prev + 1) % hadiths.length);
  };

  return (
    <section className="py-16 bg-[#4E1F00]/10  ">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto bg-[#F8F4E1] rounded-2xl shadow-lg p-8 md:p-10 relative overflow-hidden">
          
          {/* Background decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#74512D]/10 rounded-full translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#74512D]/10 rounded-full -translate-x-20 translate-y-20"></div>
          
          <div className="relative">
            <div className="flex items-center mb-6">
              <BookOpen className="text-[#4E1F00] mr-3" size={28} />
              <h2 className="text-3xl font-bold text-[#4E1F00]">Daily Wisdom</h2>
            </div>

            <div className="min-h-[200px] flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-xl md:text-2xl font-medium italic text-[#4E1F00] mb-6 leading-relaxed">
                  "{hadiths[currentHadith].text}"
                </p>
                <div className="flex items-center justify-end">
                  <div>
                    <p className="text-[#74512D] font-semibold text-right">
                      {hadiths[currentHadith].narrator}
                    </p>
                    <p className="text-[#74512D]/70 text-sm text-right">
                      Reference: {hadiths[currentHadith].reference}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handlePrevious}
                className="p-2 rounded-full bg-[#74512D]/10 hover:bg-[#74512D]/20 transition-colors"
                aria-label="Previous hadith"
              >
                <ArrowLeft size={20} className="text-[#4E1F00]" />
              </button>

              <div className="flex space-x-2">
                {hadiths.map((_, index) => (
                  <span
                    key={index}
                    className={`block h-2 w-2 rounded-full ${
                      index === currentHadith
                        ? 'bg-[#74512D]'
                        : 'bg-[#74512D]/30'
                    }`}
                  ></span>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-[#74512D]/10 hover:bg-[#74512D]/20 transition-colors"
                aria-label="Next hadith"
              >
                <ArrowRight size={20} className="text-[#4E1F00]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HadithSection;
