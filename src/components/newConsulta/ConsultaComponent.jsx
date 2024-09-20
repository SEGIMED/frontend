// ConsultaComponent.jsx
"use client";

import { useEffect, useState } from "react";
import { Accordion, AccordionItem, Text, Spacer } from "@nextui-org/react";
import SubNavbarConsulta from "../NavDoc/subNavConsulta";
import ConsultaTab from "./components/ConsultaTab";
import getPatientDetail from "@/utils/dataFetching/fetching/getPatientDetail";
import Cookies from "js-cookie";
import PatientInfo from "./components/PatientInfo";
import Elboton from "../Buttons/Elboton";
import IconTablillaTilde from "../icons/iconTablillaTilde";
import Link from "next/link";
import IconRegresar from "../icons/iconRegresar";
import rutas from "@/utils/rutas";
import Swal from "sweetalert2";
import SignosVitalesInfo from "./components/subcomponents/SignosVitalesInfo";
// import EvolucionInfo from "./components/EvolucionInfo";
// import ExamenFisicoInfo from "./components/ExamenFisicoInfo";
// Importa otros subcomponentes según sea necesario
import patchSchedule from "@/utils/dataFetching/fetching/patchSchedule";
import { useRouter } from "next/navigation";
import IconCircle from "../icons/IconCircle";
import EvolucionesInfo from "./components/subcomponents/EvolucionesInfo";
import ExamenFisicoInfo from "./components/subcomponents/ExamenFisicoInfo";
import DiagnosticosInfo from "./components/subcomponents/DiagnosticosInfo";
import AnamnesisInfo from "./components/subcomponents/AnamnesisInfo";
import IconGuardar from "../icons/iconGuardar";
import DynamicTable from "../table/DynamicTable";
import MenuDropDown from "../dropDown/MenuDropDown";
import IconOptions from "../icons/IconOptions";
import IconImportar from "../icons/IconImportar";
import InputConsulta from "../consulta/inputconsulta";
import AntecedentesInfo from "./components/subcomponents/AntecedentesInfo";

