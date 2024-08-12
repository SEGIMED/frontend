"use client";
import { Fragment, useState } from "react";
import RealColorRisk from "@/utils/realColor";
import IconRisk from "../icons/iconRisk";
import IconArrowDetailDown from "../icons/IconArrowDetailDown";
import IconArrowDetailUp from "../icons/IconArrowDetailUp";
import IconConsulta from "../icons/IconConsulta";
import NotFound from "../notFound/notFound";

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
}) {
  const [activeIndex, setActiveIndex] = useState(null); // Track which row's content is visible

  const handleRowClick = (index) => {
    if (clickable) {
      setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    }
  };

  // Helper function to translate healthCenter values

  function specialtySwitch(caseNumber) {
    const switchCases = {
      1: "Cardiología",
      2: "Medicina Interna",
      3: "Medicina Familiar",
      4: "Neumología",
      5: "Cirugía de Tórax",
      6: "Cirugía Cardiovascular",
    };

    return switchCases[caseNumber] || "No hay especialización";
  }
  function healthCenterSwitch(caseNumber) {
    const switchCases = {
      1: "Centro Gallego",
    };

    return switchCases[caseNumber] || "Centro Desconocido";
  }

  const formatPatientName = (row) => {
    return `${row.patientUser.name} ${row.patientUser.lastname}`;
  };

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
  const isRowEmpty = (row) => {
    // Verifica si todas las columnas relevantes están vacías
    return columns.every((column) => {
      const value = column.key?.includes(".")
        ? column.key.split(".").reduce((acc, part) => acc && acc[part], row)
        : row[column.key];
      return value === null || value === undefined || value === "";
    });
  };

  const filteredRows = rows.filter((row) => !isRowEmpty(row));
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
              <th className="lg:pl-6 py-2 text-center w-[10px] md:w-[10px] hidden md:table-cell"></th>
            )}
            {showHistoryIcon && (
              <th className="lg:pl-6 py-2 text-center w-[10px] md:w-[10px] hidden md:table-cell"></th>
            )}
            {columns.map((column, index) => (
              <th
                key={index}
                className={`${
                  index == 0 && !showRisks && !showHistoryIcon && "lg:pl-6"
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
          {filteredRows.length > 0 ? (
            filteredRows.map((row, rowIndex) => (
              <Fragment key={rowIndex}>
                <tr
                  className={`hover:bg-gray-100 ${
                    clickable ? "cursor-pointer" : "cursor-default"
                  } border-b-[1px] border-b-[#D7D7D7] `}
                  onClick={() => handleRowClick(rowIndex)}>
                  {showRisks && (
                    <td className="py-2 lg:pl-3 w-[10px] max-w-[10px] hidden md:table-cell">
                      {renderPatientPulmonaryRisk(row)}
                    </td>
                  )}
                  {showHistoryIcon && (
                    <td className="py-2 lg:pl-3 w-[10px] max-w-[10px] hidden md:table-cell">
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
                        "lg:pl-6"
                      }  lg:px-3 py-2 text-[#686868] whitespace-normal ${
                        column.showMobile
                          ? "table-cell"
                          : "hidden md:table-cell"
                      }  xs:max-w-[60px] md:max-w-[100px]  ${column.width} `}>
                      {column.key === "patientUser.name"
                        ? formatPatientName(row)
                        : column.key === "healthCenter"
                        ? healthCenterSwitch(row[column.key])
                        : column.key === "medical_specialty"
                        ? specialtySwitch(row[column.key])
                        : column.key === "patientPulmonaryHypertensionRisks"
                        ? renderPatientPulmonaryRisk(row)
                        : column.label === "Fecha"
                        ? formatDate(row[column.key])
                        : column.label === "Hora"
                        ? formatHour(row[column.key])
                        : column.key?.includes(".")
                        ? column.key
                            .split(".")
                            .reduce((acc, part) => acc && acc[part], row)
                        : row[column.key]}
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
            <tr>
              <td colSpan={columns.length + 2}>
                <NotFound text={textError} sizeText="w-[90%]" />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default DynamicTable;
