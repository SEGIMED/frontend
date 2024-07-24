"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";
import IconOptions from "../icons/IconOptions";
import IconMiniCalendar from "../icons/IconMiniCalendar";
import IconTablillaTilde from "../icons/iconTablillaTilde";
import IconCancel from "../icons/iconCancel";
import rutas from "@/utils/rutas"; // Asegúrate de que esto esté correctamente importado
import IconCorazonMini from "../icons/iconCorazon";
import ReviewModal from "../modal/ReviewModal";

const TurnosButton = ({ idDoc }) => {
  const [flag, setFlag] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    if (
      pathname === `${rutas.PacienteDash2}${rutas.Mis_turnos}${rutas.Pasadas}`
    ) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [pathname]);

  const cancelTurn = () => {
    return Swal.fire({
      title: "¿Quiere Cancelar su Turno?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "No Cancelar",
      denyButtonText: `Cancelar Turno`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("No se canceló su turno", "", "info");
      } else if (result.isDenied) {
        Swal.fire("Su turno se canceló con éxito", "", "success");
      }
    });
  };

  return (
    <div className="relative">
      <details className="relative w-[60%] md:w-full">
        <summary className="flex justify-center ml-6 md:px-6 py-2 px-6 text-white rounded-xl md:gap-3 bg-[#487FFA] items-center cursor-pointer">
          <div className="flex items-center md:gap-1">
            <IconOptions color="#FFFFFF" />
            <span className="hidden md:block">Opciones</span>
          </div>
        </summary>
        {!flag ? (
          <ul className="flex flex-col absolute p-2 bg-white z-40 w-80 right-0 border-2 border-[#D7D7D7] rounded-lg shadow-lg mt-1">
            <span className="flex items-center gap-2 font-medium text-sm px-3 pt-3">
              <IconOptions color="gray" />
              Opciones
            </span>
            <div className="flex flex-col gap-4 p-5">
              <li className="flex items-center gap-3 cursor-pointer">
                <IconTablillaTilde />
                Completar preconsulta
              </li>
              <li className="flex items-center gap-3 cursor-pointer">
                <IconMiniCalendar />
                Reprogramar Turno
              </li>
              <li
                onClick={cancelTurn}
                className="flex items-center gap-3 cursor-pointer">
                <IconCancel className="w-6" />
                Cancelar Turno
              </li>
            </div>
          </ul>
        ) : (
          <ul className="flex flex-col absolute p-2 bg-white z-40 w-80 right-0 border-2 border-[#D7D7D7] rounded-lg shadow-lg mt-1">
            <span className="flex items-center gap-2 font-medium text-sm px-3 pt-3">
              <IconOptions color="gray" />
              Opciones
            </span>
            <div className="flex flex-col gap-4 p-5">
              <li
                onClick={() => setIsReviewModalOpen(true)}
                className="flex items-center gap-3 cursor-pointer">
                <IconCorazonMini />
                Dejar review
              </li>
              <li className="flex items-center gap-3 cursor-pointer">
                <IconOptions color="lightGray" />
                Ver Consulta
              </li>
            </div>
          </ul>
        )}
      </details>
      {isReviewModalOpen && (
        <ReviewModal
          onClose={() => setIsReviewModalOpen(false)}
          idDoc={idDoc}
        />
      )}
    </div>
  );
};

export default TurnosButton;
