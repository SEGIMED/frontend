import { socket } from "@/utils/socketio"
import { useEffect, useState } from "react"




export default function StateTarget() {
//estilisar, dejar como en la imagen.
    const [data,setData] = useState('');

    useEffect(()=>{
        socket._socket.on('updateStateUsers',(data) => {
            setData(data);
        })
    },[])

    return (
        <div>
            {
                data && (
                    <div className="w-32 h-20 text-center border-blue-400 items-center">
                    <p>{data.target.name}</p>
                    <p>{data.target.status}</p>
                    </div>
                )
            }
        </div>
    )
}