const ConsultaComponent = ({ scheduleId }) => {
  const patientId = Number(Cookies.get("patientId"));

  const [patient, setPatient] = useState(null);
  const [consultaData, setConsultaData] = useState({
    signosVitales: {
      height: "",
      weight: "",
      bmi: "",
      temperature: "",
      heartRate: "",
      systolicBP: "",
      diastolicBP: "",
      respiratoryRate: "",
      oxygenSaturation: "",
      classFunctional: "",
      glucoseAbnormal: false,
      abnormalGlucoseValues: ["", "", "", ""],
    },
    evolucion: "",
    examenFisico: {
      subsistemas: [], // Array de subsistemas seleccionados
      description: "",
      useSubsystems: false,
      selectedSubsystem: "",
    },
    diagnosticoTratamientos: {
      // Define los campos necesarios
    },
    anamnesis: "",
  });
  const [importacionesData, setImportacionesData] = useState([]);
  const [antecedentesData, setAntecedentesData] = useState({
    riskCardiovascular: "",
    riskHipertensionPulmonar: "",
    grupoHTP: "",
    "Antecedentes quirúrgicos": "",
    "Antecedentes patológicos": "",
    "Antecedentes no patológicos": "",
    "Antecedentes familiares": "",
    "Antecedentes de infancia": "",
    "Medicación actual": "",
    Alergias: "",
    Vacunas: "",
  });
  const [handleNav, setHandleNav] = useState("Consulta");

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  //LISTAR LAS IMPORTACIONES !!
  const ImportacionesColumns = [
    {
      label: "Fecha",
      key: "createdAt",
      showMobile: true,
      width: "w-8",
    },
    {
      label: "Hora",
      key: "createdAt",
      showMobile: true,
      width: "w-8",
    },

    {
      label: "Titulo",
      key: "title",
      showMobile: true,
      width: "w-16",
    },
    {
      label: "Descripcion",
      key: "description",
      showMobile: false,
      width: "w-16",
    },
  ];

  const handleSignosVitalesChange = (key, value) => {
    setConsultaData((prev) => ({
      ...prev,
      signosVitales: {
        ...prev.signosVitales,
        [key]: value,
      },
    }));
  };

  const handleEvolucionChange = (value) => {
    setConsultaData((prev) => ({
      ...prev,
      evolucion: value,
    }));
  };

  const handleExamenFisicoChange = (key, value) => {
    setConsultaData((prev) => ({
      ...prev,
      examenFisico: {
        ...prev.examenFisico,
        [key]: value,
      },
    }));
  };

  const handleDiagnosticoTratamientosChange = (key, value) => {
    setConsultaData((prev) => ({
      ...prev,
      diagnosticoTratamientos: {
        ...prev.diagnosticoTratamientos,
        [key]: value,
      },
    }));
  };

  const handleAnamnesisChange = (value) => {
    setConsultaData((prev) => ({
      ...prev,
      anamnesis: value,
    }));
  };
  const handleAntecedentesChange = (key, value) => {
    setAntecedentesData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  // Calcular BMI cuando height o weight cambian
  useEffect(() => {
    const { height, weight } = consultaData.signosVitales;
    if (height && weight) {
      const heightNum = parseFloat(height);
      const weightNum = parseFloat(weight);
      if (heightNum > 0 && weightNum > 0) {
        const bmi = (weightNum / (heightNum / 100) ** 2).toFixed(2);
        setConsultaData((prev) => ({
          ...prev,
          signosVitales: {
            ...prev.signosVitales,
            bmi,
          },
        }));
      }
    }
  }, [consultaData.signosVitales.height, consultaData.signosVitales.weight]);

  // Manejar la navegación del SubNavbar
  const handleClic = (title) => {
    setHandleNav(title);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Preparar los datos para enviar
      const dataToSave = {
        ...consultaData,
        // Agrega aquí otros campos si es necesario
      };

      // Lógica para enviar los datos al backend
      // Por ejemplo, utilizando fetch:
      /*
      const response = await fetch('/api/saveConsulta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) {
        throw new Error('Error al guardar la consulta');
      }
      */

      // Suponiendo que la llamada es exitosa
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "La consulta se ha guardado correctamente.",
        confirmButtonColor: "#487FFA",
      });
    } catch (error) {
      console.error("Error saving consulta data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar la consulta.",
        confirmButtonColor: "#487FFA",
      });
    } finally {
      setLoading(false);
    }
  };

  const endConsult = async () => {
    try {
      const result = await Swal.fire({
        title: "¿Quiere Finalizar la consulta?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Sí",
        denyButtonText: "No",
      });

      if (result.isConfirmed) {
        await Swal.fire("La consulta ha finalizado.", "", "success");
        await patchSchedule(scheduleId, { schedulingStatus: 2 });
        router.push(`${rutas.Doctor}${rutas.Consultas}`);
      } else if (result.isDenied) {
        await Swal.fire("Continúe con su consulta.", "", "info");
      }
    } catch (error) {
      console.error("Error al finalizar la consulta:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo finalizar la consulta.",
        confirmButtonColor: "#487FFA",
      });
    }
  };

  useEffect(() => {
    getPatientDetail(Number(patientId)).then((response) => {
      setPatient(response);

      // Supongamos que response contiene los datos de la consulta
      if (response.consultaData) {
        setConsultaData(response.consultaData);
      }
    });
  }, [patientId]);
  console.log(consultaData);
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-[#fafafc]">
      {/* Barra de navegación superior */}
      <div className="w-full flex justify-between items-center">
        <Link href={`${rutas.Doctor}/${rutas.Consultas}`}>
          <button className="flex items-center px-2 md:px-6 py-2 m-2 bg-[#487FFA] rounded-lg gap-3 text-white font-bold">
            <IconRegresar />
            <p className="hidden md:block">Regresar</p>
          </button>
        </Link>
        <div className="flex gap-2 items-center">
          <Elboton
            nombre={"Evoluciones Pendientes"}
            icon={<IconTablillaTilde color={"#487FFA"} />}
            className={"bg-white border-bluePrimary border-2"}
            classNameText={"text-bluePrimary"}
          />
          <Elboton
            nombre={"Finalizar Consulta"}
            icon={<IconTablillaTilde color="white" />}
            onPress={() => {
              endConsult();
            }}
            size={"md"}
            className={"bg-[#f53a3a]"}
          />
        </div>
      </div>

      {/* Información del paciente */}
      <div className="flex items-center w-full">
        <PatientInfo patient={patient} />
      </div>

      {/* SubNavbar */}
      <SubNavbarConsulta
        handleClic={handleClic}
        id={scheduleId}
        actualTab={handleNav}
      />

      {/* Contenido Principal */}
      {/* Consulta Tab */}
      {handleNav === "Consulta" && (
        <ConsultaTab
          consultaData={consultaData}
          handleAnamnesisChange={handleAnamnesisChange}
          handleExamenFisicoChange={handleExamenFisicoChange}
          handleEvolucionChange={handleEvolucionChange}
          handleSignosVitalesChange={handleSignosVitalesChange}
        />
      )}
      {/* Antecedentes Tab */}
      {handleNav === "Antecedentes" && (
        <AntecedentesInfo
          antecedentesData={antecedentesData}
          onAntecedentesChange={handleAntecedentesChange}
        />
      )}
      {/* Estudios Tab */}
      {handleNav === "Estudios" && (
        <div>
          <DynamicTable
            title={"Lista de Importaciones"}
            rows={importacionesData}
            columns={ImportacionesColumns}
            showHistoryIcon={true}
            renderDropDown={(row) => {
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
                          onClick: () => {
                            setSelectedImport(row);
                            setFlagFile(false);
                            setIsModalOpen(true);
                          },
                        },
                        {
                          label: "Ver archivo",
                          icon: <IconImportar color={"#B2B2B2"} />,
                          onClick: () => {
                            setSelectedImport(row);
                            setIsModalOpenFile(true);
                          },
                        },
                      ].filter(Boolean),
                    },
                  ]}
                  className={"w-[40px] md:w-full lg:w-fit mx-auto"}
                />
              );
            }}
          />
        </div>
      )}
      {/* Puedes agregar más condiciones para otras pestañas si las tienes */}
    </div>
  );
};

export default ConsultaComponent;
