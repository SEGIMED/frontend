"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Autocomplete,
  AutocompleteItem,
} from "@nextui-org/react";
import IconCircle from "@/components/icons/IconCircle";
import { useEffect, useState, useMemo } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import InputInterconsulta from "@/components/interconsulta/texto";
import BotonInterconsulta from "@/components/interconsulta/botones";
import IconCheckRedBoton from "@/components/icons/IconCheckRed";
import { PathnameShow } from "@/components/pathname/path";
import IconArrowRight from "@/components/icons/iconArrowRight";
import Elboton from "@/components/Buttons/Elboton";
import rutas from "@/utils/rutas";
import FileUploadButton from "@/components/Buttons/FileUploadButton";
import Swal from "sweetalert2";
import IconDelete from "@/components/icons/IconDelete";

export default function HomeDoc() {
  const lastSegmentTextToShow = PathnameShow();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [allPatients, setAllPatients] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [questions, setQuestions] = useState({
    isPriority: null,
    problemResume: "",
    reasonForConsultation: "",
  });
  const [selectedSpecialties, setSelectedSpecialties] = useState(new Set());
  const [selectedSpecialtyNames, setSelectedSpecialtyNames] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(new Set());
  const [selectedPatientName, setSelectedPatientName] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(new Set());
  const [selectedDoctorName, setSelectedDoctorName] = useState("");

  const selectedSpecialtiesValue = useMemo(
    () => Array.from(selectedSpecialtyNames).join(", ").replaceAll("_", " "),
    [selectedSpecialtyNames]
  );

  const selectedDoctorValue = useMemo(
    () => Array.from(selectedDoctorName).join(", ").replaceAll("_", " "),
    [selectedDoctorName]
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
  const getPatients = async () => {
    try {
      const response = await ApiSegimed.get("/patients");
      if (response.data) {
        setAllPatients(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getAllDoc = async (headers) => {
    try {
      const response = await ApiSegimed.get("/all-physicians", headers);
      if (response.data) {
        setAllDoctors(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSpecialtiesChange = (keys) => {
    setSelectedSpecialties(keys);
    const specialtyNames = Array.from(keys).map(
      (key) => catalog.find((item) => item.id === key)?.name
    );
    setSelectedSpecialtyNames(specialtyNames);

    // Filtrar los médicos basados en las especialidades seleccionadas
    const filteredDoctors = allDoctors.filter((doctor) =>
      doctor.physicianSpecialties.some((specialty) =>
        specialtyNames.includes(specialty.specialty.name)
      )
    );
    setFilteredDoctors(filteredDoctors);
    setSelectedDoctor([]);
    setSelectedDoctorName("");
  };

  const handleDoctorChange = (key) => {
    setSelectedDoctor(key);
    const doctorId = Number(key.currentKey); // Obtener el ID del médico seleccionado

    // Encontrar al médico en la lista filtrada por su ID
    const doctor = filteredDoctors.find((item) => item.id === doctorId);

    // Verificar si se encontró al médico y establecer su nombre completo
    const doctorName = doctor ? `${doctor.name} ${doctor.lastname}` : "";
    setSelectedDoctorName(doctorName);
  };
  const handlePatientChange = (id) => {
    const patient = allPatients.find((patient) => patient.id == id);
    setSelectedPatient(id);
    setSelectedPatientName(`${patient?.name} ${patient?.lastname}`);
  };

  const handleQuestionFieldChange = (field, value) => {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [field]: value,
    }));
  };

  const handleFileSelect = (files) => {
    const filePreviews = Array.from(files).map((file) => {
      // Crear una nueva instancia de FileReader para leer el archivo
      const reader = new FileReader();

      // Promesa que resuelve con el archivo en Base64 y el objeto File
      const filePromise = new Promise((resolve, reject) => {
        reader.onload = (event) => {
          resolve({
            file, // Objeto File original
            file64: event.target.result, // Contenido Base64 del archivo
            previewUrl: URL.createObjectURL(file), // URL para previsualización
          });
        };
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file); // Leer el archivo como DataURL (Base64)
      });

      return filePromise;
    });

    Promise.all(filePreviews) // Esperar a que todas las promesas se resuelvan
      .then((filesWithBase64) => {
        setSelectedFiles((prevFiles) => [...prevFiles, ...filesWithBase64]);
      })
      .catch((error) => console.error("Error reading files: ", error));
  };
  const validateForm = () => {
    if (!selectedPatient || selectedPatient.size == 0) {
      Swal.fire({
        title: "Error",
        text: "Selecciona un paciente",
        icon: "error",
      });
      return false;
    }
    if (!selectedSpecialties.size) {
      Swal.fire({
        title: "Error",
        text: "Selecciona una especialidad",
        icon: "error",
      });
      return false;
    }

    if (!selectedDoctor || selectedDoctor.size == 0) {
      Swal.fire({
        title: "Error",
        text: "Selecciona un doctor",
        icon: "error",
      });
      return false;
    }

    if (!questions.reasonForConsultation.trim()) {
      Swal.fire({
        title: "Error",
        text: "Motivo de interconsulta es obligatorio",
        icon: "error",
      });
      return false;
    }

    if (!questions.problemResume.trim()) {
      Swal.fire({
        title: "Error",
        text: "Problema es obligatorio",
        icon: "error",
      });
      return false;
    }
    if (questions.isPriority == null) {
      Swal.fire({
        title: "Error",
        text: "Tipo de interconsulta es obligatorio",
        icon: "error",
      });
      return false;
    }

    // Validación del tamaño de archivos
    const oversizedFiles = selectedFiles.filter(
      (file) => file.file.size > 10440000
    );
    if (oversizedFiles.length > 0) {
      Swal.fire({
        title: "Error",
        text: "Uno o más archivos superan el tamaño máximo de 10MB",
        icon: "error",
      });
      return false;
    }

    return true;
  };

  useEffect(() => {
    getCatalog();
    getAllDoc();
    getPatients();
  }, []);
  useEffect(() => {
    // Limpiar links creados
    return () => {
      if (selectedFiles.length > 0)
        selectedFiles?.forEach((item) => URL.revokeObjectURL(item.previewUrl));
    };
  }, [selectedFiles]);

  const handleDeleteItem = (item) => {
    let filteredItems = selectedFiles.filter(
      (file) => file.file.name !== item.file.name
    );
    setSelectedFiles(filteredItems);
  };

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: "Cargando",
        text: "Espere un momento",
        icon: "info",
        allowOutsideClick: false,
        showConfirmButton: false,
        willClose: () => {
          // Permite que se cierre automáticamente sin problemas cuando el loading cambia
        },
      });
    }
    // Verifica si hay un modal activo que sea el de carga antes de cerrarlo
    return () => {
      if (
        !loading &&
        Swal.isVisible() &&
        Swal.getTitle().textContent === "Cargando"
      ) {
        Swal.close();
      }
    };
  }, [loading]);
  const onSubmit = async () => {
    //Validaciones
    const isValid = validateForm();
    if (!isValid) {
      return; // Si la validación falla, detener el proceso
    }
    setLoading(true);
    const payload = {
      patient: Number(selectedPatient),
      medicalSpecialty: Number(Array.from(selectedSpecialties)[0]),
      physicianQueried: Number(selectedDoctor),
      isPriority: questions.isPriority,
      problemResume: questions.problemResume,
      reasonForConsultation: questions.reasonForConsultation,
      interconsultationStatus: 6,
      files: selectedFiles.map((file) => {
        return {
          name: file?.file?.name,
          data: file?.file64,
        };
      }),
    };
    try {
      const response = await ApiSegimed.patch("/interconsultations", payload);
      if (response.status == 200) {
        setLoading(false);
        Swal.fire({
          title: "Se solicitó la interconsulta con exito",
          text: "Se le informará al médico para que responda lo mas pronto posible",
          icon: "success",
        }).then((result) => {
          if (result.isConfirmed)
            router.push(`${rutas.Doctor}${rutas.Interconsultas}`);
        });
      }
    } catch (error) {
      setLoading(false); // En caso de error, también detén la carga
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al solicitar la interconsulta",
        icon: "error",
      });
    }
  };
  return (
    <div className="h-full flex flex-col bg-[#fafafc] overflow-y-auto">
      <title>{lastSegmentTextToShow}</title>
      <div className="flex items-center justify-between border-b border-b-[#cecece] px-4 py-2  bg-white sticky top-0 z-20 lg:z-50">
        <div></div>
        <h1 className="font-bold w-1/3 md:w-3/4 text-center">
          Solicitar interconsulta
        </h1>
        <Elboton
          href={`${rutas.Doctor}${rutas.Interconsultas}`}
          nombre="Ver interconsultas"
        />
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between   px-3 md:px-6 py-2">
        <label className="w-full md:w-1/2 flex  justify-start gap-3 font-medium py-2">
          <IconCircle className="w-3" />
          <p>Pacientes:</p>
        </label>
        {/* <Dropdown>
          <DropdownTrigger className="md:w-1/2 w-full">
            <Button
              style={{
                borderRadius: "0.5rem",
                textAlign: "start",
                borderWidth: "1px",
                justifyContent: "flex-start",
                opacity: "1",
                color: "#686868",
                background: "white",
              }}
              variant="bordered">
              {selectedPatientName || "Selecciona el paciente"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Pacientes"
            variant="flat"
            closeOnSelect={true}
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedPatient}
            onSelectionChange={handlePatientChange}>
            {allPatients?.map((item) => (
              <DropdownItem key={item.id} value={item.id}>
                {`${item.name} ${item.lastname}`}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown> */}

        <Autocomplete
          size={"md"}
          defaultItems={allPatients}
          placeholder="Selecciona un paciente"
          className="md:w-1/2 w-full py-1 hover:"
          onSelectionChange={handlePatientChange}
          variant="bordered"
          aria-label="Selecciona un paciente"
          color="primary"
          inputProps={{
            className: "text-[#686868]",
            classNames: {
              innerWrapper: "bg-white",
            },
          }}
          classNames={{
            base: ["shadow-none", "font-semibold"],
            selectorButton: ["text-[#686868]"],
            label: "text-[#686868]",
          }}>
          {(item) => (
            <AutocompleteItem key={item.id}>
              {item.name + " " + item.lastname}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between   px-3 md:px-6 py-2">
        <label className="w-full md:w-1/2 flex  justify-start gap-3 font-medium py-2">
          <IconCircle className="w-3" />
          <p>Especialidades:</p>
        </label>
        <Dropdown>
          <DropdownTrigger className="md:w-1/2 w-full">
            <Button
              style={{
                borderRadius: "0.5rem",
                textAlign: "start",
                borderWidth: "1px",
                justifyContent: "flex-start",
                opacity: "1",
                color: "#686868",
                background: "white",
              }}
              variant="bordered">
              {selectedSpecialtiesValue || "Selecciona especialidades"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Specialties"
            variant="flat"
            closeOnSelect={true}
            disallowEmptySelection
            selectionMode="single"
            selectedKeys={selectedSpecialties}
            onSelectionChange={handleSpecialtiesChange}>
            {catalog?.map((item) => (
              <DropdownItem key={item.id} value={item.id}>
                {item.name}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between  px-3 md:px-6 py-2">
        <label className="w-full md:w-1/2 flex justify-start gap-3 font-medium py-2">
          <IconCircle className="w-3" />
          <p>Colega de la institución</p>
        </label>
        {/* <Dropdown>
          <DropdownTrigger className="md:w-1/2 w-full">
            {selectedSpecialtiesValue ? (
              <Button
                style={{
                  borderRadius: "0.5rem",
                  textAlign: "start",
                  borderWidth: "1px",
                  justifyContent: "flex-start",
                  opacity: "1",
                  color: "#686868",
                  background: "white",
                }}
                variant="bordered">
                {selectedDoctorName || "Selecciona un médico"}
              </Button>
            ) : (
              <Button
                style={{
                  borderRadius: "0.5rem",
                  textAlign: "start",
                  borderWidth: "1px",
                  justifyContent: "flex-start",
                  opacity: "1",
                  color: "#686868",
                  background: "white",
                }}
                disabled
                variant="bordered">
                {selectedDoctorName || "Selecciona un médico"}
              </Button>
            )}
          </DropdownTrigger>
          {selectedSpecialtiesValue ? (
            <DropdownMenu
              aria-label="Doctors"
              variant="flat"
              closeOnSelect
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedDoctor}
              onSelectionChange={handleDoctorChange}>
              {filteredDoctors?.map((item) => (
                <DropdownItem
                  key={item.id}
                  value={item.id}
                  textValue={`${item.name} ${item.lastname}`}>
                  {item.name} {item.lastname}
                </DropdownItem>
              ))}
            </DropdownMenu>
          ) : null}
        </Dropdown> */}
        <Autocomplete
          size={"md"}
          defaultItems={filteredDoctors}
          placeholder="Selecciona un Doctor"
          className="md:w-1/2 w-full py-1"
          onSelectionChange={handleDoctorChange}
          variant="bordered"
          aria-label="Selecciona un Doctor"
          color="primary"
          inputProps={{
            className: "text-[#686868]",
            classNames: {
              innerWrapper: "bg-white",
            },
          }}
          listboxProps={{
            emptyContent: "No se encontraron Médicos",
          }}
          classNames={{
            base: ["shadow-none", "font-semibold"],
            selectorButton: ["text-[#686868]"],
            label: "text-[#686868]",
          }}>
          {(item) => (
            <AutocompleteItem key={item.id}>
              {item.name + " " + item.lastname}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <InputInterconsulta
        title={"Motivo de interconsulta"}
        value={questions.reasonForConsultation}
        onChange={(e) =>
          handleQuestionFieldChange("reasonForConsultation", e.target.value)
        }
      />

      <div className="flex flex-col px-3 md:px-6 py-2">
        <label className="w-full md:w-1/3 flex  justify-start gap-3 font-medium py-2 text-center">
          <IconCircle className="w-3" />
          Adjuntar archivos
        </label>
        <div className="py-2 md:py-0 md:justify-start justify-evenly md:gap-3 w-full md:w-1/2">
          <FileUploadButton onFileSelect={handleFileSelect} />
          {selectedFiles.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {selectedFiles.map((item, index) => (
                <>
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center p-4 border border-borderGray rounded-lg bg-gray-50 ">
                    <p className="mb-2 text-sm font-semibold text-center max-w-full truncate">
                      {item?.file?.name}
                    </p>
                    {item.file.type.startsWith("image/") && (
                      <img
                        src={item?.previewUrl}
                        alt={item?.file.name}
                        className="max-w-full max-h-24 rounded-md"
                      />
                    )}
                    <Elboton
                      icon={<IconDelete color={"red"} />}
                      className={"bg-white border-1 border-borderGray"}
                      nombre={"Eliminar"}
                      classNameText={"text-redPrimary"}
                      onPress={() => handleDeleteItem(item)}
                    />
                    {item.file.size > 10440000 && (
                      <span className="text-redPrimary text-sm lg:text-center">
                        Error: El archivo es muy grande(Max. 10mb)
                      </span>
                    )}
                  </div>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between px-3 md:px-6 py-2">
        <label className="w-full md:w-1/3 flex  justify-start gap-3 font-medium py-2 text-center">
          <IconCircle className="w-3" />
          Tipo de interconsulta
        </label>
        <div className="py-2 md:py-0 flex md:justify-start justify-evenly md:gap-3 w-full md:w-1/2">
          <BotonInterconsulta
            type={"green"}
            label="Rutina"
            active={questions.isPriority === false}
            onClick={() => handleQuestionFieldChange("isPriority", false)}
          />
          <BotonInterconsulta
            Icon={IconCheckRedBoton}
            label="Prioritaria"
            active={questions.isPriority === true}
            onClick={() => handleQuestionFieldChange("isPriority", true)}
          />
        </div>
      </div>
      {/* <div className="flex flex-col md:flex-row items-center justify-between px-3 md:px-6 py-2">
        <label className="w-full md:w-1/2 flex justify-start gap-3 font-medium py-2 text-center">
          <IconCircle className="w-3" />
          Adjuntar resumen de historia clínica
        </label>
        <div className="py-2 md:py-0 flex md:justify-start justify-evenly md:gap-3 md:w-1/2 w-full">
          <BotonInterconsulta
            label="Sí"
            active={questions.active === true}
            onClick={() => handleQuestionFieldChange("active", true)}
            type={"green"}
          />
          <BotonInterconsulta
            label="No"
            active={questions.active === false}
            onClick={() => handleQuestionFieldChange("active", false)}
          />
        </div>
      </div> */}
      <InputInterconsulta
        title={"Problema"}
        value={questions.problemResume}
        onChange={(e) =>
          handleQuestionFieldChange("problemResume", e.target.value)
        }
      />
      <div className="w-full justify-center flex py-4">
        <Elboton
          nombre={"Solicitar Interconsulta"}
          onPress={onSubmit}
          icon2={<IconArrowRight />}
          className={"bg-greenPrimary"}
        />
      </div>
    </div>
  );
}
