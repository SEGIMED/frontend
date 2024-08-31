"use client"
import { useCallback, useEffect, useRef, useState } from "react";
import rtcPer from "@/utils/RTCPeer";
import CallVideo from "@/components/Teleconsulta/CallVideo";
import Elboton from "@/components/Buttons/Elboton";
import IconRegresar from "@/components/icons/iconRegresar";

import IconUpload from "@/components/icons/IconUpload";
import { useRouter } from "next/navigation";
import rutas from "@/utils/rutas";

export default function TeleconsultaId (id) {
    const [state , setState] = useState(false)
    const consultId = Number(id.params.id);
    const router= useRouter()
    const handleChangeState = (s) => {
        rtcPer.init(consultId);
        setState(s)
    };
    

  

    return (
        
        <div className="h-full w-full flex flex-col justify-between bg-[#FAFAFC]">
           
            <div className="flex justify-between border-b-2 p-2">
                <Elboton 
                nombre={"Regresar"}
                icon={<IconRegresar/>}
                size={"lg"}
                onPress={()=>{router.push(`${rutas.PacienteDash}${rutas.Preconsulta}${rutas.Teleconsulta}`)}}
                />
                <Elboton
                nombre={"Lllenar Consulta"}
                size={"lg"}
                icon={<IconUpload/>}/>
                {/* <button className="flex justify-center items-center gap-3 bg-[#E73F3F] text-white py-2 px-6 rounded-xl mr-6">
                    <IconFinish/> Finalizar
                </button> */}
            </div>
            <div className="flex justify-center py-2 border-b-2">
                <p>Sala de espera Teleconsulta</p>
            </div>
            
            {
                consultId && <CallVideo id={consultId}/>
            }
           
            {/* {
                state ? <VideoCall consultId={consultId} Role="Médico"/> : <Config handleChangeState={handleChangeState}/>

            } */}
                
             
            
        </div>
        
    )
}
