import kfclogo from "../assets/kfclogo.svg"
import { json, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import { toast } from 'react-toastify';

export function Register(){
    let navigate = useNavigate()
    const [fname,setFname] = useState("")
    const [lname,setLname]=useState("")
    const [email,setEmail] =useState("")
    const [dob,setDob] = useState(Date)
    const [mobile,setMobile] = useState()
    const [userId,setUserId] = useState()

  async function registerUser() {
     try {
      const response = await axios.post("http://localhost:8080/register/user-register",{
            fname,
            lname,
            email,
            dob,
            mobile
      })
      setUserId(response.data.data.userId)
       localStorage.setItem("userEmail",JSON.stringify(email))
        toast("user registered successfully, you are going to redirect on login page")
        setTimeout(() => {
          navigate(`/login/${response.data.data.userId}`)
        }, 3000);
      
     } catch (error) {
        if(error.status==400){
          toast("User already exist")
        }
     }
  }

  function handleFormSubmit(){
      registerUser()
  }
    return <>
     <div>
        <div className="flex justify-evenly items-center h-20 ml-40">
            <div></div>
            <div>
                <img src={kfclogo} alt="" className="w-[85%]"/>
            </div>
            <div>
                <button className="rounded-full border-2 border-black px-12 py-2 font-semibold" onClick={()=>navigate("/")}>Close</button>
            </div>
        </div>
     <div className="flex justify-center items-center h-[100vh] bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-lg w-[30%] mt-[30px] mb-[10px]">
        <div className="flex justify-start mb-4">
          <div className="h-10 w-5 bg-red-600 mr-2"></div>
          <div className="h-10 w-5 bg-red-600 mr-2"></div>
          <div className="h-10 w-5 bg-red-600"></div>
        </div>
        <h1 className="text-2xl font-bold mb-2">REGISTER TO KFC</h1>
        <p className="text-gray-500 mb-6">
          Please enter your details to register in KFC.
        </p>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            First Name
          </label>
          <input
            type="text"
            id="email"
            value={fname}
            onChange={(e)=>setFname(e.target.value)}
            placeholder="First Name"
            className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Last Name
          </label>
          <input
            type="text"
            id="email"
            value={lname}
            onChange={(e)=>setLname(e.target.value)}
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
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Date Of Birth
          </label>
          <input
            type="date"
            id="email"
            value={dob}
            onChange={(e)=>setDob(e.target.value)}
            className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Mobile Number
          </label>
          <input
            type="tel"
            id="email"
            value={mobile}
            onChange={(e)=>setMobile(e.target.value)}
            placeholder="Mobile Number"
            className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-black"
          />
        </div>
        <button className="w-full bg-gray-300 text-gray-700 font-bold py-2 rounded-full cursor-pointer" onClick={handleFormSubmit}>
          Register
        </button>
      </div>
    </div>
     </div>
    </>
}