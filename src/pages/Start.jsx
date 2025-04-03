import { useState, useEffect } from "react"
import LogoutButton from "../components/LogoutButton"
// import StartSessionButton from "./StartSessionButton"
// import JoinSessionButton from "./JoinSessionButton"
import handleSocket from "../controllers/handleSocket"
import { createOffer } from "../controllers/handleRTCConnection"

function Start({username, userId}){

    const [socket, setSocket] = useState("")
    let usernameTemp
    let userIdTemp 
    useEffect(() => {
        usernameTemp = localStorage.getItem("username")
        userIdTemp = localStorage.getItem("userId")
    }, [])
    

    const handleJoinSession = async (userId) => {
        let socketVar = handleSocket(userId)
        setSocket(socketVar)
        let targetUserId=prompt("Enter the users Id you want to connect to!")
        await createOffer(userId, targetUserId, socketVar)
    }
    const handleStartSession = () => {
        let socketVar = handleSocket(userId)
        setSocket(socketVar)
    }
    

    return(
        <>
            <h1>Start</h1>
            <p>Username: {usernameTemp}</p>
            <p>UserId: {userIdTemp}</p>
            {!socket ? 
            (
                <>
                    <button onClick={() => handleStartSession(userIdTemp)}>Start session</button>
                    <button onClick={() => handleJoinSession(userIdTemp)}>Join session</button>
                </>
            )
            :
            (<p>Socket connection started</p>)

        }
            <LogoutButton/>
        </>
    )

}

export default Start;
