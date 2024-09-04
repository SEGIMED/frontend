"use client";

import IconPrev from "@/components/icons/IconPrev";
import IconNext from "@/components/icons/IconNext";
import { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setSearchTerm } from "@/redux/slices/doctor/allPatients";
import config from "@/components/localData/localdata";
import Cookies from "js-cookie";
import { ApiSegimed } from "@/Api/ApiSegimed.js";
import IconFavoriteBlue from "@/components/icons/IconFavoriteBlue.jsx";
import IconFavoriteYellow from "@/components/icons/IconFavoriteyellow.jsx";
import { PathnameShow } from "@/components/pathname/path";
import rutas from "@/utils/rutas.js";
import NotFound from "@/components/notFound/notFound";
import SkeletonList from "@/components/skeletons/HistorialSkeleton";
import ModalModularizado from "@/components/modal/ModalPatient/ModalModurizado";
import { useRouter } from "next/navigation";
import OrdenType from "@/components/modal/ModalDoctor/modalOrden";
import IconMas from "@/components/icons/iconMas";
import IconConsulta from "@/components/icons/IconConsulta";
import { Fecha, Hora } from "@/utils/NormaliceFechayHora";
import MenuDropDown from "@/components/dropDown/MenuDropDown";
import IconOptions from "@/components/icons/IconOptions";
import IconImportar from "@/components/icons/IconImportar";
import FileDisplay from "@/components/modal/ModalDoctor/modalDisplayFile";


