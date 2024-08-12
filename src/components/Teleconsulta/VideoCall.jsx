import { socket } from "@/utils/socketio"
import rtcPer from "@/utils/RTCPeer"
import dataDecives from "@/utils/getDataDecives"

import { useEffect, useState } from "react"

import ViewCamera from "./ViewCamera"


export default function VideoCall({consultId,Role}){
        const [data,setData] = useState('');
        const [localStream, setLocalStream] = useState('')
        const [remoteStream,setRemoteStream] = useState('')

        const handleRemoteStream = (stream) => setRemoteStream(stream)
    useEffect(()=>{
        if(!data){
            // rtcPer.init(consultId);
    
            dataDecives.registerDecives().then(stream =>{
                setLocalStream(stream)
                socket._socket.emit('joinRoom',consultId);
            })
        }

        socket._socket.on('dataRoom', (newData) => {
            setData(newData);
            console.log(newData)
            if(Role === "Médico" && newData.patient.state){
                    rtcPer.createOffer(consultId).then(offer => {
                        if(!rtcPer.state){        
                                socket.emit('sendOffer',{id:consultId,offer});
                        }
                    });
                } else {
                    socket._socket.on('onOffer',(offer) =>{
                        rtcPer.setRemoteDescription(offer)
                        .then(()=> rtcPer.createAsw(consultId))
                        .then((asw) =>{
                            socket.emit('sendAsw',{id:consultId,asw});
                        })
                    })
                }
            

        })
    },[])


    return (
        <div className="flex">
                <ViewCamera className="w-40 h-10" deviceId= {dataDecives._preferentCamera} type="local"/>
                {

                 data && <ViewCamera className="w-40 h-10" type="remote" handleRemoteStream={handleRemoteStream}/>
                }
        </div>
    )
}
