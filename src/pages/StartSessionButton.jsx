import { useState, useEffect } from "react"
import handleSocket from "../controllers/handleSocket.js"

function StartSessionButton({userId}){
    const [socket, setSocket] = useState()

    const handleStartSession = () => {
        let socketVar = handleSocket(userId)
        setSocket(socketVar)
    }

    return (
        <>
        {!socket ? 
            (<button onClick={handleStartSession}>Start Session</button>)
            :
            (<p>Socket connection started</p>)
        }
        </>
    )
}

export default StartSessionButton;
