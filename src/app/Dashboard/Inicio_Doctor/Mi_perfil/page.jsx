"use client";

import { useForm } from "react-hook-form";

import { useEffect, useState } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Swal from "sweetalert2";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { adduser } from "@/redux/slices/user/user";
import IconEdit from "@/components/icons/IconEdit";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconKeep from "@/components/icons/IconKeep";

import IconCircle from "@/components/icons/IconCircle";
import PhotoModal from "@/components/modal/ModalDoctor/PhotoModal";
import Elboton from "@/components/Buttons/Elboton";
import IconRegresar from "@/components/icons/iconRegresar";
import Cookies from "js-cookie";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import React, { useMemo } from "react";

export default function HomeDoc() {
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const doctor = useAppSelector((state) => state.user);
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

  const token = Cookies.get("a");

  const handleCancel = () => {
    setEdit(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const getCatalog = async (headers) => {
    try {
      const response = await ApiSegimed.get(
        "/catalog/get-catalog?catalogName=medical_specialties",
        headers
      );
      if (response.data) {
        setCatalog(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    const headers = { headers: { token: token } };
    const updatedData = {
      ...doctor,
      ...data,
      medicalSpecialtyIds: selectedSpecialties.map((spec) => spec.id),
      specialties: selectedSpecialties,
      attendancePlace: {
        addressDetails: data.addressDetails,
        alias: data.alias,
        googleMapsLink: data.googleMapsLink,
      },
      medicalRegistries: {
        Provincial: { registryId: data.registryIdProvincial },
        Nacional: { registryId: data.registryIdNacional },
      },
    };

    dispatch(adduser({ ...doctor, ...updatedData }));

    try {
      const response = await ApiSegimed.patch(
        `/update-full-physician`,
        updatedData,
        headers
      );
      // const response = await ApiSegimed.patch(`/update-full-physician`, headers);

      setEdit(false);
      Swal.fire({
        title: "¡Datos actualizados correctamente!",
        text: "",
        icon: "success",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("a");
    const headers = { headers: { token: token } };
    if (token) {
      getCatalog(headers);
    }
  }, []);

  useEffect(() => {
    if (doctor?.specialties?.length > 0) {
      setSelectedKeys(new Set(doctor?.specialties?.map((item) => item.name)));
      setSelectedSpecialties(doctor?.specialties);
    }
  }, [doctor]);

  const handleSelectionChange = (keys) => {
    setSelectedKeys(keys);
    const specialties = catalog.filter((item) => keys.has(item.name));
    setSelectedSpecialties(specialties);
  };

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <div
        className={`flex ${
          edit ? "flex-col md:flex-row" : "md:flex-row"
        } justify-between items-center gap-2 pl-10 pr-6 py-3 border-b border-b-[#cecece] bg-[#FAFAFC]`}>
        <div
          className={`items-center gap-4  ${edit ? "hidden md:flex" : "flex"}`}>
          <IconCurrentRouteNav className="w-4" />
          <p className="text-lg ">Sus datos personales</p>
        </div>

        <div>
          {edit ? (
            <div className="flex items-center gap-2">
              <Elboton
                size={buttonSize}
                onPress={handleSubmit(onSubmit)}
                nombre={"Guardar Cambios"}
                icon={<IconKeep />}
              />
              <Elboton
                size={buttonSize}
                onPress={handleCancel}
                nombre={"Regresar"}
                icon={<IconRegresar />}
              />
            </div>
          ) : (
            <Elboton
              onPress={handleEdit}
              nombre={"Editar"}
              icon={<IconEdit />}
              size={buttonSize}
            />
          )}
        </div>
      </div>

      <form>
        {edit ? (
          <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
            <label className="w-full flex items-center justify-start gap-3 font-medium">
              <IconCircle />
              Foto de perfil
            </label>

            <div className="w-full flex items-center justify-start text-white text-sm font-bold mr-6">
              <Elboton
                icon={<IconEdit />}
                nombre={"Editar Foto"}
                onPress={openModal}
              />
            </div>
          </div>
        ) : null}
        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Nombre:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                type="text"
                defaultValue={doctor?.name}
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
            <span className="w-full text-start px-6 py-2">{doctor?.name}</span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Apellido
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border text-[#686868] outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                type="text"
                defaultValue={doctor?.lastname}
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
            <span className="w-full text-start px-6 py-2">
              {doctor?.lastname}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Especialidades:
          </label>
          {edit ? (
            <Dropdown>
              <DropdownTrigger>
                <Button
                  style={{
                    width: "99%",
                    borderRadius: "0.5rem",
                    textAlign: "start",
                    marginRight: "1.5rem",
                    borderWidth: "1px",
                    justifyContent: "flex-start",
                    opacity: "1",
                    color: "#686868",
                  }}
                  variant="bordered">
                  {selectedValue}
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label=""
                variant="flat"
                closeOnSelect={false}
                disallowEmptySelection
                selectionMode="multiple"
                selectedKeys={selectedKeys}
                onSelectionChange={handleSelectionChange}>
                {catalog?.map((item) => (
                  <DropdownItem key={item.name} value={item.id}>
                    {item.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="w-full text-start px-6 py-2">
              {doctor?.specialties?.map((specialty) => (
                <span className="pr-2" key={specialty.id}>
                  {specialty.name} /
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Nacionalidad:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] rounded-lg px-2 py-2 mr-6 border-[${
                  errors.nacionalidad ? "red" : "#DCDBDB"
                }]`}
                type="text"
                defaultValue={doctor?.nationality}
                {...register("nationality", {
                  required: "*Este campo es obligatorio",
                })}
              />
              {errors.nationality && (
                <p className="text-red-500 text-sm">
                  {errors.nationality.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.nationality}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Pais:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                type="text"
                defaultValue={doctor?.currentLocationCountry}
                {...register("currentLocationCountry", {
                  required: "*Este campo es obligatorio",
                  minLength: {
                    value: 3,
                    message: "Debe tener al menos 3 caracteres",
                  },
                })}
              />
              {errors.currentLocationCountry && (
                <p className="text-red-500 text-sm">
                  {errors.currentLocationCountry.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.currentLocationCountry}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Ciudad:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                type="text"
                defaultValue={doctor?.currentLocationProvince}
                {...register("currentLocationProvince", {
                  required: "*Este campo es obligatorio",
                  minLength: {
                    value: 3,
                    message: "Debe tener al menos 3 caracteres",
                  },
                })}
              />
              {errors.currentLocationProvince && (
                <p className="text-red-500 text-sm">
                  {errors.currentLocationProvince.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.currentLocationProvince}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Matricula Nacional:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                defaultValue={doctor?.medicalRegistries?.Nacional?.registryId}
                {...register("registryIdNacional", {
                  required: "*Este campo es obligatorio",
                })}
              />
              {errors.registryIdNacional && (
                <p className="text-red-500 text-sm">
                  {errors.registryIdNacional.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.medicalRegistries?.Nacional?.registryId}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Matricula Provincial:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                defaultValue={doctor?.medicalRegistries?.Provincial?.registryId}
                {...register("registryIdProvincial", {
                  required: "*Este campo es obligatorio",
                })}
              />
              {errors.registryIdProvincial && (
                <p className="text-red-500 text-sm">
                  {errors.registryIdProvincial.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.medicalRegistries?.Provincial?.registryId}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Lugar de Atención (Nombre):
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                type="text"
                defaultValue={doctor?.attendancePlace?.alias}
                {...register("alias", {
                  required: "*Este campo es obligatorio",
                })}
              />
              {errors.alias && (
                <p className="text-red-500 text-sm">{errors.alias.message}</p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.attendancePlace?.alias}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Lugar de Atención (Link de Maps):
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                type="text"
                defaultValue={doctor?.attendancePlace?.googleMapsLink}
                {...register("googleMapsLink", {
                  required: "*Este campo es obligatorio",
                })}
              />
              {errors.googleMapsLink && (
                <p className="text-red-500 text-sm">
                  {errors.googleMapsLink.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.attendancePlace?.googleMapsLink}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Direccion de Atención:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                type="text"
                defaultValue={doctor?.attendancePlace?.addressDetails}
                {...register("addressDetails", {
                  required: "*Este campo es obligatorio",
                })}
              />
              {errors.addressDetails && (
                <p className="text-red-500 text-sm">
                  {errors.addressDetails.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.attendancePlace?.addressDetails}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Numero de pacientes en seguimiento:
          </label>
          <span className="w-full text-start px-6 py-2">
            {doctor?.patientsInFollowUp}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Calificacion en la Atencion:
          </label>
          <span className="w-full text-start px-6 py-2">
            {doctor?.reviewsScore}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Correo electronico:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                type="text"
                defaultValue={doctor?.email}
                {...register("email", {
                  required: "*Este campo es obligatorio",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "*Debe ser un correo electrónico válido",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">{doctor?.email}</span>
          )}
        </div>

        <div className="flex items-center justify-between border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle />
            Numero de contacto:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                type="text"
                defaultValue={doctor?.cellphone}
                {...register("cellphone", {
                  required: "*Este campo es obligatorio",
                  minLength: {
                    value: 10,
                    message: "Debe tener al menos 10 caracteres",
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
            <span className="w-full text-start px-6 py-2">
              {doctor?.cellphone}
            </span>
          )}
        </div>
        <div className="p-10 bg-[#FAFAFC]" />
      </form>
      <PhotoModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
