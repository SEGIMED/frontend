"use client";

import IconPrev from "@/components/icons/IconPrev";
import IconNext from "@/components/icons/IconNext";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/slices/doctor/allPatients";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed.js";
import { PathnameShow } from "@/components/pathname/path";
import NotFound from "@/components/notFound/notFound";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import { useRouter } from "next/navigation";

import IconMas from "@/components/icons/iconMas";
import IconConsulta from "@/components/icons/IconConsulta";
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";
import ModalOrdenPte from "@/components/modal/ModalPatient/modalOrden";
import { setSelectedOption } from "@/redux/slices/doctor/formConsulta";
import Swal from "sweetalert2";
import { resetFormState } from "@/redux/slices/doctor/formConsulta";

import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconOptions from "@/components/icons/IconOptions";
import IconEditar from "@/components/icons/iconEditar";
import IconClose2 from "@/components/icons/IconClose2";
import DeleteOrden from "@/components/modal/ModalPatient/ModalDeteleOrden";
import ModalConsultationCalendar from "@/components/modal/ModalDoctor/ModalConsultationCalendar";
import { useSearchParams } from "next/navigation";

export default function HomeDoc() {
    const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);
    const infoSend = useAppSelector((state) => state.formSlice.selectedOptions);

    const router = useRouter();
    const searchParams = useSearchParams();

    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalModify, setShowModalModify] = useState(false);
    const [showModalConsultation, setShowModalConsultation] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState({});
    const [physicianId, setPhysicianId] = useState();
    const [isLoading, setisLoading] = useState(true);
    const [isSorted, setIsSorted] = useState(false);
    const [errors, setErrors] = useState({});
    const [patients, setPatients] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const [allDoctors, setAllDoctors] = useState([]);
    const [pagination, setPagination] = useState({
        totalUsers: 0,
        totalPages: 0,
        currentPage: 1,
    });

    const dispatch = useAppDispatch();
    const token = Cookies.get("a");
    const id = Cookies.get("c");
    const lastSegmentTextToShow = PathnameShow();

    useEffect(() => {
        if (searchParams.get("id")) {
            setPhysicianId(Number(searchParams.get("id")));
            setShowModal(true)
        }

        return;
    }, [searchParams]);

    const getPatientRequest = async (headers) => {
        try {
            const response = await ApiSegimed.get(`/patient-medical-request?patientId=${id}&status=false`, { headers });
            if (response.data) {
                console.log(response.data);
                setPatients(response.data);
                setisLoading(false);
            }
        } catch (error) {
            console.error("Error fetching patient requests:", error);
            setisLoading(false);
        }
    };

    const getAllDoc = async (headers) => {
        try {
            const response = await ApiSegimed.get("/all-physicians", { headers });
            if (response.data) {
                setAllDoctors(response.data);
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    useEffect(() => {
        setPagination((prev) => ({
            ...prev,
            currentPage: 1,
        }));
    }, [searchTerm]);

    useEffect(() => {
        try {
            getPatientRequest({ token });
            getAllDoc({ token });
        } catch (error) {
            console.error("Error during initial data fetch:", error);
        }
    }, [pagination.currentPage, searchTerm]);

    useEffect(() => {
        dispatch(setSearchTerm(""));
    }, [dispatch]);

    const filteredPatients = patients;

    const sortedPatients = isSorted
        ? [...filteredPatients].sort((a, b) => a.name.localeCompare(b.name))
        : filteredPatients;

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination((prev) => ({
                ...prev,
                currentPage: newPage,
            }));
        }
    };

    const handleChange = (name, value) => {
        dispatch(setSelectedOption({ name, option: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: false })); // Clear error when field changes
    };

    const handleDeleteOrden = async () => {
        try {
            const response = await ApiSegimed.delete(`/patient-medical-request?id=${selectedRequest.id}`);
            if (response.data) {
                await getPatientRequest({ token });
                dispatch(resetFormState());
                setSelectedRequest({})
                setShowModalDelete(false);
                Swal.fire({
                    title: "¡Solicitud eliminada correctamente!",
                    text: "",
                    icon: "success",
                    confirmButtonColor: "#487FFA",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            console.error("Error creating patient request:", error);
        }
        setShowModalDelete(false);
    };

    const handleSubmit = async () => {
        const { reqTypes, physicianId, message } = infoSend;

        const newErrors = {};
        if (!reqTypes) newErrors.reqTypes = true;
        if (!physicianId) newErrors.physicianId = true;
        if (!message) newErrors.message = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            const response = await ApiSegimed.post("/patient-medical-request", infoSend);
            if (response.data) {
                await getPatientRequest({ token });
                dispatch(resetFormState());
                setSelectedRequest({})
                setShowModal(false);
                Swal.fire({
                    title: "¡Solicitud creada correctamente!",
                    text: "",
                    icon: "success",
                    confirmButtonColor: "#487FFA",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            console.error("Error creating patient request:", error);
        }
    };

    const handleSubmitModify = async () => {
        // Extraer los valores actuales de infoSend y selectedRequest
        const { reqTypes, physicianId, message } = infoSend;

        // Validar los valores en infoSend (o usar los de selectedRequest si no hay en infoSend)
        const newErrors = {};
        if (!reqTypes && !selectedRequest.reqTypes) newErrors.reqTypes = true;
        if (!physicianId && !selectedRequest.physicianId) newErrors.physicianId = true;
        if (!message && !selectedRequest.message) newErrors.message = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Crear un objeto combinado que solo sobrescriba los campos presentes en infoSend
        const updatedInfoSend = {
            ...selectedRequest, // Mantiene todos los campos actuales
            ...(reqTypes && { reqTypes }), // Sobrescribe reqTypes si está presente en infoSend
            ...(physicianId && { physicianId }), // Sobrescribe physicianId si está presente en infoSend
            ...(message && { message }), // Sobrescribe message si está presente en infoSend
        };

        try {
            // Enviar la solicitud PATCH con los valores combinados
            const response = await ApiSegimed.patch(`/patient-medical-request?id=${selectedRequest.id}`, updatedInfoSend);
            if (response.data) {
                await getPatientRequest({ token });
                dispatch(resetFormState());
                setSelectedRequest({});
                setShowModalModify(false);
                Swal.fire({
                    title: "¡Solicitud modificada correctamente!",
                    text: "",
                    icon: "success",
                    confirmButtonColor: "#487FFA",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            console.error("Error modifying patient request:", error);
        }
    };

    return (
        <div className="flex flex-col h-full ">
            <title>{lastSegmentTextToShow}</title>
            <div className="flex items-center border-b md:justify-between w-full justify-center  border-b-[#cecece] px-2 md:pl-10 md:pr-6 py-2 h-[10%] bg-white sticky top-0 z-10 ">
                <div ></div>

                {/* <FiltrosPaciente
              isOpen={isFilterOpen}
              toggleMenu={toggleFilterMenu}
              onClickSort={handleSortClick}
          /> */}


                <h1 className="font-bold ml-4 hidden md:block ">Listado de Solicitudes </h1>

                <div className=" flex justify-end gap-3">
                    <button
                        onClick={() => setShowModalConsultation(true)}
                        className={` bg-white text-bluePrimary  border-bluePrimary md:px-4 md:py-2 py-2 px-2 items-center flex rounded-lg border gap-2 w-fit transition duration-300 ease-in-out`}>
                        <IconMas color={"#487ffa"} />
                        <p
                            className={` text-bluePrimary
                         font-bold `}>
                            Nueva consulta
                        </p>
                    </button>
                    <button
                        onClick={() => setShowModal(true)}
                        className={` bg-white text-bluePrimary  border-bluePrimary md:px-4 md:py-2 py-2 px-2 items-center flex rounded-lg border gap-2 w-fit transition duration-300 ease-in-out`}>
                        <IconMas color={"#487ffa"} />
                        <p
                            className={` text-bluePrimary
                         font-bold `}>
                            Nueva solicitud
                        </p>
                    </button>
                </div>
                {/* <div></div> */}
            </div>
            <div className="flex flex-col  w-full h-full overflow-y-auto">


                <div className="w-[100%] border-b border-b-[#cecece] flex">
                    <div className="w-[5%] md:block hidden h-8"></div>
                    <div className="grid md:grid-cols-6 grid-cols-4 w-[100%] md:w-[100%] pr-3 items-center  text-center md:text-start  bg-white static md:sticky top-14 z-10 md:z-4 ">
                        <p className=" text-[#5F5F5F]">Fecha</p>
                        <p className=" text-[#5F5F5F] md:block hidden">Hora</p>
                        <p className=" text-[#5F5F5F]">Medico</p>
                        <p className=" text-[#5F5F5F]">Tipo</p>
                        <p className=" text-[#5F5F5F] md:block hidden">Motivo</p>
                        <p className=" text-[#5F5F5F] "></p>

                    </div>

                </div>

                <div className=" justify-center w-[100%] items-center h-[100%] bg-[#FAFAFC] ">
                    {isLoading ? (
                        <SkeletonList count={10} />
                    ) : sortedPatients.length === 0 ? (
                        <NotFound
                            text={
                                "No hay solicitudes activas"
                            }
                            sizeText={"w-[100%]"}
                        />
                    ) : (
                        filteredPatients.map((paciente) => (

                            <div key={paciente.id} className="w-[100%] h-fit flex border-b items-center  border-b-[#cecece]  bg-white">
                                <div className="justify-center w-[5%] hidden md:flex items-center ">
                                    <IconConsulta />
                                </div>
                                <div className="grid text-center grid-cols-4 w-[100%] pr-3  justify-center md:w-[100%] md:text-left md:grid-cols-6 items-center  py-2 bg-white z-10">

                                    <div className="text-[#5F5F5F] ">
                                        {Fecha(paciente.createdAt, 4)}
                                    </div>
                                    <div className="text-[#5F5F5F] md:block hidden ">
                                        {Hora(paciente.createdAt)}
                                    </div>
                                    <div className="text-[#5F5F5F] ">
                                        {paciente?.physicianReq?.name}       {paciente?.physicianReq?.lastname}
                                    </div>
                                    <div className="text-[#5F5F5F]">
                                        {paciente?.reqTypes}
                                    </div>
                                    <div className="text-[#5F5F5F] md:block hidden">
                                        {paciente?.message}
                                    </div>
                                    <MenuDropDown
                                        label="Opciones"
                                        icon={<IconOptions color="#FFFFFF" />}
                                        categories={[
                                            {
                                                items: [
                                                    {
                                                        label: "Modificar solicitud",
                                                        onClick: () => { setSelectedRequest(paciente); setShowModalModify(true) },
                                                        icon: <IconEditar color={"#B2B2B2"} />,
                                                    },
                                                    {
                                                        label: "Eliminar solicitud",
                                                        onClick: () => { setSelectedRequest(paciente); setShowModalDelete(true) },
                                                        icon:
                                                            <IconClose2 />
                                                        ,
                                                    },
                                                ],
                                            }
                                        ]}
                                    />
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <div className="flex justify-center items-center gap-5   font-bold h-[15%]">
                <button
                    onClick={() => handlePageChange(pagination.currentPage - 1)}
                    disabled={pagination.currentPage === 1}
                    className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-lg flex items-center justify-center gap-4 transition duration-300 ease-in-out transform active:scale-100  disabled:opacity-60">
                    <IconPrev /> Anterior
                </button>
                <p>
                    {pagination.currentPage} de {pagination.totalPages}{" "}
                </p>
                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="  w-36 h-10 bg-white border border-[#D7D7D7] rounded-lg flex items-center justify-center gap-4 transition duration-300 ease-in transform  active:scale-100  disabled:opacity-60">
                    Siguiente
                    <IconNext />
                </button>
            </div>
            {/* {showModal && selectedPatient && ( */}
            <ModalModularizado
                isOpen={showModal}
                onClose={() => { setShowModal(false); dispatch(resetFormState()); setErrors({}) }}
                Modals={[<ModalOrdenPte key={"modalOrden"} doctors={allDoctors} handleChange={handleChange} errors={errors} doctorSelected={physicianId} />]}
                title={"Generar nueva solicitud"}
                button1={"hidden"}
                button2={"bg-greenPrimary block text-white font-font-Roboto"}
                progessBar={"hidden"}
                size={"h-fit md:h-[30rem] md:w-[35rem]"}
                buttonText={{ end: `Generar` }}
                funcion={handleSubmit}
            />
            <ModalModularizado
                isOpen={showModalDelete}
                onClose={() => { setShowModalDelete(false) }}
                Modals={[<DeleteOrden key={"deleteModalOrden"} />]}
                title={"Advertencia"}
                button1={"bg-[#E73F3F] text-white"}
                button2={"bg-white border-[#487FFA] border block font-font-Roboto text-[#487FFA]"}
                progessBar={"hidden"}
                size={"h-[15rem] md:h-[15rem] md:w-[25rem]"}
                buttonText={{ end: `No` }}
                funcion={() => { setShowModalDelete(false) }}
                buttonIcon={<></>}
                buttonText1={`Si`}
                funcionButton1={handleDeleteOrden}
            />
            <ModalModularizado
                isOpen={showModalModify}
                onClose={() => { setShowModalModify(false); setErrors({}) }}
                Modals={[<ModalOrdenPte state={selectedRequest} key={"modalOrden"} doctors={allDoctors} handleChange={handleChange} errors={errors} />]}
                title={"Modificar solicitud"}
                button1={"hidden"}
                button2={"bg-greenPrimary text-white block font-font-Roboto"}
                progessBar={"hidden"}
                size={"h-fit md:h-[33rem] md:w-[35rem]"}
                buttonText={{ end: `Modificar` }}
                funcion={handleSubmitModify}
            />

            {showModalConsultation && (
                <ModalConsultationCalendar
                    isOpen={showModalConsultation}
                    onClose={() => setShowModalConsultation(false)}

                />
            )}
            {/* )} */}

        </div>
    );
}

