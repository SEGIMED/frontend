import IconAccion from "@/components/icons/IconAccion";
import IconMiniCalendar from "@/components/icons/IconMiniCalendar";
import IconPersonalData from "@/components/icons/IconPersonalData";
import IconOptions from "../icons/IconOptions";
import rutas from "@/utils/rutas";
import Link from "next/link";
import IconMessages from "../icons/IconMessages";

export default function OpcionesDocCard({
  onDetailClick,
  id,
  onConsultationClick,
}) {
  return (
    <details className="relative">
      <summary className="flex justify-center px-6 py-2 text-white bg-[#487FFA] rounded-lg gap-3 items-center cursor-pointer">
        <IconOptions color="#FFFFFF" />
        <p className="text-white font-bold">Opciones</p>
      </summary>

      <ul className="absolute bg-white z-40 p-5 w-64 right-0 border-2 border-[#D7D7D7] rounded-lg gap-4 mt-2 shadow-lg">
        <li className="flex items-center gap-2 font-medium text-sm">
          <IconAccion />
          Acciones
        </li>

        <li
          className="flex items-center gap-2 p-3 cursor-pointer"
          onClick={() => onConsultationClick(id)} // Pasar el id al hacer clic
        >
          <IconMiniCalendar />
          Solicitar Consulta
        </li>

        <div className="border-b-2"></div>

        <li className="flex items-center gap-2 font-medium text-sm py-5">
          <IconPersonalData />
          Información
        </li>

        <li
          className="flex items-center gap-2 px-3 mb-3 cursor-pointer"
          onClick={() => onDetailClick(id)} // Pasar el id al hacer clic
        >
          <IconPersonalData />
          Ver Detalles
        </li>

        <Link href={`${rutas.PacienteDash}${rutas.Mensajes}`}>
          <li className="flex items-center gap-2 px-3 cursor-pointer">
            <IconMessages /> <button>Ver Mensajes</button>
          </li>
        </Link>
      </ul>
    </details>
  );
}
