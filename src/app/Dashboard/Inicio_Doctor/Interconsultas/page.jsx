"use client";
import React from "react";
import DynamicTable from "@/components/table/DynamicTable";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconOptions from "@/components/icons/IconOptions";
import IconOrder from "@/components/icons/IconOrder";
import IconCorazonMini from "@/components/icons/iconCorazon";
import IconPersonalData from "@/components/icons/IconPersonalData";
import IconDelete from "@/components/icons/IconDelete";
import IconMessages from "@/components/icons/IconMessages";
import IconMiniCalendar from "@/components/icons/IconMiniCalendar";
import rutas from "@/utils/rutas";
import IconAccion from "@/components/icons/IconAccion";
import IconConsulta from "@/components/icons/IconConsulta";
import TableToolBar from "@/components/table/TableToolBar";

const Page = () => {
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
      label: "Medico solicitante",
      key: "physicianThatAttend.name",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Especialidad",
      key: "medical_specialty",
      showMobile: false,
      width: "w-16",
    },

    {
      label: "Tipo",
      key: "schedulingStatus",
      showMobile: false,
      width: "w-10",
    },
    {
      label: "Motivo de consulta",
      key: "reasonForConsultation",
      showMobile: true,
      width: "w-16",
    },
  ];

  const data = [
    {
      id: 8,
      patient: 12,
      physician: 2,
      medicalSpecialty: 1,
      scheduledStartTimestamp: "2024-08-14T15:12:00.000Z",
      scheduledEndTimestamp: "2024-08-14T17:42:00.000Z",
      actualEndTimestamp: null,
      actualStartTimestamp: null,
      schedulingStatus: 2,
      typeOfMedicalConsultation: 1,
      IsApproved: true,
      reasonForConsultation: "dolor fuerte3354asdasd asda da",
      healthCenter: 1,
      medical_specialty: 1,
      scheduling_status: 2,
      physicianThatAttend: {
        id: 2,
        idNumber: "442340112",
        idType: 1,
        name: "Carlos Andre",
        lastname: "Soca Pucllas",
        role: 2,
        verified: true,
        avatar: null,
        cellphone: "9123360323",
        nationality: 2,
        lastLogin: "2024-08-07T03:22:50.000Z",
        currentLocation: null,
        geolocation: null,
        treatingPhysician: null,
        id_type: 1,
      },
      patientUser: {
        name: "Santiago",
        lastname: "Paz",
        avatar: null,
        patientPulmonaryHypertensionRisks: null,
      },
      medicalEvent: {
        id: "7",
      },
    },
    {
      id: 12,
      patient: 12,
      physician: 2,
      medicalSpecialty: 1,
      scheduledStartTimestamp: "2024-08-14T15:25:00.000Z",
      scheduledEndTimestamp: "2024-08-14T17:55:00.000Z",
      actualEndTimestamp: null,
      actualStartTimestamp: null,
      schedulingStatus: 1,
      typeOfMedicalConsultation: 1,
      IsApproved: true,
      reasonForConsultation: "dfgdfg",
      healthCenter: 1,
      medical_specialty: 1,
      scheduling_status: 1,
      physicianThatAttend: {
        id: 2,
        idNumber: "442340112",
        idType: 1,
        name: "Carlos Andre",
        lastname: "Soca Pucllas",
        role: 2,
        verified: true,
        avatar: null,
        cellphone: "9123360323",
        nationality: 2,
        lastLogin: "2024-08-07T03:22:50.000Z",
        currentLocation: null,
        geolocation: null,
        treatingPhysician: null,
        id_type: 1,
      },
      patientUser: {
        name: "Santiago",
        lastname: "Paz",
        avatar: null,
        patientPulmonaryHypertensionRisks: null,
      },
      medicalEvent: {
        id: "11",
      },
    },
    {
      id: 9,
      patient: 12,
      physician: 2,
      medicalSpecialty: 1,
      scheduledStartTimestamp: "2024-08-08T15:34:00.000Z",
      scheduledEndTimestamp: "2024-08-08T18:04:00.000Z",
      actualEndTimestamp: null,
      actualStartTimestamp: null,
      schedulingStatus: 1,
      typeOfMedicalConsultation: 1,
      IsApproved: true,
      reasonForConsultation: "dolor fuerte33",
      healthCenter: 1,
      medical_specialty: 1,
      scheduling_status: 1,
      physicianThatAttend: {
        id: 2,
        idNumber: "442340112",
        idType: 1,
        name: "Carlos Andre",
        lastname: "Soca Pucllas",
        role: 2,
        verified: true,
        avatar: null,
        cellphone: "9123360323",
        nationality: 2,
        lastLogin: "2024-08-07T03:22:50.000Z",
        currentLocation: null,
        geolocation: null,
        treatingPhysician: null,
        id_type: 1,
      },
      patientUser: {
        name: "Santiago",
        lastname: "Paz",
        avatar: null,
        patientPulmonaryHypertensionRisks: null,
      },
      medicalEvent: {
        id: "8",
      },
    },
  ];
  const renderDropDown = (row) => {
    return (
      <MenuDropDown
        label="Mas"
        icon={<IconOptions color="white" />}
        items={[
          {
            label: "Resolver",
            icon: <IconAccion />,
          },
          {
            label: "Ver detalles",
            icon: <IconConsulta />,
            onClick: () => console.log("Ver detalles"),
          },
        ]}
        className={"w-[40px] md:w-full lg:w-fit mx-auto"}
      />
    );
  };
  return (
    <div className="">
      <TableToolBar title={"Listado de Interconsultas"} />
      <DynamicTable
        columns={columns}
        rows={data}
        clickable={false}
        title="Consultas"
        renderDropDown={renderDropDown}
      />
    </div>
  );
};

export default Page;
