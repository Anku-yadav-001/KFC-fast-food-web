import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
export function AuthMessage(){
    const navigate = useNavigate()
    return <>
    <Navbar/>
        <div className="mt-60 mb-20 text-center">
             <h1 className="text-6xl font-bold m-4">SORRY !!!</h1>
            <h1 className="text-5xl font-bold">YOU NEED TO REGISTER FIRST</h1>
            <button className="py-2 px-8 rounded-full bg-red-600 text-white m-4" onClick={()=>navigate("/register")}>Register</button>
        </div>
    <Footer/>
    </>
}