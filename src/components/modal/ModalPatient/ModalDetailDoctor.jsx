'use client'
import { ApiSegimed } from "@/Api/ApiSegimed";
import IconCircle from "@/components/icons/IconCircle";
import IconClose from "@/components/icons/IconClose";
import IconCurrentRouteNav from "@/components/icons/IconCurrentRouteNav";
import IconPhone from "@/components/icons/iconPhone";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addDoctor} from "@/redux/slices/doctor/doctor";
import Cookies from "js-cookie";
import { useEffect } from "react";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const capitalizeDoctorProperties = (doctor) => {
    const capitalizedDoctor = {};
    for (const key in doctor) {
        if (typeof doctor[key] === 'string') {
            capitalizedDoctor[key] = capitalizeFirstLetter(doctor[key]);
        } else {
            capitalizedDoctor[key] = doctor[key];
        }
    }
    return capitalizedDoctor;
};

const ModalDetailDoctor = ({ doctorId, onClose }) => {
    
  
    const dispatch = useAppDispatch();

    const getDoctor = async (headers) => {
        try {
            const response = await ApiSegimed.get(`/physician-info?id=${doctorId}`, headers);
           

            if(response.data) {

                // const capitalizedDoctor = capitalizeDoctorProperties(response.data);
                dispatch(addDoctor(response.data));
            } 
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() =>{
        const token = Cookies.get("a");
        if(token) {
            getDoctor({ headers: { 'token': token }})
        }
    }, [doctorId]);

    const doctor = useAppSelector(state => state.doctor);
    // const attendancePlace = doctor.attendancePlaces[0]?.alias || "N/A";
    // const specialties = doctor.specialties.map(specialty => specialty.name).join(', ');

    if (!doctor) return null;
    const specialtiesString = doctor?.specialties?.map(specialty => specialty.name).join(', ')
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            <div className="relative z-50 bg-white rounded-lg w-[35rem] h-[30rem] flex flex-col items-center gap-5">
                <div className="w-full h-full flex flex-col justify-between">
                    <div className="h-16 flex items-center justify-start gap-3 p-5 border-b-2 font-semibold">
                        <IconCurrentRouteNav className="w-4"/> Informacion del doctor
                    </div>
                    <div className="flex flex-col justify-around p-5 w-full h-full font-medium">
                        <div className="flex items-center justify-between w-full px-5">
                            <div className="w-full flex items-center justify-start gap-3">
                                <IconCircle/> Nombre completo
                            </div>
                            <span className="w-full flex justify-start">{doctor?.name} {doctor?.lastname}</span>
                        </div>

                        <div className="border"/>

                        <div className="flex items-center justify-between w-full px-5">
                            <div className="w-full flex items-center justify-start gap-3">
                                <IconCircle/> Especialidad
                            </div>
                            <span className="w-full flex justify-start">{specialtiesString ? specialtiesString : null}</span>
                        </div>

                        <div className="border"/>

                        <div className="flex items-center justify-between w-full px-5">
                            <div className="w-full flex items-center justify-start gap-3">
                                <IconCircle/> Lugar de atención
                            </div>
                            <span className="w-full flex justify-start">{doctor?.attendancePlace?.alias}</span>
                        </div>

                        <div className="border"/>

                        <div className="flex items-center justify-between w-full px-5">
                            <div className="w-full flex items-center justify-start gap-3">
                                <IconCircle/> Inicio de seguimiento
                            </div>
                            <span className="w-full flex justify-start">2024-05-09 - 11:20AM</span>
                        </div>

                        <div className="border"/>

                        <div className="flex items-center justify-between w-full px-5">
                            <div className="w-full flex items-center justify-start gap-3">
                                <IconCircle/> Numero de contacto
                            </div>
                            <div className="w-full flex justify-start text-white">
                                <button className="py-2 px-6 flex justify-center items-center gap-3 bg-[#487FFA] rounded-lg cursor-pointer">
                                    Solicitar acceso <IconPhone color="#FFFFFF"/>
                                </button>
                            </div>
                        </div>
                    </div>  
                </div>
                <button onClick={onClose} className="absolute top-0 right-0 m-4 hover:transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
                    <IconClose className="w-8" />
                </button>
            </div>
        </div>
    );
};

export default ModalDetailDoctor;