"use client";

import { IconAlarmas } from "@/components/InicioPaciente/IconAlarmas";
import { IconAntecedentes } from "@/components/InicioPaciente/IconAntecedentes";
import { IconMedicamentos } from "@/components/InicioPaciente/IconMedicamentos";
import { IconSolicitudes } from "@/components/InicioPaciente/IconSolicitudes";
import { IconTurnos } from "@/components/InicioPaciente/IconTurnos";
import { IconAutoevaluacion } from "@/components/InicioPaciente/IconAutoevaluacion";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import rutas from "@/utils/rutas";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import ImportarHC from "@/components/modal/ModalDoctor/modalImportarHC";
import { useState, useEffect } from "react";
import IconImportarDash from "@/components/icons/IconImportarDash";
import ModalAutoEvaluacion from "@/components/modal/ModalPatient/ModalAutoevaluacion";
import ModalVitalSings from "@/components/modal/ModalPatient/ModalVitalSing";
import ModalInputVitalSings from "@/components/modal/ModalPatient/ModalInputVital";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Swal from "sweetalert2";


export default function HomePte() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter();
  const [dataImportar, setDataImportar] = useState({});
  const [disabledButton, setDisabledButton] = useState(false);
  const [autoEvaluacionType, setAutoevaluaciónType] = useState("");
  const [vitalSings, setVitalSings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEvaluacionOpen, setIsModalEvaluacionOpen] = useState(false);

  const Buttons = [
    {
      name: "Importar",
      backgroundColor: "bg-[#487FFA]",
      function: () => setIsModalOpen(true),
      icon: IconImportarDash,
    },
    {
      name: "Medicamentos",
      path: "/Medicamentos",
      icon: IconMedicamentos,
      backgroundColor: "bg-[#FF7E7E]",
    },
    {
      name: "Autoevaluación",
      icon: IconAutoevaluacion,
      function: () => setIsModalEvaluacionOpen(true),
      backgroundColor: "bg-[#FFA3ED]",
    },
    {
      name: "Alarmas",
      path: "/Alarm",
      icon: IconAlarmas,
      backgroundColor: "bg-[#875CF2]",
    },
    {
      name: "Solicitudes",
      path: "/Solicitudes",
      icon: IconSolicitudes,
      backgroundColor: "bg-[#64D594]",
    },
    {
      name: "Antecedentes",
      path: "/Antecedentes",
      icon: IconAntecedentes,
      backgroundColor: "bg-[#ECD652]",
    },

  ];

  const handleModalData = (data) => {
    setDataImportar(data);
  };

  const submitModalData = () => {
    console.log(dataImportar);
    setIsModalOpen(false);
  };

  const submitModalVitalData = async () => {
    const payload = {
      patient: user.userId,
      vitalSignsToCreate: vitalSings
    };

    try {
      const response = await ApiSegimed.post('/vital-signs/create-vital-sign', payload);
      console.log('Respuesta de la API:', response.data);
      setVitalSings([]); // Limpiar el estado después de una respuesta exitosa
      Swal.fire({
        icon: "success",
        title: "Exito",
        text: "Se han cargado los signos vitales",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error ",
        text: "Error al cargar signos vitales",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
      console.error('Error al enviar los datos:', error);
    }
  };

  const getCatalog = async () => {
    try {
      const response = await ApiSegimed.get(
        "/catalog/get-catalog?catalogName=VITAL_SIGNS_MEASURE_TYPES"
      );
      if (response.data) {
        console.log(response.data, "hola");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCatalog();
  }, []);

  const handleVitalSignChange = (id, value) => {
    setVitalSings(prevState => {
      // Verificar si ya existe un objeto con el mismo id en el array
      const existingIndex = prevState.findIndex(sign => sign.measureType === id);

      if (existingIndex !== -1) {
        // Si ya existe, actualizar el objeto correspondiente en el array
        const updatedSigns = [...prevState];
        updatedSigns[existingIndex] = {
          ...updatedSigns[existingIndex],
          measure: value
        };
        return updatedSigns;
      } else {
        // Si no existe, agregar un nuevo objeto al array
        return [
          ...prevState,
          {
            measureType: id,
            measure: value
          }
        ];
      }
    });
  };

  const isVitalSingsEmpty = Object.values(vitalSings).every(value => !value);

  const Modals = autoEvaluacionType === 'SignosVitales'
    ? [
      <ModalAutoEvaluacion key="modalAutoEvaluacion" setAutoevaluaciónType={setAutoevaluaciónType} autoEvaluacionType={autoEvaluacionType} />,
      <ModalVitalSings key="modalVitalSings" text={"Vamos a ingresar tus signos vitales de hoy"} />,
      <ModalInputVitalSings key="modalInputVitalSings1" text={"Ingresa tu presión arterial"} unit={"mmHg"} input={true} handleChange={handleVitalSignChange} name={'2'} name2={'3'} state={vitalSings} />,
      <ModalInputVitalSings key="modalInputVitalSings2" text={"Ingresa tu frecuencia cardíaca "} unit={"bpm "} handleChange={handleVitalSignChange} name={'7'} state={vitalSings} />,
      <ModalInputVitalSings key="modalInputVitalSings3" text={"Ingresa tu frecuencia respiratoria"} unit={"r/m "} handleChange={handleVitalSignChange} name={'5'} state={vitalSings} />,
      <ModalInputVitalSings key="modalInputVitalSings4" text={"Ingresa tu saturación de oxígeno "} unit={"% "} handleChange={handleVitalSignChange} name={'6'} state={vitalSings} />,
      <ModalInputVitalSings key="modalInputVitalSings5" text={"Ingresa tu temperatura corporal"} unit={"°C"} handleChange={handleVitalSignChange} name={'1'} state={vitalSings} />,
      <ModalInputVitalSings key="modalInputVitalSings6" text={"Ingresa tu peso actual"} unit={"Kg "} handleChange={handleVitalSignChange} name={'9'} state={vitalSings} />,
      // <ModalInputVitalSings key="modalInputVitalSings7" text={"Ingresa tu nivel de glicemia"} unit={"mg/dl"} handleChange={handleVitalSignChange} name={'Glicemia'} state={vitalSings} />,
      isVitalSingsEmpty
        ? <ModalVitalSings key="modalVitalSingsIncomplete" text={"Debes completar al menos 1 signo vital para finalizar"} setDisabledButton={setDisabledButton} />
        : <ModalVitalSings key="modalVitalSingsComplete" text={"¡Perfecto! Ya completaste tu registro diario."} subtitle={"Apreta el boton de finalizar para guardar tu registro de signos vitales correctamente."} />,
    ]
    : [
      <ModalAutoEvaluacion key="modalAutoEvaluacion" setAutoevaluaciónType={setAutoevaluaciónType} autoEvaluacionType={autoEvaluacionType} />,
    ];

  return (
    <div className="h-full flex flex-col items-center gap-8 pt-8">
      <div className="flex justify-center items-center gap-2 px-4 md:py-3">
        <h2 className="text-3xl text-[#808080] font-medium">
          ¡Bienvenido{" "}
          <strong className="text-[#487FFA] font-medium">{user?.name}</strong>!
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-[85%] h-[75%]  md:w-[60%] md:h-[70%]">
        {Buttons.map((route, index) => (
          <div
            key={index} onClick={() => { route.function ? route.function() : router.push(`${rutas.PacienteDash2}${route.path}`) }}
            className={`${route.backgroundColor} rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer`}>
            <route.icon className="md:w-24 md:h-24 w-16 h-16" />
            <p className="text-lg md:text-3xl font-medium text-white">
              {route.name}
            </p>
          </div>
        ))}
      </div>
      <ModalModularizado
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        Modals={[<ImportarHC key={"importar archivos"} onData={handleModalData} />]}
        title={"Importar estudios"}
        titleClassName={"text-[#686868]"}
        button1={"hidden"}
        button2={"bg-greenPrimary block"}
        progessBar={"hidden"}
        size={"h-[35rem] text-white md:h-[33rem] md:w-[35rem]"}
        buttonText={{ end: `Importar` }}
        funcion={submitModalData}
      />
      <ModalModularizado
        isOpen={isModalEvaluacionOpen}
        onClose={() => { setIsModalEvaluacionOpen(false); setAutoevaluaciónType(''); setVitalSings([]) }}
        Modals={Modals}
        title={"Autoevaluación"}
        ruta={autoEvaluacionType === 'SignosVitales' ? null : `${rutas.PacienteDash2}${rutas.AutoEvaluacion}`}
        titleClassName={"text-[#686868]"}
        button1={"bg-bluePrimary block"}
        button2={"bg-bluePrimary block"}
        progessBar={"hidden"}
        size={"h-[35rem] text-white md:h-[25rem] md:w-[35rem]"}
        buttonText={{ start: `Siguiente`, end: `Finalizar` }}
        handleSubmit={submitModalVitalData}
        disabledButton={disabledButton}
      />
    </div>
  );
}
