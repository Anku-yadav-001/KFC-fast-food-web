import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate(); 

  async function verifyUserOTP(otp,userId) {
    console.log(otp);
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
        setAuth(true);
        toast(`${response.data.message} - ${response.data.status}`);
        setTimeout(() => {
          navigate(`/`);
        }, 3000);
      } else if (response.data === "Account record doesn't exist or has been verified already, Please signup or login") {
        toast("Please login again");
      }
    } catch (error) {
      toast("Error verifying OTP. Please try again.");
    }
  }

  return (
    <AuthContext.Provider value={{ verifyUserOTP, auth }}>
      {children}
    </AuthContext.Provider>
  );
}
