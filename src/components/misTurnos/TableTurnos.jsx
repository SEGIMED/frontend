"use client"

import IconTablillaTilde from "../icons/iconTablillaTilde";
import {Hora, Fecha} from "@/utils/NormaliceFechayHora";
import TurnosButton from "./buttonTurnos";


export default function TableTurnos ({consultas}){
   
    return (
        <div className="flex flex-col">
          
            {consultas?.map((consulta, index) => (
              <div
                key={index}
                className="grid md:grid-cols-7 grid-cols-5 items-center border-b border-b-[#cecece] md:pr-6 py-2 md:px-2 bg-white w-full h-14 text-center md:text-start">
                <div className="text-[#5F5F5F] flex items-center justify-center md:justify-start md:gap-4">
                  <span className="hidden md:block ">
                  <IconTablillaTilde/>
                  </span>
                  <p>{Fecha(consulta?.scheduledStartTimestamp)}</p>
                </div>
                <span className="text-[#5F5F5F]">
                {Hora(consulta?.scheduledStartTimestamp)}
                </span>
                <div className="text-[#5F5F5F]">
                  {consulta?.physicianThatAttend?.name} {consulta?.physicianThatAttend?.lastname}
                </div>
                <div className="text-[#5F5F5F] hidden md:block ">
                {consulta?.healthCenter === 1 ? "Centro Gallegos" : consulta?.healthCenter}
                </div>
                {/* <div className="text-[#5F5F5F]"></div> */}
                <div className="text-[#5F5F5F] hidden md:block">
                  {consulta?.reasonForConsultation}
                </div>
                <div className="text-[#5F5F5F] "> 
                {consulta?.typeOfMedicalConsultation === 1 ? "Presencial" : "Teleconsulta"}
                </div>
                <div>
                <TurnosButton idDoc={consulta.physician}/>
                </div>
                
              </div>
            ))}
         
        </div>
      );
}