import kfclogo from "../assets/kfclogo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';

export function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      let response = await axios.post("http://localhost:8080/login/user-login", {
        email,
        password
      });
      console.log(response.data.data.userId);
      if (response.status === 200) {
        const { token, message } = response.data;
        localStorage.setItem("authToken", token);
        toast.success(message);
        setTimeout(() => {
          navigate(`/register/login/verification/${response.data.data.userId}`);
        }, 3000);
      }
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data;

        if (status === "FAILED") {
          if (error.response.status === 404) {
            toast.error("Incorrect email");
          } else if (error.response.status === 401) {
            toast.error("Incorrect password");
          } else {
            toast.error(message || "Failed to login, please try again");
          }
        }
      } else {
        toast.error("Failed to login, please try again");
      }
    }
  }

  return (
    <>
      <div>
        <div className="flex justify-between items-center h-20 px-4 sm:px-10 lg:px-40">
          <div></div>
          <div>
            <img src={kfclogo} alt="KFC Logo" className="w-36 sm:w-44 lg:w-56" />
          </div>
          <div>
            <button
              className="rounded-full border-2 border-black px-6 sm:px-8 lg:px-12 py-2 font-semibold"
              onClick={() => navigate("/register")}
            >
              Register
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
              Please enter your details to login to KFC.
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-red-600 text-white py-2 rounded-md mt-4 font-semibold"
            >
              Login
            </button>
            <p className="mt-4 text-gray-600 text-center text-sm">
              Don’t have an account?{" "}
              <span
                className="text-red-600 font-semibold cursor-pointer"
                onClick={() => navigate("/register")}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
