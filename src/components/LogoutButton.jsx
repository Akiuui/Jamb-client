import { useNavigate } from "react-router-dom"
import React from "react"

const Logout = () => {

    const navigate = useNavigate()

    const handleLogout = async () => {
        localStorage.removeItem("token")
        localStorage.removeItem("userId")
        localStorage.removeItem("username")

        navigate("/login")
    }
    
    return (
        <button onClick={handleLogout}>Logout</button>
    )

}

export default Logout