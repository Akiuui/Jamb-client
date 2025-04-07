import { useState, useEffect } from "react"
import WebRTCSessionHost from "../controllers/models/WebRTCSessionHost.js"

function StartSessionButton({userId, setShowButton, socketUrl}){

    const [connectionState, setConnectionState] = useState(null); // Track the connection state

    const showButton = "startSession" 

    const handleStartSession = () => {
        setShowButton(showButton)
        
        let host = new WebRTCSessionHost(userId, socketUrl)

        host.peer.addEventListener('connectionstatechange', () => {
            console.log(host.peer.connectionState)
            setConnectionState(host.peer.connectionState); // Update connection state

            if(host.peer.connectionState == "connected")
                host.socket.close()
        });
    }

    return (
        <>
        {!connectionState ? 
            (<button onClick={handleStartSession}>Start Session</button>)
            :
            (<p>Session started🟢</p>)
        }
         {connectionState && <p>Connection State: {connectionState}</p>}

        </>
    )
}

export default StartSessionButton;
