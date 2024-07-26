"use client";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import IconSend from "@/components/icons/IconSend";
import LostPassword from "@/components/images/password.png";
import Image from "next/image";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { NavBar } from "@/components/NavBar/navbar";

export default function AuthSelect() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await ApiSegimed.post("/user/recover-password", data);

      Swal.fire({
        title: "¡Email enviado correctamente!",
        text: response.data.msg,
        icon: "success",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });

      router.push("/accounts/password/resetMail");
    } catch (error) {

      console.error("Error: ", error.response);
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          confirmButtonColor: "#487FFA",
          confirmButtonText: "Aceptar",
          text: error?.response?.data?.error || error.message,
        });
      }
    }
  };

  return (
    <div className="h-full w-full flex justify-center items-center antialiased">
      <div className="w-full h-[65%] items-center md:w-1/2 flex flex-col gap-10 md:pt-120">
        <NavBar />
        <div className=" flex items-center pt-28 flex-col gap-5 md:px-82 md:py-0">
          <form onSubmit={handleSubmit(onSubmit)}>
            <header className=" justify-center items-start px-6 md:px-24 py-0 pb-5 ">
              <h2 className="text-4xl text-[#5F5F5F] text-center pb-3 font-semibold leading-7 capitalize  ">
                Recupere su contraseña
              </h2>
              <p className="text-center text-[#5F5F5F] font-normal text-base md:text-base leading-7">
                Para restablecer su contraseña, ingrese la dirección de correo
                electrónico vinculada a su cuenta. Recibirá un enlace seguro
                para crear una nueva contraseña.
              </p>
            </header>
            <fieldset className="flex justify-center items-start px-6 md:px-24 py-0 pb-5 ">
              <label className="w-full">
                <p className="text-[#5F5F5F] pb-2 leading-3 ">
                  Correo Electrónico
                </p>
                <input
                  {...register("email", {
                    required: "*Este campo es obligatorio",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "*Debe ser un correo electrónico válido",
                    },
                  })}
                  type="text"
                  className="mb-2 text-[#808080] w-full bg-[#F2F2F2] px-6 py-2 border leading-3 rounded-sm border-[#DCDBDB] font-normal text-base  focus:outline-[#808080]"
                  placeholder="Ingrese su correo electronico"
                />
                {errors.email && (
                  <p className="text-[#fe4848] pb-2 leading-3 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </label>
            </fieldset>
            <div className=" text-center  flex flex-col gap-2 w-1/2 mx-auto md:w-[60%] items-center justify-center">
              <button className="text-white w-64 text-center bg-[#487FFA] px-6 py-3 rounded-md flex items-center gap-2 justify-center hover:bg-[#70C247] transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
                Enviar correo <IconSend />
              </button>
              <button
                onClick={() => router.push("/")}
                type="button"
                className="text-[#487FFA]  w-64 border-1 border-gray-400 text-center px-6 py-3 rounded-md flex items-center gap-2 justify-center hover: transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
                Regresar
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="hidden md:flex md:w-1/2 h-screen bg-gradient-to-br from-blue-400 via-blue-600 to-blue-400 flex-col items-center justify-center">
        <div className="flex items-center justify-center ">
          <div className="w-auto h-auto">
            <Image
              src={LostPassword}
              alt="Recuperar contraseña"
              width={500}
              height={200}
            />
          </div>

        </div>
        <p className="text-center px-24 pb-2 text-lg font-normal leading-8 text-white">
          SEGIMED es una novedosa plataforma médica interactiva que permite una
          intercomunicación continua entre médicos y pacientes, generando un
          vínculo entre ambos donde quieras que estés.
        </p>
      </div>
    </div>
  );
}
