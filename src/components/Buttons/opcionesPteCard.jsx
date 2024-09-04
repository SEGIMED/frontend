import Image from "next/image";
import opciones from "@/components/images/opciones.png";
import Link from "next/link";
import IconAccion from "@/components/icons/IconAccion";
import IconInfo from "@/components/icons/IconInfo";
import IconGeolocation from "@/components/icons/IconGeolocation";
import IconMessages from "@/components/icons/IconMessages";
import IconMiniCalendar from "@/components/icons/IconMiniCalendar";
import IconTratamiento from "@/components/icons/IconTratamiento";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";
import IconPersonalData from "@/components/icons/IconPersonalData";
import rutas from "@/utils/rutas";
import IconTStar3 from "../icons/iconStar3";
import { socket } from "@/utils/socketio";

export default function OpcionesPteCard(paciente) {
  return (
    <details className="relative">
      <summary className="flex px-6 py-2  text-white bg-[#487FFA] rounded-lg gap-1 items-center cursor-pointer">
        <Image src={opciones} alt="Opciones" />
        <p className="text-start text-white font-bold text-base leading-5">
          Opciones
        </p>
      </summary>
      <ul className="absolute bg-white z-40 p-2 text-start text-[#686868] font-normal text-base leading-6 w-64 right-0 border-2 border-[#D7D7D7] rounded-lg gap-4 mt-2 shadow-lg">
        <li className="flex items-center gap-2 font-medium text-sm leading-4">
          <IconAccion />
          Acciones
        </li>
        <li className="font-normal text-base leading-8 ml-6 flex items-center gap-2">
          <IconMiniCalendar />
          Agendar Consulta
        </li>
        <li className="font-normal text-base leading-8 ml-6 flex items-center gap-2">
          <IconTratamiento />
          Añadir tratamiento
        </li>
        <li className="font-normal text-base leading-8 ml-6 flex items-center gap-2">
          <IconTStar3 />
          Agregar a favoritos
        </li>
        <li className="flex items-center gap-2 font-medium text-sm leading-4">
          <IconInfo />
          Información
        </li>
        <li className="font-normal text-base leading-8 ml-6 flex items-center gap-2">
          <Link
            className="flex items-center gap-2"
            href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${paciente.id}`}>
            <IconClinicalHistory />
            Ver Historia Clínica
          </Link>
        </li>
        <li className="font-normal text-base leading-8 ml-6 flex items-center gap-2">
          <Link
            className="flex items-center gap-2"
            href={`${rutas.Doctor}${rutas.Pacientes}/${paciente.id}`}>
            <IconPersonalData />
            Ver datos Personales
          </Link>
        </li>
        <li className="font-normal text-base leading-8 ml-6 flex items-center gap-2">
          <Link
            className="flex items-center gap-2"
            href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historial}/${paciente.id}`}>
            <IconClinicalHistory /> Ver antiguas consultas
          </Link>
        </li>
        <Link href={`${rutas.Doctor}${rutas.Mensajes}`}>
          <li className="flex items-center gap-2 px-3 cursor-pointer">
            <IconMessages />{" "}
            <button
              onClick={() => {
                socket.emit("createChat", { id });
              }}>
              Iniciar Chat
            </button>
          </li>
        </Link>
        <li className="font-normal text-base leading-8 ml-6 flex items-center gap-2">
          <IconGeolocation />
          Ver Geolocalización
        </li>
      </ul>
    </details>
  );
}
