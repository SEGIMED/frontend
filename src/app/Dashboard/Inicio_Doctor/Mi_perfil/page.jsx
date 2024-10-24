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
  avatar,
} from "@nextui-org/react";
import IconUpload from "@/components/icons/IconUpload";
import ReactFlagsSelect from "react-flags-select";
import flags from "@/utils/countriesFlags";
import useDataFetching from "@/utils/SideBarFunctionsDoctor";

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

  useEffect(() => {
    if (doctor.areaCode) {
      setSelectedPrefix(doctor.areaCode.primary)
    }
    if (doctor.nationality) {
      setSelected(doctor.nationality)
    }
  }, [doctor]);

  const {
    getUserDoctor,
  } = useDataFetching(); // Use the useRouter hook

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
  const [selectedSpecialtiesId, setSelectedSpecialtiesId] = useState([]);
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


    const dataTosend = {
      userData: {
        ...data,
        avatar: doctor.avatarDoc,
        areaCode: flags[selectedPrefix],
        nationality: selected
      },
      onboardingData: { address: data.address, genre: doctor.PhysicianOnboarding.genre, provincialRegistration: data.provincialRegistration, nacionalRegistration: data.nacionalRegistration, specialty: selectedSpecialtiesId, centerAttention: selectedCentersId },
    };


    console.log(
      dataTosend, "userData"

    );
    try {
      const response = await ApiSegimed.patch(
        `/profile`,
        dataTosend
      );
      console.log(response);

      getUserDoctor()
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
    if (doctor?.physicianSpecialties?.length > 0) {
      setSelectedKeys(new Set(doctor?.physicianSpecialties?.map((item) => item.specialty.name)));
      setSelectedSpecialties(doctor?.physicianSpecialties);
      setSelectedSpecialtiesId(doctor?.physicianSpecialties?.map((item) => Number(item.medicalSpecialty)));
    }
  }, [doctor]);

  useEffect(() => {
    if (doctor?.AttendentPlaces?.length > 0) {
      setSelectedKeysCenter(new Set(doctor?.AttendentPlaces?.map((item) => item.center.name)));
      setSelectedCenters(doctor?.AttendentPlaces);
      setSelectedCentersId(doctor?.AttendentPlaces?.map((item) => Number(item.center.id)));
    }
  }, [doctor]);






  console.log(selectedSpecialtiesId);


  const handleSelectionChange = (keys) => {
    setSelectedKeys(keys);
    const specialties = catalog.filter((item) => keys.has(item.name));
    setSelectedSpecialties(specialties);
    setSelectedSpecialtiesId(specialties.map((specialties) => Number(specialties.id)));
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
              {doctor?.physicianSpecialties?.map((specialty) => (
                <span className="pr-2" key={specialty.medicalSpecialty}>
                  {specialty.specialty.name} /
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
            <span className="w-full text-start justify-start px-6 py-2">

              <ReactFlagsSelect
                className="w-full "
                placeholder="Seleccione un pais"
                searchable={true}
                disabled={true}
                selected={selected}

              />

            </span>
          )}
        </div>

        <div className="flex items-center justify-between h-fit lg:h-16 border-b border-b-[#cecece] px-3 md:px-6 py-2">
          <label className="w-full flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Direccion:
          </label>
          {edit ? (
            <div className="w-full flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-2 mr-6"
                type="text"
                defaultValue={doctor?.PhysicianOnboarding?.address}
                {...register("address", {
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
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.PhysicianOnboarding?.address}
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
                defaultValue={doctor?.physicianMedicalRegistries[0].registryType === 2 ? doctor?.physicianMedicalRegistries[0].registryId : doctor?.physicianMedicalRegistries[1].registryId}
                {...register("nacionalRegistration", {
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
                  {errors.nacionalRegistration.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.physicianMedicalRegistries?.length > 0 &&
                (doctor?.physicianMedicalRegistries[0]?.registryType === 2
                  ? doctor?.physicianMedicalRegistries[0]?.registryId
                  : doctor?.physicianMedicalRegistries?.length > 1 &&
                  doctor?.physicianMedicalRegistries[1]?.registryId)}
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
                defaultValue={doctor?.physicianMedicalRegistries[1].registryType === 1 ? doctor?.physicianMedicalRegistries[1].registryId : doctor?.physicianMedicalRegistries[0].registryId}
                {...register("provincialRegistration", {
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
                  {errors.provincialRegistration.message}
                </p>
              )}
            </div>
          ) : (
            <span className="w-full text-start px-6 py-2">
              {doctor?.physicianMedicalRegistries?.[1]?.registryType === 1
                ? doctor?.physicianMedicalRegistries[1]?.registryId
                : doctor?.physicianMedicalRegistries?.[0]?.registryId}
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
              {doctor?.
                AttendentPlaces?.map((center) => (
                  <span className="pr-2" key={center.center.id}>
                    {center.center.name} /
                  </span>
                ))}
            </div>
          )}
        </div>
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
            <div className="flex justify-start items-center w-full">  <ReactFlagsSelect
              className="  items-center justify-center pt-1 w-[10rem]"
              customLabels={flags}
              searchable={true}
              selected={selectedPrefix}
              showSelectedLabel={false}
              placeholder="Prefijo"
              disabled={true}
            />
              <span className=" text-start px-6 py-2">
                {doctor?.cellphone}
              </span>
            </div>
          )}
        </div>
        <div className="p-10 bg-[#FAFAFC]" />
      </form>
      <PhotoModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
