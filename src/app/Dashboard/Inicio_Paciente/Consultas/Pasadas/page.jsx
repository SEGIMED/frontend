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
import { ApiSegimed } from "@/Api/ApiSegimed";
import IconMas from "@/components/icons/iconMas";
import Link from "next/link";
import rutas from "@/utils/rutas";
import IconFolder from "@/components/icons/iconFolder";
import ModalConsultationCalendar from "@/components/modal/ModalDoctor/ModalConsultationCalendar";
import Elboton from "@/components/Buttons/Elboton";
import IconArrowLeft from "@/components/icons/IconArrowLeft";

export default function HomeDocAll() {
    const dispatch = useAppDispatch();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

    const [selectedDocId, setSelectedDocId] = useState(null);
    const consultas = useAppSelector((state) => state.schedules);
    const [scheduledConsultas, setScheduledConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModalConsultation, setShowModalConsultation] = useState(false);
    const [reload, setReload] = useState(false);

    const currentDate = new Date();

    const getSchedulesByUserId = async () => {
        try {
            const response = await ApiSegimed.get("/schedulesByUserId");
            console.log(response.data);

            setScheduledConsultas(response.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        setLoading(true);
        getSchedulesByUserId();
    }, []);
    useEffect(() => {
        dispatch(setSearchTerm1(""));
    }, [dispatch]);

    useEffect(() => {
        dispatch(setSearchBar(true));
        return () => {
            dispatch(setSearchBar(false));
        };
    }, [dispatch]);

    useEffect(() => {
        try {
            if (reload)
                getSchedulesByUserId();
            setReload(false)
        } catch (error) {
            console.log(error);
        }
    }, [reload]);

    //ordenamiento por fecha desde el front por ahora
    const sortedConsultas = [...scheduledConsultas]
        .sort((a, b) => {
            //el que mas se acerca a la fecha actual
            const diffA = Math.abs(new Date(a.scheduledStartTimestamp) - currentDate);
            const diffB = Math.abs(new Date(b.scheduledStartTimestamp) - currentDate);
            return diffA - diffB;
        })
        .filter((cita) => cita.schedulingStatus === 2 && cita.IsApproved === true);

    const toggleFilterMenu = () => {
        setIsFilterOpen(!isFilterOpen);
    };

    const handleReviewModal = (id) => {
        setSelectedDocId(id);
        setIsReviewModalOpen(true);
    };

    return (
        <div className="text-[#686868] h-full w-full flex flex-col">
            <div className="w-full flex justify-center md:justify-between px-2 items-center border-b gap-3 bg-white border-b-[#cecece] pb-2 pt-2">
                {/* <Ordenar /> */}
                <div></div>

                <h1 className="hidden font-bold md:text-xl md:block">Pasadas</h1>
                <div className="flex gap-3 pr-14">
                    <Elboton
                        nombre={"Regresar"}
                        icon={<IconArrowLeft iconColor={"white"} />}
                        href={`${rutas.PacienteDash}${rutas.Historial}`}
                    />
                </div>
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
                {loading && <MensajeSkeleton />}
                {scheduledConsultas.length === 0 && !loading && (
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
            {showModalConsultation && (
                <ModalConsultationCalendar
                    setReload={setReload}
                    isOpen={showModalConsultation}
                    onClose={() => setShowModalConsultation(false)}
                />
            )}
        </div>
    );
}