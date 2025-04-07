import { useState } from "react"
import WebRTCSessionGuest from "../controllers/models/WebRTCSessionGuest.js"

function JoinSessionButton({userId, setShowButton, socketUrl}){
    
    const [connectionState, setConnectionState] = useState(null); // Track the connection state
    const showButton = "joinSession" 

    const handleJoinSession = async () => {
        setShowButton(showButton)
        let targetUserId=prompt("Enter the users Id you want to connect to!")

        let guest = new WebRTCSessionGuest(userId, targetUserId, socketUrl)

        guest.peer.addEventListener('connectionstatechange', () => {
            console.log(guest.peer.connectionState)
            setConnectionState(guest.peer.connectionState); // Update connection state

            if(guest.peer.connectionState == "connected")
                guest.socket.close()
        });

    }
    

    return (
        <>
        {!connectionState ? 
            (<button onClick={handleJoinSession}>Join Session</button>)
            :
            (<p>Session joined🟢</p>)
        }
         {connectionState && <p>Connection State: {connectionState}</p>}

        </>
    )

}

export default JoinSessionButton