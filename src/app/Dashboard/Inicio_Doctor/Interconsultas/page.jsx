"use client";
import React, { useEffect, useState } from "react";
import DynamicTable from "@/components/table/DynamicTable";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconOptions from "@/components/icons/IconOptions";
import IconAccion from "@/components/icons/IconAccion";
import IconConsulta from "@/components/icons/IconConsulta";
import TableToolBar from "@/components/table/TableToolBar";
import { useRouter } from "next/navigation";
import rutas from "@/utils/rutas";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import Elboton from "@/components/Buttons/Elboton";
import IconMoreInfo from "@/components/icons/IconMoreInfo";

const Page = () => {
  const [interconsultations, setInterconsultations] = useState([]);
  const router = useRouter();
  const id = Cookies.get("c");

  const SolicitarButton = () => {
    return (
      <Elboton
        nombre={"Solicitar"}
        href={`${rutas.Doctor}${rutas.Interconsultas}/Solicitar`}
        icon={<IconMoreInfo color="white" />}
      />
    );
  };

  const getInterconsultations = async () => {
    try {
      const response = await ApiSegimed.get(
        `interconsultations?physicianQueried=${id}&status=6`
      );
      setInterconsultations(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.message,
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    }
  };
  useEffect(() => {
    getInterconsultations();
  }, []);
  const columns = [
    {
      label: "Fecha",
      key: "interconsultationStartTimestamp",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Hora",
      key: "interconsultationStartTimestamp",
      showMobile: false,
      width: "w-8",
    },
    {
      label: "Medico solicitante",
      key: "requestingPhysician.lastname",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Especialidad",
      key: "medicalSpecialty",
      showMobile: false,
      width: "w-16",
    },

    {
      label: "Tipo",
      key: "isPriority",
      showMobile: false,
      width: "w-10",
    },
    {
      label: "Motivo",
      key: "reasonForConsultation",
      showMobile: true,
      width: "w-16",
    },
  ];

  const renderDropDown = (row) => {
    return (
      <MenuDropDown
        label="Mas"
        icon={<IconOptions color="white" />}
        items={[
          {
            label: "Ver detalles",
            icon: <IconConsulta />,
            onClick: () =>
              router.push(`${rutas.Doctor}${rutas.Interconsultas}/${row.id}`),
          },
        ]}
        className={"w-[40px] md:w-full lg:w-fit mx-auto"}
      />
    );
  };
  return (
    <div className="">
      <TableToolBar
        title={"Listado de Interconsultas"}
        showBackButton={false}
        button2={<SolicitarButton />}
      />
      <DynamicTable
        columns={columns}
        rows={interconsultations}
        clickable={false}
        renderDropDown={renderDropDown}
      />
    </div>
  );
};

export default Page;
