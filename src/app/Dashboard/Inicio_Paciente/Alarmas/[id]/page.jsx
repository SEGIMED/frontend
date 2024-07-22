"use client";
import { useState } from "react";
import IconOrder from "@/components/icons/IconOrder";
import IconConsulta from "@/components/icons/IconConsulta";
import IconCircle from "@/components/icons/IconCircle";
import AlarmBox from "@/components/alarm/AlarmBox";
import {
  gravedad,
  faltaDeAireAlarms,
  dolorDePechoAlarms,
  peligroDeVida,
  peorDolorAlarms,
  malestarGraveAlarms,
  sintomasNeurologicosAlarms,
  sintomasDigestivosAlarms,
  hinchazonEdemasAlarms,
  fiebreInfeccionesAlarms,
  debilidadPalidezOrinaAlarms,
  tosExpectoracionAlarms,
  cardiovascularAlarms,
  alergiasAlarms,
  intoleranciaAlimentosAlarms,
  pautaAlarmaMedicos,
  ayudaAuxilio,
  internacionGuardiaUrgencias,
  convulsiones,
  accidentes,
} from "@/utils/alarmUtils";
import IconRegresar from "@/components/icons/iconRegresar";
import IconArrowRight from "@/components/icons/iconArrowRight";
import rutas from "@/utils/rutas";
import { useRouter } from "next/navigation";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const AlarmSelector = () => {
  const initialSelections = Array(19).fill(0); // Inicializa con 19 elementos en 0
  const [selectedAlarms, setSelectedAlarms] = useState(initialSelections);
  const router = useRouter();

  const handleSelect = (categoryIndex, index) => {
    const updatedSelections = [...selectedAlarms];
    updatedSelections[categoryIndex] = index + 1; // Guardar el índice seleccionado (+1 para no empezar en 0)
    setSelectedAlarms(updatedSelections);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const text = formData.get("notes");
    const token = Cookies.get("a");
    const myId = Cookies.get("c");

    // Transformar los valores según el formato requerido
    const transformedValues = selectedAlarms.map(
      (value, index) => `${index + 1}:${value}`
    );

    const headers = { headers: { token: token } };

    const body = {
      patient: Number(myId),
      questionsPriority: JSON.stringify(transformedValues),
      alarmDescription: text,
    };

    try {
      // Realizar la solicitud POST al servidor
      const response = await ApiSegimed.post("/alarm", body, headers);

      console.log(body);
      if (response.status === 200 || 201) {
        Swal.fire({
          icon: "success",
          title: "Alarma creada con éxito",
          text: "Un profesional se pondrá en contacto a la brevedad",
        });
        router.push("/Dashboard/Inicio_Paciente/Alarmas");
      } else {
        throw new Error("Ha ocurrido un error al crear la alarma");
      }
    } catch (error) {
      console.error("Error al crear la alarma:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Ha ocurrido un error al crear la alarma",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-y-auto h-full w-full md:px-4">
      <div className=" flex justify-between border-b border-b-[#cecece] px-4 py-2 bg-white sticky top-0 z-10 lg:z-50">
        <button
          type="button"
          className="flex md:px-6 px-4 py-2 rounded-xl gap-1 items-center bg-[#487FFA]"
          onClick={() => {
            router.push(`${rutas.PacienteDash}${rutas.Alarm}`);
          }}>
          <IconRegresar />
          <p className="text-start text-white font-bold text-base leading-5">
            {" "}
            Regresar
          </p>
        </button>
        <p className="flex items-center justify-center text-start text-[#5F5F5F] font-bold text-xl leading-5 ml-3">
          Crear Alarma
        </p>
        <button
          type="submit"
          className="flex items-center px-4 md:px-6 py-2 bg-[#70C247] rounded-xl gap-3 text-white font-bold">
          Enviar <IconArrowRight />
        </button>
      </div>

      <div className="flex flex-col gap-2 px-4 md:py-2 py-4 border-b border-b-[#cecece]">
        <label className="text-start text-[#686868] font-bold leading-4 flex gap-2 items-center">
          <IconConsulta />
          ¿Por qué solicitó crear una alarma?
        </label>
        <textarea
          name="notes"
          className="w-full h-40 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1 outline-[#a8a8a8]"
          placeholder="Ingrese aquí sus anotaciones"
        />
      </div>
      <div>
        <AlarmBox
          title={"Gravedad"}
          array={gravedad}
          categoryIndex={0}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Falta de aire"}
          array={faltaDeAireAlarms}
          categoryIndex={1}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Dolor de pecho"}
          array={dolorDePechoAlarms}
          categoryIndex={2}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Malestar grave"}
          array={malestarGraveAlarms}
          categoryIndex={3}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"El peor dolor de su vida"}
          array={peorDolorAlarms}
          categoryIndex={4}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Perdida de la conciencia/ Sistema nerológico"}
          array={sintomasNeurologicosAlarms}
          categoryIndex={5}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Hinchazón y Edemas"}
          array={hinchazonEdemasAlarms}
          categoryIndex={6}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Fiebre-infecciones"}
          array={fiebreInfeccionesAlarms}
          categoryIndex={7}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Sistema digestivo (Diarrea / vomitos / dolor)"}
          array={sintomasDigestivosAlarms}
          categoryIndex={8}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Debilidad, palidez, orina"}
          array={debilidadPalidezOrinaAlarms}
          categoryIndex={9}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Tos / expectoración"}
          array={tosExpectoracionAlarms}
          categoryIndex={10}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={
            "Cardiovascular (palpitacines, taquicardia, hipotension, hipertension)"
          }
          array={cardiovascularAlarms}
          categoryIndex={11}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Alergias"}
          array={alergiasAlarms}
          categoryIndex={12}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"No come, intolerancia a alimentos"}
          array={intoleranciaAlimentosAlarms}
          categoryIndex={13}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Pauta de alarma de medicos"}
          array={pautaAlarmaMedicos}
          categoryIndex={14}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"AYUDA-AUXILIO"}
          array={ayudaAuxilio}
          categoryIndex={15}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"internación / guardia / urgencia"}
          array={internacionGuardiaUrgencias}
          categoryIndex={16}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Convulsiones"}
          array={convulsiones}
          categoryIndex={17}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Peligro de vida"}
          array={peligroDeVida}
          categoryIndex={18}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
        <AlarmBox
          title={"Accidentes"}
          array={accidentes}
          categoryIndex={19}
          selectedAlarms={selectedAlarms}
          handleSelect={handleSelect}
          isDisabled={false}
        />
      </div>
    </form>
  );
};

export default AlarmSelector;
