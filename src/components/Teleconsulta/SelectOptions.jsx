'use client'
import { useState } from "react"





export default function SelectOptions({devices,handleOnChange}){
console.log(devices)
    return <select className="w-24 h-8" onChange={handleOnChange}>
         <option value="">Selecciona una cámara</option>
            {
                Array.isArray(devices) && devices.map((device)=>{
                   return(<option key={device.deviceId} value={device.deviceId}>
                    {device.label || `Cámara ${device.deviceId}`}
                    </option>)
                })
            }
    </select>
}