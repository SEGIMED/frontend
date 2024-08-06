"use client";

import IconPrev from "@/components/icons/IconPrev";
import IconNext from "@/components/icons/IconNext";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/slices/doctor/allPatients";
import config from "@/components/localData/localdata";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed.js";
import { PathnameShow } from "@/components/pathname/path";
import rutas from "@/utils/rutas.js";
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

export default function HomeDoc() {
    const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);
    const infoSend = useAppSelector((state) => state.formSlice.selectedOptions);
    console.log(infoSend);


    const router = useRouter()

    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalModify, setShowModalModify] = useState(false);
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

    const userId = config.c;
    const dispatch = useAppDispatch();
    const token = Cookies.get("a");
    const lastSegmentTextToShow = PathnameShow();

    const getPatients = async (headers) => {
        const response = await ApiSegimed.get(
            `/patients?page=${pagination.currentPage}&&limit=9&&name=${searchTerm}&physicianId=${userId}`,
            headers
        );
        if (response.data) {
            const pacientesFormateados = response.data.user.map((paciente) => {
                const fechaFormateada = new Date(paciente.lastLogin)
                    .toLocaleString()
                    .replace(/\,/g, " -");
                return { ...paciente, lastLogin: fechaFormateada };
            });
            console.log(pacientesFormateados);
            setPatients(response.data.user);
            setPagination((prev) => ({
                ...prev,
                totalUsers: response.data.totalUsers,
                totalPages: response.data.totalPages,
            }));
            setisLoading(false);
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

    useEffect(() => {
        setPagination((prev) => ({
            ...prev,
            currentPage: 1,
        }));
    }, [searchTerm]);


    useEffect(() => {

        getPatients({ headers: { token: token } }).catch(console.error);
        getAllDoc({ headers: { token: token } }).catch(console.error);

    }, [pagination.currentPage, searchTerm]);

    useEffect(() => {
        dispatch(setSearchTerm(""));
    }, [dispatch]);

    const filteredPatients = patients;
    // console.log(filteredPatients);

    const sortedPatients = isSorted
        ? [...filteredPatients].sort((a, b) => a.name.localeCompare(b.name))
        : filteredPatients;
    // console.log(sortedPatients, `xd`);


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

    const handleDeleteOrden = () => {
        console.log(selectedId);
        setShowModalDelete(false)

    };



    const handleSubmit = () => {
        const { OrderType, doctorId, motivo } = infoSend;

        const newErrors = {};
        if (!OrderType) newErrors.OrderType = true;
        if (!doctorId) newErrors.doctorId = true;
        if (!motivo) newErrors.motivo = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log(infoSend);
        dispatch(resetFormState());
        setShowModal(false);
        Swal.fire({
            title: "¡Solicitud creada correctamente!",
            text: "",
            icon: "success",
            confirmButtonColor: "#487FFA",
            confirmButtonText: "Aceptar",
        });
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
                {/* <div></div> */}
            </div>
            <div className="flex flex-col overflow-y-auto">


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

                <div className="items-start justify-center w-[100%] h-[80%] bg-[#FAFAFC] ">
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
                                        {Fecha(paciente.lastLogin, 4)}
                                    </div>
                                    <div className="text-[#5F5F5F] md:block hidden ">
                                        {Hora(paciente.lastLogin)}
                                    </div>
                                    <div className="text-[#5F5F5F] ">
                                        {paciente?.name} {paciente?.lastname}
                                    </div>
                                    <div className="text-[#5F5F5F]">
                                        {paciente?.name}
                                    </div>
                                    <div className="text-[#5F5F5F] md:block hidden">
                                        {paciente?.name}
                                    </div>
                                    <MenuDropDown
                                        label="Opciones"
                                        icon={<IconOptions color="#FFFFFF" />}
                                        categories={[
                                            {
                                                items: [
                                                    {
                                                        label: "Modificar solicitud",
                                                        onClick: () => setShowModalModify(true),
                                                        icon: <IconEditar color={"#B2B2B2"} />,
                                                    },
                                                    {
                                                        label: "Eliminar solicitud",
                                                        onClick: () => { setSelectedId(paciente.id); setShowModalDelete(true) },
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
                    className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in-out transform active:scale-100  disabled:opacity-60">
                    <IconPrev /> Anterior
                </button>
                <p>
                    {pagination.currentPage} de {pagination.totalPages}{" "}
                </p>
                <button
                    onClick={() => handlePageChange(pagination.currentPage + 1)}
                    disabled={pagination.currentPage === pagination.totalPages}
                    className="  w-36 h-10 bg-white border border-[#D7D7D7] rounded-xl flex items-center justify-center gap-4 transition duration-300 ease-in transform  active:scale-100  disabled:opacity-60">
                    Siguiente
                    <IconNext />
                </button>
            </div>
            {/* {showModal && selectedPatient && ( */}
            <ModalModularizado
                isOpen={showModal}
                onClose={() => { setShowModal(false); dispatch(resetFormState()); setErrors({}) }}
                Modals={[<ModalOrdenPte key={"modalOrden"} doctors={allDoctors} handleChange={handleChange} errors={errors} />]}
                title={"Generar nueva solicitud"}
                button1={"hidden"}
                button2={"bg-greenPrimary block font-font-Roboto"}
                progessBar={"hidden"}
                size={"h-fit md:h-[33rem] md:w-[35rem]"}
                buttonText={{ end: `Generar` }}
                funcion={handleSubmit}
            />
            <ModalModularizado
                isOpen={showModalDelete}
                onClose={() => { setShowModalDelete(false) }}
                Modals={[<DeleteOrden key={"deleteModalOrden"} id={selectedId} />]}
                title={"Advertencia"}
                button1={"bg-[#E73F3F] text-white"}
                button2={"bg-white border-[#487FFA] border text-[#487FFA] block font-font-Roboto  text-[#487FFA]"}
                progessBar={"hidden"}
                size={"h-[15rem] md:h-[15rem] md:w-[25rem]"}
                buttonText={{ end: `No` }}
                funcion={() => { setShowModalDelete(false) }}
                buttonIcon={false}
                buttonText1={`Si`}
                funcionButton1={handleDeleteOrden}
            />
            <ModalModularizado
                isOpen={showModalModify}
                onClose={() => { setShowModalModify(false); setErrors({}) }}
                Modals={[<ModalOrdenPte state={infoSend} key={"modalOrden"} doctors={allDoctors} handleChange={handleChange} errors={errors} />]}
                title={"Generar nueva solicitud"}
                button1={"hidden"}
                button2={"bg-greenPrimary block font-font-Roboto"}
                progessBar={"hidden"}
                size={"h-fit md:h-[33rem] md:w-[35rem]"}
                buttonText={{ end: `Generar` }}
                funcion={handleSubmit}
            />
            {/* )} */}

        </div>
    );
}

