import React from "react";

function FeatureBox({ title, details, featureList , buttonText , Icon }) {
  return (
    <div className="bg-[#F8F4E1] rounded-2xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border-2 border-[#74512D]/10">
      <div className="h-16 w-16 rounded-full bg-[#74512D]/10 flex items-center justify-center mb-6">
        <Icon size={32} className="text-[#74512D]" />
      </div>
      <h3 className="text-2xl font-bold text-[#4E1F00] mb-4">{title}</h3>
      <p className="text-[#4E1F00]/80 mb-6 leading-relaxed">
        {details}
      </p>
      <ul className="space-y-3 mb-6">
        {featureList.map((feature) => (
          <li className="flex items-start">
            <span className="h-6 w-6 rounded-full bg-[#74512D]/20 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              <span className="h-2 w-2 rounded-full bg-[#74512D]"></span>
            </span>
            <span className="text-[#4E1F00]/90">
              {feature}
            </span>
          </li>
        ))}
      </ul>
      <button className="py-2 px-4 bg-[#74512D] text-white rounded-lg hover:bg-[#74512D]/90 transition-colors">
        {buttonText}
      </button>
    </div>
  );
}

export default FeatureBox;
