"use client";

import IconEnter from "../icons/IconEnter";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { useRouter } from "next/navigation";
import { Button, useDisclosure } from "@nextui-org/react";

import Swal from "sweetalert2";
import IconPasswordClose from "../icons/IconPasswordClose";
import IconPasswordOpen from "../icons/IconPasswordOpen";
import IconCheckBoton from "../icons/iconCheckBoton";
import Link from "next/link";
import LoadingFallback from "../loading/loading";
import Privacy from "../register/Privacy";
import Term from "../register/Term";
import ReactFlagsSelect from "react-flags-select";
import flags from "@/utils/countriesFlags";

export const FormUser = ({ formData, setFormData }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      password: "",
    },
  });
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const PrivacyModal = useDisclosure();
  const TermModal = useDisclosure();
  const [showPasswordCriteria, setShowPasswordCriteria] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [selected, setSelected] = useState("");



  const handleCheckboxChange = (type) => {
    if (type === "terms") {
      setTermsAccepted(!termsAccepted);
    } else if (type === "privacy") {
      setPrivacyAccepted(!privacyAccepted);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setLoading(true);
      const updatedData = {
        ...formData,
        ...data,
        areaCode: flags[selectedPrefix],
        nationality: selected
      };
      setFormData(updatedData);
      console.log(updatedData);


      const response = await ApiSegimed.post(
        "/user/register-user",
        updatedData
      );
      if (response.status !== 201) {
        throw new Error(response.data.error);
      }
      setLoading(false);
      router.push(`/accounts/register/success`);
      reset();
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.error,
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    }
  });

  const passwordValue = watch("password");

  const passwordCriteria = {
    hasUpperCase: /[A-Z]/.test(passwordValue),
    hasLowerCase: /[a-z]/.test(passwordValue),
    hasSpecialChar: /[\W_+]/.test(passwordValue),
    hasNumber: /[0-9]/.test(passwordValue),
    hasMinLength: passwordValue?.length >= 6,
  };

  const noEmptySpaces = (value) => value.trim() !== "";

  return (
    <div className="pb-36">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-full max-w-96">
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
                validate: noEmptySpaces,
                maxLength: {
                  value: 100,
                  message:
                    "El correo electrónico no debe exceder los 100 caracteres.",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm font-medium">
                {errors.email.message}
              </span>
            )}
          </div>

          <div
            className="w-full max-w-96"
            onBlur={() => setShowPasswordCriteria(false)}>
            <label htmlFor="password">Nueva Contraseña</label>
            <div className="relative">
              <button
                type="button"
                className="absolute right-2 focus:outline-none pt-6"
                onClick={togglePasswordVisibility}
                style={{ top: 0, bottom: 0, margin: "auto" }}>
                {showPassword ? <IconPasswordOpen /> : <IconPasswordClose />}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Ingrese Contraseña"
              onFocus={() => setShowPasswordCriteria(true)}
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
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_+])[A-Za-z\d\W_+]{6,20}$/,
                  message:
                    "La contraseña debe tener letras mayúscula, letras minúscula, un número y un carácter especial.",
                },
              })}
            />

            {/* Mostrar los criterios solo si el usuario ha empezado a escribir */}

            {showPasswordCriteria && (
              <ul className="mt-2 text-sm ">
                <li
                  className={`flex gap-2 items-center whitespace-nowrap ${passwordCriteria.hasUpperCase ? "text-[#70C247]" : ""
                    }`}>
                  {passwordCriteria.hasUpperCase && (
                    <IconCheckBoton className={"w-4"} />
                  )}{" "}
                  Debe contener una letra mayúscula
                </li>
                <li
                  className={`flex gap-2  items-center whitespace-nowrap ${passwordCriteria.hasLowerCase ? "text-[#70C247]" : ""
                    }`}>
                  {passwordCriteria.hasLowerCase && (
                    <IconCheckBoton className={"w-4"} />
                  )}{" "}
                  Debe contener una letra minúscula
                </li>
                <li
                  className={`flex gap-2 items-center whitespace-nowrap ${passwordCriteria.hasSpecialChar ? "text-[#70C247]" : ""
                    }`}>
                  {passwordCriteria.hasSpecialChar && (
                    <IconCheckBoton className={"w-4"} />
                  )}{" "}
                  Debe contener un carácter especial
                </li>
                <li
                  className={`flex gap-2 items-center whitespace-nowrap ${passwordCriteria.hasMinLength ? "text-[#70C247]" : ""
                    }`}>
                  {passwordCriteria.hasMinLength && (
                    <IconCheckBoton className={"w-4"} />
                  )}{" "}
                  Debe tener al menos 6 caracteres
                </li>
                <li
                  className={`flex gap-2 items-center whitespace-nowrap ${passwordCriteria.hasNumber ? "text-[#70C247]" : ""
                    }`}>
                  {passwordCriteria.hasNumber && (
                    <IconCheckBoton className={"w-4"} />
                  )}{" "}
                  Debe contener un número
                </li>
              </ul>
            )}
          </div>

          {/* Resto del formulario */}
          <div className="w-full max-w-96">
            <label htmlFor="idType">Tipo de Identificación</label>
            <select
              id="idType"
              className="w-full bg-[#FBFBFB] py-2 px-2 border-2 border-[#DCDBDB] rounded-lg focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
              {...register("idType", {
                required: {
                  value: true,
                  message: "* Este dato es requerido *",
                },
              })}>
              <option value="1">DNI</option>
              <option value="2">Pasaporte</option>
            </select>
            {errors.idType && (
              <span className="text-red-500 text-sm font-medium">
                {errors.idType.message}
              </span>
            )}
          </div>

          <div className="w-full max-w-96">
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
                validate: noEmptySpaces,
                maxLength: {
                  value: 20,
                  message:
                    "El número de identificación no debe exceder los 20 caracteres.",
                },
              })}
            />
            {errors.idNumber && (
              <span className="text-red-500 text-sm font-medium">
                {errors.idNumber.message}
              </span>
            )}
          </div>

          <div className="w-full max-w-96">
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
                validate: noEmptySpaces,
                maxLength: {
                  value: 50,
                  message: "El nombre no debe exceder los 50 caracteres.",
                },
              })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm font-medium">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="w-full max-w-96">
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
                validate: noEmptySpaces,
                maxLength: {
                  value: 50,
                  message: "El apellido no debe exceder los 50 caracteres.",
                },
              })}
            />
            {errors.lastname && (
              <span className="text-red-500 text-sm font-medium">
                {errors.lastname.message}
              </span>
            )}
          </div>
          <div className="w-full max-w-96">
            <label htmlFor="areaCode">Número de Celular</label>

            <div className="flex gap-2 justify-around items-center">
              <ReactFlagsSelect
                className="  items-center justify-center pt-1 w-[10rem]"
                customLabels={flags}
                searchable={true}
                selected={selectedPrefix}
                showSelectedLabel={false}
                placeholder="Prefijo"
                onSelect={(code) => {
                  setSelectedPrefix(code);
                }}
              />

              {/* Input para el número de celular */}
              <input
                id="cellphone"
                type="text"
                placeholder="Ingrese Número de Celular"
                className="w-3/5 h-[3rem] bg-[#FBFBFB] py-1 px-3 border-2 border-[#DCDBDB] rounded-lg focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
                {...register("cellphone", {
                  required: {
                    value: true,
                    message: "* Este dato es requerido *",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Número de celular inválido",
                  },
                })}
              />
            </div>

            {/* Mostrar errores si existen */}
            {errors.areaCode && (
              <span className="text-red-500 text-sm font-medium">
                {errors.areaCode.message}
              </span>
            )}
            {errors.cellphone && (
              <span className="text-red-500 text-sm font-medium">
                {errors.cellphone.message}
              </span>
            )}
          </div>

          <div className="w-full max-w-96">
            <label htmlFor="nationality">Nacionalidad</label>
            <ReactFlagsSelect
              className="w-full  "
              placeholder="Seleccione un pais"
              searchable={true}
              selected={selected}
              onSelect={(code) => {
                setSelected(code);
              }}

            />
            {errors.nationality && (
              <span className="text-red-500 text-sm font-medium">
                {errors.nationality.message}
              </span>
            )}
          </div>
          {formData?.role == 3 && (
            <div className="w-full max-w-96">
              <label htmlFor="token">Código de invitación:</label>
              <input
                placeholder="Ingrese el código de invitación"
                id="token"
                className="w-full bg-[#FBFBFB] py-2 px-2 border-2 border-[#DCDBDB] rounded-lg focus:outline-none focus:border-[#487FFA] placeholder:font-medium"
                {...register("token", {
                  required: {
                    value: true,
                    message: "* Este dato es requerido *",
                  },
                })}
              />

              {errors.token && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.token.message}
                </span>
              )}
            </div>
          )}

          <div className="w-full max-w-96 flex items-center text-[#487FFA]">
            <input
              type="checkbox"
              id="terms"
              className="mr-2 form-checkbox border-2 border-[#DCDBDB] rounded focus:outline-none focus:border-[#487FFA]"
              checked={termsAccepted}
              onChange={() => handleCheckboxChange("terms")}
            />
            <button
              type="button"
              onClick={TermModal.onOpen}
              className="cursor-pointer">
              Acepto los términos y condiciones.
            </button>
          </div>

          <div className="w-full max-w-96 flex items-center text-[#487FFA]">
            <input
              type="checkbox"
              id="privacy"
              className="mr-2 form-checkbox border-2 border-[#DCDBDB] rounded focus:outline-none focus:border-[#487FFA]"
              checked={privacyAccepted}
              onChange={() => handleCheckboxChange("privacy")}
            />
            <button
              type="button"
              onClick={PrivacyModal.onOpen}
              className="cursor-pointer">
              Acepto la política de privacidad.
            </button>
          </div>

          <div className="w-full max-w-96 flex justify-center mt-4 mb-10">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-lg
                ${termsAccepted && privacyAccepted
                  ? "bg-[#70C247] text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
                } ${loading ? "bg-bluePrimary" : "bg-[#70C247]"}`}
              disabled={(!termsAccepted && !privacyAccepted) || loading}>
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <LoadingFallback className="w-6 h-6" />
                </div>
              ) : (
                <div className="flex justify-center items-center gap-3">
                  Registrar <IconEnter className="w-6" />
                </div>
              )}
            </button>
          </div>
        </div>
      </form>
      <Privacy
        isOpen={PrivacyModal.isOpen}
        onOpenChange={PrivacyModal.onOpenChange}
        onAccept={() => setPrivacyAccepted(true)}
      />
      <Term
        isOpen={TermModal.isOpen}
        onOpenChange={TermModal.onOpenChange}
        onAccept={() => setTermsAccepted(true)}
      />
    </div>
  );
};
