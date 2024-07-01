"use client";

import { useForm } from "react-hook-form";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { adduser } from "@/redux/slices/user/user";
import Swal from "sweetalert2";
import Elboton from "@/components/Buttons/Elboton";
import MapModal from "@/components/modal/MapModal";
import CalcularEdad from "@/utils/calcularEdad";
import ruteActual from "@/components/images/ruteActual.png";
import LastLogin from "@/utils/lastLogin";
import Cookies from "js-cookie";
import IconEditar from "@/components/icons/iconEditar";
import IconGuardar from "@/components/icons/iconGuardar";
import IconCircle from "@/components/icons/IconCircle";
import IconRegresar from "@/components/icons/iconRegresar";
import PhotoModalPte from "@/components/modal/PhotoModalPTe";

// Definir opciones para el select de sexo
const sexoOptions = [
  { value: 2, label: "Masculino" },
  { value: 1, label: "Femenino" },
];

export default function HomePte() {
  const paciente = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const id = Cookies.get("c");
  const token = Cookies.get("a");
  const date = new Date(paciente.lastLogin);
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const [buttonSize, setButtonSize] = useState("lg");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setButtonSize(window.innerWidth <= 768 ? "md" : "lg");
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    setEdit(true);
  };

  const handleCancel = () => {
    setEdit(false);
  };

  const onSubmit = async (data) => {
    const token = Cookies.get("a");
    const myId = Number(Cookies.get("c"));
    const body = { ...data, patientId: myId };
    const patientDispatch = {
      ...paciente,
      ...data,
      sociodemographicDetails: {
        birthDate: data.birthDate,
        genre: data.genreId === "2" ? "Masculino" : "Femenino",
        emergencyContactPhone: data.emergencyContactPhone,
        address: data.address,
      },
    };

    const headers = { headers: { token: token } };

    try {
      const response = await ApiSegimed.patch(
        `/update-full-patient`,
        body,
        headers
      );
      setEdit(false);
      dispatch(adduser(patientDispatch));
      Swal.fire({
        title: "¡Datos actualizados correctamente!",
        text: "",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  // Para la ubicación
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);

  // Para la foto
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalfoto = () => setIsModalOpen(true);
  const closeModalFoto = () => setIsModalOpen(false);
  console.log(errors);
  return (
    <div className="h-full overflow-y-scroll flex flex-col">
      <div
        className={`flex ${
          edit ? "flex-col md:flex-row" : "md:flex-row"
        } justify-between items-center gap-2 pl-10 pr-6 py-3 border-b border-b-[#cecece] bg-[#FAFAFC]`}>
        <div
          className={`items-center gap-4  ${edit ? "hidden md:flex" : "flex"}`}>
          <Image src={ruteActual} alt="ruta actual" />
          <p className="text-lg font-normal leading-6 text-[#5F5F5F] ">
            Sus datos personales
          </p>
        </div>
        <div>
          {edit ? (
            <div className="flex items-center gap-2">
              <Elboton
                icon={<IconGuardar />}
                nombre={"Guardar Cambios"}
                size={buttonSize}
                onPress={handleSubmit(onSubmit)}
              />
              <Elboton
                icon={<IconRegresar />}
                nombre={"Regresar"}
                size={buttonSize}
                onPress={handleCancel}
              />
            </div>
          ) : (
            <Elboton
              icon={<IconEditar />}
              nombre={"Editar"}
              size={buttonSize}
              onPress={handleEdit}
            />
          )}
        </div>
      </div>
      <form>
        {edit && (
          <div className="flex items-center justify-between border-b border-b-[#cecece] pl-3 md:pl-8 py-2">
            <label className="w-1/2 flex items-center justify-start gap-3 font-medium">
              <IconCircle />
              Foto de perfil
            </label>
            <div className="w-1/2 h-8 md:h-12 flex items-center justify-start text-white text-sm font-bold mr-6">
              <Elboton
                size={buttonSize}
                onPress={openModalfoto}
                icon={<IconEditar />}
                nombre={"Editar Foto"}
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between border-b border-b-[#cecece] pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex items-center justify-start gap-3 font-medium">
            <IconCircle />
            Nombre:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-1 md:p-2 mr-6"
                type="text"
                defaultValue={paciente?.name}
                {...register("name", {
                  required: "*Este campo es obligatorio",
                  minLength: {
                    value: 2,
                    message: "Debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "No puede tener más de 20 caracteres",
                  },
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">{paciente?.name}</span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex items-center justify-start gap-3 font-medium">
            <IconCircle />
            Apellido:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-1 md:p-2 mr-6"
                type="text"
                defaultValue={paciente?.lastname}
                {...register("lastname", {
                  required: "*Este campo es obligatorio",
                  minLength: {
                    value: 2,
                    message: "Debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "No puede tener más de 20 caracteres",
                  },
                })}
              />
              {errors.lastname && (
                <p className="text-red-500 text-sm">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">
              {paciente?.lastname}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex items-center justify-start gap-3 font-medium">
            <IconCircle />
            Edad:
          </label>
          <span className="w-1/2 text-start px-6 py-2">
            {CalcularEdad(paciente.sociodemographicDetails?.birthDate)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex items-center justify-start gap-3 font-medium">
            <IconCircle />
            Sexo:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <select
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] rounded-lg px-2 py-2 mr-6 border-[${
                  errors.genreId ? "red" : "#DCDBDB"
                }]`}
                defaultValue={
                  paciente.sociodemographicDetails?.genre === "Masculino"
                    ? 2
                    : 1
                }
                {...register("genreId", {
                  required: "*Este campo es obligatorio",
                })}>
                {sexoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.genreId && (
                <p className="text-red-500 text-sm">{errors.genreId.message}</p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">
              {paciente.sociodemographicDetails?.genre}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex items-center justify-start gap-3 font-medium">
            <IconCircle />
            Fecha de nacimiento:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <input
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] rounded-lg p-1 md:p-2 mr-6 border-[${
                  errors.birthDate ? "red" : "#DCDBDB"
                }]`}
                type="date"
                defaultValue={paciente.sociodemographicDetails?.birthDate}
                {...register("birthDate", {
                  required: "*Este campo es obligatorio",
                })}
              />
              {errors.birthDate && (
                <p className="text-red-500 text-sm">
                  {errors.birthDate.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">
              {paciente.sociodemographicDetails?.birthDate}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex items-center justify-start gap-3 font-medium">
            <IconCircle />
            Teléfono de contacto:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <input
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-1 md:p-2 mr-6 border-[${
                  errors.cellphone ? "red" : "#DCDBDB"
                }]`}
                type="text"
                defaultValue={paciente?.cellphone}
                {...register("cellphone", {
                  required: "*Este campo es obligatorio",
                  minLength: {
                    value: 10,
                    message: "Debe tener al menos 10 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "No puede tener más de 20 caracteres",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Solo se permiten números",
                  },
                })}
              />
              {errors.cellphone && (
                <p className="text-red-500 text-sm">
                  {errors.cellphone.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">
              {paciente?.cellphone}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex items-center justify-start gap-3 font-medium">
            <IconCircle />
            Teléfono de contacto de Emergencia:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <input
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-1 md:p-2 mr-6 border-[${
                  errors.emergencyContactPhone ? "red" : "#DCDBDB"
                }]`}
                type="text"
                defaultValue={
                  paciente.sociodemographicDetails?.emergencyContactPhone
                }
                {...register("emergencyContactPhone", {
                  required: "*Este campo es obligatorio",
                  minLength: {
                    value: 10,
                    message: "Debe tener al menos 10 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "No puede tener más de 20 caracteres",
                  },
                  pattern: {
                    value: /^\d+$/,
                    message: "Solo se permiten números",
                  },
                })}
              />
              {errors.emergencyContactPhone && (
                <p className="text-red-500 text-sm">
                  {errors.emergencyContactPhone.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">
              {paciente.sociodemographicDetails?.emergencyContactPhone}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex items-center justify-start gap-3 font-medium">
            <IconCircle />
            Dirección:
          </label>
          {edit ? (
            <div className="flex items-center gap-2 w-1/2">
              <div className="w-full md:w-2/3 flex flex-col">
                <input
                  className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-1 md:p-2"
                  type="text"
                  defaultValue={paciente.sociodemographicDetails?.address}
                  {...register("address", {
                    required: "*Este campo es obligatorio",
                  })}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <Elboton
                size={buttonSize}
                onPress={openModal}
                className="hidden md:flex"
                icon={<IconEditar />}
                nombre={"Mapa"}
              />
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">
              {paciente.sociodemographicDetails?.address}
            </span>
          )}
        </div>
      </form>
      <div className="flex items-center justify-center pl-3 md:pl-8 py-2">
        <label className="w-1/2 flex items-center justify-start gap-3 font-medium">
          <IconCircle />
          Última conexión:
        </label>
        <span className="w-1/2 text-start px-6 py-2">
          {LastLogin(paciente.lastLogin)}
        </span>
      </div>
      {showModal && (
        <MapModal isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
      <PhotoModalPte isOpen={isModalOpen} onClose={closeModalFoto} />
    </div>
  );
}
