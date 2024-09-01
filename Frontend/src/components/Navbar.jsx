import kfclogo from "../assets/kfclogo.svg";
import search from "../assets/search.svg";
import loginicon from "../assets/loginicon.svg";
import bag from "../assets/bag.svg";
import { useContext, useState } from "react";
import { FaLocationDot, FaBars} from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
import { FiLogOut } from "react-icons/fi";

export function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const token = JSON.parse(localStorage.getItem("authToken"))
  const user = JSON.parse(localStorage.getItem("user-info") || "{}");
  const navigate = useNavigate()
  const {logout} = useContext(AuthContext)


  return (
    <div className="fixed w-full bg-white top-0 z-50">
      <div className="w-full h-[14vh] flex justify-center border-b-2">
        <div className="w-[85%] h-full flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={kfclogo}
              alt="KFC Logo"
              className="h-7 cursor-pointer"
            />
          </div>

       
          <div className="hidden md:flex justify-between w-[80%] items-center">
            <div className="flex space-x-4 font-bold items-center">
              <div className="cursor-pointer"><Link to="/menu">Menu</Link></div>
              <div className="cursor-pointer"><Link to="/careers">Careers</Link></div>
              <div className="cursor-pointer">About</div>
              <div className="cursor-pointer"><Link to="/find-a-kfc">Find A KFC</Link></div>
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
            <div className="flex justify-between items-center w-[35%] text-gray-400">
              <div>
                {token?<h1 className="font-bold text-black">Hi, {user.fname}</h1>:<Link to="/register">
                  <img
                    src={loginicon}
                    alt="login icon"
                    id="login icon"
                    className="h-7 cursor-pointer"
                    />
                    </Link>
                  }
              </div>
              |
              <div>
                <Link to="/cart">
                  <img
                    src={bag}
                    alt="bag icon"
                    id="bag icon"
                    className="h-7 cursor-pointer"
                  />
                </Link>
              </div>
              |
              <div>
                <button className="bg-red-600 px-8 py-2 rounded-full font-bold text-white cursor-pointer" onClick={()=>navigate("/order-items")}>
                  Start Order
                </button>
              </div>|
              <div className="cursor-pointer text-black bg-gray-400 p-2 rounded-full" onClick={logout}><FiLogOut size={18}/></div>
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-2xl focus:outline-none"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden w-full bg-white shadow-lg">
          <div className="flex flex-col items-center">
            <div className="relative flex items-center w-full px-4 mt-4">
              <input
                type="text"
                placeholder="search your food menu"
                id="search-input"
                className={`w-full transition-all duration-300 pl-8 py-1 rounded-full border-2 focus:outline-none`}
              />
              <img
                src={search}
                alt="Search Icon"
                id="search-icon"
                className={`absolute left-7 top-1/2 transform -translate-y-1/2 cursor-pointer z-10 w-5`}
                onClick={() => setIsExpanded(!isExpanded)}
              />
            </div>
            <Link to="/menu" className="p-2 cursor-pointer">
              Menu
            </Link>
            <hr />
            <Link to="/careers" className="p-2 cursor-pointer">
              Careers
            </Link>
            <hr />
            <Link to="/about" className="p-2 cursor-pointer">
              About
            </Link>
            <Link to="/find-a-kfc" className="p-2 cursor-pointer">
              Find A KFC
            </Link>
            <div className="flex flex-col items-center mt-4 text-gray-400">
              {
                token?<h1 className="font-bold text-black">Hi, {user.fname}</h1>:<Link to="/register" className="mb-2">
                <img
                  src={loginicon}
                  alt="login icon"
                  id="login icon"
                  className="h-7 cursor-pointer"
                />
              </Link>
              }
              <Link to="/cart" className="mb-2">
                <img
                  src={bag}
                  alt="bag icon"
                  id="bag icon"
                  className="h-7 cursor-pointer"
                />
              </Link>
              <button className="bg-red-600 px-8 py-2 rounded-full font-bold text-white cursor-pointer my-4" onClick={()=>navigate("/order-items")}>
                Start Order
              </button>
              <div className="cursor-pointer text-black bg-gray-400 p-2 rounded-full mb-2" onClick={logout}><FiLogOut/></div>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-[8vh] bg-[#202124] text-white flex justify-center items-center text-sm">
        <p className="flex items-center">
          <FaLocationDot />
          &nbsp;Start an Order for Pickup or Delivery
        </p>
      </div>
    </div>
  );
}
