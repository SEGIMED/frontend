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

export default function DetallePaciente({ params }) {
  const id = params.userId;
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.allPatients.patient);

  useEffect(() => {}, []);

  const [isLoading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
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
        // Combinar los datos de ambas respuestas
        const combinedData = {
          ...response1.data,
          ...response2.data,
        };

       

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

  if (!user) {
    return <div>Paciente no encontrado</div>;
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <div className="flex justify-between items-center gap-2 px-4 py-3 border-b border-b-[#cecece]">
        <div className="flex items-center ">
          <Image src={ruteActual} alt="ruta actual" />
          <p className="text-lg font-normal leading-6 text-[#5F5F5F] ">
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
          title={"Geolocalizacion:"}
          data={<Elboton nombre={"Ubicacion"} onPress={openModal} />}
        />
        <Detail title={"Nombre:"} data={user?.name} />
        <Detail title={"Apellido:"} data={user?.lastname} />
        <Detail
          title={"Edad:"}
          data={CalcularEdad(user?.sociodemographicDetails?.birthDate)}
        />
        <Detail title={"Sexo:"} data={user?.sociodemographicDetails?.genre} />
        <Detail title={"Documento:"} data={user?.idNumber} />
        <Detail
          title={"Nacionalidad:"}
          data={
            user?.nationality === 1
              ? "Colombiano"
              : user.nationality === 2
              ? "Argentino"
              : user.nationality
          }
        />
        <Detail
          title={"Fecha de nacimiento:"}
          data={user?.sociodemographicDetails?.birthDate}
        />
        <Detail
          title={"Telefono de contacto:"}
          data={<Elboton nombre={"Solicitar permiso"} />}
        />
        <Detail
          title={"Telefono de urgencia:"}
          data={<Elboton nombre={"Solicitar permiso"} />}
        />
        <Detail
          title={"Correo electronico:"}
          data={<Elboton nombre={"Solicitar permiso"} />}
        />
        <Detail
          title={"Lugar de domicilio:"}
          data={<Elboton nombre={"Solicitar permiso"} />}
        />
        <Detail
          title={"Fecha del Diagnostico Principal:"}
          data={user?.lastname}
        />
        <Detail title={"Lugar de atencion medica:"} data={user?.lastname} />
        <Detail title={"Medico a cargo:"} data={user?.lastname} />
        <Detail
          title={"Estado:"}
          data={user?.sociodemographicDetails?.civilStatus}
        />
        <Detail title={"Ultima conexion:"} data={LastLogin(user?.lastLogin)} />
      </div>
      {showModal && (
        <MapModalPte onClose={() => setShowModal(false)} patient={user} />
      )}
    </div>
  );
}
