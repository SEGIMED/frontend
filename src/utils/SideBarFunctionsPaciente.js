import { useAppDispatch } from '@/redux/hooks';
import Cookies from 'js-cookie';
import { addNotifications } from "@/redux/slices/user/notifications";
import { addSchedules } from "@/redux/slices/doctor/schedules";
import { setAllPatients } from "@/redux/slices/doctor/allPatients";
import { adduser } from "@/redux/slices/user/user";
import { getAllDoctores } from '@/redux/slices/doctor/allDoctores';
import { ApiSegimed } from "@/Api/ApiSegimed";

const useDataFetchingPte = () => {
    const dispatch = useAppDispatch();
    const id = Cookies.get('c');

    const getAllDoc = async (headers) => {
        try {
            const response = await ApiSegimed.get("/all-physicians", headers);
            if (response.data) {
                dispatch(getAllDoctores(response.data));
            }
        } catch (error) {
            console.error("Error fetching doctors:", error);
        }
    };

    const getUser = async (headers) => {
        try {
            const response1 = await ApiSegimed.get(`/profile`);
            // const response2 = await ApiSegimed.get(`/patient/${id}`, headers);
            const combinedData = {
                ...response1.data,
                // ...response2.data,
            };
            dispatch(adduser(combinedData));
            console.log(combinedData);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const obtenerUbicacion = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(mostrarUbicacion, mostrarError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const mostrarUbicacion = (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;;
        enviarUbicacion(lat, lon); // Llama a la función para enviar la ubicación al servidor
    };

    const mostrarError = (error) => {
        console.error("Error al obtener la ubicación:", error);
    };

    const enviarUbicacion = async (lat, lon) => {
        try {
            const headers = { headers: { token: Cookies.get('token') } };
            const body = {
                geolocation: JSON.stringify([lat, lon]),
                patientId: Number(id),
            };
            await ApiSegimed.patch("/update-full-patient", body, headers);
        } catch (error) {
            console.error("Error de red:", error);
        }
    };

    const getSchedules = async (headers) => {
        const userId = Number(id);
        try {
            const response = await ApiSegimed.get(`/schedules?patientId=${userId}`, headers);
            if (response.data) {
                dispatch(addSchedules(response.data));
            }
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    const getPatientNotifications = async (headers) => {
        try {
            const response = await ApiSegimed.get(`/all-notifications-patient?patientId=` + id, headers);
            if (response.data) {
                dispatch(addNotifications(response.data));
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    return {
        getAllDoc,
        getUser,
        obtenerUbicacion,
        getSchedules,
        getPatientNotifications,
    };
};

export default useDataFetchingPte;
