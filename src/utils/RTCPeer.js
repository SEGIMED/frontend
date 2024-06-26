import { socket } from "./socketio.js";
import Observer from "./observer.js";
class RTCPeer{
    constructor(){
        this.configuration = {
            iceServers: [
              {
                urls: [
                  'stun:stun1.l.google.com:19302',
                  'stun:stun2.l.google.com:19302',
                ],
              },
            ],
            iceCandidatePoolSize: 3,
          };
         this.peerConnection = null;
         this.userObj = null;
         this.dataChannel = null;
         this.state = null;
        if(!RTCPeer.instance){
            RTCPeer.instance = this;
        }
        return RTCPeer.instance;
    }

    defineIceCandidatePoolSize(num){
        this.configuration.iceCandidatePoolSize = num;
    }

    defineUserObj(userobj){
        if(!userobj) this.userObj = userobj;
    }



    init(){
        if(this.configuration) this.peerConnection = new RTCPeerConnection(this.configuration);
        return this.peerConnection;
    }

    async createRoom(){
        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit('createRoom',null,(dataChannel) => {
            this.dataChannel = dataChannel;
        });

        socket.on('onJoin',async (message)=> {
            if(message?.answer){
                const remoteDesc = new RTCSessionDescription(message.answer);
                await this.peerConnection.setRemoteDescription(remoteDesc);
            }

            if(message?.updateDataChannel) this.dataChannel =  message.dataChannel;

            if(message?.offer){
                const remoteDesc = new RTCSessionDescription(message.offer);
                await this.peerConnection.setRemoteDescription(remoteDesc);
            }
        });

    }

    

    sendInvite(targetId){
        socket.emit("sendInvite",targetId,(data)=>{
            if(data?.sent){
                this.state = "Invitación Enviada."
            }
        });
    }



}


const rtcPer = new RTCPeer();
export default rtcPer
