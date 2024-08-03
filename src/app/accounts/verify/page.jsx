"use client";

import IconVerify from "@/components/icons/IconVerify";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { NavBar } from "@/components/NavBar/navbar";
import Elboton from "@/components/Buttons/Elboton";
import Swal from "sweetalert2";

export default function Verify() {
  const [userId, setUserId] = useState(null);
  const [codeOTP, setCodeOTP] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("codeOTP" || !searchParams.get("userId"))) {
      router.push("/");
    }
    setUserId(searchParams.get("userId"));
    setCodeOTP(searchParams.get("codeOTP"));
    if (userId && codeOTP) verifyCode();
  }, [searchParams, userId, codeOTP]);
  const [apiResponse, setApiResponse] = useState(null);

  const verifyCode = async () => {
    try {
      const response = await ApiSegimed.post(`/user/validate-email`, {
        userId: userId, // ID del usuario recibido de la URL
        temporaryCode: codeOTP, // El código de confirmación ingresado por el usuario
      });

      setApiResponse(response.data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ha ocurrido un error al verificar el código.",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });
    }
  };
  if (loading) {
    return <p>Cargando...</p>;
  }
  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-[50%] h-full flex flex-col">
        <NavBar />
        <div className="h-[80%] md:h-full w-full flex flex-col items-center justify-center gap-5 p-5">
          <IconVerify className="h-1/3 xs:h-1/2 md:hidden block" />
          <h1 className="text-center text-3xl md:text-4xl font-semibold">
            ¡Cuenta Activada!
          </h1>
          <div className="text-justify md:text-center md:text-lg text-base">
            <p>Tu cuenta en Segimed ha sido activada exitosamente.</p>
            <p>
              Ahora puedes iniciar sesión y disfrutar de todos nuestros
              servicios.
            </p>
          </div>
          <Elboton href={"/"} nombre="Iniciar Sesión" />
        </div>
      </div>
      <div className="w-[50%] hidden md:flex h-full  flex-col justify-around gap-5 p-10 bg-gradient-to-br from-blue-400 via-blue-600 to-blue-400">
        <div className="flex items-center justify-center flex-1">
          <div className="w-[80%] h-full flex items-center justify-center">
            <IconVerify className="h-full" />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <p className="text-white text-center">
            SEGIMED es una novedosa plataforma médica interactiva que permite
            una intercomunicación continua entre médicos y pacientes, generando
            un vínculo entre ambos donde quieras que estés.
          </p>
        </div>
      </div>
    </div>
  );
}
