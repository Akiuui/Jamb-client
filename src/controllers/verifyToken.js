import { jwtDecode } from "jwt-decode"

const verifyToken = (token) => {
    if(!token) return false

    try {
        const decoded = jwtDecode(token)
        const currentTime = Date.now()/1000
        if(decoded.exp < currentTime){
            return false
        }
        console.log("Token is valid")
        return true
    } catch (error) {
        console.log("Invalid token", error)
        return false
    }
}

export default verifyToken;
