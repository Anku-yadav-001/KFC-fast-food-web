import { useContext } from "react"
import { AuthContext } from "./Auth"
import { AuthMessage } from "../src/pages/AuthMessage"

export function PrivateRoute({children}){
    const {auth} = useContext(AuthContext)
    return auth?children:<AuthMessage/>
}