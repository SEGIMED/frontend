"use client";
import { Fragment, useState } from "react";
import RealColorRisk from "@/utils/realColor";
import IconRisk from "../icons/iconRisk";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import IconConsulta from "../icons/IconConsulta";
import NotFound from "../notFound/notFound";
import SkeletonList from "../skeletons/HistorialSkeleton";
import { specialitySwitch } from "@/utils/medicalSpecialitys";
import { healthCenterSwitch } from "@/utils/healthCenters";
import Link from "next/link";
import rutas from "@/utils/rutas";

//Ejemplo con consulta (data)
// [{
//   id: 8,
//   patient: 12,
//   physician: 2,
//   medicalSpecialty: 1,
//   scheduledStartTimestamp: "2024-08-14T15:12:00.000Z",
//   scheduledEndTimestamp: "2024-08-14T17:42:00.000Z",
//   actualEndTimestamp: null,
//   actualStartTimestamp: null,
//   schedulingStatus: 2,
//   typeOfMedicalConsultation: 1,
//   IsApproved: true,
//   reasonForConsultation: "dolor fuerte",
//   healthCenter: 1,
//   medical_specialty: 1,
//   scheduling_status: 2,
//   physicianThatAttend: {
//     id: 2,
//     idNumber: "442340112",
//     idType: 1,
//     name: "Andre",
//     lastname: "Soca",
//     role: 2,
//     verified: true,
//     avatar: null,
//     cellphone: "9126763366",
//     nationality: 2,
//     lastLogin: "2024-08-07T03:22:50.000Z",
//     currentLocation: null,
//     geolocation: null,
//     treatingPhysician: null,
//     id_type: 1,
//   },
//   patientUser: {
//     name: "Santiago",
//     lastname: "Paz",
//     avatar: null,
//     patientPulmonaryHypertensionRisks: null,
//   },
//   medicalEvent: {
//     id: "7",
//   },
// }]

// Helper function to format dates
const formatDate = (dateString) => {
  const date = new Date(dateString);
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (mm < 10) {
    mm = `0${mm}`;
  }
  if (dd < 10) {
    dd = `0${dd}`;
  }
  return `${dd}/${mm}`;
};

// Helper function to format hours
const formatHour = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatTypeInterconsult = (isPriority) =>
  isPriority ? "Prioritaria" : "Rutina";

