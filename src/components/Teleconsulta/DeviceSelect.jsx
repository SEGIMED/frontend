import dataDecives from "@/utils/getDataDecives"
// DeviceSelect.js
import React,{useEffect, useState} from 'react';

export default  function DeviceSelect({onSelectDevice, type })  {
        const [devices,setDevices] = useState('')
    useEffect(()=>{
        const getData = () => {
            if(type === "video") dataDecives.getCamera().then(list => setDevices(list))
            if(type === "audio") dataDecives.getMicrophone().then(list => setDevices(list))
        }
        getData();

        navigator.mediaDevices.addEventListener('devicechange', event => {
                getData();
        });
    },[])
  return (
    <div>

        {
                devices && (
                <select onChange={(e) => onSelectDevice(e.target.value,type)}>
                <option value="">Selecciona un dispositivo</option>
                {devices.map((device) => (
                  <option key={device.id} value={device.id}>
                    {device.name}
                  </option>
                ))}
              </select>) 
        }
    </div>
    
  );
};
