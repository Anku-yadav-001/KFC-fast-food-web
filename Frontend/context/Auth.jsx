import React, { createContext, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate(); 

  async function verifyUserOTP(otp, userId) {
    try {
      const otpCode = otp.join("");

      const response = await axios.post("http://localhost:8080/login/verify-otp", {
        userId,
        otp: otpCode,
      });
     
      if (response.data.status === "VERIFIED") {
        setAuth(true);
        setToken(response.data.token); 
        toast(`${response.data.message} - ${response.data.status}`);
        
        localStorage.setItem("authToken", JSON.stringify({token:response.data.token}));

        setTimeout(() => {
          navigate(`/`);
        }, 3000);
      } else {
        toast(response.data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      toast("Error verifying OTP. Please try again.");
    }
  }

  function logout() {
    setAuth(false);
    setToken(null);

    localStorage.removeItem("authToken");

    axios.post("http://localhost:8080/login/logout", {})
      .then((response) => {
        console.log(response.data.message);
        toast("Logged out successfully");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        toast("Error logging out. Please try again.");
      });
    navigate("/register/login");
  }

  return (
    <AuthContext.Provider value={{ verifyUserOTP, auth, token, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
//real