import { useState, useEffect } from "react"
import LogoutButton from "../components/LogoutButton"

function Start(){

    const [username, setUsername] = useState("")
    const [userId,setUserId] = useState("")

    useEffect(() => {
        setUsername(localStorage.getItem('username'))
        setUserId(localStorage.getItem('userId'))
    
    }, [])
    

    return(
        <>
            <h1>Start</h1>
            <p>Username: {username}</p>
            <p>UserId: {userId}</p>
            <button>Create a game</button>
            <button>Join a room</button>
            <LogoutButton/>
        </>
    )

}

export default Start;
