import React from 'react';
import { FaSearch } from "react-icons/fa";
import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { Navbar } from '../components/Navbar';


const FindAKfc = () => {
  return (
    <>
    <Navbar/>
    <div className='flex h-screen mt-40 justify-center'>
       <div className="w-[80%] flex">
      <div className="w-[50%] p-10">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 bg-red-600"></div>
          <div className="w-8 h-8 bg-red-600"></div>
          <div className="w-8 h-8 bg-red-600"></div>
        </div>
        <h1 className="text-2xl font-bold mt-6">Find a KFC Location</h1>
        <p className="text-sm font-semibold mt-4">SEARCH BY CITY AND STATE OR ZIP CODE</p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Louisville, KY"
            className="w-full border-b-2 border-red-600 focus:outline-none py-2 text-lg"
          />
          <div className="flex items-center mt-2 space-x-4">
            <FaSearch className="w-6 h-6 text-red-600 cursor-pointer" />
            <TbAdjustmentsHorizontal className="w-6 h-6 text-gray-400 cursor-pointer" />
          </div>
        </div>
        <button className="mt-8 text-red-600 font-bold">USE MY LOCATION</button>
        <p className="mt-8 text-sm">
          Use our locator to find a location near you or <a href="#" className="text-red-600 underline">browse our directory.</a>
        </p>
      </div>

      {/* Right side: Map */}
      <div className="w-2/3 bg-gray-100 relative">
        {/* Placeholder for the map */}
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-400">Map Placeholder</p>
        </div>
      </div>
    </div>
    </div>

    </>
  );
};

export default FindAKfc
