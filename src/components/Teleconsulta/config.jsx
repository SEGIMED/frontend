/*
    Componente pue solo toma la configuración de camara y audio.
    su responsabilidad es tomar los parametros de configuración. recorriendo getUserMedia(); de navigator.
    una vez tenga seleccionado sus dispositivos de medios. se los pasa a sus hijos.
*/


/*
    Componentes Necesarios. 
    Lista de dispositivos.
*/
import ViewMedia from "./ViewMedia"
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
            camera && microfono && <ViewMedia camera={camera} microphone={microfono} /> ||  "Vista no disponible."

        }
       <label>Camara</label>
       <SelectDataMedia className="w-[500px] h-[300px]" handleOnChange={handleOnChangeCamera} type="videoinput" />
       <label>Microfono</label>
       <SelectDataMedia className="w-[500px] h-[300px]" handleOnChange={handleOnChangeMicrofono} type="audioinput" />
    </div>)
}