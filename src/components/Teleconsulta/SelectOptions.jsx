'use client'
import { useState } from "react"





export default function SelectOptions({devices}){
    const [device,setDevice] = useState(null);

    const handleOnChange = (index) => {
        const selectDecive = devices[index];
    }

    return <select onChange={handleOnChange}>
            {
                devices.map((device,index)=>{
                    <option value={index}>{device.label}</option>
                })
            }
    </select>
}