export default function HomeDoc() {
    const searchTerm = useAppSelector((state) => state.allPatients.searchTerm);
    const orden = useAppSelector((state) => state.formSlice.selectedOptions);

    const router = useRouter()

    const [showModal, setShowModal] = useState(false);
    const [isLoading, setisLoading] = useState(true);
    const [isSorted, setIsSorted] = useState(false);
    const [riskFilter, setRiskFilter] = useState("");
    const [showFavorites, setShowFavrites] = useState(false);
    const [patients, setPatients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(false);
    const [patientsFavorites, setPatientsFavorites] = useState([]);
    const [pagination, setPagination] = useState({
        totalUsers: 0,
        totalPages: 0,
        currentPage: 1,
    });

    const userId = config.c;
    const dispatch = useAppDispatch();
    const token = Cookies.get("a");
    const lastSegmentTextToShow = PathnameShow();

    const getPatients = async () => {
        const response = await ApiSegimed.get(
            `/physician-order`, null
        );
        if (response.data) {

            console.log(response.data);
            setPatients(response.data);
            // setPagination((prev) => ({
            //     ...prev,
            //     totalUsers: response.data.totalUsers,
            //     totalPages: response.data.totalPages,
            // }));
            setisLoading(false);
        }
    };

    useEffect(() => {
        setPagination((prev) => ({
            ...prev,
            currentPage: 1,
        }));
    }, [searchTerm, riskFilter]);

    const getFavorites = async (headers) => {
        const response = await ApiSegimed.get(
            `/patients?page=${pagination.currentPage}&&limit=9&&name=${searchTerm}&&risk=${riskFilter}&physicianId=${userId}&onlyFavorites=true`,
            headers
        );
        if (response.data) {
            const pacientesFormateados = response.data.user.map((paciente) => {
                const fechaFormateada = new Date(paciente.lastLogin)
                    .toLocaleString()
                    .replace(/\,/g, " -");
                return { ...paciente, lastLogin: fechaFormateada };
            });

            setPatientsFavorites(response.data.user);
            setPagination((prev) => ({
                ...prev,
                totalUsers: response.data.totalUsers,
                totalPages: response.data.totalPages,
            }));
            setisLoading(false);
        }
    };

    useEffect(() => {
        if (!showFavorites) {
            getPatients({ headers: { token: token } }).catch(console.error);
        } else {
            setisLoading(true);
            // getFavorites({ headers: { token: token } }).catch(console.error);
        }
    }, [showFavorites, pagination.currentPage, searchTerm, riskFilter]);

    useEffect(() => {
        dispatch(setSearchTerm(""));
    }, [dispatch]);

    const filteredPatients = showFavorites ? patientsFavorites : patients;
    // console.log(filteredPatients);

    const sortedPatients = isSorted
        ? [...filteredPatients].sort((a, b) => a.name.localeCompare(b.name))
        : filteredPatients;



    // const changeFavorite = async (patient) => {
    //     const url = patient.isFavorite
    //         ? `/delete-physician-favorite-patient`
    //         : `/create-physician-favorite-patient`;
    //     const method = patient.isFavorite ? "DELETE" : "POST";
    //     const data = { patientId: patient.id, physicianId: userId };

    //     try {
    //         const response = await ApiSegimed({
    //             url,
    //             method,
    //             data,
    //             headers: { token },
    //         });
    //         if (response.status === 201 || response.status === 200) {
    //             getFavorites({ headers: { token: token } }).catch(console.error);
    //             getPatients({ headers: { token: token } }).catch(console.error);
    //             // console.log(
    //             //     `Patient ${patient.isFavorite ? "removed from" : "added to"
    //             //     } favorites successfully.`,
    //             //     response
    //             // );
    //         } else {
    //             console.log("Something went wrong:", response);
    //         }
    //     } catch (error) {
    //         console.error("Error in changeFavorite function:", error);
    //     }
    // };

    // const handleFavoriteClick = () => {
    //     setisLoading(true);
    //     setShowFavorites(!showFavorites);

    //     handlePageChange(1);
    //     dispatch(setSearchTerm(""));
    //     setIsFilterOpen(false);
    // };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination((prev) => ({
                ...prev,
                currentPage: newPage,
            }));
        }
    };



    return (
        <div className="flex flex-col h-full ">
            <title>{lastSegmentTextToShow}</title>
            <div className="flex items-center border-b justify-between border-b-[#cecece] px-2 md:pl-10 md:pr-6 py-2 h-[10%] bg-white sticky top-0 z-10 ">
                <div className="flex gap-2 md:gap-4">

                    {/* <button
                        onClick={handleFavoriteClick}
                        className={`${showFavorites
                            ? "bg-bluePrimary text-white"
                            : "bg-white text-bluePrimary  border-bluePrimary"
                            } py-2 px-4 items-center flex rounded-lg border gap-2 w-fit transition duration-300 ease-in-out`}>
                        {showFavorites ? <IconFavoriteYellow /> : <IconFavoriteBlue />}
                        <p
                            className={`hidden md:block ${showFavorites ? "text-white" : "text-bluePrimary"
                                } font-bold`}>
                            Favoritos
                        </p>
                    </button> */}
                    {/* <FiltrosPaciente
              isOpen={isFilterOpen}
              toggleMenu={toggleFilterMenu}
              onClickSort={handleSortClick}
          /> */}
                </div>

                <h1 className="font-bold ml-4 hidden md:block">Generar órden médica</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className={` bg-white text-bluePrimary  border-bluePrimary md:px-4 md:py-2 py-2 px-2 items-center flex rounded-lg border gap-2 w-fit transition duration-300 ease-in-out`}>
                    <IconMas color={"#487ffa"} />
                    <p
                        className={` md:block text-bluePrimary
                         font-bold`}>
                        Generar orden
                    </p>
                </button>
                {/* <div></div> */}
            </div>
            <div className="flex flex-col h-full overflow-y-auto">


                <div className="w-[100%] border-b border-b-[#cecece] flex">
                    <div className="w-[5%] md:block hidden h-8"></div>
                    <div className="grid grid-cols-4 w-[100%] md:w-[100%] items-center  text-center md:text-start  bg-white static md:sticky top-14 z-10 md:z-4 ">
                        <p className=" text-[#5F5F5F]">Paciente</p>
                        <p className=" text-[#5F5F5F]">Tipo</p>
                        <p className=" text-[#5F5F5F]">Fecha</p>

                    </div>

                </div>

                <div className="items-start justify-center w-[100%] h-[100%] bg-[#FAFAFC] ">
                    {isLoading ? (
                        <SkeletonList count={10} />
                    ) : sortedPatients.length === 0 ? (
                        <NotFound
                            text={
                                "No hay ordenes medicas disponibles "
                            }
                            sizeText={"w-[100%]"}
                        />
                    ) : (
                        filteredPatients.map((paciente) => (

                            <div key={paciente.id} className="w-[100%] h-fit flex border-b items-center  border-b-[#cecece]  bg-white">
                                <div className="justify-center w-[5%] hidden md:flex items-center ">
                                    <IconConsulta />
                                </div>
                                <div className="grid text-center grid-cols-4 w-[100%] justify-center md:w-[100%] md:text-left md:grid-cols-4 items-center  py-2 bg-white z-10">

                                    <div className="text-[#5F5F5F] ">
                                        {paciente?.patient?.name} {paciente?.patient?.lastname}
                                    </div>
                                    <div className="text-[#5F5F5F]">
                                        {paciente?.orderTypes}
                                    </div>

                                    <div className="text-[#5F5F5F] md:gap-3 block md:flex ">
                                        {Fecha(paciente.date, 4)} <span className="hidden md:block"> {Hora(paciente.date)}</span>
                                    </div>
                                    <MenuDropDown
                                        label="Opciones"
                                        icon={<IconOptions color="white" />}
                                        categories={[
                                            {
                                                items: [
                                                    {
                                                        label: "Ver orden medica",
                                                        icon: <IconImportar color={"#B2B2B2"} />,
                                                        onClick: () => {
                                                            setSelectedOrder(paciente.orderPdf);
                                                            setIsModalOpen(true);
                                                        },
                                                    },
                                                ].filter(Boolean),
                                            },
                                        ]}
                                        className={"w-[40px] md:w-full lg:w-fit mx-auto"}
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
                    className="w-36 h-10 bg-white border border-[#D7D7D7] rounded-lg flex items-center justify-center gap-4 transition duration-300 ease-in transform  active:scale-100  disabled:opacity-60">
                    Siguiente
                    <IconNext />
                </button>
            </div>
            {/* {showModal && selectedPatient && ( */}
            <ModalModularizado
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                Modals={[
                    <FileDisplay key={"displayFile"} state={{ study: selectedOrder }} />,
                ]}
                title={"Visualizacion de archivo"}
                button1={"hidden"}
                button2={"bg-greenPrimary text-white block"}
                progessBar={"hidden"}
                size={"md:min-h-[4rem] md:w-[35rem]"}
                buttonText={{ end: `Cerrar` }}
                buttonIcon={<></>}
            />
            <ModalModularizado
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                Modals={[<OrdenType
                    key="orden-type"

                />]}
                disabledButton={orden.orderTypes ? false : true}
                ruta={`${rutas.Doctor}${rutas.Pacientes}?ordenMedica=true&type=${orden.orderTypes}`}
                title={"Generar nueva órden médica"}
                button1={"hidden"}
                button2={"bg-greenPrimary text-white block font-font-Roboto"}
                progessBar={"hidden"}
                size={"h-[16rem] md:h-[15rem] md:w-[35rem]"}
                buttonText={{ end: `Continuar` }}
            />
            {/* )} */}

        </div>
    );
}

