'use client'
import { useState } from "react";
import DeviceSelect from "./DeviceSelect"
import ViewCamera from "./ViewCamera";
import dataDecives from "@/utils/getDataDecives";

export default function Config({handleChangeState}){
    const [cameras,setCameras] = useState('');
    const [microphones,setMicrophones] = useState('');
   


    const handleSelectDevice = (deviceId,type) => {
        if(type === "audio"){
            setMicrophones(deviceId);
            dataDecives._preferentMicrophone = deviceId;
        } else {
            setCameras(deviceId);
            dataDecives._preferentCamera = deviceId;
        }
            
      };

    return (
        <div>
            <div className="w-52 h-44">
               {
                cameras && <ViewCamera deviceId={cameras} type="local"/> 
                
               } 
            </div>
            <div className="flex gap-9">
            <DeviceSelect onSelectDevice={handleSelectDevice} type="video"/>        
            <DeviceSelect onSelectDevice={handleSelectDevice} type="audio" />
            <button onClick={()=>handleChangeState(true)}>Listo</button>
            </div>
        </div>
    )
}