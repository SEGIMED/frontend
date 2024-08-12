import dataDecives from "@/utils/getDataDecives"
import rtcPer from "@/utils/RTCPeer";
// DeviceSelect.js
import React,{useEffect, useState, useRef} from 'react';


export default ({deviceId, type,handleRemoteStream}) => {
        const [stream,setStream] = useState('')
        const myVideo = useRef(null);
        console.log(deviceId)


        useEffect(()=>{
            const getStream = () => {
                if(type === 'local'){
                    dataDecives.openMediaDevices({audio:false,video:{
                        deviceId:deviceId
                    }}).then(stream =>{
                        setStream(stream);
                        myVideo.current.srcObject = stream
                    })
                } else {
                    rtcPer.peerConnection.addEventListener('track', async (event) => {
                        console.log('entro aca')
                        const [remoteStream] = event.streams;
                        console.log(remoteStream)
                        handleRemoteStream(remoteStream)
                        myVideo.current.srcObject = remoteStream;
                        myVideo.current.p
                    });
                    
                }
            }
            
            getStream();



        },[deviceId])
    return (

        <div className="w-36 h-28">
        {
            type === 'local' ?
           <video
           ref={myVideo}
           id="local"
           playsInline={true}
           muted={true}
           autoPlay={true}
           /> :
           <video
           id="remote"
           ref={myVideo}
           controls={true}
           playsInline={true} 
           autoPlay={true}
           />
        }
        </div>
    )
}