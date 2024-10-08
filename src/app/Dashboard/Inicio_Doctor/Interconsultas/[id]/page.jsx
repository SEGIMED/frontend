"use client";
import IconCircle from "@/components/icons/IconCircle";
import InputInterconsulta from "@/components/interconsulta/texto";
import BotonInterconsulta from "@/components/interconsulta/botones";
import IconCheckRedBoton from "@/components/icons/IconCheckRed";
import IconArrowRight from "@/components/icons/iconArrowRight";
import { useParams, useRouter } from "next/navigation";
import Elboton from "@/components/Buttons/Elboton";
import rutas from "@/utils/rutas";
import { specialitySwitch } from "@/utils/medicalSpecialitys";
import { useEffect, useState } from "react";
import ModalInterconsulta from "@/components/interconsulta/ModalInterconsulta";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Swal from "sweetalert2";
import IconRegresar from "@/components/icons/iconRegresar";
import Link from "next/link";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import FileDisplay from "@/components/modal/ModalDoctor/modalDisplayFile";

export default function Page() {
  const params = useParams();
  const interconsultationId = params?.id;
  const router = useRouter();
  const [interconsultation, setInterconsultation] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [medicalOpinion, setMedicalOpinion] = useState("");
  const [isModalOpenFile, setIsModalOpenFile] = useState(false);
  const [selectedImport, setSelectedImport] = useState();

  const handleResolve = async () => {
    try {
      const payload = {
        id: interconsultationId,
        medicalOpinion,
      };
      const response = await ApiSegimed.patch(`/interconsultations`, payload);
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Interconsulta resuelta",
          confirmButtonColor: "#487FFA",
          confirmButtonText: "Aceptar",
        }).then(() => {
          setShowModal(false);
          router.push(`${rutas.Doctor}${rutas.Interconsultas}`);
        });
      }
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

  const handleShowModalFile = (file) => {
    setIsModalOpenFile(true);
    let File = {
      study: file,
    };
    setSelectedImport(File);
  };
  const closeModalFile = () => setIsModalOpenFile(false);
  const getInterconsultation = async () => {
    try {
      const response = await ApiSegimed.get(
        `interconsultation/${interconsultationId}`
      );
      setInterconsultation(response.data);
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
    getInterconsultation();
  }, []);
  return (
    <div className="h-full flex flex-col bg-[#fafafc]">
      <div className=" items-center justify-between border-b border-b-[#cecece] px-4 py-2  bg-white lg:sticky flex top-0 z-20 lg:z-50">
        <div></div>
        <h1 className="font-bold w-1/3 md:w-3/4 text-center">
          Ver Interconsulta
        </h1>
        <Elboton
          onPress={() => router.back()}
          nombre="Regresar"
          icon={<IconRegresar />}
        />
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between   px-3 md:px-6 py-2">
        <label className="w-full flex  justify-start gap-3 font-medium py-2">
          <IconCircle className="w-3" />
          <p>Paciente:</p>
        </label>
        <span className="w-full px-3 py-2 border bg-white border-[#cecece] rounded-lg">{`${interconsultation?.patientDetails?.name} ${interconsultation?.patientDetails?.lastname}`}</span>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between px-3 md:px-6 py-2">
        <label className="w-full flex  justify-start gap-3 font-medium py-2">
          <IconCircle className="w-3" />
          <p>Especialidades:</p>
        </label>
        <span className="w-full px-3 py-2 border bg-white border-[#cecece] rounded-lg">
          {specialitySwitch(interconsultation?.medicalSpecialty)}
        </span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between  px-3 md:px-6 py-2">
        <label className="w-full flex justify-start gap-3 font-medium py-2">
          <IconCircle className="w-3" />
          <p>Colega de la institución</p>
        </label>
        <span className="w-full px-3 py-2 border bg-white border-[#cecece] rounded-lg">{`${interconsultation?.queriedPhysician?.name} ${interconsultation?.queriedPhysician?.lastname}`}</span>
      </div>

      <InputInterconsulta
        title={"Problema"}
        disabled
        value={interconsultation?.problemResume}
      />
      <div className="flex flex-col md:flex-row items-center justify-between px-3 md:px-6 py-2">
        <label className="w-full md:w-1/3 flex  justify-start gap-3 font-medium py-2 text-center">
          <IconCircle className="w-3" />
          Archivos adjuntos
        </label>
        <div className="py-2 md:py-0 md:justify-start justify-evenly md:gap-3 w-full md:w-1/2">
          {interconsultation?.files?.length > 0 && (
            <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
              {interconsultation?.files?.map((item, index) => (
                <Elboton
                  key={item?.name}
                  onPress={(e) => handleShowModalFile(item?.fileURL)}
                  nombre={item?.fileName}
                  classNameText={"text-bluePrimary truncate"}
                  className="w-full px-3 py-1 border bg-white border-[#cecece] rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between px-3 md:px-6 py-2">
        <label className="w-full md:w-1/3 flex  justify-start gap-3 font-medium py-2 text-center">
          <IconCircle className="w-3" />
          Tipo de interconsulta
        </label>
        <div className="py-2 md:py-0 flex md:justify-start justify-evenly md:gap-3 w-full md:w-1/2">
          <BotonInterconsulta
            type={"green"}
            label="Rutina"
            active={interconsultation.isPriority === false}
          />
          <BotonInterconsulta
            Icon={IconCheckRedBoton}
            label="Urgencia"
            active={interconsultation.isPriority === true}
          />
        </div>
      </div>
      <InputInterconsulta
        title={"Motivo de interconsulta"}
        value={interconsultation?.reasonForConsultation}
        disabled
      />
      <div className="w-full justify-center flex py-4">
        <Elboton
          nombre="Resolver Interconsulta"
          icon2={<IconArrowRight />}
          onPress={() => setShowModal(true)}
          className={"bg-greenPrimary"}
        />
      </div>
      <ModalInterconsulta
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleResolve}
        value={medicalOpinion}
        onChangeValue={setMedicalOpinion}
      />
      <ModalModularizado
        isOpen={isModalOpenFile}
        onClose={closeModalFile}
        Modals={[<FileDisplay key={"displayFile"} state={selectedImport} />]}
        title={"Visualizacion de archivo"}
        button1={"hidden"}
        button2={"bg-greenPrimary text-white block"}
        progessBar={"hidden"}
        size={"md:min-h-[4rem] md:w-[35rem]"}
        buttonText={{ end: `Cerrar` }}
        buttonIcon={<></>}
      />
    </div>
  );
}
