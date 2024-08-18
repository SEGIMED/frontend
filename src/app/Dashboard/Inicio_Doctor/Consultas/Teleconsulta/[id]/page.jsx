"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import IconCamera from "@/components/icons/IconCamera";
import IconData from "@/components/icons/IconData";
import IconFinish from "@/components/icons/IconFinish";
import IconLive from "@/components/icons/IconLive";
import IconMicrophone from "@/components/icons/IconMicrophone";
import { useAppSelector } from "@/redux/hooks";
import { socket } from "@/utils/socketio";
import rtcPer from "@/utils/RTCPeer";
import Cookies from "js-cookie";
import observer from "@/utils/observer";
import Config from "@/components/Teleconsulta/config";
import StateTarget from "@/components/Teleconsulta/StateTarget";
import VideoCall from "@/components/Teleconsulta/VideoCall";
import CallVideo from "@/components/Teleconsulta/CallVideo";
export default function TeleconsultaId (id) {
    const [state , setState] = useState(false)
    const consultId = Number(id.params.id);
    const handleChangeState = (s) => {
        rtcPer.init(consultId);
        setState(s)
    };
    

  

    return (
        <div className="h-full w-full flex flex-col justify-between bg-[#FAFAFC]">
            {
                consultId && <CallVideo id={consultId}/>
            }
           
            {/* {
                state ? <VideoCall consultId={consultId} Role="Médico"/> : <Config handleChangeState={handleChangeState}/>

            } */}
            {/* <div className="w-full flex justify-between items-center border-b-2">
                <div className="flex justify-start items-center">
                    <button className="flex justify-center items-center gap-3 py-3 px-6 border-r-2">
                        <IconLive/> Datos de consulta
                    </button>
                    <button className="flex justify-center items-center gap-3 py-3 px-6 border-r-2">
                        <IconData/> Datos del paciente
                    </button>
                </div>
                <button className="flex justify-center items-center gap-3 bg-[#E73F3F] text-white py-2 px-6 rounded-xl mr-6">
                    <IconFinish/> Finalizar
                </button>
            </div>
            <div className="flex justify-center py-2 border-b-2">
                <p>Dr. Kevin Lado</p>
            </div>
            <div  className="h-full w-full flex justify-between items-center m-6">
                <video
                playsInline 
                muted 
                autoPlay 
                ref={myVideo}  
                className="h-full w-1/2 flex justify-center items-center bg-white rounded-xl border">
                    
                </video>
                <video
                playsInline 
                muted 
                autoPlay 
                ref={remoteVideo}  
                className="h-full w-1/2 flex justify-center items-center bg-white rounded-xl border">
                    
                </video>
                <div className="pt-3 flex justify-center items-center gap-5">
                    <button className="bg-[#0060FF] p-3 rounded-full">
                        <IconMicrophone/>
                    </button>
                    <button className="bg-[#0060FF] p-3 rounded-full">
                        <IconCamera/>
                    </button>
                </div>
            </div> */}
        </div>
    )
}
