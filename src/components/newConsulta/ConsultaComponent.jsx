"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import SubNavbarConsulta from "../NavDoc/subNavConsulta";
import ConsultaTab from "./HistoriaClinicaTab/ConsultaTab";
import Cookies from "js-cookie";
import PatientInfo from "./HistoriaClinicaTab/PatientInfo";
import Elboton from "../Buttons/Elboton";
import IconTablillaTilde from "../icons/iconTablillaTilde";
import Link from "next/link";
import IconRegresar from "../icons/iconRegresar";
import rutas from "@/utils/rutas";
import Swal from "sweetalert2";
import patchSchedule from "@/utils/dataFetching/fetching/patchSchedule";
import { useRouter } from "next/navigation";
import AntecedentesInfo from "./AntecedentesTab/AntecedentesInfo";
import { ApiSegimed } from "@/Api/ApiSegimed";
import EstudiosTab from "./EstudiosTab/EstudiosTab";
import {
  ConsultaInitialState,
  mapAntecedentesData,
  mapAntecedentesOutput,
  mapPrescriptions,
  mapToNewFormat,
} from "./utils";
import ModalNewConsulta from "./ModalNewConsulta";
import ModalFinalizarConsulta from "./ModalFinalizarConsulta";
import PreconsultaInfo from "./PreconsultaTab/PreconsultaInfo";
import LoadingFallback from "../loading/loading";
import { debounce } from "lodash";

