"use client"
import { useEffect, useRef, useState } from "react";
import IconCamera from "@/components/icons/IconCamera";
import IconData from "@/components/icons/IconData";
import IconFinish from "@/components/icons/IconFinish";
import IconLive from "@/components/icons/IconLive";
import IconMicrophone from "@/components/icons/IconMicrophone";
import { useAppSelector } from "@/redux/hooks";
import { socket } from "@/utils/socketio";

export default function TeleconsultaId (id) {
    
    const consultId = Number(id.params.id);
    const [roomData, setRoomData]=useState(null)
    const [stream, setStream] = useState(null)
    const myVideo=useRef()
    const targetVideo=useRef()

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            console.log(stream)
            setStream(stream)
                myVideo.current.srcObject = stream
        })
    }, []);


    useEffect(() => {
    
    if(consultId) socket._socket.emit("joinRoom", consultId, (data) => {
        setRoomData(data);
    });

    }, [consultId]);

    return (
        <div className="h-full w-full flex flex-col justify-between bg-[#FAFAFC]">
            <div className="w-full flex justify-between items-center border-b-2">
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
            <div  className="h-full w-full flex justify-between items-center flex-col py-5">
                <video
                playsInline 
                muted 
                autoPlay 
                ref={myVideo}  
                className="h-full w-[40rem] flex justify-center items-center bg-white rounded-xl border">
                    
                </video>
                <div className="pt-3 flex justify-center items-center gap-5">
                    <button className="bg-[#0060FF] p-3 rounded-full">
                        <IconMicrophone/>
                    </button>
                    <button className="bg-[#0060FF] p-3 rounded-full">
                        <IconCamera/>
                    </button>
                </div>
            </div>
        </div>
    )
}