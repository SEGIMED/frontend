'use client'
import { useEffect, useMemo, useState } from "react";
import getMediaUser from "./getMediaUser";
import IconMicrophone from "../icons/IconMicrophone";
import Camera from "./Camera";
import Microphone from "./Microphone";

export default function SelectDevices({updateStream}){
       const [listDecives , setListDecives] = useState(null);
       const [MicrophoneSelected, setMicrophoneSelected] = useState(null);
       const [CameraSelected, setCameraSelected] = useState(null);
    

       const setPreferent = (type,id) => {
       
        if(type==="audio"){
           getMediaUser.preferent.audio = id;
    
        } else {
            getMediaUser.preferent.video = id;
        }
        updateStream()
       }

       const handleChangeCamera = (id) => { setPreferent('video',id); setCameraSelected(id)}
       const handleChangeMicrophone = (id) => { setPreferent('audio',id);setMicrophoneSelected(id) }

       const filterCameraList = useMemo(()=>{
            if(listDecives){
                const cameraList = listDecives.filter(device => device.kind === "videoinput");
                return cameraList
            } else {
                return []
            }
       },[listDecives])

    const filterMicrophoneList = useMemo(()=>{
        if(listDecives){
            const microphoneList = listDecives.filter(device => device.kind === "audioinput");
            return microphoneList
        } else {
            return []
        }
   },[listDecives])
       
      
    useEffect(()=>{

        const getList = async () => {
            const list =  await getMediaUser.getListDevices();
            if(list){
                setListDecives(list);
            }
        }
        navigator.mediaDevices.addEventListener('devicechange', event => {
            getList()
        });

        if(!listDecives) getList()
        

    },[])


    return listDecives && (

             <div className="flex justify-end items-end gap-5">
                <Microphone filterMicrophoneList={filterMicrophoneList} handleChangeMicrophone={handleChangeMicrophone}/>
                <Camera filterCameraList={filterCameraList} handleChangeCamera={handleChangeCamera}/>
                </div>
   
    )
}