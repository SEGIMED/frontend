'use client'

import { socket } from "./socketio.js";
import getMediaUser from "@/components/Teleconsulta/getMediaUser.js";
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
         this.isOffer = false;
         this.isAsw = false;
         this.state = false;
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

        socket._socket.on('videoCall',(data) => {
            const {consultId,message} = data;

            if(message === 'newoffer'){
                const {offer} = data;
                this.setRemoteDescription(offer).then(()=> {
                    this.createAsw(consultId).then(asw => socket._socket.emit('videoCall',{
                        consultId,
                        message:'newasw',
                        asw 
                    }))
                })
            } else {
                const {asw} = data;
                this.setRemoteDescription(asw).then(()=>{
                    console.log('Se creo una description remota del el paciente',)
                })
            }
        })
    }

    
  
    async createOffer(id){
try {
         
    this.peerConnection.addEventListener('icegatheringstatechange', (event) => {
        console.log('ICE Gathering State:', this.peerConnection.iceGatheringState);
    });
    
    this.peerConnection.addEventListener('icecandidate', (event) => {
        console.log("esto es el candidate evente en createOffer", event)  //no entra el eventListener
        if (event.candidate) {
            socket.emit("newCandidate",{consultId:id, candidate: event.candidate});
        }
    });
    this.peerConnection.addEventListener('connectionstatechange', (event) => {
        console.log('nuevo evento ',this.peerConnection.connectionState);
    });

    socket._socket.on('newCandidate',(data) => {
        this.setCandidateRemote(data)
    })

    if(!this.isOffer){
        const offer = await this.peerConnection.createOffer();
        await this.peerConnection.setLocalDescription(offer);
        this.isOffer=true;
        return offer
    }
    throw new Error('Ya se envio una oferta.')
} catch (error) {
    console.log(error)
    return error
}
            
    } 
    
    async createAsw (id){

try {
    
    
    this.peerConnection.addEventListener('icegatheringstatechange', (event) => {
        console.log('ICE Gathering State:', this.peerConnection.iceGatheringState);
    }); 
    
    this.peerConnection.addEventListener('icecandidate', (event) => {
        console.log("esto es el candidate evente en createasw", event)  //no entra el eventListener
        if (event.candidate) {
            socket.emit("newCandidate",{consultId:id, candidate: event.candidate});
        }
    });
    this.peerConnection.addEventListener('connectionstatechange', (event) => {
        console.log('nuevo evento ',this.peerConnection.connectionState);
    });
    socket._socket.on('newCandidate',(data) => {
        this.setCandidateRemote(data)
    })
    
      if(!this.isAsw){
          const asw = await this.peerConnection.createAnswer(); 
          await this.peerConnection.setLocalDescription(asw);
          this.isAsw = true;
          return asw
      }

      throw new Error('Ya se envio una respuesta')
} catch (error) {
    console.log(error)
    return error

}
    } 
        
    async setRemoteDescription(description){
        try {
            if(!this.state){
                const remoteDesc = new RTCSessionDescription(description);
                await this.peerConnection.setRemoteDescription(remoteDesc);
                this.state= true;
                return true;
            }
            throw new Error('Ya tienes una descripcion remota')
        } catch (error) {
            console.log(error)
            return error
        }
    }

     setCandidateRemote(candidate){
            
     this.peerConnection.addIceCandidate(candidate).catch((e) => {
        console.log(e.message)
     })
       
    }

    updateTracks(stream){
        try {
            if(!this.peerConnection) throw new Error('Error aún no se creado la instancia de RTCPeerConnection')
            const listSenders = this.peerConnection.getSenders()
            //clean of the tracks 
            if(listSenders?.length){
                listSenders.forEach(sender => this.peerConnection.removeTrack(sender))
            }
            
            //
            if(stream){
                stream.getTracks().forEach(track =>  this.peerConnection.addTrack(track,stream));
            } else {
                getMediaUser.getUpdateStream().then(newStream => newStream.getTracks().
                forEach(track => this.peerConnection.addTrack(track,newStream))).
                catch(error => console.log(error.message))
            }




        } catch (error) {
            console.log(error.message)
        }
    }
    


}


const rtcPer = new RTCPeer();
export default rtcPer
