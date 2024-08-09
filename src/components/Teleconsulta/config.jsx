/*
    Componente pue solo toma la configuración de camara y audio.
    su responsabilidad es tomar los parametros de configuración. recorriendo getUserMedia(); de navigator.
    una vez tenga seleccionado sus dispositivos de medios. se los pasa a sus hijos.
*/


/*
    Componentes Necesarios. 
    Lista de dispositivos.
*/

import { useCallback, useState } from "react"
import SelectDataMedia from "./SelectDataMedia"
export default function Config(){
    const [camera, setCamera] = useState(null)
    const [microfono, setMicrofono] = useState(null)

    const handleOnChangeCamera = (event) => {
        if(event.target){
            const {value} = event.target;
            setCamera(value);
        }
    }
    
    const handleOnChangeMicrofono = (event) => {
        if(event.target){
            const {value} = event.target;
            setMicrofono(value);
        }
    } 

    return (
    <div className="w-full h-full">
        {
            /*
                 Aca componente para mostrar la camara. Se le pasa por props los estados locales de camera, y microphone
            */

        }


       <label>{camera}</label>
       <SelectDataMedia className="w-[500px] h-[300px]" handleOnChange={handleOnChangeCamera} type="videoinput" />
       <label>{microfono}</label>
       <SelectDataMedia className="w-[500px] h-[300px]" handleOnChange={handleOnChangeMicrofono} type="audioinput" />
    </div>)
}