"use client";

import { useState } from "react";
import IconFatArrow from "@/components/icons/iconFatarrowDash";
import AntecedenteDash from "@/components/dashPte/antecedentesDash";
import BotonDashPte from "@/components/Buttons/ElBotonDashPte";
import AvatarDashPte from "@/components/avatar/avatarDashPte";
import CalcularEdad from "@/utils/calcularEdad";
import { usePathname } from "next/navigation";
import LastLogin from "@/utils/lastLogin";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import ButtonBlancoBorde from "@/components/Buttons/ButtonBlancoBorder";
import IconExportar from "@/components/icons/IconExportar";
import IconImportar from "@/components/icons/IconImportar";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import ImportarHC from "@/components/modal/ModalDoctor/modalImportarHC";
import GeneratePDF from "@/components/pdf/pdfgenerator";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconEditar from "@/components/icons/iconEditar";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Swal from "sweetalert2";
import { Fecha } from "@/utils/NormaliceFechayHora";
import { setReload } from "@/redux/slices/doctor/HistorialClinico";

const Datos = () => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const pathArray = pathname.split("/");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataImportar, setDataImportar] = useState({});
  const [text, setText] = useState(false);
  const user = useAppSelector((state) => state.clinicalHistory.user);
  const infoPatient = useAppSelector((state) => state.clinicalHistory.data);
  const isLoading = useAppSelector((state) => state.clinicalHistory.loading);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  console.log(user);
  const handleModalData = (data) => {
    setDataImportar(data);
  };

  const submitModalData = async () => {
    const payload = { userId: user.userId, studies: [dataImportar] };
    console.log(payload);

    try {
      // Realizar la petición POST
      setLoading(true);
      const response = await ApiSegimed.post("/patient-studies", payload);

      // Manejar la respuesta según sea necesario
      console.log("Respuesta del servidor:", response.data);
      setLoading(false);
      // Cerrar el modal después de la petición
      setIsModalOpen(false);
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Exito",
        text: "La importacion se realizo correctamente",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
      setIsModalOpen(false);
      Swal.fire({
        title: "Error",
        text: "No pudo realizarse la importacion, intente mas tarde",
        icon: "error",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col ">
      {isLoading ? (
        <SkeletonList count={13} />
      ) : (
        <>
          <div className="w-full  flex md:justify-end justify-evenly gap-3 items-center border-b md:pr-2 bg-white border-b-[#cecece] py-2">
            <MenuDropDown
              label="Importar archivo"
              icon={<IconExportar color="#487FFA" />}
              classNameButton={
                "border-[#487FFA] border-2 bg-[#FFFFFF] text-start text-[#487FFA] font-bold text-base leading-5"
              }
              categories={[
                {
                  items: [
                    {
                      label: "Importar texto libre",
                      onClick: () => {
                        setText(true);
                        openModal();
                      },
                      icon: <IconEditar color={"#B2B2B2"} />,
                    },
                    {
                      label: "Importar archivo",
                      onClick: () => {
                        setText(false);
                        openModal();
                      },
                      icon: <IconExportar color={"#B2B2B2"} />,
                    },
                  ],
                },
              ]}
            />

            <ButtonBlancoBorde
              text={"Exportar"}
              iconLeft={<IconImportar />}
              funcion={() => GeneratePDF(user, infoPatient)}
            />
          </div>
          <div className="flex justify-between items-center gap-2 px-6 py-2  border-b-[#cecece]">
            <div className="flex justify-center items-center ml-5">
              <div>
                <AvatarDashPte avatar1={user?.avatar} />
              </div>
              <div className="flex flex-col ml-4 ">
                <span className="font-bold text-xl">
                  {user?.name} {user?.lastname}
                </span>
                <span>
                  {user?.socDemDet?.birthDate
                    ? `${CalcularEdad(user.socDemDet.birthDate)} años`
                    : "Sin especificar nacimiento"}
                </span>
                <span>
                  {user?.socDemDet?.dateOfDeathReport ? "Muerto" : null}
                </span>
                <span>
                  <b>Ultima consulta:</b>{" "}
                  {Fecha(user?.patientAppScheds?.scheduledStartTimestamp)}
                </span>
                <span>
                  <b>Medico tratante: </b>{" "}
                  {user?.currentPhysician?.name
                    ? `${user?.currentPhysician?.name} ${user?.currentPhysician?.lastname} `
                    : "Sin medico tratante"}
                </span>
              </div>
            </div>
            <div className="rounded-full border-4 border-blue-400 h-14 w-14 md:w-24 md:h-24 flex items-center justify-center md:mr-20">
              <h1 className="text-2xl text-center text-blue-400  text-">
                <b>
                  {user?.userHpGroups?.length > 0 &&
                    user?.userHpGroups[0]?.catHpGroup?.name}
                </b>
              </h1>
            </div>
          </div>
          <div className="flex px-6 py-2 border gap-1 items-center justify-center ">
            <div className="flex items-center h-10">
              <p className="text-start text-[#5F5F5F] font-bold  text-large leading-10 ">
                Antecedentes
              </p>
            </div>
          </div>
          <div className="flex flex-col overflow-y-auto">
            <div className="flex flex-col md:flex-row md:gap-2 px-6 py-2 gap-2 border-b-[#cecece] bg-[#FAFAFC]">
              <label className="text-start w-1/2 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
                <IconFatArrow /> Riesgo Cardiovascular
              </label>
              <div className="  grid grid-cols-2 md:flex gap-4">
                <BotonDashPte
                  riesgo={user?.ptCvRsks?.catCvRisk?.name}
                  nombre={"Bajo"}
                />
                <BotonDashPte
                  riesgo={user?.ptCvRsks?.catCvRisk?.name}
                  nombre={"Moderado"}
                />
                <BotonDashPte
                  riesgo={user?.ptCvRsks?.catCvRisk?.name}
                  nombre={"Alto"}
                />
                <BotonDashPte
                  riesgo={user?.ptCvRsks?.catCvRisk?.name}
                  nombre={"Muy Alto"}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:gap-2 px-6 py-2 gap-2  border-b-[#cecece] bg-[#FAFAFC]">
              <label className="text-start w-1/2 text-[#686868] font-medium text-base leading-4 flex gap-2 items-center">
                <IconFatArrow /> Riesgo quirúrgico
              </label>
              <div className="flex gap-3">
                <BotonDashPte
                  riesgo={user?.patSgRisks?.catSurgicalRisk?.name}
                  nombre={"Bajo"}
                />
                <BotonDashPte
                  riesgo={user?.patSgRisks?.catSurgicalRisk?.name}
                  nombre={"Moderado"}
                />
                <BotonDashPte
                  riesgo={user?.patSgRisks?.catSurgicalRisk?.name}
                  nombre={"Alto"}
                />
              </div>
            </div>

            <AntecedenteDash
              title={"Antecedentes quirúrgicos"}
              info={
                user?.backgrounds?.surgicalBackground
                  ? user?.backgrounds?.surgicalBackground
                  : "No hay antecedentes"
              }
            />
            <AntecedenteDash
              title={"Antecedentes patológicos"}
              info={
                user?.backgrounds?.pathologicBackground
                  ? user?.backgrounds?.pathologicBackground
                  : "No hay antecedentes"
              }
            />
            <AntecedenteDash
              title={"Antecedentes no patológicos"}
              info={
                user?.backgrounds?.nonPathologicBackground
                  ? user?.backgrounds?.nonPathologicBackground
                  : "No hay antecedentes"
              }
            />
            <AntecedenteDash
              title={"Antecedentes familiares"}
              info={
                user?.backgrounds?.familyBackground
                  ? user?.backgrounds?.familyBackground
                  : "No hay antecedentes"
              }
            />
            <AntecedenteDash
              title={"Antecedentes de infancia"}
              info={
                user?.backgrounds?.pediatricBackground
                  ? user?.backgrounds?.pediatricBackground
                  : "No hay antecedentes"
              }
            />
            <AntecedenteDash
              title={"Medicación actual"}
              info={
                user?.backgrounds?.allergicBackground
                  ? user?.backgrounds?.allergicBackground
                  : "No hay antecedentes"
              }
            />
            <AntecedenteDash
              title={"Alergias"}
              info={
                user?.backgrounds?.allergicBackground
                  ? user?.backgrounds?.allergicBackground
                  : "No hay antecedentes"
              }
            />
            <AntecedenteDash
              title={"Vacunas"}
              info={
                user?.backgrounds?.vaccinationBackground
                  ? user?.backgrounds?.vaccinationBackground
                  : "No hay antecedentes"
              }
            />
          </div>{" "}
        </>
      )}

      <ModalModularizado
        isOpen={isModalOpen}
        onClose={closeModal}
        Modals={[
          <ImportarHC
            key={"importar hc"}
            onData={handleModalData}
            text={text}
          />,
        ]}
        title={"Importar Historia Clínica"}
        button1={"hidden"}
        button2={"bg-greenPrimary text-white block"}
        progessBar={"hidden"}
        size={"h-[35rem] md:h-fit md:w-[35rem]"}
        buttonText={{ end: `Importar` }}
        funcion={submitModalData}
        loading={loading}
      />
      {/* <div>
            <h1>Vista Previa del PDF</h1>
            <PdfPreview user={user} />
        </div> */}
    </div>
  );
};

export default Datos;
