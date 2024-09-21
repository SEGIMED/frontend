"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState, useMemo } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Swal from "sweetalert2";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { adduser } from "@/redux/slices/user/user";
import IconEdit from "@/components/icons/IconEdit";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconKeep from "@/components/icons/IconKeep";
import { PathnameShow } from "@/components/pathname/path";
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
import IconUpload from "@/components/icons/IconUpload";
import ReactFlagsSelect from "react-flags-select";
import flags from "@/utils/countriesFlags";

export default function HomeDoc() {
  const dispatch = useAppDispatch();
  const lastSegmentTextToShow = PathnameShow();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [catalogCenter, setCatalogCenter] = useState([]);
  const doctor = useAppSelector((state) => state.user);
  const [buttonSize, setButtonSize] = useState("lg");
  const [selected, setSelected] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("");



  const countries = [
    { iso: 'AR', prefix: '+54', name: 'Argentina' },
    { iso: 'PE', prefix: '+51', name: 'Perú' },
    { iso: 'BR', prefix: '+55', name: 'Brasil' },
    { iso: 'CL', prefix: '+56', name: 'Chile' },
    { iso: 'CO', prefix: '+57', name: 'Colombia' },
    { iso: 'VE', prefix: '+58', name: 'Venezuela' },
    { iso: 'BO', prefix: '+591', name: 'Bolivia' },
    { iso: 'EC', prefix: '+593', name: 'Ecuador' },
    { iso: 'UY', prefix: '+598', name: 'Uruguay' },
  ];

  console.log(doctor);

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
  const [selectedKeysCenter, setSelectedKeysCenter] = useState(new Set());
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [selectedCentersId, setSelectedCentersId] = useState([]);
  const [centerName, setCenterName] = useState("");

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

  const get = async (headers) => {
    try {
      const response = await ApiSegimed.get(
        "onboardingDetails?physicianId=11"
      );
      if (response.data) {
        console.log(response.data);
        const matchingCenters = catalogCenter.filter(center =>
          response.data.some(att => att.idCenterAttention === center.id)
        );

        // Si encuentra centros, extraemos los nombres y los unimos con comas
        if (matchingCenters.length > 0) {
          const names = matchingCenters.map(center => center.name).join(', ');
          console.log(names);

          setCenterName(names); // Guardamos los nombres en el estado
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  };

  const getCatalogCenter = async () => {
    try {
      const response = await ApiSegimed.get("/catalog/get-catalog?catalogName=center_att");
      if (response.data) {
        setCatalogCenter(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleSelectionChangeCenter = (keys) => {
    setSelectedKeysCenter(keys);
    const centers = catalogCenter.filter((item) => keys.has(item.name));
    const ids = centers.map((item) => item.id); // Obtenemos los IDs de los centros seleccionados
    const numericIds = ids.map(id => Number(id));
    setSelectedCenters(centers);
    setSelectedCentersId(numericIds);  // Actualizamos el estado con los centros seleccionados
  };

  const onSubmit = async (data) => {
    const headers = { headers: { token: token } };
    const updatedData = {
      ...doctor,
      ...data,
      medicalSpecialtyIds: selectedSpecialties.map((spec) => spec.id),
      specialties: selectedSpecialties,
      currentLocationCity: data.city,
      currentLocationCountry: data.country,
      AttendentPlaceId: selectedCentersId,
      cellphone: data.cellphonePrefix + data.cellphone,
      medicalRegistries: {
        Provincial: { registryId: data.registryIdProvincial },
        Nacional: { registryId: data.registryIdNacional },
      },
    };

    const updatedDataSend = {
      ...doctor,
      ...data,
      medicalSpecialtyIds: selectedSpecialties.map((spec) => spec.id),
      specialties: selectedSpecialties,
      AttendentPlaceId: selectedCentersId,
    };
    dispatch(adduser({ ...doctor, ...updatedData }));

    try {
      const response = await ApiSegimed.patch(
        `/update-full-physician`,
        updatedDataSend,
        headers
      );

      setEdit(false);
      Swal.fire({
        title: "¡Datos actualizados correctamente!",
        text: "",
        icon: "success",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
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
      getCatalogCenter()

    }
  }, []);

  useEffect(() => {
    get()
    if (doctor?.specialties?.length > 0) {
      setSelectedKeys(new Set(doctor?.specialties?.map((item) => item.name)));
      setSelectedSpecialties(doctor?.specialties);
    }
  }, [catalogCenter]);


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

  const noEmptySpaces = (value) => value.trim() !== "";

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <title>{lastSegmentTextToShow}</title>
      <div
        className={`flex ${edit ? "flex-col md:flex-row" : "md:flex-row"
          } justify-between items-center gap-2 pl-10 pr-6 py-3 border-b border-b-[#cecece] bg-[#FAFAFC]`}
      >
        <div
          className={`items-center gap-4  ${edit ? "hidden md:flex" : "flex"
            }`}
        >
          <IconCurrentRouteNav className="w-[1.5rem]" />
          <p className="text-lg ">Sus datos personales</p>
        </div>

        <div>
          {edit ? (
            <div className="flex items-center gap-2">
              <Elboton
                size={buttonSize}
                onPress={handleSubmit(onSubmit)}
                nombre={"Guardar Cambios"}
                icon={<IconKeep className="w-6" />}
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
          <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
            <label className="w-full flex  justify-start gap-3 font-medium">
              <IconCircle className="w-2" />
              Foto de perfil
            </label>

            <div className="w-full flex items-center justify-start text-white text-sm font-bold">
              <Elboton
                icon2={<IconEdit />}
                nombre={"Editar Foto"}
                onPress={openModal}
              />
            </div>
          </div>
        ) : null}
        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
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
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Solo se permiten letras",
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
        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
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
                    message: "No puede tener más de 40 caracteres",
                  },
                  validate: noEmptySpaces,
                  pattern: {
                    value: /^[A-Za-z\s]+$/,
                    message: "Solo se permiten letras y espacios",
                  }
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

        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-1/2 flex items-center justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Especialidades:
          </label>
          {edit ? (
            <div className="w-1/2 pr-5 flex flex-col ">
              <Dropdown>
                <DropdownTrigger className=" w-full">
                  <Button
                    style={{
                      borderRadius: "0.5rem",
                      textAlign: "start",
                      borderWidth: "1px",
                      justifyContent: "flex-start",
                      backgroundColor: "#FBFBFB",
                      opacity: "1",
                      color: "#686868",
                    }}
                    variant="bordered"
                  >
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
                  onSelectionChange={handleSelectionChange}
                >
                  {catalog?.map((item) => (
                    <DropdownItem key={item.name} value={item.id}>
                      {item.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div className="w-1/2 text-start px-2 py-2">
              {doctor?.specialties?.map((specialty) => (
                <span className="pr-2" key={specialty.id}>
                  {specialty.name} /
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Nacionalidad:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] rounded-lg px-2 py-2 mr-6 border-${errors.nationality ? "red" : "#DCDBDB"
                  }`}
                type="text"
                defaultValue={doctor?.nationality}
                {...register("nationality", {
                  required: "*Este campo es obligatorio",
                  minLength: {
                    value: 2,
                    message: "Debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "No puede tener más de 20 caracteres",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Solo se permiten letras",
                  },
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
        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Pais:
          </label>
          {edit ? (
            <div className="flex items-center gap-2 w-full">

              <ReactFlagsSelect
                className="w-full pr-6 "
                placeholder="Seleccione un pais"
                searchable={true}
                selected={selected}
                onSelect={(code) => {
                  setSelected(code);
                }}
              />

            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.currentLocationCountry}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Ciudad:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                type="text"
                defaultValue={doctor?.currentLocationCity}
                {...register("city", {
                  required: "*Este campo es obligatorio",
                  minLength: {
                    value: 3,
                    message: "Debe tener al menos 3 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "No puede tener más de 20 caracteres",
                  },
                  pattern: {
                    value: /^[A-Za-z ]+$/,
                    message: "Solo se permiten letras y espacios",
                  },
                })}
              />
              {errors.city && (
                <p className="text-red-500 text-sm">{errors.city.message}</p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.currentLocationCity}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Matricula Nacional:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                defaultValue={doctor?.medicalRegistries?.Nacional?.registryId}
                {...register("registryIdNacional", {
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
        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Matricula Provincial:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                defaultValue={doctor?.medicalRegistries?.Provincial?.registryId}
                {...register("registryIdProvincial", {
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
        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Centro de atencion:
          </label>
          {edit ? (
            <div className="w-1/2 pr-5 flex flex-col ">
              <Dropdown>
                <DropdownTrigger className="w-full">
                  <Button
                    style={{
                      borderRadius: "0.5rem",
                      textAlign: "start",
                      borderWidth: "1px",
                      justifyContent: "flex-start",
                      backgroundColor: "#FBFBFB",
                      opacity: "1",
                      color: "#686868",
                    }}
                    variant="bordered"
                  >
                    {selectedCenters.length > 0
                      ? Array.from(selectedKeysCenter).join(", ")
                      : "Seleccione su centro de atención"}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Seleccionar centro de atención"
                  variant="flat"

                  selectionMode={"multiple"} // Modo de selección basado en el rol
                  selectedKeys={selectedKeysCenter}  // Aseguramos que se mantengan seleccionadas las opciones
                  onSelectionChange={handleSelectionChangeCenter}
                >
                  {catalogCenter?.map((item) => (
                    <DropdownItem key={item.name} value={item.name}>
                      {item.name}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
          ) : (
            <div className="w-1/2 text-start px-2 py-2">
              {centerName}
            </div>
          )}
        </div>
        {/* <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
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
                  minLength: {
                    value: 2,
                    message: "Debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 100,
                    message: "No puede tener más de 100 caracteres",
                  },
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
        </div> */}

        {/* <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
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
                  pattern: {
                    value: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/[^\s]*)?$/,
                    message: "Debe ser un link válido",
                  }
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
        </div> */}
        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Numero de pacientes en seguimiento:
          </label>
          <span className="w-full text-start px-6 py-2">
            {doctor?.patientsInFollowUp}
          </span>
        </div>

        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Calificacion en la Atencion:
          </label>
          <span className="w-full text-start px-6 py-2">
            {doctor?.reviewsScore}
          </span>
        </div>
        {/* <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Nivel de Experto:
          </label>
          <span className="w-full text-start px-6 py-2">
            {doctor?.expertiseLevel?.name}
          </span>
        </div> */}
        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
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

        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Numero de contacto:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <div className="flex items-center gap-2">
                {/* <select
                  id="cellphone-prefix"
                  className="w-1/4 bg-[#FBFBFB] py-2 px-3 border border-[#DCDBDB] rounded-lg  focus:outline-none focus:border-[#487FFA] mr-2"
                  {...register("cellphonePrefix", {
                    required: {
                      value: true,
                      message: "* Prefijo requerido *",
                    },
                  })}
                >
                  <option value="" disabled selected>Prefijo</option>
                  {countries.map((country) => (
                    <option key={country.iso} value={country.prefix}>
                      <span>
                      
                        {`${country.prefix} (${country.name})`}
                      </span>
                    </option>
                  ))}
                </select> */}
                <ReactFlagsSelect
                  className="items-center justify-center pt-1 w-[15rem]"
                  customLabels={flags}
                  searchable={true}
                  selected={selectedPrefix}
                  showSelectedLabel={false}
                  placeholder="Prefijo"
                  onSelect={(code) => {
                    setSelectedPrefix(code);
                  }}
                />
                <input
                  className="bg-[#FBFBFB] w-full border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                  type="text"
                  defaultValue={doctor?.cellphone}
                  {...register("cellphone", {
                    required: "*Este campo es obligatorio",
                    minLength: {
                      value: 6,
                      message: "Debe tener al menos 6 caracteres",
                    },
                    maxLength: {
                      value: 15,
                      message: "No puede tener más de 15 caracteres",
                    },
                    pattern: {
                      value: /^\d+$/,
                      message: "Solo se permiten números",
                    },
                  })}
                />
              </div>
              {errors.cellphonePrefix && (
                <span className="text-red-500 text-sm font-medium">
                  {errors.cellphonePrefix.message}
                </span>
              )}
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
