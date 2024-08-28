import kfclogo from "../assets/kfclogo.svg";
import search from "../assets/search.svg";
import loginicon from "../assets/loginicon.svg";
import bag from "../assets/bag.svg";
import { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import {Link} from "react-router-dom"
export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="fixed w-full bg-white top-0 z-50"> 
      <div className="w-full h-[14vh] flex justify-center border-2">
        <div className="w-[80%] h-full">
          <div className="flex h-6">
            <div className="bg-red-600 mx-1 p-1"></div>
            <div className="bg-red-600 mx-1 p-1"></div>
            <div className="bg-red-600 mx-1 p-1"></div>
          </div>
          <div className="w-full h-20 flex justify-between items-center pr-4 py-6">
            <div className="flex items-center">
              <img src={kfclogo} alt="KFC Logo" className="h-7 cursor-pointer" />
            </div>
            <div className="flex justify-between w-[80%] items-center">
              <div className="flex space-x-4 font-bold items-center">
                <div className="cursor-pointer">Menu</div>
                <div className="cursor-pointer">Careers</div>
                <div className="cursor-pointer">About</div>
                <div className="cursor-pointer">Find A KFC</div>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    placeholder="search your food menu"
                    id="search-input"
                    className={`transition-all duration-300 pl-8 py-1 rounded-full border-2 focus:outline-none ${
                      isExpanded ? "w-full" : "w-0"
                    }`}
                    style={{ transition: "width 0.3s ease-in-out" }}
                  />
                  <img
                    src={search}
                    alt="Search Icon"
                    id="search-icon"
                    className={`absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 transition-all duration-300 ease-in-out opacity-100 w-5`}
                    onClick={() => setIsExpanded(!isExpanded)}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center w-[30%] text-gray-400">
                <div>
                  <Link to="/register"><img src={loginicon} alt="login icon" id="login icon" className="h-7 cursor-pointer" /></Link>
                </div>
                |
                <div>
                  <Link to="/cart"><img src={bag} alt="bag icon" id="bag icon" className="h-7 cursor-pointer" /></Link>
                </div>
                |
                <div>
                  <button className="bg-red-600 px-8 py-2 rounded-full font-bold text-white cursor-pointer">
                    Start Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[8vh] bg-[#202124] text-white flex justify-center items-center text-sm">
        <p className="flex items-center">
          <FaLocationDot />
          &nbsp;Start an Order for Pickup or Delivery
        </p>
      </div>
    </div>
  );
}
