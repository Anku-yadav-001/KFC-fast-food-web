import {Route,Routes} from "react-router-dom"
import { Home } from "../pages/Home"
import { Bag } from "../pages/Bag"
import { Login } from "../pages/Login" 
import { Register } from "../pages/Register"
import { Menu } from "../pages/Menu"
import Featured from "../pages/Featured"
import { Verification } from "../pages/Verification"
import { PrivateRoute } from "./PrivateRoute"
import { AllItems } from "../pages/AllItems"
import FindAKfc from "../pages/FindAKfc"
import { Career } from "../pages/Career"
export function AllRoutes(){
    return <>
     <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<PrivateRoute><Bag/></PrivateRoute>}/>
            <Route path="/register/login" element={<Login/>}/>
            <Route path="/register/login/verification/:userId" element={<Verification/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/menu" element={<PrivateRoute><Menu/></PrivateRoute>}/>
            <Route path="/featured" element={<PrivateRoute><Featured/></PrivateRoute>}/>
            <Route path="/order-items" element={<PrivateRoute><AllItems/></PrivateRoute>}/>
            <Route path="/find-a-kfc" element={<PrivateRoute><FindAKfc/></PrivateRoute>}/>
            <Route path="/careers" element={<PrivateRoute><Career/></PrivateRoute>}/>
        </Routes>
     </div>
    </>
}