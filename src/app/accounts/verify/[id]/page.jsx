"use client";

import IconVerify from "@/components/icons/IconVerify";
import IconSend from "@/components/icons/IconSend";
import { useForm } from "react-hook-form";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { NavBar } from "@/components/NavBar/navbar";

export default function Verify() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const pathname = usePathname();
  const router = useRouter();
  const userId = pathname.substring(pathname.lastIndexOf("/") + 1);

  const [apiResponse, setApiResponse] = useState(null);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await ApiSegimed.post(`/user/validate-email`, {
        userId: userId, // ID del usuario recibido de la URL
        temporaryCode: data.number, // El código de confirmación ingresado por el usuario
      });

      setApiResponse(response.data);
      if (response.data) {
        router.push("/");
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
      if (error.response) {
        console.error("Error response:", error.response.data);
        setApiResponse(error.response.data);
      } else if (error.request) {
        console.error("Error request:", error.request);
        setApiResponse({ message: "No response received from server." });
      } else {
        console.error("Error message:", error.message);
        setApiResponse({ message: error.message });
      }
    }
  });

  return (
    <div className="w-full h-screen flex flex-col md:flex-row bg-white">
      <div className="w-full md:w-[50%] h-full flex flex-col">
        <NavBar />
        <div className="h-[80%] md:h-full w-full flex flex-col items-center justify-center gap-5 p-5">
          <h1 className="text-center text-3xl font-semibold">
            Ingrese su código de verificación
          </h1>
          <p className="text-center">
            Para completar la creación de su nueva cuenta, por favor ingrese el
            código de confirmación que encontrará en la bandeja de entrada de su
            correo electrónico. Si no lo encuentra, asegúrese de revisar la
            carpeta de spam o correo no deseado.
          </p>
          <div className="w-full">
            <form
              className="flex flex-col gap-10 items-center"
              onSubmit={onSubmit}>
              <div className="flex flex-col gap-2 w-full md:w-[35rem]">
                <label htmlFor="number" className=" text-lg">
                  Código de confirmación
                </label>
                <input
                  id="number"
                  type="text"
                  placeholder="Ingrese aquí su código de confirmación"
                  className="w-full bg-[#FBFBFB] py-2 px-3 border-2 border-[#DCDBDB] focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
                  {...register("number", {
                    required: {
                      value: true,
                      message: "* Este dato es requerido *",
                    },
                  })}
                />
                {errors.number && (
                  <span className="text-red-500 text-sm font-medium">
                    {errors.number.message}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-center text-xl font-bold">
                <button
                  type="submit"
                  className="w-52 flex items-center justify-center gap-3 rounded-md bg-[#70C247] px-6 py-2 text-white">
                  Verificar <IconSend />
                </button>
              </div>
            </form>
          </div>
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
