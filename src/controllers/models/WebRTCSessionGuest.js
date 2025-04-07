//WebRTCSessionGuest.js
class WebRTCSessionGuest{
    constructor(userId, targetId, socketUrl){
        this.userId = userId
        this.targetId = targetId

        this.socket = new WebSocket(socketUrl)
        this.peer = new RTCPeerConnection({
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" } // free public STUN server
            ]
          })

        this.peer.onicecandidate = this.sendCandidates;

        this.dataChannel = this.peer.createDataChannel("chat");
        this.setupDataChannel();

        this.joinWebSocket()

        this.listenOnWebSocket()    
    }

    sendCandidates = (event) => {
        if (event.candidate) {
            const candidateMessage = {
                type: "candidate",
                target: this.targetId,
                candidate: event.candidate
            };
            console.log("3. Sent ICE candidate");
            this.socket.send(JSON.stringify(candidateMessage));
        }
    }

    setupDataChannel = () => {
        this.dataChannel.onopen = () => {
            console.log("📡 Data channel open");
            this.dataChannel.send("Hello from guest!");
        };

        this.dataChannel.onmessage = (event) => {
            console.log("📥 Message from host:", event.data);
        };
    }

    joinWebSocket(){
        this.socket.onopen = async () => {
            console.log("0. Connected to socket")
            this.socket.send(JSON.stringify({ type: "join", id: this.userId }));

            await this.sendOffer()
        };
    }

    async sendOffer(){
        let offer
        try {
            offer = await this.peer.createOffer()
            console.log("1. Created an offer")

            // this.sendCandidates(this.targetId)

            await this.peer.setLocalDescription(offer)

                
        } catch (error) {
            console.log(error)
        }

        const offerMessage = {
            type: "offer",
            target: this.targetId,
            from: this.userId,
            data: offer
        }

        console.log("1.1 Sent a offer")
        this.socket.send(JSON.stringify(offerMessage));
    }

    listenOnWebSocket(){

        this.socket.onmessage = async (message) => {
                let data
                if(message.data instanceof Blob){
                    let text = await message.data.text()
                    data = JSON.parse(text)
                }else if(typeof message.data === "string"){
                    data = JSON.parse(message.data)
                }
                
                try {
                    switch(data["type"]){
                        case "answer":
                            console.log("2.1 Received a answer")
                            await this.handleAnswer(data)
                            console.log("2.2 Saved the answear")
                            break
                        case "candidate":
                            console.log("3.1 Received ice Candidates")
                            this.handleReceivedCandidate(data)
                            break
                    }
                    
                } catch (error) {
                    console.log(error)
                }
        
        }
    }

    async handleAnswer(answer){
        try {
            const remoteDesc = new RTCSessionDescription({
                type: answer.data.type,
                sdp: answer.data.sdp
            });
        
            await this.peer.setRemoteDescription(remoteDesc);
        } catch (error) {
            console.log(error)
        }

    }

    handleReceivedCandidate(data){
        if (!data.candidate) {
            console.warn("No ICE candidate found in message.");
            return;
        }
    
        try {
            const candidate = new RTCIceCandidate(data.candidate);
            this.peer.addIceCandidate(candidate)
                .then(() => {
                    console.log("✅ ICE candidate added successfully");
                })
                .catch(err => {
                    console.error("❌ Error adding ICE candidate:", err);
                });
        } catch (err) {
            console.error("❌ Failed to create ICE candidate:", err);
        }
    }

    
}

export default WebRTCSessionGuest