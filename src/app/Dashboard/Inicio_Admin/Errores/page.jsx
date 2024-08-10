"use client"

import TableToolBar from "@/components/table/TableToolBar"
import DynamicTable from "@/components/table/DynamicTable";
import IconOptions from "@/components/icons/IconOptions";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import { useState, useEffect } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import IconEdit from "@/components/icons/IconEdit";
import IconDelete from "@/components/icons/IconDelete";
import ModalErrores from "@/components/modal/modalAdmin/Errores/modalErrores";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";

export default function Errores() {

    const [scheduledConsultas, setScheduledConsultas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedError, setSelectedError] = useState();


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
                                label: "Ver Detalles",
                                icon: <IconOptions color={"#B2B2B2"} />,
                                onClick: () => { setSelectedError(row); setShowModal(true) }
                            },
                            {
                                label: "Responder",
                                icon: <IconEdit color={"#B2B2B2"} />,
                                onClick: () => { setSelectedSugerencia(row) }
                            },
                            {
                                label: "Eliminar ",
                                icon: <IconDelete color="#B2B2B2" />,
                                // onClick: () => handleDeleteClick(row),
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
            label: "Usuario",
            key: "patientUser.name",
            showMobile: true,
            width: "w-16",
        },
        {
            label: "Sugerencia",
            key: "reasonForConsultation",
            showMobile: false,
            width: "w-16",
        },
    ];

    console.log(scheduledConsultas);

    return (
        <div className="h-full w-full"> <TableToolBar title={"Errores"} showBackButton={true} />
            <DynamicTable
                columns={columns}
                rows={scheduledConsultas}
                showHistoryIcon={true}
                clickable={false}
                renderDropDown={renderDropDown}
                textError={"No hay errores"}
                loading={loading}
            />
            <ModalModularizado
                isOpen={showModal}
                onClose={() => { setShowModal(false); }}
                Modals={[<ModalErrores state={selectedError} disabled={true} key={"modalErrores"} />]}
                title={"Detalles del error"}
                button1={"hidden"}
                button2={"bg-greenPrimary text-white block font-font-Roboto"}
                progessBar={"hidden"}
                size={"h-fit md:h-fit md:w-[35rem]"}
                buttonText={{ end: `Responder` }}
            />
        </div>
    )
}