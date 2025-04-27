import React from 'react'

function Verses({verse, type}) {  
  // Early return if verse is null, undefined, or empty
  if(!verse || verse.length === 0) return null;

  // Safely access verse properties with default values
  const arabicText = verse?.arabic || 'Arabic text not available';
  const englishText = verse?.english || 'English translation not available';
  const referenceText = verse?.reference || 'Reference not available';

  return (
    <section 
      className={`bg-white/70 p-6 rounded-lg shadow-md transition-opacity duration-500`}
    >
      <h2 className="text-xl md:text-2xl font-serif text-[#74512D] mb-4 text-center">
        {type} Inspiration
      </h2>
      
      <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#3A1700] mb-2 rtl">
            {arabicText}
          </p>
          <p className="text-[#5A3E22] italic">
            "{englishText}"
          </p>
          <p className="text-[#9B7E5D] text-sm mt-2">
            {referenceText}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Verses