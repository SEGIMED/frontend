'use client'
import { socket } from "./socketio.js";
import Observer from "./observer.js";
/*
    Modificar para que se haga todo lo que tenga que ver con la conexion y agregar tracks desde aquí.
    Usar Observer para modificar el cliente.
*/
class RTCPeer{
    constructor(){
        this.configuration = {
            iceServers: [
              {
                'urls': 'stun:stun.l.google.com:19302'
              },
            ],
          };
         this.peerConnection = null;
         this.userObj = {
            userId: null,
            stream: null
         }
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

    defineUserObjId(userId){
        if(userId) this.userObj.userId = Number(userId); 
    }

    defineUserObjStream(stream){
        this.userObj.stream = stream;
    }

    init(){
        if(this.configuration) this.peerConnection = new RTCPeerConnection(this.configuration);
    }

    // getTracksMedia(consultId){ 
    //     if(this.userObj.stream){ 
    //         this.userObj.stream.getTracks().forEach(track => {
    //             this.peerConnection.addTrack(track,this.userObj.stream);
    //         });
    //         socket.emit("userState",{consultId,state:"ready"});
    //     }
    // }
  
    async createOffer(id){
        // this.peerConnection.addEventListener('track', async (event) => {
        //     const [remoteStream] = event.streams;
        //     console.log(remoteStream);
        // });

        this.peerConnection.addEventListener('icegatheringstatechange', (event) => {
            console.log('ICE Gathering State:', this.peerConnection.iceGatheringState);
        });
        
        this.peerConnection.addEventListener('icecandidate', (event) => {
            console.log("esto es el candidate evente en createOffer", event)  //no entra el eventListener
            if (event.candidate) {
                socket.emit("newCandidate",{id, candidate: event.candidate});
            }
        });
        this.peerConnection.addEventListener('connectionstatechange', (event) => {
            console.log('nuevo evento ',peerConnection.connectionState);
        });


            if(!this.state){
          const offer = await this.peerConnection.createOffer();
          await this.peerConnection.setLocalDescription(offer); 
        return offer
            }
    } 
    
    async createAsw (id){

// this.peerConnection.addEventListener('track', async (event) => {
//     const [remoteStream] = event.streams;
//     Observer.setStreamVideo(remoteStream);
// });

        this.peerConnection.addEventListener('icegatheringstatechange', (event) => {
            console.log('ICE Gathering State:', this.peerConnection.iceGatheringState);
        }); 
        
        this.peerConnection.addEventListener('icecandidate', (event) => {
            console.log("esto es el candidate evente en createasw", event)  //no entra el eventListener
            if (event.candidate) {
                socket.emit("newCandidate",{id, candidate: event.candidate});
            }
        });
        this.peerConnection.addEventListener('connectionstatechange', (event) => {
            console.log('nuevo evento ',this.peerConnection.connectionState);
        });
        
            if(!this.state){
            const asw = await this.peerConnection.createAnswer(); 
            await this.peerConnection.setLocalDescription(asw);
            return asw
            }
    } 
        
    async setRemoteDescription(description){
        try {
            const remoteDesc = new RTCSessionDescription(description);
            return await this.peerConnection.setRemoteDescription(remoteDesc);
        
        } catch (error) {
            console.log(error)
            return error
        }
    }

    async setCandidateRemote(candidate){
       await this.peerConnection.addIceCandidate(candidate);
    }

    async createRoom(){
        const offer = await peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);


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
        console.log(this.peerConnection);
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