const getStatusScheduleTextAndColor = (status) => {
  switch (status) {
    case 1: // Agendada
      return { text: "Agendada", color: "text-[#686868]" }; // Color normal
    case 2: // Atendida
      return { text: "Atendida", color: "text-green-500" }; // Verde
    case 3: // Cancelada
      return { text: "Cancelada", color: "text-red-500" }; // Rojo
    case 4: // No atendida
      return { text: "No atendida", color: "text-red-500" }; // Rojo
    default:
      return { text: "Desconocido", color: "text-[#686868]" }; // Color por defecto
  }
};
function DynamicTable({
  columns,
  rows,
  clickable = false,
  title,
  renderDropDown,
  showRisks,
  renderCustomContent,
  showHistoryIcon,
  textError,
  loading,
  firstRowComponent,
}) {
  const [activeIndex, setActiveIndex] = useState(null); // Track which row's content is visible

  const handleRowClick = (index) => {
    if (clickable) {
      setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    }
  };

  const formatPatientName = (row) => {
    return (
      <Link
        href={`${rutas.Doctor}${rutas.Pacientes}${rutas.Historia_Clinica}/${row.patient}`}>
        <p className="text-start text-[#686868] font-normal text-base leading-6">
          {row.patientUser.name} {row.patientUser.lastname}
        </p>
      </Link>
    );
  };
  const formatMedicoName = (row) => {
    return `${row.physician.name} ${row.physician.lastname}`;
  };
  // Helper function to translate healthCenter values

  const renderPatientPulmonaryRisk = (row) => {
    return (
      <div className="w-fit mx-auto">
        {row?.patientUser?.patientPulmonaryHypertensionRisks?.risk ? (
          <RealColorRisk
            risk={row.patientUser?.patientPulmonaryHypertensionRisks?.risk}
          />
        ) : (
          <IconRisk color="lightGray" />
        )}
      </div>
    );
  };

  const formatIsApproved = (boolean) => {
    return boolean === true ? "Aprobado" : "No Aprobado";
  };

  const formatHpGroups = (row) => {
    if (
      row.appSch &&
      row.appSch.patientUser &&
      Array.isArray(row.appSch.patientUser.userHpGroups)
    ) {
      if (row.appSch.patientUser.userHpGroups.length > 0) {
        return row.appSch.patientUser.userHpGroups
          .map((group) => group.catHpGroup.name)
          .join(",");
      } else {
        return "Sin asignar";
      }
    }
    return [];
  };

  const isRowEmpty = (row) => {
    // Verifica si todas las columnas relevantes están vacías
    return columns.every((column) => {
      const value = column.key?.includes(".")
        ? column.key.split(".").reduce((acc, part) => acc && acc[part], row)
        : row[column.key];
      return value === null || value === undefined || value === "";
    });
  };

  const filteredRows = rows?.filter((row) => !isRowEmpty(row));
  const getAttentionCenter = (row) => {
    return row.reasonForConsultation == "Autoevaluación"
      ? row.attendancePlace
      : row.appSch.attendancePlace?.alias;
  };
  const getReasonForConsultation = (row) => {
    return row.reasonForConsultation == "Autoevaluación"
      ? row.reasonForConsultation
      : row.appSch?.reasonForConsultation;
  };
  const getAttentionCenterSV = (row) => {
    return row.appSch ? row.appSch?.attendancePlace?.alias : "En Casa";
  };
  const getReasonForConsultationSV = (row) => {
    return row.appSch ? row.appSch?.reasonForConsultation : "Autoevaluación";
  };
  const getValueFromKey = (obj, key) => {
    return key.split(".").reduce((acc, part) => acc && acc[part], obj);
  };
  const renderColumnContent = (column, row) => {
    const value = getValueFromKey(row, column.key);

    switch (column.label) {
      //Recibe timestamps
      case "Fecha":
        return formatDate(value);
      //Recibe timestamps
      case "Hora":
        return formatHour(value);
      //Recibe el array de objetos de htpgroups
      case "Grupo HTP":
        return formatHpGroups(row);
      //Para cuando reciba solo el id del centro de salud
      case "Centro de atencion":
        return healthCenterSwitch(value);
      case "Paciente":
        return formatPatientName(row);
      case "Médico":
        return formatMedicoName(row);
      case "Tipo":
        return formatTypeInterconsult(value);
      case "Especialidad":
        return specialitySwitch(value);
      //Excepciones especial para autoevaluacion que puede tener en 2 lugares distiton estos 2 valores
      case "Motivo de Consulta":
        return getReasonForConsultation(row);
      case "Centro de Atencion":
        return getAttentionCenter(row);
      //Excepciones especial para autoevaluacion que puede tener en 2 lugares distiton estos 2 valores
      case "Motivo de Consulta ":
        return getReasonForConsultationSV(row);
      case "Centro de Atención":
        return getAttentionCenterSV(row);
      default:
        return value;
    }
    // case column.key === "patientUser.name":
    //   return formatPatientName(row);

    // case column.key === "healthCenter":
    //   return healthCenterSwitch(row[column.key]);

    // case column.label === "Especialidad":
    //   return specialitySwitch(row[column.key]);

    // case column.key == "isPriority":
    //   return formatTypeInterconsult(row[column.key]);

    // case column.label === "Fecha":
    //   return formatDate(row[column.key]);

    // case column.label === "Hora":
    //   return formatHour(row[column.key]);

    //Para acceder a una propiedad de un objeto
  };
  if (loading) {
    return <SkeletonList count={10} />;
  }

  return (
    <>
      {title && (
        <h1 className="py-2 lg:py-3 text-[#686868] text-center font-semibold text-lg lg:text-xl leading-6 border-b bg-white border-b-[#cecece]">
          {title}
        </h1>
      )}
      <table className="min-w-full divide-y divide-gray-200 font-Poppins">
        <thead className="bg-gray-50 text-[#686868] ">
          <tr>
            {/* Risk column */}
            {showRisks && (
              <th className="lg:pl-[3%] py-2 text-center w-[10px] md:w-[10px] hidden md:table-cell"></th>
            )}
            {showHistoryIcon && (
              <th className="lg:pl-[3%] py-2 text-center w-[10px] md:w-[10px] hidden md:table-cell"></th>
            )}
            {columns.map((column, index) => (
              <th
                key={index}
                className={`${
                  index == 0 && !showRisks && !showHistoryIcon && "lg:pl-[3%]"
                } lg:px-2 font-normal py-2 lg:text-left text-center ${
                  column.showMobile ? "table-cell" : "hidden md:table-cell"
                }  max-w-[60px] xs:max-w-[70px] md:max-w-[100px] ${
                  column.width
                }`}>
                {column.label}
              </th>
            ))}
            {/* Dropdown - Arrow column */}
            <th className="lg:pr-3 py-2 text-left  w-[30px] md:w-[80px]"></th>
          </tr>
        </thead>
        <tbody className="bg-white  lg:text-left text-center text-[#686868]">
          {firstRowComponent && !loading && (
            <td
              colSpan={7}
              className="pr-[5%] pl-[2%] border-b-[1px] border-b-[#D7D7D7] py-2">
              {firstRowComponent}
            </td>
          )}
          {filteredRows?.length > 0 ? (
            filteredRows?.map((row, rowIndex) => (
              <Fragment key={rowIndex}>
                <tr
                  className={`hover:bg-gray-100 ${
                    clickable ? "cursor-pointer" : "cursor-default"
                  } border-b-[1px] border-b-[#D7D7D7] `}
                  onClick={() => handleRowClick(rowIndex)}>
                  {showRisks && (
                    <td className="py-2 lg:pl-[2%] w-[10px] max-w-[10px] hidden md:table-cell">
                      {renderPatientPulmonaryRisk(row)}
                    </td>
                  )}
                  {showHistoryIcon && (
                    <td className="py-2 lg:pl-[2%] w-[10px] max-w-[10px] hidden md:table-cell">
                      <IconConsulta />
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className={`${
                        colIndex === 0 &&
                        !showRisks &&
                        !showHistoryIcon &&
                        "lg:pl-[2%]"
                      }  lg:px-[2%] py-2 text-[#686868] whitespace-normal ${
                        column.showMobile
                          ? "table-cell"
                          : "hidden md:table-cell"
                      }  xs:max-w-[60px] md:max-w-[100px]  ${column.width} `}>
                      {renderColumnContent(column, row)}
                    </td>
                  ))}
                  {renderDropDown && (
                    <td className="py-2 lg:pr-3 ps-3 w-[40px] max-w-[50px] lg:max-w-[80px]">
                      {renderDropDown(row)}
                    </td>
                  )}
                  {clickable && (
                    <td className="py-2 lg:pr-3 ps-3 w-[40px] max-w-[50px] lg:max-w-[80px]">
                      {activeIndex === rowIndex ? (
                        <IconArrowDetailDown />
                      ) : (
                        <IconArrowDetailUp />
                      )}
                    </td>
                  )}
                </tr>

                {clickable && activeIndex === rowIndex && (
                  <tr>
                    <td colSpan={columns.length + 2}>
                      <div>
                        {renderCustomContent && renderCustomContent(row)}
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))
          ) : (
            <tr className="">
              <td colSpan={columns.length + 2}>
                <NotFound text={textError} sizeText="w-[90%] h-full" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default DynamicTable;
