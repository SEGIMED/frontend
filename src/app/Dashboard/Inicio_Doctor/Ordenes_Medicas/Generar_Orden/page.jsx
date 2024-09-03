"use client";

import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Cookies from "js-cookie";
import { PathnameShow } from "@/components/pathname/path";
import rutas from "@/utils/rutas.js";
import IconRegresar from "@/components/icons/iconRegresar";
import { useRouter, useSearchParams } from "next/navigation";
import { resetFormState, setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import InputInfoText from "@/components/ordenMedica/inputInfo";
import IconDay from "@/components/icons/IconDay";
import IconMas from "@/components/icons/iconMas";
import Swal from "sweetalert2";
import { ApiSegimed } from "@/Api/ApiSegimed";
import DrugModal from "@/components/modal/ModalDoctor/DrugModal";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import IconClinicalHistory from "@/components/icons/IconClinicalHistory";
import NewModalDrugs from "@/components/modal/ModalDoctor/newModalDrugs";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import IconDelete from "@/components/icons/IconDelete";
import IconMessage from "@/components/icons/IconMessage";
import PDFExportComponent from "@/components/pdf/pdfOrder";
import { validateDrug } from "@/utils/OrderValidation";


export default function HomeDoc() {
    const orden = useAppSelector((state) => state.formSlice.selectedOptions);
    const user = useAppSelector((state) => state.user);
    const [pendientes, setPendientes] = useState(false);
    const [isDrugModalOpen, setIsDrugModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState([]);
    const [searchTermDiagnostic, setSearchTermDiagnostic] = useState([]);
    const [drugs, setDrugs] = useState([]);
    const [cie10, setCie10] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState(null);
    const [drugsToSend, setDrugsToSend] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [ordenType, setOrdenType] = useState("");
    const [errors, setErrors] = useState({});
    const [patientDetails, setPatientDetails] = useState(null);


    const router = useRouter();
    const dispatch = useAppDispatch();
    const lastSegmentTextToShow = PathnameShow();
    const searchParams = useSearchParams();


    // validacion de type y id seleccionado para poder recargar la pagina y que sigan los datos
    useEffect(() => {
        const id = searchParams.get("id");
        const type = searchParams.get("type");

        if (!id) {
            router.push(`${rutas.Doctor}${rutas.Pacientes}?ordenMedica=true&type=${type}`);
            return; // Asegúrate de que no se ejecute el resto del código si falta `id`.
        }

        if (!type) {
            router.push(`${rutas.Doctor}${rutas.Ordenes}`);
            return; // Asegúrate de que no se ejecute el resto del código si falta `type`.
        }

        if (searchParams.get("Pendientes")) {
            setPendientes(true);
        }

        setOrdenType(type);
        dispatch(setSelectedOption({ name: "orderTypes", option: type }));
        dispatch(setSelectedOption({ name: "patientId", option: Number(id) }));

    }, [searchParams]);

    const handleChange = (name, value) => {
        dispatch(setSelectedOption({ name, option: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };
    // autocomplete
    useEffect(() => {
        const fetchDrugs = async () => {
            if (searchTerm.length >= 3) {
                try {
                    const response = await ApiSegimed.get(`/drug-prescription/search?searchDrug=${searchTerm}`);
                    if (response.data && response.data.length > 0) {
                        setDrugs(response.data);
                    } else {
                        // Si no hay coincidencias, selecciona el texto que el usuario ingresó
                        setSelectedDrug({ name: searchTerm });
                        setDrugs([{ id: "new", name: searchTerm }]);
                    }
                } catch (error) {
                    console.error("Error fetching drugs:", error);
                }
            } else setDrugs([{ id: "-", name: searchTerm }]);
            setSelectedDrug(null);
        };
        fetchDrugs();
    }, [searchTerm]);

    // autocomplete de diagnostico
    useEffect(() => {
        const fetchCie = async () => {
            if (searchTermDiagnostic.length >= 4) {
                try {
                    const response = await ApiSegimed.get(`/cie10?search=${searchTermDiagnostic}`);

                    if (response.data) {
                        setCie10(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching cie10:", error);
                }
            }

        };
        fetchCie();
    }, [searchTermDiagnostic]);

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await ApiSegimed.get(`/patient-details?id=${orden.patientId}`);

                if (response.data) {
                    setPatientDetails(response.data); // Asigna la respuesta al estado solo si hay datos
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (orden.patientId) {
            fetchPatientDetails();
        }
    }, [orden.patientId]);


    const handleToggleDetails = (index) => {
        const updatedDrugs = [...drugsToSend];
        updatedDrugs[index].showDetails = !updatedDrugs[index].showDetails;
        setDrugsToSend(updatedDrugs);
    };

    // genera pdf
    const generatePDF = async () => {
        try {
            // Validar que `window` esté definido
            if (typeof window === 'undefined') {
                return
            }

            // Importar html2pdf dinámicamente
            const html2pdf = (await import('html2pdf.js')).default;

            const element = document.getElementById('pdf-content');

            // Verificar si el elemento existe
            if (!element) {
                throw new Error('Elemento con el ID especificado no encontrado.');
            }

            const opt = {
                margin: 0,
                filename: 'reporte.pdf',
                image: { type: 'jpeg', quality: 0.7 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', orientation: 'portrait' },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'], before: '.page-break' }
            };

            const pdfBlob = await html2pdf().from(element).set(opt).outputPdf('blob');
            // const pdfBlob = await html2pdf().from(element).set(opt).save()

            const base64String = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const base64String = event.target.result
                    resolve(base64String);
                };
                reader.onerror = reject;
                reader.readAsDataURL(pdfBlob);
            });

            return base64String;
        } catch (error) {
            console.error('Error generando el PDF:', error);
            throw error; // Opcional: Lanza el error para manejarlo fuera de esta función si es necesario
        }
    };

    // validacion de campos
    const validateFields = () => {
        let tempErrors = {};

        if (!orden.diagnostic || orden.diagnostic.trim() === "") {
            tempErrors.diagnostic = "El diagnóstico es obligatorio.";
        }

        if (drugsToSend.length > 0) {
            drugsToSend.forEach((drug, index) => {
                if (!drug.prescriptionCreation.doseMeasure) {
                    tempErrors[`doseMeasure-${index}`] = "La dosis es obligatoria.";
                }
                if (!drug.prescriptionCreation.timeMeasure) {
                    tempErrors[`timeMeasure-${index}`] = "La frecuencia es obligatoria.";
                }
                if (!drug.prescriptionCreation.timeMeasureType) {
                    tempErrors[`timeMeasureType-${index}`] = "La duración es obligatoria.";
                }
            });
        }


        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };




    const onSubmit = async (orden) => {
        if (!validateFields()) {
            return; // Si hay errores, no enviar el formulario
        }

        try {
            const base64 = await generatePDF();


            const pdfBlob = await fetch(base64).then(res => res.blob());

            // Crear una URL temporal para el Blob
            const pdfUrl = URL.createObjectURL(pdfBlob);

            // Abrir el PDF en una nueva pestaña
            window.open(pdfUrl, '_blank');
            console.log(base64);

            const payload = { ...orden, bodyMedicam: drugsToSend, orderPdf: base64 };
            // const payload = { ...orden, bodyMedicam: drugsToSend };
            console.log(payload);

            const response = await ApiSegimed.post(`/physician-order`, payload);

            if (response.data) {
                console.log(response.data);

                dispatch(resetFormState());
                Swal.fire({
                    icon: "success",
                    text: "Se ha creado la nueva orden",
                    confirmButtonColor: "#487FFA",
                    confirmButtonText: "Aceptar",
                }).then(() => {
                    const targetRoute = pendientes
                        ? `${rutas.Doctor}${rutas.Pendientes}`
                        : `${rutas.Doctor}${rutas.Ordenes}`;
                    router.push(targetRoute);
                });
            }
        } catch (error) {
            console.error("Error creating patient request:", error);
            Swal.fire({
                icon: "error",
                text: "Hubo un error al crear la orden.",
                confirmButtonColor: "#487FFA",
                confirmButtonText: "Aceptar",
            });
        }
    };

    // busca datos de la droga seleccionada
    const handleDrug = async (value) => {
        if (value !== null && value !== "new") {
            try {
                const response = await ApiSegimed.get(`/drug-prescription/search?searchCommercialId=${value}`);
                if (response.data) {

                    setSelectedId(value)
                    setSelectedDrug(response.data);
                    setIsDrugModalOpen(true);
                }
            } catch (error) {
                console.error("Error fetching drug details:", error);
            }
        } else if (value === "new") {
            setSelectedId(value)
            setIsDrugModalOpen(true);
        }
    };

    const handleDeleteDrug = (index) => {
        const updatedDrugs = drugsToSend.filter((_, i) => i !== index);
        setDrugsToSend(updatedDrugs);
    };


    const handleInputChange = (index, field, value) => {
        const updatedDrugs = [...drugsToSend];
        updatedDrugs[index].prescriptionCreation[field] = value;
        setDrugsToSend(updatedDrugs);
        setErrors((prev) => ({ ...prev, [`${field}-${index}`]: "" })); // Resetear error al cambiar el valor
    };


    // guarda los datos que llegan del modal de nueva droga
    const submitDrug = () => {
        // Crear un objeto con los valores actuales
        const drug = {
            drugName: drugs[0].name,
            commercialDrugName: orden.commercialDrugName,
            routeOfAdministrationId: Number(orden.routeOfAdministrationId),
            presentationId: Number(orden.presentationId),
            dose: Number(orden.dose),
            measureUnitId: Number(orden.measureUnitId),
            measureUnitId2: orden.measureUnitId2,
        };

        // Validar los campos
        const validationErrors = validateDrug(drug);

        if (Object.keys(validationErrors).length > 0) {
            // Si hay errores, actualizar el estado de errores y salir
            setErrors(validationErrors);
            return;
        }

        // Limpiar el término de búsqueda y agregar el medicamento si no hay errores
        setSearchTerm("");
        setDrugsToSend([...drugsToSend, {
            drugDetailPresentationId: null,
            drugCreation: drug,
            prescriptionCreation: { patientId: orden.patientId }
        }]);

        handleCloseDrugModal();
    };

    const handleCloseDrugModal = () => {
        setIsDrugModalOpen(false);
    };

    return (
        <div className="flex flex-col h-full">
            <title>{lastSegmentTextToShow}</title>
            <div className="flex items-center border-b justify-between border-b-[#cecece] px-2 md:pl-10 md:pr-6 py-2 h-[10%] bg-white sticky top-0 z-10">
                <button
                    type="button"
                    className="flex md:px-6 px-4 py-2 rounded-lg gap-1 items-center bg-[#487FFA]"
                    onClick={() => {
                        const targetRoute = pendientes
                            ? `${rutas.Doctor}${rutas.Pendientes}`
                            : `${rutas.Doctor}${rutas.Pacientes}?ordenMedica=true&&type=${ordenType}`;
                        router.push(targetRoute);
                        dispatch(resetFormState());
                    }}
                >
                    <IconRegresar />
                    <p className="text-start hidden md:block text-white font-bold text-base leading-5">
                        Regresar
                    </p>
                </button>

                <h1 className="font-bold ml-4 md:block hidden">Generar órden médica</h1>
                <button
                    onClick={() => onSubmit(orden)}
                    className="bg-greenPrimary text-white md:px-4 md:py-2 py-2 px-2 items-center flex rounded-lg border gap-2 w-fit transition duration-300 ease-in-out">
                    <IconMas />
                    <p>Generar</p>
                </button>
            </div>
            <div className="gap-3 flex flex-col overflow-auto w-full h-full bg-[#fafafc] pb-3">
                {/* <InputInfoText
                    title="Diagnóstico"
                    placeholder="Ingrese aquí el diagnóstico"
                    onChange={(e) => handleChange("diagnostic", e.target.value)}
                    className="md:px-6 py-2 px-3"
                    error={errors.diagnostic}
                /> */}
                <div className="flex flex-col gap-2 md:px-6 py-2 px-3">
                    <label className="text-start text-[#686868] font-medium text-base leading-5 flex gap-2 items-center">
                        <IconClinicalHistory className="w-6" color={"#808080"} />
                        Diagnóstico
                    </label>
                    <Autocomplete
                        aria-label="diagnostic"
                        defaultItems={cie10}
                        variant="bordered"
                        onInputChange={(value) => setSearchTermDiagnostic(value)}
                        placeholder="Ingrese aquí el diagnóstico"
                        className=" bg-white "
                        isInvalid={errors.diagnostic ? true : false}
                        onSelectionChange={(value) => handleChange("diagnostic", value)}
                        value={searchTerm}
                    >
                        {(cie) => <AutocompleteItem key={cie.id}>{cie.description}</AutocompleteItem>}
                    </Autocomplete>
                    {errors.diagnostic && <span className="text-red-500 text-sm">{errors.diagnostic}</span>}
                </div>
                <div className="flex flex-col gap-2 md:px-6 py-2 px-3">
                    <label className="text-start text-[#686868] font-medium text-base leading-5 flex gap-2 items-center">
                        <IconClinicalHistory className="w-6" color={"#808080"} />
                        Medicamentos
                    </label>
                    <Autocomplete
                        aria-label="drugs"
                        defaultItems={drugs}
                        variant="bordered"
                        onInputChange={(value) => setSearchTerm(value)}
                        placeholder="Escribe al menos 3 letras"
                        className="md:max-w-xs bg-white  "
                        onSelectionChange={handleDrug}
                        value={searchTerm}
                    >
                        {(drug) => <AutocompleteItem key={drug.id}>{drug.name}</AutocompleteItem>}
                    </Autocomplete>

                </div>
                {drugsToSend.length > 0 ?
                    <div className="flex flex-col gap-2 md:px-6 py-2 px-3 bg-[#fafafc]">
                        <label className="text-start text-[#686868] font-medium text-base leading-5 flex gap-2 items-center">
                            <IconClinicalHistory className="w-6" color={"#808080"} />
                            Medicamentos Añadidos
                        </label>
                        <div className="min-w-full bg-white border rounded-lg ">
                            <div className="hidden md:flex w-full">
                                <p className="py-2 px-4 border-b w-[20%]">Nombre </p>
                                <p className="py-2 px-4 border-b w-[20%]">Dosis</p>
                                <p className="py-2 px-4 border-b w-[20%]">Frecuencia</p>
                                <p className="py-2 px-4 border-b w-[20%]">Duración</p>
                                <p className="py-2 px-4 border-b w-[20%] text-center">Acciones</p>
                            </div>
                            <div>
                                {drugsToSend.map((drug, index) => (
                                    <div key={index} className="border-b">
                                        <div className="md:flex md:items-center">
                                            <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between ">  <span className="md:hidden block">Nombre:</span><p className="w-1/2">{drug.drugCreation.drugName}</p></div>
                                            <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between">
                                                <span className="md:hidden block">Dosis:</span>
                                                <input
                                                    type="number"
                                                    onChange={(e) => handleInputChange(index, "doseMeasure", e.target.value)}
                                                    className={`md:w-full w-1/2 p-2 border rounded-lg outline-none ${errors[`doseMeasure-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                            </div>
                                            <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between">
                                                <span className="md:hidden block">Frecuencia:</span>
                                                <input
                                                    type="number"
                                                    onChange={(e) => handleInputChange(index, "timeMeasure", e.target.value)}
                                                    className={`md:w-full w-1/2 p-2 border rounded-lg outline-none ${errors[`timeMeasure-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                            </div>
                                            <div className="py-2 px-4 w-full md:w-[20%] flex items-center justify-between">
                                                <span className="md:hidden block">Duración:</span>
                                                <input
                                                    onChange={(e) => handleInputChange(index, "timeMeasureType", e.target.value)}
                                                    className={`md:w-full w-1/2 p-2 border rounded-lg outline-none ${errors[`timeMeasureType-${index}`] ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                            </div>
                                            <div className=" flex items-center justify-between md:justify-center py-2 px-4 w-full md:w-[20%] gap-4 ">
                                                <span className="md:hidden block">Acciones:</span>
                                                <div className="justify-center flex gap-4 w-1/2">
                                                    <button onClick={() => handleToggleDetails(index)}>
                                                        <IconMessage className={"w-8"} />
                                                    </button>
                                                    <button onClick={() => handleDeleteDrug(index)}>
                                                        <IconDelete />
                                                    </button>
                                                </div>

                                            </div>
                                        </div>
                                        {drug.showDetails && (
                                            <div className="flex flex-col md:flex-row border-b border-t">
                                                <InputInfoText
                                                    text={true}
                                                    title="Indicaciones"
                                                    placeholder="Ingrese aquí cualquier otra aclaración"
                                                    onChange={(e) => handleInputChange(index, "indications", e.target.value)}
                                                    className="md:px-6 py-2 px-3 w-full md:w-1/2"
                                                    error={errors[index]?.indications} />
                                                <InputInfoText
                                                    text={true}
                                                    title="Observaciones"
                                                    placeholder="Ingrese aquí cualquier otra aclaración"
                                                    onChange={(e) => handleInputChange(index, "observations", e.target.value)}
                                                    className="md:px-6 py-2 px-3 w-full md:w-1/2"
                                                    error={errors[index]?.observations}
                                                />
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    : null}
                <InputInfoText
                    text={true}
                    title="Texto adicional (opcional)"
                    placeholder="Ingrese aquí cualquier otra aclaración"
                    onChange={(e) => handleChange("additionalText", e.target.value)}
                    className="md:px-6 py-2 px-3"
                />
            </div>
            <ModalModularizado
                isOpen={isDrugModalOpen}
                onClose={handleCloseDrugModal}
                Modals={[<NewModalDrugs handleOptionChange={handleChange} info={selectedDrug} drugs={drugs} id={selectedId} key={"modalDrugs"} error={errors} />]}
                title={"Agregar medicamento"}
                button1={"hidden"}
                button2={"bg-greenPrimary text-white block font-font-Roboto"}
                progessBar={"hidden"}
                size={"h-[39rem] md:h-fit md:w-[35rem]"}
                buttonText={{ end: `Guardar` }}
                funcion={submitDrug}
            />
            <PDFExportComponent data={orden} user={user} drugs={drugsToSend} patient={patientDetails} />
        </div>
    );
}
