import kfclogo from "../assets/kfclogo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';

export function RegisterLogin() {
  let navigate = useNavigate();


  
  return (
    <>
      <div>
        <div className="flex justify-between items-center h-20 px-4 sm:px-10 lg:px-40">
          <div></div>
          <div>
            <img src={kfclogo} alt="" className="w-36 sm:w-44 lg:w-56" />
          </div>
          <div>
            <button
              className="rounded-full border-2 border-black px-6 sm:px-8 lg:px-12 py-2 font-semibold"
              onClick={() => navigate("/")}
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
          <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-md mt-[-10vh]">
            <div className="flex justify-start mb-4">
              <div className="h-10 w-3 bg-red-600 mr-2"></div>
              <div className="h-10 w-3 bg-red-600 mr-2"></div>
              <div className="h-10 w-3 bg-red-600"></div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">LOGIN TO KFC</h1>
            <p className="text-gray-500 mb-6">
              Please enter your details to login in KFC.
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
              
                placeholder="Password"
                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <button
              className="w-full bg-gray-300 text-gray-700 font-bold py-2 rounded-full cursor-pointer"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
