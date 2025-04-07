//WebRTCSessionHost.js
class WebRTCSessionHost{
    constructor(userId, socketUrl){
        this.userId = userId
        this.targetId = null
        this.socket = new WebSocket(socketUrl)

        this.peer = new RTCPeerConnection({
            iceServers: [
              { urls: "stun:stun.l.google.com:19302" } // free public STUN server
            ]
          })

        this.peer.onicecandidate = this.handleIceCandidate;


        this.peer.ondatachannel = (event) => {
            this.dataChannel = event.channel;
            this.setupDataChannel();
        };

        this.joinWebSocket()

        this.listenOnWebSocket()

    }

    handleIceCandidate = (event) => {
        console.log("Target Id: ", this.targetId)
        if (event.candidate && this.targetId) {
            const message = {
                type: "candidate",
                target: this.targetId, // saved during offer handling
                candidate: event.candidate
            };
            console.log("3. Sent ICE candidate");
            this.socket.send(JSON.stringify(message));
        }
    }

    setupDataChannel() {
        this.dataChannel.onopen = () => {
            console.log("📡 Data channel open");
            this.dataChannel.send("Hello from host!");
        };

        this.dataChannel.onmessage = (event) => {
            console.log("📥 Message from guest:", event.data);
        };
    }

    joinWebSocket(){
        this.socket.onopen = () => {
            console.log("0. Connected to socket")
            this.socket.send(JSON.stringify({ type: "join", id: this.userId }));
        };
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
                        case "offer":
                            console.log("1.3. Received an offer")
                            
                            await this.handleOffer(data)
                            await this.sendAnswer(data)

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
    
    async handleOffer(offer){
        try {
            const remoteDesc = new RTCSessionDescription({
                type: offer.data.type,
                sdp: offer.data.sdp    
            })
        
            await this.peer.setRemoteDescription(remoteDesc)
        } catch (error) {
            console.log(error)
        }

    }
    async sendAnswer(offer){ //offer.from
        this.targetId = offer.from
        try {
            let answer = await this.peer.createAnswer();
        
            console.log("2.1 Created an answer")

            // this.sendCandidates(offer.from)
        
            await this.peer.setLocalDescription(answer);

        
            let data = JSON.stringify({ 
                type: "answer",
                data: answer,
                target: this.targetId
            })
        
            console.log("2.2 Sent an answer")

            this.socket.send(data)
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
export default WebRTCSessionHost