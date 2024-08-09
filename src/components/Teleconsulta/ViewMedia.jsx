'use client'

import { useRef,useEffect } from "react"
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
        console.log(stream)
            cameraRef.current.srcObject = stream;
       }) 
    },[])

    const cameraRef = useRef(null);
    

    return <video ref={cameraRef}  playsInline muted autoPlay />

}