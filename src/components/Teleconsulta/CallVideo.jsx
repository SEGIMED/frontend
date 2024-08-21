'use client'
import { useEffect, useState} from "react";
import getMediaUser from "./getMediaUser";
import CameraView from "./CameraView";
import rtcPer from "@/utils/RTCPeer";
import DataContext from "./DataContext";

export default function CallVideo({id}){
    /* 
        Acá tengo que mostrar 2 vista.
        1. Cuando la video llamada aun no esta iniciada:
            - mostrar vista previa de la camara local.
            - mostrar vista previa del estado del usuario B.
            - mostrar botones para modificar sus dispositivos.
            - mostrar boton para modificar su estado.
            - mostrar boton para iniciar, en caso de ser medico.
    */

    const [stream, setStream] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleChangeStream = (newStream) => {
        setStream(newStream)
    }

    const updateStream = () => {
        getMediaUser.getUpdateStream().then(handleChangeStream).catch(err => console.log(err))
    }
    
    useEffect(()=>{
        rtcPer.init();
        setIsLoading(true);
        getMediaUser.getPermissions().then(handleChangeStream).catch(err => console.log(err))
    },[])



    return (
        <div  className="h-full w-full flex flex-col ">
        <div className="flex items-center justify-center h-full w-full gap-6 flex-wrap">
        <DataContext.Provider value={id} >
        {/* <section className="w-full h-full flex flex-col justify-center center   " >
            <article className="flex justify-around items-center gap-6"> */}
                <div id="localStream" > 
                <CameraView stream={stream}  typeConection={1} updateStream={updateStream}/>
                </div>

              {
                isLoading &&
              (<div id="remoteStream" >
                <CameraView />
                </div>) || 'Loading...'
              } 
            {/* </article>
        </section> */}
        </DataContext.Provider>
        </div>
        </div>
    )
}