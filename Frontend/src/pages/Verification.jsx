import kfclogo from "../assets/kfclogo.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { AuthContext } from "../../context/Auth";

export function Verification() {
  let navigate = useNavigate();
  let { userId } = useParams();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState(""); 
  const {verifyUserOTP,auth} = useContext(AuthContext)

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail"); 
    if (userEmail) {
      setEmail(userEmail); 
    } else {
      toast("No email found. Please log in again.");
      navigate("/register/login");
    }
  }, [navigate]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  verifyUserOTP(otp,userId)

  async function resendOTP() {
    try {
      const response = await axios.post("http://localhost:8080/login/resend-otp", {
        userId,
        email, 
      });
      toast("OTP has been resent to your email.");
    } catch (error) {
      toast("Error resending OTP. Please try again.");
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center h-20 px-4 sm:px-6 md:px-8 lg:px-10">
          <div></div>
          <div>
            <img src={kfclogo} alt="" className="w-24 sm:w-32 md:w-36 lg:w-44" />
          </div>
          <div>
            <button
              className="rounded-full border-2 border-black px-4 py-2 text-sm sm:px-6 sm:py-2 font-semibold"
              onClick={() => navigate("/register/login")}
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <div className="flex justify-start mb-4">
              <div className="h-10 w-3 bg-red-600 mr-2"></div>
              <div className="h-10 w-3 bg-red-600 mr-2"></div>
              <div className="h-10 w-3 bg-red-600"></div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">VERIFY YOUR EMAIL</h1>
            <p className="text-gray-500 mb-6">
              Please enter the verification code that we have sent to your email.
            </p>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="otp"
              >
                OTP
              </label>
              <div className="flex justify-between space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-2xl border-b-4 border-gray-300 focus:outline-none focus:border-red-500 transition-colors duration-300"
                  />
                ))}
              </div>
            </div>
            <button
              className="w-full bg-red-600 text-white font-bold py-2 rounded-full cursor-pointer mt-6"
              onClick={verifyUserOTP}
            >
              Verify
            </button>
            <p
              className="text-blue-700 font-bold mt-4 cursor-pointer"
              onClick={resendOTP}
            >
              Resend OTP
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
