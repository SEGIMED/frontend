'use client'
import rtcPer from "./RTCPeer";

class GetDataDecive{


    constructor(){
        this._listNameDecives = new Map();
        this._listDecives = null
        this._listCamera = null;
        this._listMicrophone = null;
        this._preferentCamera = null;
        this._preferentMicrophone = null;
        
        if(!GetDataDecive.instance){
            GetDataDecive.instance = this;
        }
        return GetDataDecive.instance
    }


    async getAllDecives(){
        try {         
            this._listDecives = await this.openMediaDevices({'video':true,'audio':true});
        } catch (error) {
            console.log(error);    
        }
    }

    async openMediaDevices(constraints) {
       try { 
           return await navigator.mediaDevices.getUserMedia(constraints);
       } catch (error) {
        console.log(error); 
       }
    }

    async getCamera(){
        try {            
            const decives = await navigator.mediaDevices.enumerateDevices();
            const userAgent = navigator.userAgent.toLowerCase();
            const cameras = decives.filter(decive => {
                if(userAgent.includes('chrome') && !this._listNameDecives.has(decive.deviceId)){
                    this._listNameDecives.set(decive.deviceId,decive.label);
                }

                if(decive.kind === 'videoinput'){
                    return decive
                } 
                
            });


            this._listCamera = cameras.map(decive => {
                return {
                    name: this._listNameDecives.get(decive.deviceId) || decive.label || "Dispositivo Desconocido",
                    id: decive.deviceId,
                    label: decive.label
                }
            })
            return this._listCamera
        } catch (error) {
            console.log(error);
        }
    }

    async getMicrophone(){
        try {
            const decives = await navigator.mediaDevices.enumerateDevices();
            const userAgent = navigator.userAgent.toLowerCase();
            const microphone = decives.filter(decive => {
                if(userAgent.includes('chrome') && !this._listNameDecives.has(decive.deviceId)){
                    this._listNameDecives.set(decive.deviceId,decive.label);
                }

               return decive.kind ==="audioinput"
            });
            this._listMicrophone = microphone.map((micro => {
                return {
                    name: this._listNameDecives.get(micro.deviceId) || micro.label || "Dispositivo Desconocido"
                }
            }));

            return this._listMicrophone;
            
        } catch (error) {
            console.log(error);
        }
    }

   async registerDecives(){
        try {
            let constrains = {
                audio: true,
                video: true
            }
            if(this._preferentCamera) constrains.video = {
                deviceId: this._preferentCamera
            }

            if(this._preferentMicrophone) constrains.audio = {
                deviceId: this._preferentMicrophone
            }

            const stream = await this.openMediaDevices(constrains);

            if(stream){
                stream.getTracks().forEach(track => {
                    rtcPer.peerConnection.addTrack(track,stream);
                });

                return stream;
            }
        } catch (error) {
            console.log(error)
        }
    }

}


const dataDecives =  new GetDataDecive();
export default dataDecives;