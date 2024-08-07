"use client";

import Image from "next/image";
import Link from "next/link";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { useEffect, useState } from "react";
import rutas from "@/utils/rutas";
import ruteActual from "../../../../../components/images/ruteActual.png";
import backChanges from "../../../../../components/images/backChanges.png";
import Detail from "@/components/detail/detail";
import Cookies from "js-cookie";
import MapModalPte from "@/components/modal/MapModalPte";
import Elboton from "@/components/Buttons/Elboton";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setPatient } from "@/redux/slices/doctor/allPatients";
import LastLogin from "@/utils/lastLogin";
import IconRegresar from "@/components/icons/iconRegresar";
import CalcularEdad from "@/utils/calcularEdad";
import ButtonSolicitar from "@/components/Buttons/buttonSolicitar";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import IconGeolocation from "@/components/icons/IconGeolocation.jsx";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";

export default function DetallePaciente({ params }) {
  const id = params.userId;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.allPatients.patient);
  const [showMapModal, setShowMapModal] = useState(false);
  const [isLoading, setLoading] = useState(true);

  const openModal = () => {
    setShowMapModal(true);
  };

  const getPatient = async () => {
    try {
      const token = Cookies.get("a");
      const [response1, response2] = await Promise.all([
        ApiSegimed.get(`/patient/${id}`, { headers: { token: token } }),
        ApiSegimed.get(`/patient-details?id=${id}`, {
          headers: { token: token },
        }),
      ]);

      if (response1.data && response2.data) {
        const combinedData = {
          ...response1.data,
          ...response2.data,
        };
        console.log(combinedData);
        dispatch(setPatient(combinedData));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPatient();
  }, [id]);

  return isLoading ? (
    <SkeletonList count={9} />
  ) : (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center gap-2 px-4 py-3 border-b border-b-[#cecece]">
        <div className="flex items-center ">
          <Image src={ruteActual} alt="ruta actual" />
          <p className="text-lg font-normal leading-6 text-[#5F5F5F]">
            Detalle del paciente
          </p>
        </div>
        <div>
          <Link href={`${rutas.Doctor}${rutas.Pacientes}`}>
            <Elboton nombre={"Regresar"} size={"lg"} icon={<IconRegresar />} />
          </Link>
        </div>
      </div>
      <div>
        <Detail
          title={"Ultima ubicacion:"}
          data={
            <Elboton
              nombre={"Mostrar mapa"}
              icon2={<IconGeolocation color={"white"} />}
              onPress={openModal}
            />
          }
        />
        <Detail
          title={"Nombre completo:"}
          data={`${user?.name} ${user?.lastname}`}
        />
        <Detail
          title={"Edad:"}
          data={user?.sociodemographicDetails?.birthDate ? CalcularEdad(user?.sociodemographicDetails?.birthDate) : ""}
        />
        <Detail title={"Sexo:"} data={user?.sociodemographicDetails?.genre} />
        <Detail
          title={"Fecha de nacimiento:"}
          data={user?.sociodemographicDetails?.birthDate}
        />
        <Detail
          title={"Telefono de contacto:"}
          data={<ButtonSolicitar nombre={"Solicitar permiso"} size={"sm"} />}
        />
        <Detail
          title={"Telefono de urgencia:"}
          data={<ButtonSolicitar nombre={"Solicitar permiso"} size={"sm"} />}
        />
        <Detail
          title={"Correo electronico:"}
          data={<ButtonSolicitar nombre={"Solicitar permiso"} size={"sm"} />}
        />
        <Detail
          title={"Lugar de domicilio:"}
          data={<ButtonSolicitar nombre={"Solicitar permiso"} size={"sm"} />}
        />
        <Detail
          title={"Fecha del Diagnostico Principal:"}
          data={"-"}
        />
        <Detail
          title={"Lugar de atencion medica:"}
          data={"-"}
        />
        <Detail
          title={"Medico a cargo:"}
          data={`${user?.currentPhysician?.name} ${user?.currentPhysician?.lastname}`}
        />
        <Detail
          title={"Estado:"}
          data={user?.sociodemographicDetails?.civilStatus}
        />
        <Detail
          title={"Última Conexión:"}
          data={LastLogin(user?.lastLogin)}
        />
        <Detail
          title={"Actividad Última Semana:"}
          data={"-"}
        />
        <Detail
          title={"Actividad Último Mes:"}
          data={"-"}
        />
        <Detail
          title={"Fecha de Registro:"}
          data={"-"}
        />
      </div>
      {showMapModal && (
        <ModalModularizado
          isOpen={showMapModal}
          onClose={() => setShowMapModal(false)}
          Modals={[
            <MapModalPte
              onClose={() => setShowMapModal(false)}
              patient={user}
              key={"map"}
            />
          ]}
          title={"Geolocalizacion del paciente"}
          button1={"hidden"}
          button2={"bg-bluePrimary text-white block font-font-Roboto"}
          progessBar={"hidden"}
          size={"h-[36rem] md:h-[35rem] md:w-[45rem]"}
          buttonText={{ end: `Continuar` }}
        />
      )}
    </div>
  );
}
