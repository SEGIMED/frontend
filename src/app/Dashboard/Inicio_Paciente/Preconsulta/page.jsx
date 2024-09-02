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
import NotFound from "@/components/notFound/notFound";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";

export default function HomePte() {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [consultas, setConsultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSorted, setIsSorted] = useState(false);
  const router = useRouter();
  const currentDate = new Date();

  // Obtener consultas del estado
  const myID = Number(Cookies.get("c"));

  const searchTerm1 = useAppSelector((state) => state.doctores.searchTerm1);
  // const consultas = useAppSelector((state) => state.schedules);

  const getSchedulesByUserId = async () => {
    try {
      setLoading(true);
      const response = await ApiSegimed.get("/schedulesByUserId");
      setConsultas(response.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getSchedulesByUserId();
  }, []);

  useEffect(() => {
    dispatch(setSearchTerm1(""));
  }, [dispatch]);

  // Filtrar consultas con schedulingStatus = 1 y IsApproved = true para ver si las consultas ya estan aprobadas
  const scheduledConsultas = consultas?.filter(
    (consulta) => consulta.schedulingStatus === 1 && consulta.IsApproved
  );

  /* const sortedConsultas = [...scheduledConsultas].sort((b, a) =>
    a.scheduledStartTimestamp.localeCompare(b.scheduledStartTimestamp)
  ) */

  //ordenamiento por fecha desde el front por ahora
  const sortedConsultas = [...scheduledConsultas]
    .sort((a, b) => {
      //el que mas se acerca a la fecha actual
      const diffA = Math.abs(new Date(a.scheduledStartTimestamp) - currentDate);
      const diffB = Math.abs(new Date(b.scheduledStartTimestamp) - currentDate);
      return diffA - diffB;
    })
    .filter((cita) => cita.schedulingStatus === 1);

  const handleSortClick = () => {
    setIsSorted(!isSorted);
  };

  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (loading) {
    return <SkeletonList count={10} />;
  }

  return (
    <div className="h-full text-[#686868] w-full flex flex-col">
      {/* <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
        <button
                    className="flex px-6 py-2 rounded-lg gap-1 items-center bg-[#487FFA]"
                    onClick={handleSortClick}>
                    <p className="text-base font-bold leading-5 text-white text-start">Ordenar</p>
                    <IconOrder />
                </button>
        <button
          className="flex px-6 py-2 rounded-lg gap-1 items-center bg-[#487FFA]"
          onClick={() => {
            router.push(
              `${rutas.PacienteDash}${rutas.Preconsulta}${rutas.Teleconsulta}`
            );
          }}>
          <p className="text-base font-bold leading-5 text-white text-start">
            Teleconsulta
          </p>
        </button>
        <FiltroDocPacientes
                    onClickSort={handleSortClick}
                    isOpen={isFilterOpen}
                    toggleMenu={toggleFilterMenu}
                />
      </div> */}
      <div className="grid grid-cols-4 md:grid-cols-6 items-center border-b border-b-[#cecece] text-center md:text-start p-2 bg-white static md:sticky top-14 z-10 md:z-4 ">
        <p className="font-bold text-[#5F5F5F] ml-1 md:ml-10">Fecha</p>
        <p className="font-bold text-[#5F5F5F]">Hora</p>
        <p className="font-bold text-[#5F5F5F]">Medico</p>
        <p className="font-bold text-[#5F5F5F] hidden md:block">
          Centro de atención
        </p>
        <p className="font-bold text-[#5F5F5F] hidden md:block">
          Motivo de consulta
        </p>
      </div>
      <div className="h-full overflow-auto">
        {(!loading && scheduledConsultas.length) === 0 && (
          <NotFound
            text="No hay historial de preconsultas."
            sizeText="w-[100%]"
          />
        )}
        {sortedConsultas.map((doc) => (
          <DoctorCardConsulta
            key={doc.id}
            doctor={doc}
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
