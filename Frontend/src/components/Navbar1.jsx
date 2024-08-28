import kfclogo from "../assets/kfclogo.svg";
import loginicon from "../assets/loginicon.svg";
import { FaLocationDot } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
export function Navbar1() {
  let navigate = useNavigate()
  return (
    <div className="fixed w-full bg-white top-0 z-50">
        <div className="w-full flex justify-center">
            <div className="w-[88%] flex justify-between items-center p-6">
                <div>
                  <button className="px-6 py-2 bg-white rounded-full  font-bold border-2 border-black">Back to Menu</button>
                </div>
                    <img src={kfclogo} alt="" className="w-[20%] ml-[12%]"/>
                <div className="flex justify-end">
                    <img src={loginicon} alt="" className="w-[10%]" onClick={()=>navigate("/login")}/>
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
