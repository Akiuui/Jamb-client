import { handleOffer } from "./handleRTCConnection";


function handleSocket(userId){
    const socket = new WebSocket("ws://localhost:7000")

    socket.onopen = () => {
        console.log("Connected to socket")
        socket.send(JSON.stringify({ type: "join", id: userId }));
    };

    socket.onmessage = async (message) => {
        let data
        if(message.data instanceof Blob){
            let text = await message.data.text()
            data = JSON.parse(text)
        }else if(typeof message.data === "string"){
            data = JSON.parse(message.data)
        }
        
        try {
            switch(data["type"]){
                case "offer":
                    await handleOffer(data)
                    break
                case "answear":
                case "iceCandidates":
            }
            
        } catch (error) {
            
        }

    }

    return socket
}

export default handleSocket