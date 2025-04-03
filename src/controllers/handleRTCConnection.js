
export async function createOffer(userId, targetUserId, socket){
    
    const peerConnection = new RTCPeerConnection()

    const offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)
    
    console.log("Created an offer")

    const offerMessage = {
        type: "offer",
        target: targetUserId,
        from: userId,
        data: offer
    }
    console.log("Sent a offer")
    socket.send(JSON.stringify(offerMessage));

}
export async function handleOffer(offer){

    const peerConnection = new RTCPeerConnection()

    const remoteDesc = new RTCSessionDescription({
        type: offer.data.type,
        sdp: offer.data.sdp    
    })
    
    console.log("Received an offer")

    await peerConnection.setRemoteDescription(remoteDesc)

    let answer = await peerConnection.createAnswer();

    console.log("Created an answer")

    await peerConnection.setLocalDescription(answer);

    socket.send(JSON.stringify({
        type: "answer",
        data: answer,
        target: data.from 
    }));
    
    console.log("Sent an aswer")
}