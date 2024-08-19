"use client"

import TableToolBar from "@/components/table/TableToolBar"
import DynamicTable from "@/components/table/DynamicTable";
import IconOptions from "@/components/icons/IconOptions";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import { useState, useEffect } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import IconEdit from "@/components/icons/IconEdit";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import ModalSugerencia from "@/components/modal/modalAdmin/sugerencias/modalSugerencias";
import IconDelete from "@/components/icons/IconDelete";
import ModalEstudios from "@/components/modal/modalEntries/ModalEstudios";
import { useRouter } from "next/navigation";
import rutas from "@/utils/rutas";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";

export default function Sugerencias() {

    const [scheduledConsultas, setScheduledConsultas] = useState([]);
    const [selectedEstudio, setSelectedEstudio] = useState();
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    const router = useRouter()


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
        try {
            setLoading(true);
            getSchedulesByUserId();
        } catch (error) {
            console.log(error);
        }
    }, []);



    const renderDropDown = (row) => {
        return (
            <MenuDropDown
                label="Opciones"
                icon={<IconOptions color="white" />}
                categories={[
                    {
                        items: [
                            {
                                label: "Ver archivo",
                                icon: <IconEdit color={"#B2B2B2"} />,
                                onClick: () => { setSelectedEstudio(row) }
                            },
                            {
                                label: "Ir al historial clinico",
                                icon: <IconClinicalHistory color={"#B2B2B2"} />,
                                onClick: () => { router.push(`${rutas.Entries}`) }
                            },
                            {
                                label: "Ver descripcion ",
                                icon: <IconOptions color="#B2B2B2" />,
                                onClick: () => { setSelectedEstudio(row); setShowModal(true) }
                            },
                        ].filter(Boolean),
                    },
                ]}
                className={"w-[40px] md:w-full lg:w-fit mx-auto"}
            />
        );
    };

    const columns = [
        {
            label: "Fecha",
            key: "scheduledStartTimestamp",
            showMobile: true,
            width: "w-8",
        },
        {
            label: "Hora",
            key: "scheduledStartTimestamp",
            showMobile: false,
            width: "w-8",
        },
        {
            label: "Paciente",
            key: "patientUser.name",
            showMobile: true,
            width: "w-16",
        },
        {
            label: "Categoría",
            key: "reasonForConsultation",
            showMobile: false,
            width: "w-16",
        },
        {
            label: "Descripción",
            key: "reasonForConsultation",
            showMobile: false,
            width: "w-16",
        },
    ];


    return (
        <div className="h-full w-full"> <TableToolBar title={"Estudios"} showBackButton={true} />
            <DynamicTable
                columns={columns}
                rows={scheduledConsultas}
                showHistoryIcon={true}
                clickable={false}
                renderDropDown={renderDropDown}
                textError={"No hay estudios"}
                loading={loading}
            />
            <ModalModularizado
                isOpen={showModal}
                onClose={() => { setShowModal(false); }}
                Modals={[<ModalEstudios state={selectedEstudio} disabled={true} key={"ModalEstudios"} />]}
                title={"Ver descripción"}
                button1={"hidden"}
                button2={"bg-greenPrimary text-white block font-font-Roboto"}
                progessBar={"hidden"}
                size={"h-fit md:h-fit md:w-[35rem]"}
                buttonText={{ end: `Ver estudios` }}
            />
        </div>
    )
}