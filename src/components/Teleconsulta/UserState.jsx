'use client'

import { useState ,useContext, useEffect} from "react"
import DataContext from "./DataContext";
import { socket } from "@/utils/socketio";
import avatar from "@/utils/defaultAvatar";


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
            if(data.target) setDataTarget(data);
            if(data.target.state) setIsReady(true);
        }

        socket._socket.on('updateStateRoom',handleData)
        socket._socket.emit('getUpdateStateRoom',id)
        return () => {
            socket._socket.off('updateStateRoom')
        }
    },[])

    return(
        <div className="h-full w-full flex flex-col items-center justify-center 
        rounded-medium border-solid border-2 border-gray-250 mb-40 bg-gray-200">
           
          
                <img className="w-1/3 h-1/3 mb-10 rounded-full" src={dataTarget?.target?.avatar || avatar } />
           
            <p className="text-bold text-xl">
                {isReady ? `${dataTarget?.name} está esperando..` : `Esperando a ${dataTarget?.name} que se conecte...`}
            </p>
        </div>
    )
}