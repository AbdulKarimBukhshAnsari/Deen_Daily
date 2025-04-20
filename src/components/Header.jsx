const Header = () => {
    return (
      <header className="bg-[#F8F4E1] shadow-md py-4 px-6">
        <div className="max-w-[100%] mx-auto flex items-center">
        {/* tracking wide is for the spacing between the characters */}
          <h1 className="text-2xl font-bold text-[#4E1F00] tracking-wide"> 
            🌙 <span className="text-[#74512D]">Deen</span>Daily
          </h1>
        </div>
      </header>
    );
  };
  
  export default Header;
  