'use client'
import {  useEffect, useMemo, useState } from "react";
import GetComponent from "./GetComponent";
import rtcPer from "@/utils/RTCPeer";
import UserState from "./UserState";

export default  function CameraView({stream,typeConection,updateStream}){
    const [remoteStream, setRemoteStream] = useState(null);
    useEffect(()=>{
        if(!typeConection){
            rtcPer.peerConnection.addEventListener('track',(event) => {
                const [remoteStream] = event.streams;
                setRemoteStream(remoteStream)
           });
        }
    },[])
    

    const Component = ()=>{
            if(remoteStream){
                return  (<GetComponent stream={remoteStream} typeConection={typeConection} />) 
            }
            return (<UserState/>) 
    }
    return (
        <>
        {
            stream && typeConection ? 
            (<GetComponent stream={stream} typeConection={typeConection} updateStream={updateStream} />): <Component />
        }
        </>
    )
}