import { useState, useEffect } from "react"
import handleSocket from "../controllers/handleSocket.js"
import {createOffer} from "../controllers/handleRTCConnection.js"

function JoinSessionButton({userId}){
    const [socket, setSocket] = useState()
    
    const handleJoinSession = async () => {
        let socketVar = handleSocket(userId)
        // setSocket(socketVar)
        let targetUserId=prompt("Enter the users Id you want to connect to!")
        await createOffer(targetUserId, socketVar)
    }

    return (
        <>
        {!socket ? 
            (<button onClick={handleJoinSession}>Join Session</button>)
            :
            (<p>Socket connection started</p>)
        }
        </>
    )

}

export default JoinSessionButton