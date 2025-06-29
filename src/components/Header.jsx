import React from "react";
import "../App.css";
const Header = () => {
  return (
    <>
      
        <div className="flex flex-row bg-green-400 rounded-md">
          <img className="h-10 w-auto rounded-full" src="./logo.png" alt="" />

          <div className="font-medium p-2">Train Finder</div>
        </div>
    </>
  );
};

export default Header;
