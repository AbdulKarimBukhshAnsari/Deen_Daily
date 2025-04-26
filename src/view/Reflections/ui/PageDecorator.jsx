import React from "react";

// for the purpose of page decoration
function PageDecorator() {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top right decorative element */}
        <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-[#74512D]/5 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>

        {/* Bottom left decorative element */}
        <div className="absolute bottom-0 left-0 w-48 h-48 md:w-80 md:h-80 bg-[#4E1F00]/5 rounded-full transform -translate-x-1/3 translate-y-1/3"></div>

        {/* Middle decorative pattern */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-8 border-[#74512D]/3 rounded-full"></div>

        {/* Additional subtle elements */}
        <div className="hidden md:block absolute top-1/4 left-0 w-16 h-16  border-4 border-[#4E1F00]/3 rounded-full"></div>
        <div className="hidden md:block absolute bottom-1/4 right-0 w-24 h-24  border-4 border-[#74512D]/3 rounded-full"></div>
      </div>
    </>
  );
}

export default PageDecorator;
