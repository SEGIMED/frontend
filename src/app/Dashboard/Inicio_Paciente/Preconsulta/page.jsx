"use client";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import rutas from "@/utils/rutas";
import { setSearchTerm1 } from "@/redux/slices/doctor/allDoctores";
import FiltroDocPacientes from "@/components/Buttons/FiltrosDocPacientes";
import IconOrder from "@/components/icons/IconOrder";
import Cookies from "js-cookie";
import MensajeSkeleton from "@/components/skeletons/MensajeSkeleton";
import Ver from "@/components/Buttons/optPreconsulta";
import DoctorCardConsulta from "@/components/card/docCardConsulta";
import { useRouter } from "next/navigation";
import { ApiSegimed } from "@/Api/ApiSegimed";

export default function HomePte() {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const router = useRouter();

  // Obtener consultas del estado
  const myID = Number(Cookies.get("c"));

  const searchTerm1 = useAppSelector((state) => state.doctores.searchTerm1);
  const consultas = useAppSelector((state) => state.schedules);

  useEffect(() => {
    dispatch(setSearchTerm1(""));
  }, [dispatch]);

  // Filtrar consultas con schedulingStatus = 1 y paciente = myID, y extraer los IDs de los docs
  const scheduledConsultas = consultas?.filter(
    (consulta) => consulta.schedulingStatus === 1
  );

  const handleSortClick = () => {
    setIsSorted(!isSorted);
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (!consultas) {
    return <MensajeSkeleton />;
  }

  if (!scheduledConsultas.length) {
    return <div>No existen preconsultas registradas</div>;
  }

  return (
    <div className="h-full text-[#686868] w-full flex flex-col">
      <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
        {/* <button
                    className="flex px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]"
                    onClick={handleSortClick}>
                    <p className="text-start text-white font-bold text-base leading-5">Ordenar</p>
                    <IconOrder />
                </button> */}
        <button
          className="flex px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]"
          onClick={() => {
            router.push(
              `${rutas.PacienteDash}${rutas.Preconsulta}${rutas.Teleconsulta}`
            );
          }}>
          <p className="text-start text-white font-bold text-base leading-5">
            Teleconsulta
          </p>
        </button>
        {/* <FiltroDocPacientes
                    onClickSort={handleSortClick}
                    isOpen={isFilterOpen}
                    toggleMenu={toggleFilterMenu}
                /> */}
      </div>
      <div className="items-start justify-center w-full overflow-y-auto">
        {scheduledConsultas.map((doc) => (
          <DoctorCardConsulta
            key={doc.id}
            doctor={doc}
            consulta={doc.consulta}
            button={
              <Ver
                id={doc.id}
                ruta={`${rutas.PacienteDash}${rutas.Preconsulta}/${doc.id}`}
              />
            }
          />
        ))}
      </div>
    </div>
  );
}
