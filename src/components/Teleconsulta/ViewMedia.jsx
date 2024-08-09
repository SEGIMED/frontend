'use client'

import { useRef,useEffect } from "react"
import rtcPer from "@/utils/RTCPeer"

export default function ViewMedia({camera,microphone}){
    const getDecives = async () => {
        const contrains = {
            audio:{
                'deviceId': microphone
            },
            video:{
                'deviceId': camera
            }
        }
    
        return  await navigator.mediaDevices.getUserMedia(contrains)
    }


    useEffect(()=>{
       getDecives().then(stream => {
            cameraRef.current.srcObject = stream;
            rtcPer.defineUserObjStream(stream);
       }) 
    },[])

    const cameraRef = useRef(null);
    

    return <video  className="h-[250px] w-auto" ref={cameraRef}  playsInline muted autoPlay />

}