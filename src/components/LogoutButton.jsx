import { useNavigate } from "react-router-dom"
import React from "react"

const Logout = () => {

    const navigate = useNavigate()

    const handleLogout = async () => {

        await axios.get("https://auth-server-production-90c7.up.railway.app/logout")

        navigate("/login")
    }
    
    return (
        <button onClick={handleLogout}>Logout</button>
    )

}

export default Logout