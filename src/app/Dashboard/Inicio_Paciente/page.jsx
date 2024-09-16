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
import IconImportarDash from "@/components/icons/IconImportarDash";
import { useState, useEffect } from "react";
import ModalAutoEvaluacion from "@/components/modal/ModalPatient/ModalAutoevaluacion";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import ImportarHC from "@/components/modal/ModalDoctor/modalImportarHC";
import ModalVitalSings from "@/components/modal/ModalPatient/ModalVitalSing";
import ModalInputVitalSings from "@/components/modal/ModalPatient/ModalInputVital";
import Swal from "sweetalert2";
import { ApiSegimed } from "@/Api/ApiSegimed";
import ImportarMultiple from "@/components/modal/ModalDoctor/modalImportarMultiple";


export default function HomePte() {
  const user = useAppSelector((state) => state.user);
  const router = useRouter()
  const [dataImportar, setDataImportar] = useState([]);
  const [errorsImport, setErrorsImport] = useState([]);
  const [disabledButton, setDisabledButton] = useState(false);
  const [autoEvaluacionType, setAutoevaluaciónType] = useState("");
  const [vitalSings, setVitalSings] = useState([]);
  const [glicemia, setGlicemia] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEvaluacionOpen, setIsModalEvaluacionOpen] = useState(false);

  console.log(errorsImport);


  const Buttons = [
    {
      name: "Importar",
      icon: IconImportarDash,
      backgroundColor: "bg-[#487FFA]",
      function: () => setIsModalOpen(true),
    },
    {
      name: "Medicamentos",
      path: rutas.Medicamentos,
      icon: IconMedicamentos,
      backgroundColor: "bg-[#FF7E7E]",
    },
    {
      name: "Autoevaluación",
      function: () => setIsModalEvaluacionOpen(true),
      icon: IconAutoevaluacion,
      backgroundColor: "bg-[#FFA3ED]",
    },
    {
      name: "Alarmas",
      path: rutas.Alarm,
      icon: IconAlarmas,
      backgroundColor: "bg-[#875CF2]",
    },
    {
      name: "Solicitudes",
      path: rutas.Solicitudes,
      icon: IconSolicitudes,
      backgroundColor: "bg-[#64D594]",
    },
    {
      name: "Historia clinica",
      path: rutas.Antecedentes,
      icon: IconAntecedentes,
      backgroundColor: "bg-[#ECD652]",
    },
  ];

  console.log(autoEvaluacionType);


  const handleModalData = (data) => {
    console.log(data);
    setDataImportar(data);
  };

  const submitModalData = async () => {
    // Validación: Verificar si hay algo en dataImportar
    if (!dataImportar || dataImportar.length === 0) {
      return setErrorsImport([{ message: 'No hay datos para importar.' }]); // Retorna el error si no hay estudios
    }

    const errors = [];

    // Validación: Iterar sobre el array dataImportar y verificar los campos
    dataImportar.forEach((item, index) => {
      let itemErrors = {}; // Errores para cada objeto

      if (!item.title) {
        itemErrors.title = `El título es requerido .`;
      }

      if (!item.study) {
        itemErrors.content = `Debe haber al menos un estudio.`;
      }
      if (!item.description) {
        itemErrors.description = `Debe haber al menos una descripción.`;
      }

      if (Object.keys(itemErrors).length > 0) {
        errors[index] = itemErrors;
      }
    });

    // Si hay errores, retornar y salir de la función
    if (errors.length > 0) {
      setErrorsImport(errors);
      return; // Salir si hay errores
    }

    const payload = { userId: user.userId, studies: dataImportar };
    console.log(payload);

    try {
      setLoading(true);
      const response = await ApiSegimed.post('/patient-studies', payload);
      setLoading(false);
      setIsModalOpen(false);
      setDataImportar([])
      Swal.fire({
        icon: "success",
        title: "Exito",
        text: "La importacion se realizo correctamente",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });

      return null;
    } catch (error) {
      console.error('Error al enviar los datos:', error.message);
      Swal.fire({
        title: "Error",
        text: "No pudo realizarse la importacion, intente mas tarde",
        icon: "error",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
      return { message: 'Error al realizar la importación.' };
    }
  };




  const submitModalVitalData = async () => {
    const payload = {
      vitalSigns: vitalSings,
      glycemia: glicemia
    };

    console.log(payload);

    try {
      if (autoEvaluacionType === 'SignosVitales') {
        const response = await ApiSegimed.post('/self-evaluation-event/vital-signs', payload);
        console.log('Respuesta de la API:', response.data);
        setVitalSings([]); // Limpiar el estado después de una respuesta exitosa
        setGlicemia([]); // Limpiar el estado después de una respuesta exitosa
        Swal.fire({
          icon: "success",
          title: "Exito",
          text: "Se han cargado los signos vitales",
          confirmButtonColor: "#487FFA",
          confirmButtonText: "Aceptar",
        });
      }
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
      const existingIndex = prevState.findIndex(sign => sign.measureType === Number(id));

      if (existingIndex !== -1) {
        // Si ya existe, actualizar el objeto correspondiente en el array
        const updatedSigns = [...prevState];
        updatedSigns[existingIndex] = {
          ...updatedSigns[existingIndex],
          measure: Number(value)
        };
        return updatedSigns;
      } else {
        // Si no existe, agregar un nuevo objeto al array
        return [
          ...prevState,
          {
            measureType: Number(id),
            measure: Number(value)
          }
        ];
      }
    });
  };

  console.log(glicemia);

  const handleGlicemia = (name, value) => {
    setGlicemia([Number(value)])
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
      <ModalInputVitalSings key="modalInputVitalSings7" text={"Ingresa tu nivel de glicemia"} unit={"mg/dl"} handleChange={handleGlicemia} name={'Glicemia'} state={glicemia} />,
      isVitalSingsEmpty
        ? <ModalVitalSings key="modalVitalSingsIncomplete" text={"Debes completar al menos 1 signo vital para finalizar"} setDisabledButton={setDisabledButton} />
        : <ModalVitalSings key="modalVitalSingsComplete" text={"¡Perfecto! Ya completaste tu registro diario."} subtitle={"Apreta el boton de finalizar para guardar tu registro de signos vitales correctamente."} />,
    ]
    : [
      <ModalAutoEvaluacion key="modalAutoEvaluacion" setAutoevaluaciónType={setAutoevaluaciónType} autoEvaluacionType={autoEvaluacionType} />,
    ];


  return (
    <div className="h-[100%] flex flex-col items-center gap-8 pt-8">
      <div className="flex justify-center items-center gap-2 px-4 md:py-3">
        <h2 className="text-3xl text-[#808080] font-medium">
          ¡Bienvenido{" "}
          <strong className="text-[#487FFA] font-medium">{user?.name}</strong>!
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-[85%] h-[75%]  md:w-[60%] md:h-[70%]">
        {Buttons.map((route, index) => (
          <div
            key={index} onClick={() => { route.function ? route.function() : router.push(`${rutas.PacienteDash}${route.path}`) }}
            className={`${route.backgroundColor} rounded-2xl flex flex-col items-center justify-center gap-4 cursor-pointer`}>
            <route.icon className="md:w-24 md:h-24 w-16 h-16" />
            <p className="text-lg md:text-3xl font-medium text-center text-white">
              {route.name}
            </p>
          </div>
        ))}
      </div>
      <ModalModularizado
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        Modals={[<ImportarMultiple key={"importar archivos"} onData={handleModalData} errors={errorsImport} />]}
        title={"Importar estudios"}
        titleClassName={"text-[#686868]"}
        button1={"hidden"}
        button2={"bg-greenPrimary block"}
        progessBar={"hidden"}
        size={" text-white max-h-[35rem] min-h-[15rem] md:w-[55rem]"}
        buttonText={{ end: `Importar` }}
        funcion={submitModalData}
        loading={isLoading}
      />
      <ModalModularizado
        isOpen={isModalEvaluacionOpen}
        onClose={() => { setIsModalEvaluacionOpen(false); setAutoevaluaciónType(''); setVitalSings([]) }}
        Modals={Modals}
        title={"Autoevaluación"}
        ruta={autoEvaluacionType === 'SignosVitales' ? null : `${rutas.PacienteDash}${rutas.AutoEvaluacion}`}
        titleClassName={"text-[#686868]"}
        button1={"bg-bluePrimary block"}
        button2={"bg-bluePrimary block"}
        progessBar={"hidden"}
        size={"h-[35rem] text-white md:h-[25rem] md:w-[35rem]"}
        buttonText={{ start: `Siguiente`, end: `Finalizar` }}
        handleSubmit={autoEvaluacionType === 'AutoEvaluacion' ? null : submitModalVitalData}
        disabledButton={disabledButton}
      />
    </div>
  );
}
