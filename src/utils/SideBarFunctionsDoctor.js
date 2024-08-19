import { useAppDispatch } from '@/redux/hooks';
import Cookies from 'js-cookie';
import { addNotifications } from "@/redux/slices/user/notifications";
import Swal from "sweetalert2";
import { addAlarms } from "@/redux/slices/alarms/alarms";
import { addActivePtes } from "@/redux/slices/activePtes/activePtes";
import { addSchedules } from "@/redux/slices/doctor/schedules";
import { setAllPatients } from "@/redux/slices/doctor/allPatients";
import { adduser } from "@/redux/slices/user/user";
import { ApiSegimed } from "@/Api/ApiSegimed";

const useDataFetching = () => {
    const dispatch = useAppDispatch();
    const id = Cookies.get('c');


    const getActivesPacientesDoctor = async (headers) => {
        try {
            const response = await ApiSegimed.get(
                "/statistics-patient-activity",
                headers
            );
            dispatch(addActivePtes(response.data));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getActivesAlarmsDoctor = async (headers) => {
        try {
            const response = await ApiSegimed.get("/alarms-by-patient", headers);

            const actives = response.data?.alarms?.filter(
                (alarm) => alarm.solved === false
            ).length;
            const inactives = response.data?.alarms?.filter(
                (alarm) => alarm.solved === true
            ).length;
            const data = {
                activeAlarms: Number(actives),
                inactiveAlarms: Number(inactives),
            };

            dispatch(addAlarms(data));
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getSchedulesDoctor = async (headers) => {
        try {
            const response = await ApiSegimed.get("/schedules", headers);

            if (response.data) {
                dispatch(addSchedules(response.data));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getDoctorNotifications = async (headers) => {
        try {
            const response = await ApiSegimed.get(
                `/all-notifications-physician?physicianId=` + id,
                headers
            );

            if (response.data) {
                dispatch(addNotifications(response.data));
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getPatientsDoctor = async (headers) => {
        const response = await ApiSegimed.get(`/patients`, headers);
        if (response.data) {
            const pacientesFormateados = response.data.map((paciente) => {
                const fechaFormateada = new Date(paciente.lastLogin)
                    .toLocaleString()
                    .replace(/\,/g, " -");
                return { ...paciente, lastLogin: fechaFormateada };
            });
            dispatch(setAllPatients(pacientesFormateados));
        }
    };

    const getUserDoctor = async (headers) => {
        const response = await ApiSegimed.get(`/physician-info?id=${id}`, headers);
        if (response.data) {
            dispatch(adduser(response.data));
        }
    };


    return {
        getActivesPacientesDoctor,
        getActivesAlarmsDoctor,
        getSchedulesDoctor,
        getDoctorNotifications,
        getPatientsDoctor,
        getUserDoctor,
    };
};

export default useDataFetching;
