import React from 'react'

function Verses({verse , type}) {  
  if(!verse || verse.length === 0) return null ;
  return (
    <section 
      className={`bg-white/70 p-6 rounded-lg shadow-md transition-opacity duration-500` }
    >
      <h2 className="text-xl md:text-2xl font-serif text-[#74512D] mb-4 text-center">
        {type} Inspiration
      </h2>
      
      <div className="flex flex-col items-center">
        <div className="mb-4 text-center">
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#3A1700] mb-2 rtl">
            {verse.arabic}
          </p>
          <p className="text-[#5A3E22] italic">
            "{verse.english}"
          </p>
          <p className="text-[#9B7E5D] text-sm mt-2">
            {verse.reference}
          </p>
        </div>
      </div>
    </section>
  )
}

export default Verses