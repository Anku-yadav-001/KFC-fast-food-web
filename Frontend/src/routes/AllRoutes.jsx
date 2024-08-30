import {Route,Routes} from "react-router-dom"
import { Home } from "../pages/Home"
import { Bag } from "../pages/Bag"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { Menu } from "../pages/Menu"
import Featured from "../pages/Featured"
import { AuthMessage } from "../pages/AuthMessage"
export function AllRoutes(){
    return <>
     <div>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<AuthMessage><Bag/></AuthMessage>}/>
            <Route path="/login/:userId" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/menu" element={<AuthMessage><Menu/></AuthMessage>}/>
            <Route path="/featured" element={<AuthMessage><Featured/></AuthMessage>}/>
        </Routes>
     </div>
    </>
}