"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import IconCircle from "@/components/icons/IconCircle";
import { useEffect, useState, useMemo } from "react";
import { ApiSegimed } from "@/Api/ApiSegimed";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import InputInterconsulta from "@/components/interconsulta/texto";
import BotonInterconsulta from "@/components/interconsulta/botones";
import IconCheckRedBoton from "@/components/icons/IconCheckRed";
import { PathnameShow } from "@/components/pathname/path";
import IconArrowRight from "@/components/icons/iconArrowRight";

export default function HomeDoc() {
  const token = Cookies.get("a");
  const lastSegmentTextToShow = PathnameShow();

  const [catalog, setCatalog] = useState([]);
  const [allDoctors, setAllDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [questions, setQuestions] = useState({
    interconsulta: null,
    active: null,
  });

  const [selectedSpecialties, setSelectedSpecialties] = useState(new Set());
  const [selectedSpecialtyNames, setSelectedSpecialtyNames] = useState([]);

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
    console.log(filteredDoctors);
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

  const handleQuestionFieldChange = (field, value) => {
    setQuestions((prevQuestions) => ({
      ...prevQuestions,
      [field]: value,
    }));
  };

  useEffect(() => {
    const token = Cookies.get("a");
    const headers = { headers: { token: token } };
    if (token) {
      getCatalog(headers);
      getAllDoc(headers);
    }
  }, []);

  const onSubmit = (data) => {
    const payload = {
      specialties: Array.from(selectedSpecialties),
      doctor: selectedDoctor,
      questions: questions,
    };
    console.log(payload);
  };
  return (
    <div className="h-full flex flex-col bg-[#fafafc]">
      <title>{lastSegmentTextToShow}</title>
      <div className="flex items-center justify-between border-b border-b-[#cecece] px-4 py-2  bg-white sticky top-0 z-20 lg:z-50">
        <div></div>
        <h1 className="font-bold w-1/3 md:w-3/4 text-center">
          Solicitar interconsulta
        </h1>
        <button className="flex items-center  px-1 md:px-6 py-2 bg-bluePrimary rounded-xl text-white font-bold w-1/2 md:w-1/5">
          <p className="text-center w-full">Ver Interconsultas</p>
        </button>
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
        <Dropdown>
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
        </Dropdown>
      </div>

      <InputInterconsulta title={"Problema"} />

      <div className="flex flex-col md:flex-row items-center justify-between px-3 md:px-6 py-2">
        <label className="w-full md:w-1/3 flex  justify-start gap-3 font-medium py-2 text-center">
          <IconCircle className="w-3" />
          Tipo de interconsulta
        </label>
        <div className="py-2 md:py-0 flex md:justify-start justify-evenly md:gap-3 w-full md:w-1/2">
          <BotonInterconsulta
            type={"green"}
            label="Rutina"
            active={questions.interconsulta === true}
            onClick={() => handleQuestionFieldChange("interconsulta", true)}
          />
          <BotonInterconsulta
            Icon={IconCheckRedBoton}
            label="Urgencia"
            active={questions.interconsulta === false}
            onClick={() => handleQuestionFieldChange("interconsulta", false)}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between px-3 md:px-6 py-2">
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
      </div>
      <InputInterconsulta title={"Motivo de interconsulta"} />
      <div className="w-full justify-center flex py-4">
        <button
          onClick={handleSubmit(onSubmit)}
          className="flex items-center px-6 py-2 bg-greenPrimary rounded-xl gap-3 text-white font-bold">
          Solicitar interconsulta
          <IconArrowRight />
        </button>
      </div>
    </div>
  );
}