const ConsultaComponent = ({ scheduleId }) => {
  const patientId = Number(Cookies.get("patientId"));
  const medicalEventId = Number(Cookies.get("medicalEventId"));
  // const medicalEventId = 122;
  const [isOpen, setIsOpen] = useState(false);
  const [isFinalizarConsultOpen, setIsFinalizarConsultOpen] = useState(false);
  const [isLastConsultSelected, setIsLastConsultSelected] = useState(false);
  const [patient, setPatient] = useState(null);
  const [consultaData, setConsultaData] = useState(ConsultaInitialState);
  const [importacionesData, setImportacionesData] = useState([]);
  const [antecedentesData, setAntecedentesData] = useState({
    riskCardiovascular: "",
    riskHipertensionPulmonar: "",
    surgicalRisk: "",
    grupoHTP: [],
    "Antecedentes quirúrgicos": "",
    "Antecedentes patológicos": "",
    "Antecedentes no patológicos": "",
    "Antecedentes familiares": "",
    "Antecedentes de la juventud": "",
    "Medicación actual": "",
    Alergias: "",
    Vacunas: "",
    TieneComorbilidades: false,
    Comorbilidades: [""],
  });
  const [handleNav, setHandleNav] = useState("Historia Clínica");
  const [comorbilitiesList, setComorbilitiesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSavingForm, setLoadingSavingForm] = useState(false);
  const consultaDataRef = useRef(consultaData); // Usar useRef para almacenar el valor más reciente
  const antecedentesDataRef = useRef(antecedentesData); // Usar useRef para almacenar el valor más reciente
  const router = useRouter();
  useEffect(() => {
    consultaDataRef.current = consultaData;
  }, [consultaData]);
  useEffect(() => {
    antecedentesDataRef.current = antecedentesData;
  }, [antecedentesData]);
  const mapConsultaData = (consulta) => {
    setConsultaData({
      signosVitales: {
        height: getVitalSignValue(consulta.vitalSigns, "Estatura"), // Asumiendo que 'height' está en 'patient'
        weight: getVitalSignValue(consulta.vitalSigns, "Peso"), // Asumiendo que 'weight' está en 'patient'
        bmi: getVitalSignValue(consulta.vitalSigns, "IMC"), // Asumiendo que 'bmi' está en 'patient'
        temperature: getVitalSignValue(consulta.vitalSigns, "Temperatura"),
        heartRate: getVitalSignValue(
          consulta.vitalSigns,
          "Frecuencia Cardiaca"
        ),
        systolicBP: getVitalSignValue(
          consulta.vitalSigns,
          "Presión Arterial Sistólica"
        ),
        diastolicBP: getVitalSignValue(
          consulta.vitalSigns,
          "Presión Arterial Diastólica"
        ),
        respiratoryRate: getVitalSignValue(
          consulta.vitalSigns,
          "Frecuencia Respiratoria"
        ),
        oxygenSaturation: getVitalSignValue(
          consulta.vitalSigns,
          "Saturación de Oxígeno"
        ),
        classFunctional: consulta.functionalClass?.category?.name || "",
        glucoseAbnormal: consulta.glycemia.some((g) => parseFloat(g.value) > 0), // Ejemplo de lógica
        abnormalGlucoseValues: consulta.glycemia.map((g) => g.value) || [
          "",
          "",
          "",
          "",
        ],
      },

      evolucion: consulta.evolution || "",
      examenFisico: {
        subsistemas:
          consulta.physicalExamination?.map(
            (ex) => ex?.catPhysicalSubsystem?.name
          ) || [],
        description:
          consulta.physicalExamination
            ?.map((ex) => ex.description)
            ?.join(", ") || "",
        useSubsystems: consulta?.physicalExamination[0]?.catPhysicalSubsystem
          ?.name
          ? true
          : false,
        selectedSubsystem:
          consulta.physicalExamination?.length > 0
            ? consulta.physicalExamination[0]?.catPhysicalSubsystem?.name
            : "",
      },
      diagnosticoTratamientos: {
        // Mapea los campos necesarios de 'diagnostic'
        procedurePrescriptions: consulta.diagnostic?.procedurePrescriptions || [
          { medicalProcedureName: "" },
        ],
        treatmentPlan: consulta.diagnostic?.treatmentPlan || "",
        alarmPattern: consulta.diagnostic?.alarmPattern || "",
        treatmentNoFarmacologico:
          consulta.diagnostic?.treatmentNoFarmacologico || "",
        prescriptions: mapPrescriptions(consulta.diagnostic?.prescriptions) || [
          "",
        ],
        // Añade más campos según tu estructura
      },
      anamnesis: {
        historyOfPresentIllness:
          consulta.diagnostic?.historyOfPresentIllness || "",
      },
      diagnostics: [],
      reasonForConsultationId:
        consulta?.diagnostic.reasonForConsultationId || null,
      primaryDiagnostic: "",
    });
  };

  // Función auxiliar para obtener valores de signos vitales
  const getVitalSignValue = (vitalSigns, name) => {
    const sign = vitalSigns.find(
      (sign) => sign.vitalSignMeasureType.name === name
    );
    return sign ? sign.measure : "";
  };
  const handleSignosVitalesChange = (key, value) => {
    setConsultaData((prev) => ({
      ...prev,
      signosVitales: {
        ...prev.signosVitales,
        [key]: value,
      },
    }));
    debouncedGuardarFormulario();
  };

  const handleEvolucionChange = (value) => {
    setConsultaData((prev) => ({
      ...prev,
      evolucion: value,
    }));
    debouncedGuardarFormulario();
  };

  const handleExamenFisicoChange = (key, value) => {
    setConsultaData((prev) => ({
      ...prev,
      examenFisico: {
        ...prev.examenFisico,
        [key]: value,
      },
    }));
    debouncedGuardarFormulario();
  };

  const handleDiagnosticoTratamientosChange = (key, value) => {
    if (key === "procedurePrescriptions") {
      setConsultaData((prev) => ({
        ...prev,
        diagnosticoTratamientos: {
          ...prev.diagnosticoTratamientos,
          [key]: value,
        },
      }));
      setTimeout(() => {
        debouncedGuardarFormulario();
      }, 0);
      return;
    }
    setConsultaData((prev) => ({
      ...prev,
      diagnosticoTratamientos: {
        ...prev.diagnosticoTratamientos,
        [key]: Array.isArray(prev.diagnosticoTratamientos[key])
          ? [...prev.diagnosticoTratamientos[key], value] // Si es un array, añade el nuevo valor al final
          : value, // Si no es un array, simplemente asigna el valor
      },
    }));
    debouncedGuardarFormulario();
  };

  const setPrescriptions = (value) => {
    setConsultaData((prev) => ({
      ...prev,
      diagnosticoTratamientos: {
        ...prev.diagnosticoTratamientos,
        prescriptions: value,
      },
    }));
    debouncedGuardarFormulario();
  };

  const handleAnamnesisChange = (value) => {
    setConsultaData((prev) => ({
      ...prev,
      anamnesis: {
        ...prev.anamnesis,
        historyOfPresentIllness: value,
      },
    }));
    debouncedGuardarFormulario();
  };
  const handleAntecedentesChange = (key, value) => {
    setAntecedentesData((prev) => ({
      ...prev,
      [key]: value,
    }));
    debouncedGuardarAntecedentes();
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

  const fetchConsulta = async () => {
    try {
      setLoading(true);
      const response = await ApiSegimed.get(
        `medical-event/general-consultation?id=${medicalEventId}`
      );
      mapConsultaData(response.data.consultation);
      setImportacionesData(response.data.studies);
      setPatient(response.data.consultation.patient);
      setAntecedentesData(mapAntecedentesData(response.data.background));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching consulta data:", error);
    }
  };

  const fetchComorbilities = async () => {
    try {
      const response = await ApiSegimed.get(`/comorbidities?search=`);
      setComorbilitiesList(response.data);
    } catch (error) {
      console.error("Error fetching comorbilities data:", error);
    }
  };
  useEffect(() => {
    fetchConsulta();
    fetchComorbilities();
  }, []);

  useEffect(() => {
    if (consultaData && consultaData.reasonForConsultationId != null) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [consultaData]);
  // Manejar la navegación del SubNavbar
  const handleClic = (title) => {
    setHandleNav(title);
  };
  // Usamos debounce para retrasar la llamada a guardarFormulario
  const debouncedGuardarFormulario = useCallback(
    debounce(() => {
      setLoadingSavingForm(true);
      permanentSaveConsulta(consultaDataRef.current);
    }, 3500),
    []
  );
  const debouncedGuardarAntecedentes = useCallback(
    debounce(() => {
      setLoadingSavingForm(true);
      permanentSaveAntecedentes(antecedentesDataRef.current);
    }, 3500),
    []
  );
  const permanentSaveConsulta = async (data) => {
    try {
      await ApiSegimed.post(
        `/medical-event/consultation?id=${medicalEventId}`,
        mapToNewFormat(data, medicalEventId, patientId)
      );
      console.log(mapToNewFormat(data, medicalEventId, patientId));
      setLoadingSavingForm(false);
    } catch (error) {
      console.log(error);
      setLoadingSavingForm(false);
    }
  };
  const permanentSaveAntecedentes = async (data) => {
    try {
      await ApiSegimed.post(
        `/medical-event/background?id=${medicalEventId}`,
        mapAntecedentesOutput(data)
      );
      setLoadingSavingForm(false);
      F;
    } catch (error) {
      console.log(error);
      setLoadingSavingForm(false);
    }
  };
  const handleSave = async () => {
    try {
      // Preparar los datos para enviar
      const dataToSave = {
        ...consultaData,
        // Agrega aquí otros campos si es necesario
      };
      // Lógica para enviar los datos al backend
      // Por ejemplo, utilizando fetch:
      await ApiSegimed.post(
        `/medical-event/consultation?id=${medicalEventId}`,
        mapToNewFormat(dataToSave, medicalEventId, patientId)
      );

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
        await ApiSegimed.post(
          `/medical-event/general-consultation?id=${medicalEventId}`,
          {
            consultationData: mapToNewFormat(
              consultaData,
              medicalEventId,
              patientId
            ),
            backgroundData: mapAntecedentesOutput(antecedentesData),
          }
        );
        await Swal.fire("La consulta ha finalizado.", "", "success");
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
  const handleSubmitModal = async (value) => {
    if (isLastConsultSelected) {
      try {
        const response = await ApiSegimed.get(
          `/medical-event/last-consultation?id=${medicalEventId}`
        );
        mapConsultaData(response.data);
        Swal.fire({
          icon: "success",
          title: "Éxito",
          text: "Se han cargado los datos de la consulta anterior.",
          confirmButtonColor: "#487FFA",
        });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo obtener la consulta anterior.",
          confirmButtonColor: "#487FFA",
        });
      }
      setIsOpen(false);
    }
    if (!value) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Debes seleccionar un motivo de consulta",
        confirmButtonColor: "#487FFA",
      });
    }
    try {
      await ApiSegimed.post(
        `/medical-event/consultation?id=${medicalEventId}`,
        {
          medicalEvent: {
            reasonForConsultationId: value,
          },
        }
      );
      setReasonForConsultationId(value);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar la consulta.",
        confirmButtonColor: "#487FFA",
      });
    }
  };

  const handleSaveAntecedentes = async () => {
    try {
      await ApiSegimed.post(
        `/medical-event/background?id=${medicalEventId}`,
        mapAntecedentesOutput(antecedentesData)
      );
      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: "Se han guardado los antecedentes correctamente.",
        confirmButtonColor: "#487FFA",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo guardar los antecedentes.",
        confirmButtonColor: "#487FFA",
      });
    }
  };

  const setReasonForConsultationId = (id) => {
    setConsultaData((prev) => ({
      ...prev,
      reasonForConsultationId: id,
    }));
  };

  return (
    <>
      <ModalFinalizarConsulta
        isOpen={isFinalizarConsultOpen}
        onOpenChange={setIsFinalizarConsultOpen}
        diagnosticsData={consultaData.diagnostics}
        setDiagnosticsData={(key, value) =>
          setConsultaData((prev) => ({ ...prev, diagnostics: value }))
        }
        primaryDiagnostic={consultaData.primaryDiagnostic}
        setPrimaryDiagnostic={(value) =>
          setConsultaData((prev) => ({ ...prev, primaryDiagnostic: value }))
        }
        onSubmit={() => {
          setIsFinalizarConsultOpen(false);
          endConsult();
        }}
      />
      {loading && (
        <div className="flex justify-center items-center my-auto">
          <LoadingFallback className="w-10 h-10" />
        </div>
      )}
      {loadingSavingForm && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <LoadingFallback className="w-12 h-12" />
        </div>
      )}
      {!loading && (
        <ModalNewConsulta
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          value={consultaData?.reasonForConsultationId}
          onChangeValue={setReasonForConsultationId}
          isLastConsultSelected={isLastConsultSelected}
          setIsLastConsultSelected={setIsLastConsultSelected}
          onSubmit={(value) => handleSubmitModal(value)}
        />
      )}
      {!loading && (
        <div className=" flex flex-col h-full overflow-y-auto bg-[#fafafc]">
          {/* Barra de navegación superior */}
          <div className="w-full flex justify-between items-center border-b border-b-[#cecece]">
            <Link href={`${rutas.Doctor}/${rutas.Consultas}`}>
              <button className="flex items-center px-2 md:px-6 py-2 m-2 bg-[#487FFA] rounded-lg gap-3 text-white font-bold">
                <IconRegresar />
                <p className="hidden md:block">Regresar</p>
              </button>
            </Link>
            <div className="flex gap-2 items-center">
              <Elboton
                nombre={"Evoluciones"}
                icon={<IconTablillaTilde color={"#487FFA"} />}
                className={"bg-white border-bluePrimary border-2"}
                classNameText={"text-bluePrimary"}
              />
              <Elboton
                nombre={"Finalizar"}
                icon={<IconTablillaTilde color="white" />}
                onPress={() => {
                  setIsFinalizarConsultOpen(true);
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
          {handleNav === "Historia Clínica" && (
            <ConsultaTab
              consultaData={consultaData}
              setPrescriptions={setPrescriptions}
              handleAnamnesisChange={handleAnamnesisChange}
              handleExamenFisicoChange={handleExamenFisicoChange}
              handleEvolucionChange={handleEvolucionChange}
              handleSignosVitalesChange={handleSignosVitalesChange}
              handleDiagnosticoTratamientosChange={
                handleDiagnosticoTratamientosChange
              }
              handleSaveConsulta={handleSave}
              handleSaveConsultaPermanent={permanentSaveConsulta}
            />
          )}
          {/* Antecedentes Tab */}
          {handleNav === "Antecedentes" && (
            <AntecedentesInfo
              antecedentesData={antecedentesData}
              onAntecedentesChange={handleAntecedentesChange}
              comorbilitiesList={comorbilitiesList}
              handleSaveAntecedentes={handleSaveAntecedentes}
            />
          )}
          {/* Estudios Tab */}
          {handleNav === "Estudios" && (
            <EstudiosTab
              importacionesData={importacionesData}
              scheduleId={scheduleId}
              patientId={patientId}
              setImportacionesData={setImportacionesData}
            />
          )}

          {/* Preconsulta Tab */}
          {handleNav === "Preconsulta" && (
            <PreconsultaInfo
              medicalEventId={medicalEventId}
              scheduleId={scheduleId}
              isReadOnly={true}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ConsultaComponent;
