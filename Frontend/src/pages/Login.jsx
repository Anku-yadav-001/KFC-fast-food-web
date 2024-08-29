import kfclogo from "../assets/kfclogo.svg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

export function Login() {
  let navigate = useNavigate();
  let { userId } = useParams();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [email, setEmail] = useState(""); 

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail"); 
    if (userEmail) {
      setEmail(userEmail); 
    } else {
      toast("No email found. Please log in again.");
      navigate("/login");
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

  async function verifyUserOTP() {
    try {
      const otpCode = otp.join("");
      const response = await axios.post("http://localhost:8080/register/verify-otp", {
        userId,
        otp: otpCode,
      });
      if (response.data === "Please enter valid OTP") {
        toast(response.data);
      } else if (response.data === "Please enter OTP") {
        toast("Please enter OTP");
      } else if (response.data.status === "VERIFIED") {
        toast(`${response.data.message} - ${response.data.status}`);
        setTimeout(() => {
          navigate(`/`);
        }, 2000);
      } else if (response.data === "Account record doesn't exist or has been verified already, Please signup or login") {
        toast("Please login again");
      }
    } catch (error) {
      toast("Error verifying OTP. Please try again.");
    }
  }

  async function resendOTP() {
    try {
      const response = await axios.post("http://localhost:8080/register/resend-otp", {
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
        <div className="flex justify-evenly items-center h-20 ml-40">
          <div></div>
          <div>
            <img src={kfclogo} alt="" className="w-[85%]" />
          </div>
          <div>
            <button
              className="rounded-full border-2 border-black px-12 py-2 font-semibold"
              onClick={() => navigate("/register")}
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex justify-center items-center h-[89vh] bg-gray-100">
          <div className="bg-white p-10 rounded-lg shadow-lg w-[30%] mt-[-70px]">
            <div className="flex justify-start mb-4">
              <div className="h-10 w-5 bg-red-600 mr-2"></div>
              <div className="h-10 w-5 bg-red-600 mr-2"></div>
              <div className="h-10 w-5 bg-red-600"></div>
            </div>
            <h1 className="text-2xl font-bold mb-2">VERIFY YOUR EMAIL</h1>
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
              <div className="flex justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-16 h-16 text-center text-2xl border-b-4 border-gray-300 focus:outline-none focus:border-red-500 transition-colors duration-300"
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
              className="text-blue-700 font-bold mt-[20px] mb-[-25px] ml-[-25px] cursor-pointer"
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
