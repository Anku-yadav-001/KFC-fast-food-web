import kfclogo from "../assets/kfclogo.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toast } from 'react-toastify';

export function Register() {
  let navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState(Date);
  const [mobile, setMobile] = useState();
  const [password,setPassword] = useState()
  const [userId, setUserId] = useState();

  async function registerUser() {
    try {
      const response = await axios.post("https://kfc-fast-food-web.onrender.com/register/user-register", {
        fname,
        lname,
        email,
        dob,
        mobile,
        password
      });
      // setUserId(response.data.data.userId);
      localStorage.setItem("user-info", JSON.stringify({email,fname}));
      toast("User registered successfully, redirecting to the login page...");
      setTimeout(() => {
        navigate(`/register/login`);
      }, 3000);
    } catch (error) {
      if (error.status === 400) {
        toast("User already exists");
      }
    }
  }

  function handleFormSubmit() {
    registerUser();
  }

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
          <div className="bg-white p-6 sm:p-10 rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-start mb-4">
              <div className="h-10 w-3 bg-red-600 mr-2"></div>
              <div className="h-10 w-3 bg-red-600 mr-2"></div>
              <div className="h-10 w-3 bg-red-600"></div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold mb-2">REGISTER TO KFC</h1>
            <p className="text-gray-500 mb-6">
              Please enter your details to register in KFC.
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fname">
                First Name
              </label>
              <input
                type="text"
                id="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                placeholder="First Name"
                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lname">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                placeholder="Last Name"
                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
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
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dob">
                Date Of Birth
              </label>
              <input
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
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
              className="w-full bg-gray-300 text-gray-700 font-bold py-2 rounded-full cursor-pointer"
              onClick={handleFormSubmit}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
