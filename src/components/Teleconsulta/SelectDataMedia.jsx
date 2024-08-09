'use client'

import { useState, useEffect } from "react"
import SelectOptions from "./selectOptions";

/*

    Este componente se usara para traer los datos de dispositivos de media.

*/


export default function SelectDataMedia({handleOnChange,type}){
     const [listDevice,setListDevice] = useState(null);

     async function getConnectedDevices() {
         const devices = await navigator.mediaDevices.enumerateDevices();
         return devices.filter(device => device.kind === type)
     }

    useEffect(()=>{
        navigator.mediaDevices.addEventListener('devicechange', event => {
            getConnectedDevices().then(listDevice => setListDevice(listDevice))
        });

        getConnectedDevices().then(list => setListDevice(list))

    },[])

    return <div className="w-auto h-auto">
            {
                
                // Array.isArray(listDevice) && listDevice.length && (<SelectOptions className="w-full h-full" handleOnChange={handleOnChange} devices={listDevice}/>) || "Devices not found"
                <select className="w-50 h-8" onChange={handleOnChange}>
                   {
                       Array.isArray(listDevice) && listDevice.map((device)=>{
                          return(<option key={device.deviceId} value={device.deviceId}>
                           {device.label || `Cámara ${device.deviceId}`}
                           </option>)
                       })
                   }
           </select>

            }
    </div>
}