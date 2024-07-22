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

  const scheduledConsultas = consultas?.filter(
    (consulta) => consulta.schedulingStatus !== 1
  );

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

  if (!scheduledConsultas.length) {
    return <div>No existen consultas registradas</div>;
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
      <div className="items-start justify-center w-full h-full overflow-y-auto">
        {scheduledConsultas?.map((doc) => (
          <DoctorCardConsulta
            key={doc.id}
            doctor={doc}
            consulta={doc.consulta}
            button={
              // <OptDocCardHistorial id={doc.id} />
              <MenuDropDown
                label="Más"
                categories={[
                  {
                    title: "Información",
                    items: [
                      {
                        label: "Dejar Review",
                        icon: <IconCorazonMini />,
                        onClick: () => handleReviewModal(doc.id),
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
