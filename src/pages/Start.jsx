import { useState, useEffect } from "react"
import LogoutButton from "../components/LogoutButton"
import StartSessionButton from "../components/StartSessionButton.jsx"
import JoinSessionButton from "../components/JoinSessionButton.jsx"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Start(){

    const navigate = useNavigate()

    // const [socket, setSocket] = useState("")
    const [user, setUser] = useState([])
    const [showButton, setShowButton] = useState("both")
    const [socketUrl, setSocketUrl] = useState("ws://signaling-server-production-5768.up.railway.app")

    useEffect(() => {
            axios.get("https://auth-server-production-90c7.up.railway.app/protected", {withCredentials:true})
            // .then((res) => console.log(res.data.user))
            .then((res) => setUser(res.data.user))
            .catch((error) => {
                if (axios.isAxiosError(error)) {

                    console.error("❌ Axios error:", error.message);
                    if (error.response && error.response.status === 401) {
                        alert("Session expired, please log in again");
                        navigate("/login")
                    }
                
                }
            })

    }, [])

    return(
        <>
            <h1>Start</h1>
            <p>Username: {user.username}</p>
            <p>UserId: {user.userId}</p>

            {showButton == "both" || showButton == "startSession" ?
                <StartSessionButton setShowButton={setShowButton} userId={user.userId} socketUrl={socketUrl}/>
                :
                <></>
            }
            {showButton == "both" || showButton == "joinSession" ?
                <JoinSessionButton setShowButton={setShowButton} userId={user.userId} socketUrl={socketUrl}/>
                :
                <></>
            }
            <LogoutButton/>
        </>
    )

}

export default Start;
