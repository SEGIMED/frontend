"use client";

import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import IconPasswordClose from "@/components/icons/IconPasswordClose";
import IconPasswordOpen from "@/components/icons/IconPasswordOpen";

import rutas from "@/utils/rutas";
import { ApiSegimed } from "@/Api/ApiSegimed";
import IconSend from "@/components/icons/IconSend";
import IconRegister from "@/components/icons/IconRegister";
import { FooterAcc } from "@/components/footer/footerAcc";
import { NavBar } from "@/components/NavBar/navbar";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    if (loading) return;
    const postData = {
      password: String(data.password),
      ...(/^\S+@\S+\.\S+$/.test(data.userOrDni)
        ? { email: String(data.userOrDni) }
        : { idNumber: String(data.userOrDni) }),
    };

    try {
      // const response = await fetch(`https://segimed-backend.onrender.com/api/user/login`, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(postData),
      // });

      // const result = await response.json();
      setLoading(true);
      const response = await ApiSegimed.post("/user/login", postData);
      const result = response.data;

      if (response.status !== 200) {
        throw new Error(result.error);
      }

      if (response.status === 200) {
        // Guardar en el localStorage
        Cookies.set("a", result.authenticationDetails.accessToken, {
          expires: 1,
        });
        Cookies.set("d", result.authenticationDetails.refreshToken, {
          expires: 7,
        });
        Cookies.set("b", result.authenticationDetails.role, { expires: 1 });
        Cookies.set("c", result.authenticationDetails.userId, { expires: 1 });

        // Verificar si el usuario y la contraseña son iguales
        if (data.userOrDni === data.password) {
          router.push("/accounts/password/reset");
        } else {
          // Redireccionar según el rol del usuario
          if (result.authenticationDetails.role === "Admin") {
            router.push(`${rutas.Admin}`);
          } else if (result.authenticationDetails.role === "Médico") {
            router.push(`${rutas.Doctor}`);
          } else if (result.authenticationDetails.role === "Paciente") {
            router.push(`${rutas.PacienteDash}`);
          }
        }
        setLoading(false);
      }
    } catch (error) {
      let errorMessage = error?.response?.data?.error;

      // Mostrar el error usando Swal si es un error de conexión
      if (error) {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: errorMessage ? errorMessage : error.message,
          confirmButtonColor: "#487FFA",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  useEffect(() => {
    const token = Cookies.get("a");
    const role = Cookies.get("b");

    if (token) {
      if (role === "Admin") {
        router.push(`${rutas.Admin}`);
      } else if (role === "Médico") {
        router.push(`${rutas.Doctor}`);
      } else if (role === "Paciente") {
        router.push(`${rutas.PacienteDash}`);
      }
    }
  }, [router]);

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <NavBar />
      {/* <LaNAvbar /> */}
      {/* <div className="w-full h-full">
        <HeadLanding />
        <BenefitsLanding />
        <PlatformLanding />
        <TestimonyLanding />
        <ExpertsLanding />
        <SponsorsLanding />
        <QuestionsLanding />
      </div>
      <Footer />
      <FooterAccount /> */}
      <div className="h-full lg:h-screen flex mt-0 flex-col lg:flex-row font-poppins antialiased ">
        {/* Lado derecho */}
        <div className="w-full lg:w-1/2 flex justify-center items-center ">
          <form
            className="w-full lg:max-w-lg p-8 bg-white"
            onSubmit={handleSubmit(onSubmit)}>
            <header className="mb-10 lg:mb-6 text-center">
              <h2 className="text-3xl lg:text-2xl text-gray-800 font-semibold leading-7 capitalize">
                Ingrese sus Datos
              </h2>
            </header>
            <div className="mb-6 lg:mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="userOrDni">
                Correo electrónico o DNI
              </label>
              <div className="flex w-full">
                <input
                  type="text"
                  id="userOrDni"
                  name="userOrDni"
                  placeholder="Ingrese su correo electrónico o DNI"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                    errors.userOrDni ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("userOrDni", {
                    required: true,
                    validate: (value) =>
                      /^\S+@\S+\.\S+$/.test(value) || /^\d{8,}$/.test(value),
                  })}
                />
              </div>
              {errors.userOrDni && (
                <span className="text-red-500 text-sm mt-1">
                  Ingrese un Correo electrónico o DNI válido
                </span>
              )}
            </div>
            <div className="mb-10 lg:mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Contraseña
              </label>
              <div className="flex w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Ingrese su contraseña"
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("password", { required: true })}
                />
                <div className="relative">
                  <button
                    type="button"
                    className="absolute right-2 focus:outline-none"
                    onClick={togglePasswordVisibility}
                    style={{ top: 0, bottom: 0, margin: "auto" }}>
                    {showPassword ? (
                      <IconPasswordOpen />
                    ) : (
                      <IconPasswordClose />
                    )}
                  </button>
                </div>
              </div>
              {errors.password && errors.password.type === "required" && (
                <span className="text-red-500 text-sm mt-1">
                  Este campo es requerido
                </span>
              )}
            </div>
            <div className="flex justify-between items-center mb-10 lg:mb-6 w-full">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-500 mr-2"
                />
                <span className="text-gray-700 text-sm">
                  Mantener sesión abierta
                </span>
              </label>
              <Link
                href="/accounts/password"
                className="text-sm text-blue-500 hover:underline">
                ¿Olvidó su contraseña?
              </Link>
            </div>
            <div className="text-center  flex justify-center">
              <button
                type="submit"
                className={`text-white text-center bg-[#70C247] px-10 py-3 rounded-lg flex items-center transform hover:scale-105 active:scale-100 active:translate-y-1 ${
                  Object.keys(errors).length === 0
                    ? ""
                    : "cursor-not-allowed opacity-50"
                }`}
                disabled={Object.keys(errors).length !== 0 || loading}>
                Iniciar Sesión <IconSend className="m" />
              </button>
            </div>
          </form>
        </div>
        {/* Lado izquierdo */}
        <div className="hidden lg:flex flex-col lg:w-1/2 bg-gradient-to-br h-full from-blue-400 via-blue-600 to-blue-400 text-white text-center justify-center items-center">
          <IconRegister className={"w-[400px]"} />
          <p className="px-24 pb-2 text-lg font-normal leading-8">
            SEGIMED es una novedosa plataforma médica interactiva que permite
            una intercomunicación continua entre médicos y pacientes, generando
            un vínculo entre ambos donde quieras que estés.
          </p>
        </div>
      </div>
      <div className="relative lg:fixed bottom-0 left-0 w-full flex justify-start">
        <FooterAcc />
      </div>
    </div>
  );
}
