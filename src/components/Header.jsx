const Header = () => {
    return (
      <header className="bg-[#4E1F00]  shadow-md py-4 px-6">
        <div className="max-w-[100%] mx-auto flex items-center">
        {/* tracking wide is for the spacing between the characters */}
          <h1 className="text-2xl font-bold text-[#4E1F00] tracking-wide"> 
            🌙 <span className="text-white">DeenDaily</span >
          </h1>
        </div>
      </header>
    );
  };
  
  export default Header;
  