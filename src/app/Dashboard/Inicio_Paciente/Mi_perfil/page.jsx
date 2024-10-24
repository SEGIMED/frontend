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
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import ReactFlagsSelect from "react-flags-select";
import flags from "@/utils/countriesFlags";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import useDataFetchingPte from "@/utils/SideBarFunctionsPaciente";

const sexoOptions = [
  { value: 2, label: "Masculino" },
  { value: 1, label: "Femenino" },
];

const options = [
  { value: true, label: "Si" },
  { value: false, label: "No" },
];



export default function HomePte() {
  const paciente = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const id = Cookies.get("c");
  const token = Cookies.get("a");

  const [buttonSize, setButtonSize] = useState("lg");
  const [selected, setSelected] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("");
  const [selectedPrefixEmergency, setSelectedPrefixEmergency] = useState("");
  const [catalogCenter, setCatalogCenter] = useState([]);
  const [selectedCenters, setSelectedCenters] = useState([]);
  const [selectedCentersId, setSelectedCentersId] = useState([]);
  const [selectedKeysCenter, setSelectedKeysCenter] = useState(new Set());
  // obra social
  const [selectedHealthCare, setSelectedHealthCare] = useState();
  const [catalog, setCatalog] = useState([]);
  const [catalogObras, setCatalogObras] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const {
    getUser,
  } = useDataFetchingPte(); // Use the useRouter hook


  useEffect(() => {
    getCatalogCenter()
    getCatalogObraSocial()
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setButtonSize(window.innerWidth <= 768 ? "md" : "lg");
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {

    if (paciente.areaCode) {
      setSelectedPrefix(paciente.areaCode.primary)
    }
    if (paciente.nationality) {
      setSelected(paciente.nationality)
    }

    if (paciente?.socDemDet?.numberOfFamilyAsistencePrefix) {
      setSelectedPrefixEmergency(paciente.socDemDet.numberOfFamilyAsistencePrefix)
    }
    if (paciente?.socDemDet?.centerAttention) {
      const center = catalogCenter.find(item => item.id === paciente?.socDemDet?.centerAttention);

      if (center) {
        setSelectedKeysCenter(new Set([center.name])); // Set con el nombre del centro
        setSelectedCentersId(center.id); // Array con el id del centro
        setSelectedCenters([center]); // Array con el id del centro
      }
    }
  }, [paciente]);


  useEffect(() => {
    const getCatalog = async () => {
      try {
        if (searchTerm.length >= 3) {
          const response = await ApiSegimed.get(`/sociodemographic-details/health-care-search?search=${searchTerm}`);
          if (response.data) {
            console.log(response.data);

            setCatalog(response.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (searchTerm) {
      getCatalog();
    } else {
      setCatalog([]); // Limpiar el catálogo si no hay término de búsqueda
    }
  }, [searchTerm]);

  const handleSelectionChange = (value) => {
    const healthCare = catalogObras.find((item) => item.id === value);
    if (healthCare) {
      setSelectedHealthCare(healthCare.id);
      // handleChange({ name: "healthCarePlan", option: Number(healthCare.id) });
      // handleChange({ name: "healthCarePlanText", option: healthCare.name });

    }
  };

  const getCatalogCenter = async () => {
    try {
      const response = await ApiSegimed.get("/catalog/get-catalog?catalogName=center_att");
      if (response.data) {
        setCatalogCenter(response.data);
        console.log(response.data);

      }
    } catch (error) {
      console.error(error);
    }
  };
  const getCatalogObraSocial = async () => {
    try {
      const response = await ApiSegimed.get("/catalog/get-catalog?catalogName=HEALTH_CARE_PLANS");
      if (response.data) {
        setCatalogObras(response.data);
        console.log(response.data);

      }
    } catch (error) {
      console.error(error);
    }
  };


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
    // const body = { ...data, patientId: myId };
    // const patientDispatch = {
    //   ...paciente,
    //   ...data,
    //   cellphone: data.cellphonePrefix + data.cellphone,
    //   sociodemographicDetails: {
    //     birthDate: data.birthDate,
    //     genre: data.genreId === "2" ? "Masculino" : "Femenino",
    //     emergencyContactPhone: data.emergencyContactPhone,
    //     address: data.address,
    //   },
    // };

    const dataTosend = {
      userData: {
        ...data,
        avatar: paciente.avatar,
        areaCode: flags[selectedPrefix],
        nationality: selected,
        email: paciente.email
      },
      onboardingData: {
        birthDate: data.birthDate,
        healthCarePlan: Number(selectedHealthCare),
        healthCareNumber: data.healthCareNumber,
        address: data.address,
        genre: Number(paciente.socDemDet.genre),
        centerAttention: Number(selectedCentersId[0]),
        numberOfFamilyAsistencePrefix: selectedPrefixEmergency,
        numberOfFamilyAsistence: data.numberOfFamilyAsistence,
        hasTechUseDifficulty: data.hasTechUseDifficulty === "true" ? true : false,
        needsCellphoneAssistance: data.needsCellphoneAssistance === "true" ? true : false,
        liveAlone: data.liveAlone === "true" ? true : false,
        hipertPulm: data.hipertPulm === "true" ? true : false,
      },
    };


    try {
      console.log(dataTosend);
      const response = await ApiSegimed.patch(
        `/profile`,
        dataTosend
      );

      getUser()
      setEdit(false);
      Swal.fire({
        title: "¡Datos actualizados correctamente!",
        text: "",
        icon: "success",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.log(error);

      Swal.fire({
        title: "Error!",
        text: "No se pudieron actualizar los datos",
        icon: "error",
        confirmButtonColor: "#487FFA",
        confirmButtonText: "Aceptar",
      });
    }
  };
  // 
  const handleSelectionChangeCenter = (keys) => {
    // Si ya hay un centro seleccionado, lo reemplazamos por el nuevo
    if (keys.size > 1) {
      // Tomamos solo el último centro seleccionado
      const lastKey = Array.from(keys).pop();
      keys = new Set([lastKey]);
    }

    setSelectedKeysCenter(keys);

    // Filtramos los centros seleccionados basados en los nombres

    const centers = catalogCenter.filter((item) => keys.has(item.name));
    const ids = centers.map((item) => item.id); // Obtenemos los IDs de los centros seleccionados
    const numericIds = ids.map(id => Number(id));
    setSelectedCentersId(numericIds);
    setSelectedCenters(centers)
  };

  // Para la ubicación
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);

  // Para la foto
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModalfoto = () => setIsModalOpen(true);
  const closeModalFoto = () => setIsModalOpen(false);

  return (
    <div className="h-full overflow-y-scroll flex flex-col">
      <div
        className={`flex ${edit ? "flex-col md:flex-row" : "md:flex-row"} justify-between items-center gap-2 pl-10 pr-6 py-3 border-b border-b-[#cecece] bg-[#FAFAFC]`}>
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
          <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
            <label className="w-1/2 flex justify-start gap-3 font-medium">
              <IconCircle className="w-2" />
              Foto de perfil
            </label>
            <div className="w-1/2 h-8 md:h-12 flex items-center justify-start text-white text-sm font-bold">
              <Elboton
                size={buttonSize}
                onPress={openModalfoto}
                icon2={<IconEditar />}
                nombre={"Editar Foto"}
              />
            </div>
          </div>
        )}
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
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
            <span className="w-1/2 text-start px-6 py-2">{paciente?.name}</span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
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
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Solo se permiten letras",
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
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Edad:
          </label>
          <span className="w-1/2 text-start px-6 py-2">
            {CalcularEdad(paciente?.socDemDet?.birthDate)}

          </span>
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Sexo:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <select
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] rounded-lg px-2 py-2 mr-6 pr-6 border-[${errors.genreId ? "red" : "#DCDBDB"}]`}
                defaultValue={
                  paciente.socDemDet?.genre
                }
                {...register("genre", {
                  required: "*Este campo es obligatorio",
                })}
              >
                {sexoOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.genre && (
                <p className="text-red-500 text-sm">{errors.genre.message}</p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">
              {paciente.socDemDet?.catGenre?.name}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex  justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Nacionalidad:
          </label>
          {edit ? (
            <div className="flex items-center gap-2 w-1/2">

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
            <span className="w-1/2 text-start px-6 py-2">

              <ReactFlagsSelect
                className="w-full  "
                placeholder="Seleccione un pais"
                searchable={true}
                disabled={true}
                selected={selected}

              />
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Fecha de nacimiento:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <input
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] rounded-lg p-1 md:p-2 mr-6 border-[${errors.birthDate ? "red" : "#DCDBDB"}]`}
                type="date"
                defaultValue={paciente.socDemDet?.birthDate}
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
              {paciente.socDemDet?.birthDate}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Teléfono de contacto:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <div className="flex items-center gap-2 ">
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
                <input
                  className={`bg-[#FBFBFB] h-[2.7rem] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-1 md:p-2 mr-6 border-[${errors.cellphone ? "red" : "#DCDBDB"}]`}
                  type="text"
                  defaultValue={paciente?.cellphone}
                  {...register("cellphone", {
                    required: "*Este campo es obligatorio",
                    minLength: {
                      value: 6,
                      message: "Debe tener al menos 6 caracteres",
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
              </div>

              {errors.cellphone && (
                <p className="text-red-500 text-sm">
                  {errors.cellphone.message}
                </p>
              )}
            </div>
          ) : (
            <div className="flex justify-start items-center w-1/2 pl-6">  <ReactFlagsSelect
              className="  items-center justify-center pt-1 w-[10rem]"
              customLabels={flags}
              searchable={true}
              selected={selectedPrefix}
              showSelectedLabel={false}
              placeholder="Prefijo"
              disabled={true}
            />
              <span className=" text-start px-6 py-2">
                {paciente?.cellphone}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Teléfono de Urgencia:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <div className="flex items-center gap-2">
                <ReactFlagsSelect
                  className="  items-center justify-center pt-1 w-[10rem]"
                  customLabels={flags}
                  searchable={true}
                  selected={selectedPrefixEmergency}
                  showSelectedLabel={false}
                  placeholder="Prefijo"
                  onSelect={(code) => {
                    setSelectedPrefixEmergency(code);
                  }}
                />
                <input
                  className={`bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-1 md:p-2 mr-6 border-[${errors.emergencyContactPhone ? "red" : "#DCDBDB"}]`}
                  type="text"
                  defaultValue={
                    paciente.socDemDet?.numberOfFamilyAsistence
                  }
                  {...register("numberOfFamilyAsistence", {
                    required: "*Este campo es obligatorio",
                    minLength: {
                      value: 6,
                      message: "Debe tener al menos 6 caracteres",
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
              </div>
              {errors.numberOfFamilyAsistence && (
                <p className="text-red-500 text-sm">
                  {errors.numberOfFamilyAsistence.message}
                </p>
              )}
            </div>
          ) : (
            <div className="flex justify-start items-center w-1/2 px-6">  <ReactFlagsSelect
              className="  items-center justify-center pt-1 w-[10rem]"
              customLabels={flags}
              searchable={true}
              selected={paciente.socDemDet?.numberOfFamilyAsistencePrefix}
              showSelectedLabel={false}
              placeholder="Prefijo"
              disabled={true}
            />
              <span className=" text-start px-6 py-2">
                {paciente.socDemDet?.numberOfFamilyAsistence}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium py-2">
            <IconCircle className="w-2" />
            Centro de atencion:
          </label>
          {edit ? (
            <div className="w-1/2 pr-5 flex flex-col ">
              <Dropdown >
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
                  selectionMode={"simple"}
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
            <span className="w-1/2 text-start px-6 py-2">
              {
                catalogCenter.find(center => Number(center.id) === Number(paciente?.socDemDet?.centerAttention))?.name || 'Sin centro de atencion'
              }
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex  justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Lugar de Domicilio:
          </label>
          {edit ? (
            <div className="flex items-center gap-2 w-1/2">
              <div className="w-full md:w-2/3 flex flex-col">
                <input
                  className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-1 md:p-2"
                  type="text"
                  defaultValue={paciente.socDemDet?.address}
                  {...register("address", {
                    required: "*Este campo es obligatorio",
                    maxLength: {
                      value: 50,
                      message: "No puede tener más de 50 caracteres",
                    },
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
              {paciente.socDemDet?.address}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Última conexión:
          </label>
          <span className="w-1/2 text-start px-6 py-2">
            {LastLogin(paciente.lastLogin)}
          </span>
        </div>
        {/* <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Actividad Última Semana:
          </label>
          <span className="w-1/2 text-start px-6 py-2"></span>
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Actividad Última Mes:
          </label>
          <span className="w-1/2 text-start px-6 py-2"></span>
        </div> */}
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Obra Social:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">

              <Autocomplete
                aria-label="obra-social"

                defaultItems={catalogObras}
                variant="bordered"
                onInputChange={(value) => setSearchTerm(value)}
                placeholder="Busque aquí su obra social"
                className=" bg-white "
                onSelectionChange={handleSelectionChange}
                value={searchTerm}
                defaultSelectedKey={paciente?.socDemDet?.healthCarePlan?.toString()}
              >
                {(catalogo) => <AutocompleteItem key={catalogo.id}>{catalogo.name}</AutocompleteItem>}
              </Autocomplete>
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">
              {
                catalogObras.find(plan => Number(plan.id) === paciente?.socDemDet?.healthCarePlan)?.name || 'Sin obra social'
              }
            </span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Numero de cobertura:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <input
                className="bg-[#FBFBFB] border outline-[#a8a8a8] border-[#DCDBDB] rounded-lg p-1 md:p-2 mr-6"
                type="text"
                defaultValue={paciente?.socDemDet?.healthCareNumber}
                {...register("healthCareNumber", {
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
              {errors.healthCareNumber && (
                <p className="text-red-500 text-sm">{errors.healthCareNumber.message}</p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">{paciente?.socDemDet?.healthCareNumber}</span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Dificultad para usar dispositivos:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <select
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] rounded-lg px-2 py-2 mr-6 pr-6 border-[${errors.hasTechUseDifficulty ? "red" : "#DCDBDB"}]`}
                defaultValue={
                  paciente.socDemDet?.hasTechUseDifficulty
                }
                {...register("hasTechUseDifficulty", {
                  required: "*Este campo es obligatorio",
                })}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.hasTechUseDifficulty && (
                <p className="text-red-500 text-sm">{errors.hasTechUseDifficulty.message}</p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">{paciente?.socDemDet?.hasTechUseDifficulty === true ? "Si" : "No"}</span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Vive solo:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <select
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] rounded-lg px-2 py-2 mr-6 pr-6 border-[${errors.liveAlone ? "red" : "#DCDBDB"}]`}
                defaultValue={
                  paciente.socDemDet?.liveAlone
                }
                {...register("liveAlone", {
                  required: "*Este campo es obligatorio",
                })}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.liveAlone && (
                <p className="text-red-500 text-sm">{errors.liveAlone.message}</p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">{paciente?.socDemDet?.liveAlone === true ? "Si" : "No"}</span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Padece de Hipertensión Pulmonar:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <select
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] rounded-lg px-2 py-2 mr-6 pr-6 border-[${errors.hipertPulm ? "red" : "#DCDBDB"}]`}
                defaultValue={
                  paciente.socDemDet?.hipertPulm
                }
                {...register("hipertPulm", {
                  required: "*Este campo es obligatorio",
                })}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.hipertPulm && (
                <p className="text-red-500 text-sm">{errors.hipertPulm.message}</p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">{paciente?.socDemDet?.hipertPulm === true ? "Si" : "No"}</span>
          )}
        </div>
        <div className="flex items-center justify-between border-b border-b-[#cecece] h-fit md:h-16 pl-3 md:pl-8 py-2">
          <label className="w-1/2 flex justify-start gap-3 font-medium">
            <IconCircle className="w-2" />
            Necesita acompañamiento para utilizar su celular:
          </label>
          {edit ? (
            <div className="w-1/2 flex flex-col">
              <select
                className={`bg-[#FBFBFB] border outline-[#a8a8a8] rounded-lg px-2 py-2 mr-6 pr-6 border-[${errors.needsCellphoneAssistance ? "red" : "#DCDBDB"}]`}
                defaultValue={
                  paciente.socDemDet?.needsCellphoneAssistance
                }
                {...register("needsCellphoneAssistance", {
                  required: "*Este campo es obligatorio",
                })}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.needsCellphoneAssistance && (
                <p className="text-red-500 text-sm">{errors.needsCellphoneAssistance.message}</p>
              )}
            </div>
          ) : (
            <span className="w-1/2 text-start px-6 py-2">{paciente?.socDemDet?.needsCellphoneAssistance === true ? "Si" : "No"}</span>
          )}
        </div>
      </form>

      {showModal && (
        <ModalModularizado
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          Modals={[
            <MapModal onClose={() => setShowModal(false)} patient={paciente} key={"map"} />,
          ]}
          title={"Geolocalizacion "}
          button1={"hidden"}
          button2={"bg-bluePrimary block text-white font-font-Roboto"}
          progessBar={"hidden"}
          size={"h-[36rem] md:h-[35rem] md:w-[45rem]"}
          buttonText={{ end: `Continuar` }}
        />
      )}
      <PhotoModalPte isOpen={isModalOpen} onClose={closeModalFoto} />
    </div>
  );
}
