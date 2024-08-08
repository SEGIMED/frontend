'use client'

const { useState, useEffect } = require("react")


/*

    Este componente se usara para traer los datos de dispositivos de media.

*/



function useGetDataMedia(){
 const [constrains, setConstrains] = useState(null);
 const [stream,setStream] = useState(null);

 const openMediaDevices = async (constraints) => {
    return await navigator.mediaDevices.getUserMedia(constraints);
 }

 async function getConnectedDevices(type) {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices.filter(device => device.kind === type)
}


 const handleError = (error) => {
    if (error.name === "OverconstrainedError") { // si se require resoluciones personalizadas.
        console.error(
          `The resolution in px is not supported by your device.`,
        );
      } else if (error.name === "NotAllowedError") {
        console.error(
          "Necesitas dar permisos a la aplicación de Camara y Microfono",
        );
      } else {
        console.error(`getUserMedia error: ${error.name}`, error);
      }
 }

useEffect(()=>{
   
},[constrains])

}