import kfclogo from "../assets/kfclogo.svg";
import loginicon from "../assets/loginicon.svg";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

export function Navbar1() {
  let navigate = useNavigate();

  return (
    <div className="fixed w-full bg-white top-0 z-50">
      <div className="w-full flex justify-center">
        <div className="w-[95%] md:w-[88%] flex justify-between items-center p-4 md:p-6">
          <div>
            <button className="text-[6px] px-4 py-1 md:px-6 md:py-2 bg-white rounded-full font-bold border-2 border-black text-xs md:text-base">
              Back to Menu
            </button>
          </div>
          <img
            src={kfclogo}
            alt="KFC Logo"
            className="w-[40%] md:w-[20%] ml-[8%] md:ml-[12%]"
          />
          <div className="flex justify-end">
            <img
              src={loginicon}
              alt="Login Icon"
              className="w-[15%] md:w-[10%] cursor-pointer"
              onClick={() => navigate("/login")}
            />
          </div>
        </div>
      </div>
      <div className="w-full h-[6vh] md:h-[8vh] bg-[#202124] text-white flex justify-center items-center text-xs md:text-sm">
        <p className="flex items-center text-center">
          <FaLocationDot className="text-sm md:text-base" />
          &nbsp;Start an Order for Pickup or Delivery
        </p>
      </div>
    </div>
  );
}
