import { BookOpen, Parentheses } from "lucide-react";
import React from "react";
import Button1 from "../../../components/ui/Buttons/Button1jsx";

function HeroSection() {
  return (
    <section className="bg-[#F8F4E1] py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <div className="flex items-center mb-4">
              <Parentheses className="text-[#4E1F00] mr-2" size={32} />
              <h1 className="text-4xl md:text-5xl font-bold text-[#4E1F00]">
                DeenDaily
              </h1>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-[#74512D] mb-4">
              Nurture your spiritual journey, one deed at a time
            </h2>
            <p className="text-lg text-[#4E1F00]/80 mb-8 leading-relaxed">
              DeenDaily helps you track your daily prayers and good deeds while
              providing personalized recommendations to strengthen your faith
              journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <Button1 text = 'Get Started' />
                <Button1 text = 'Learn More' />
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-6 -left-6 w-full h-full bg-[#74512D]/10 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-6 border-2 border-[#74512D]/20">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <BookOpen className="text-[#74512D] mr-2" size={24} />
                    <h3 className="text-xl font-bold text-[#4E1F00]">
                      Daily Tracker
                    </h3>
                  </div>
                  <span className="text-sm text-[#74512D] font-medium">
                    Friday, 12 Rajab
                  </span>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-[#74512D] flex items-center justify-center bg-[#74512D]/10 mr-3">
                      <div className="w-3 h-3 rounded-full bg-[#74512D]"></div>
                    </div>
                    <span className="text-[#4E1F00]">Fajr Prayer</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-[#74512D] flex items-center justify-center mr-3"></div>
                    <span className="text-[#4E1F00]">Dhuhr Prayer</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-6 h-6 rounded-full border-2 border-[#74512D] flex items-center justify-center mr-3"></div>
                    <span className="text-[#4E1F00]">Asr Prayer</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-[#74512D] text-white rounded-lg hover:bg-[#74512D]/90 transition-colors">
                  Update Today's Tracker
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
