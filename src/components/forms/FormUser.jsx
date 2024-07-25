"use client";

import IconEnter from "../icons/IconEnter";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import IconPasswordClose from "../icons/IconPasswordClose";
import IconPasswordOpen from "../icons/IconPasswordOpen";
import IconCheckBoton from "../icons/iconCheckBoton";

export const FormUser = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setError,
  } = useForm();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      const updatedData = { ...formData, ...data };
      setFormData(updatedData);

      const response = await ApiSegimed.post(
        "/user/register-user",
        updatedData
      );

      const user = response.data;

      router.push(`/accounts/verify/${user.id}`);

      reset();
    } catch (error) {
      if (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.error,
        });
      }
    }
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  useEffect(() => {
    const checkEmailExists = async () => {
      if (emailValue) {
        try {
          const response = await ApiSegimed.get("/patientsfilter");
          const patients = response.data;
          const emailExists = patients.some(
            (patient) => patient.email === emailValue
          );

          if (emailExists) {
            setError("email", {
              type: "manual",
              message: "Tu Correo ya se encuentra registrado",
            });
          }
        } catch (error) {
          console.error("Error al verificar el correo:", error);
        }
      }
    };

    const delayDebounceFn = setTimeout(() => {
      checkEmailExists();
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [emailValue, setError]);

  

  const passwordCriteria = {
    hasUpperCase: /[A-Z]/.test(passwordValue),
    hasLowerCase: /[a-z]/.test(passwordValue),
    hasSpecialChar: /[\W_]/.test(passwordValue),
    hasMinLength: passwordValue?.length >= 6,
  };

  return (
    <div className="pb-36">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-96">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              placeholder="Ingrese Correo Electrónico"
              className="w-full bg-[#FBFBFB] py-2 px-3 border-2 border-[#DCDBDB] rounded-lg focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
              {...register("email", {
                required: {
                  value: true,
                  message: "* Este dato es requerido *",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:
                    "Introduce una dirección de correo electrónico válida",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="w-96">
            <label htmlFor="password">Contraseña</label>
            <div className="relative">
              <button
                type="button"
                className="absolute right-2 focus:outline-none pt-6"
                onClick={togglePasswordVisibility}
                style={{ top: 0, bottom: 0, margin: "auto" }}
              >
                {showPassword ? <IconPasswordOpen /> : <IconPasswordClose />}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese Contraseña"
              className="w-full bg-[#FBFBFB] py-2 px-3 border-2 border-[#DCDBDB] rounded-lg focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
              {...register("password", {
                required: {
                  value: true,
                  message: "* Este dato es requerido *",
                },
                minLength: {
                  value: 6,
                  message: "La contraseña debe tener al menos 6 caracteres.",
                },
                maxLength: {
                  value: 20,
                  message: "La contraseña no debe exceder los 20 caracteres.",
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,20}$/,
                  message:
                    "La contraseña debe tener letras mayúscula, letras minúscula, un número y un carácter especial.",
                },
              })}
             
            />

            {/* Mostrar los criterios solo si el usuario ha empezado a escribir */}
       
              <ul className="mt-2 text-sm ">
                <li className={`flex gap-2 items-center whitespace-nowrap ${passwordCriteria.hasUpperCase ? "text-[#70C247]" : ""}`}>
                  {passwordCriteria.hasUpperCase && <IconCheckBoton className={"w-4"} />} Debe contener una letra mayúscula
                </li>
                <li className={`flex gap-2  items-center whitespace-nowrap ${passwordCriteria.hasLowerCase ? "text-[#70C247]" : ""}`}>
                  {passwordCriteria.hasLowerCase && <IconCheckBoton className={"w-4"} />} Debe contener una letra minúscula
                </li>
                <li className={`flex gap-2 items-center whitespace-nowrap ${passwordCriteria.hasSpecialChar ? "text-[#70C247]" : ""}`}>
                  {passwordCriteria.hasSpecialChar && <IconCheckBoton className={"w-4"} />} Debe contener un carácter especial
                </li>
                <li className={`flex gap-2 items-center whitespace-nowrap ${passwordCriteria.hasMinLength ? "text-[#70C247]" : ""}`}>
                  {passwordCriteria.hasMinLength && <IconCheckBoton className={"w-4"} />} Debe tener al menos 6 caracteres
                </li>
              </ul>
           
          </div>

          {/* Resto del formulario */}
          <div className="w-96">
            <label htmlFor="idType">Tipo de Identificación</label>
            <select
              id="idType"
              className="w-full bg-[#FBFBFB] py-2 px-2 border-2 border-[#DCDBDB] rounded-lg focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
              {...register("idType", {
                required: {
                  value: true,
                  message: "* Este dato es requerido *",
                },
              })}
            >
              <option value="1">DNI</option>
              <option value="2">Pasaporte</option>
            </select>
            {errors.idType && (
              <span className="text-red-500 text-sm font-medium">
                {errors.idType.message}
              </span>
            )}
          </div>

          <div className="w-96">
            <label htmlFor="idNumber">Número de Identificación</label>
            <input
              id="idNumber"
              type="text"
              placeholder="Ingrese Numero de identificacion"
              className="w-full bg-[#FBFBFB] py-2 px-3 border-2 border-[#DCDBDB] rounded-lg focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
              {...register("idNumber", {
                required: {
                  value: true,
                  message: "* Este dato es requerido *",
                },
              })}
            />
            {errors.idNumber && (
              <span className="text-red-500 text-sm font-medium">
                {errors.idNumber.message}
              </span>
            )}
          </div>

          <div className="w-96">
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              type="text"
              placeholder="Ingrese Nombre"
              className="w-full bg-[#FBFBFB] py-2 px-3 border-2 border-[#DCDBDB] rounded-lg focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
              {...register("name", {
                required: {
                  value: true,
                  message: "* Este dato es requerido *",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm font-medium">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="w-96">
            <label htmlFor="lastname">Apellido</label>
            <input
              id="lastname"
              type="text"
              placeholder="Ingrese Apellido"
              className="w-full bg-[#FBFBFB] py-2 px-3 border-2 border-[#DCDBDB] rounded-lg focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
              {...register("lastname", {
                required: {
                  value: true,
                  message: "* Este dato es requerido *",
                },
              })}
            />
            {errors.lastname && (
              <span className="text-red-500 text-sm font-medium">
                {errors.lastname.message}
              </span>
            )}
          </div>

          <div className="w-96">
            <label htmlFor="cellphone">Número de Celular</label>
            <input
              id="cellphone"
              type="text"
              placeholder="Ingrese Numero de Celular"
              className="w-full bg-[#FBFBFB] py-2 px-3 border-2 border-[#DCDBDB] rounded-lg focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
              {...register("cellphone", {
                required: {
                  value: true,
                  message: "* Este dato es requerido *",
                },
              })}
            />
            {errors.cellphone && (
              <span className="text-red-500 text-sm font-medium">
                {errors.cellphone.message}
              </span>
            )}
          </div>

          <div className="w-96">
            <label htmlFor="nationality">Nacionalidad</label>
            <select
              id="nationality"
              className="w-full bg-[#FBFBFB] py-2 px-2 border-2 border-[#DCDBDB] rounded-lg focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
              {...register("nationality", {
                required: {
                  value: true,
                  message: "* Este dato es requerido *",
                },
              })}
            >
              <option value="2">Argentin@</option>
              <option value="1">Colombian@</option>
            </select>
            {errors.nationality && (
              <span className="text-red-500 text-sm font-medium">
                {errors.nationality.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex justify-center p-10">
          <button className="bg-[#70C247] p-3 flex items-center justify-center rounded-lg text-white font-extrabold gap-2 w-64">
            Completar Registro
            <IconEnter className="w-6" />
          </button>
        </div>
      </form>
    </div>
  );
};


