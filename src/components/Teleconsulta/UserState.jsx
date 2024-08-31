'use client'

import { useState ,useContext, useEffect} from "react"
import DataContext from "./DataContext";
import { socket } from "@/utils/socketio";
import avatar from "@/utils/defaultAvatar";
import rtcPer from "@/utils/RTCPeer";


export default function UserState(){

/*
    aca hacer la logica para escuchar cuando el usuario esta listo.
    hacer otro componente, para mostrar los datos de usuarios. 
*/
    const [isReady, setIsReady] = useState(false);
    const [dataTarget, setDataTarget] = useState(null);
    const id = useContext(DataContext);
    
    useEffect(()=>{
        const handleData = (data) => {
            console.log(data)
            if(data.target) setDataTarget(data.target);
        }

        socket._socket.on('updateStateRoom',handleData)
        socket._socket.emit('getUpdateStateRoom',id)
        return () => {
            socket._socket.off('updateStateRoom')
        }
    },[])

    const handleOnCall = () => {
        rtcPer.createOffer(id).then(offer => socket._socket.emit('videoCall',{
            consultId: id,
            message:'newoffer',
            offer

        }))
    }
    return (
        <div className="h-full w-full flex flex-col items-center justify-center 
        rounded-medium border-solid border-2 border-gray-250 mb-40 bg-gray-200">
           
          
                <img className="w-1/3 h-1/3 mb-10 rounded-full" src={dataTarget?.target?.avatar || avatar } />
           
            <p className="text-bold text-xl">
                {dataTarget?.state === 'Listo' ? `${dataTarget?.name} está esperando..` : `Esperando a ${dataTarget?.name || ''} que se conecte...`}
            </p>

            { 
            dataTarget && dataTarget?.role !== 'Médico'  && dataTarget?.state ==='Listo' && <button className="p-6 border-black border-small" onClick={handleOnCall}>Iniciar la llamada</button>
            }
        </div>
    )
}