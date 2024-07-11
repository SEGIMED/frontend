"use client"
import Swal from "sweetalert2";

import IconOptions from "../icons/IconOptions";
import IconMiniCalendar from "../icons/IconMiniCalendar";
import IconTablillaTilde from "../icons/iconTablillaTilde";
import IconCancel from "../icons/iconCancel";



const TurnosButton = () => {

    const cancelTurn= ()=>{
        return Swal.fire({
            title: "¿Quiere Cancelar su Turno?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "No Cancelar",
            denyButtonText: `Cancelar Turno`
          }).then((result) => {
            
            if (result.isConfirmed) {
              Swal.fire("No se cancelo su turno", "", "info");
            } else if (result.isDenied) {
              Swal.fire("Su turno se cancelo con exito", "", "success");
            }
          });
    }


    return (
      <details className="relative w-[60%] md:w-full">
        <summary className="flex justify-center ml-6 md:px-6 py-2 text-white rounded-xl md:gap-3 bg-[#487FFA] items-center cursor-pointer">
          <div className="flex items-center md:gap-1">
            <IconOptions color="#FFFFFF" />
            <span className="hidden md:block">Opciones</span>
          </div>
        </summary>
        <ul className="flex flex-col absolute p-2 bg-white z-40 w-80 right-0 border-2 border-[#D7D7D7] rounded-lg shadow-lg mt-1">
          <span className="flex items-center gap-2 font-medium text-sm px-3 pt-3">
            <IconOptions color="gray"/>
            Opciones
          </span>
          <div className="flex flex-col gap-4 p-5">
          <li
              className="flex items-center gap-3 cursor-pointer">
              <IconTablillaTilde/>
              Completar preconsulta
            </li>
            <li
              className="flex items-center gap-3 cursor-pointer">
              <IconMiniCalendar />
              Reprogramar Turno
            </li>
            <li
               onClick={cancelTurn} 
              className="flex items-center gap-3 cursor-pointer">
              <IconCancel />
              Cancelar Turno
            </li>
          </div>
        </ul>
      </details>
    );
  };
  
  export default TurnosButton;