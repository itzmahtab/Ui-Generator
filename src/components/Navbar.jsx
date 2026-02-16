import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { HiSun } from "react-icons/hi";
import { RiSettings3Fill } from "react-icons/ri";


function Navbar() {
  return (
    <div>
      <div className="nav flex items-center px-20 justify-between gap-5 h-22.5 border-b-2 border-gray-300">
        <div className="logo">
          <h3 className="text-[25px] sp-text animate-jump">GenUI</h3>
        </div>
        <div className="icons flex items-center gap-3">
          <div className="icon">
            <HiSun />
          </div>
          <div className="icon">
            <FaUser />
          </div>
          <div className="icon">
            <RiSettings3Fill />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
