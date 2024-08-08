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

    async createOffer(id){
        this.peerConnection.addEventListener('track', async (event) => {
            console.log('entro')
            const [remoteStream] = event.streams;
            Observer.setStreamVideo(remoteStream);
        });

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
            console.log('se creo una oferta'); 
          this.state = true; 
          const offer = await this.peerConnection.createOffer();
          await this.peerConnection.setLocalDescription(offer); 
          socket.emit('sendOffer',{id,offer});
        }
    } 
    
    async createAsw (id){

this.peerConnection.addEventListener('track', async (event) => {
    const [remoteStream] = event.streams;
    Observer.setStreamVideo(remoteStream);
});

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
            this.state = true;    
            const asw = await this.peerConnection.createAnswer(); 
            await this.peerConnection.setLocalDescription(asw);
            socket.emit('sendAsw',{id,asw});
        }
    } 
        
    async setRemoteDescription(description){
        const remoteDesc = new RTCSessionDescription(description);
        await this.peerConnection.setRemoteDescription(remoteDesc);
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
