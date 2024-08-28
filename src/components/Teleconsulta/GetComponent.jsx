'use client'
import { useEffect, useRef } from "react";
import SelectDevices from "./SelectDevices";

export default function GetComponent({typeConection,stream,updateStream}) {
    const videoRef = useRef(null);
    useEffect(()=>{
        if(stream){
            videoRef.current.srcObject = stream;
        }
        
        if(typeConection){
            videoRef.current.muted=true;
        } else {
            videoRef.current.muted=false;
            
        }
    },[stream])

    
        return (
            <section className="w-full h-full flex flex-col gap-16 content-center">
                
                <video
                className=" rounded-medium"
                 ref={videoRef} 
                 playsInline={true}
                 muted={false}
                 autoPlay={true}
                />
                {
                    typeConection && (
                    <SelectDevices updateStream={updateStream} />
                    )
                }
            </section>
        )
}