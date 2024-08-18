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
        <div className="">
            <p>
                {isReady ? 'Esta preparado ' : 'Esperando que se conecte'}
            </p>
            <div>
                <img className="w-12 h-12" src={dataTarget?.target?.avatar || avatar } />
            </div>
        </div>
    )
}