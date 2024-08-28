import {Route,Routes} from "react-router-dom"
import { Home } from "../pages/Home"
import { Bag } from "../pages/Bag"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Menu } from "../pages/Menu"
export function AllRoutes(){
    return <>
     <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Bag/>}/>
            <Route path="/login/:userId" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/menu" element={<Menu/>}/>
        </Routes>
     </div>
    </>
}