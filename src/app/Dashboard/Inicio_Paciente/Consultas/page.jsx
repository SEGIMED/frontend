"use client";

import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSearchTerm1 } from "@/redux/slices/doctor/allDoctores";
import MensajeSkeleton from "@/components/skeletons/MensajeSkeleton";

import OptDocCardHistorial from "@/components/Buttons/optDocCardHistorial";
import DoctorCardConsulta from "@/components/card/docCardConsulta";
import Cookies from "js-cookie";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconCorazonMini from "@/components/icons/iconCorazon";
import ReviewModal from "@/components/modal/ReviewModal";
import IconOptions from "@/components/icons/IconOptions";
import NotFound from "@/components/notFound/notFound";
import { setSearchBar } from "@/redux/slices/user/searchBar";

export default function HomeDocAll() {
  const dispatch = useAppDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState(null);
  const consultas = useAppSelector((state) => state.schedules);

  const [isSorted, setIsSorted] = useState(false);

  const searchTerm1 = useAppSelector((state) => state.doctores.searchTerm1);

  useEffect(() => {
    dispatch(setSearchTerm1(""));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSearchBar(true));
    return () => {
      dispatch(setSearchBar(false));
    };
  }, [dispatch]);

  const scheduledConsultas = consultas?.filter(
    (consulta) => consulta.schedulingStatus !== 1
  );
  //ordenamiento por fecha desde el front por ahora 
  const sortedConsultas = [...scheduledConsultas].sort((b, a) =>
    a.scheduledStartTimestamp.localeCompare(b.scheduledStartTimestamp)
  )
  const toggleFilterMenu = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleReviewModal = (id) => {
    setSelectedDocId(id);
    setIsReviewModalOpen(true);
  };

  if (!consultas) {
    return <MensajeSkeleton />;
  }

  return (
    <div className="text-[#686868] h-full w-full flex flex-col">
      <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
        {/* <button 
                    className="flex px-6 py-2 rounded-xl gap-1 items-center bg-[#487FFA]" 
                    onClick={handleSortClick}>
                    <p className="text-start text-white font-bold text-base leading-5">Ordenar</p>
                    <IconOrder />
                </button> */}
        <div>Historial de consultas</div>

        {/* <FiltroDocPacientes
                    onClickSort={handleSortClick}
                    isOpen={isFilterOpen}
                    toggleMenu={toggleFilterMenu}                
                /> */}
      </div>
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
      <div className="overflow-auto h-full">
        {scheduledConsultas.length === 0 && (
          <NotFound text="No hay consultas registradas" />
        )}
        {sortedConsultas?.map((doc) => (
          <DoctorCardConsulta
            key={doc.id}
            doctor={doc}
            button={
              // <OptDocCardHistorial id={doc.id} />
              <MenuDropDown
                icon={<IconOptions color="white" />}
                label="Opciones"
                categories={[
                  {
                    title: "Información",
                    items: [
                      {
                        label: "Dejar Review",
                        icon: <IconCorazonMini />,
                        onClick: () => handleReviewModal(doc.physician),
                      },
                    ],
                  },
                ]}
              />
            }
          />
        ))}
      </div>
      {isReviewModalOpen && (
        <ReviewModal
          onClose={() => setIsReviewModalOpen(false)}
          idDoc={selectedDocId}
        />
      )}
    </div>
  );
}
