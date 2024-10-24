import { useAppDispatch } from "@/redux/hooks";
import Cookies from "js-cookie";
import { addNotifications } from "@/redux/slices/user/notifications";
import Swal from "sweetalert2";
import { addAlarms } from "@/redux/slices/alarms/alarms";
import { addActivePtes } from "@/redux/slices/activePtes/activePtes";
import { addSchedules } from "@/redux/slices/doctor/schedules";
import { setAllPatients } from "@/redux/slices/doctor/allPatients";
import { adduser } from "@/redux/slices/user/user";
import { ApiSegimed } from "@/Api/ApiSegimed";
import { addAlarmsChatbot } from "@/redux/slices/chat/chatBot";

const useDataFetching = () => {
  const dispatch = useAppDispatch();
  const id = Cookies.get("c");

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

      const actives = response.data?.filter(
        (alarm) => alarm.solved === false
      ).length;
      const inactives = response.data?.filter(
        (alarm) => alarm.solved === true
      ).length;
      const lowAlarms = response.data?.filter(
        (alarm) => alarm.ia_priority === "Baja"
      ).length;
      const mediumAlarms = response.data?.filter(
        (alarm) => alarm.ia_priority === "Media"
      ).length;
      const highAlarms = response.data?.filter(
        (alarm) => alarm.ia_priority === "Alta"
      ).length;
      const data = {
        activeAlarms: Number(actives),
        inactiveAlarms: Number(inactives),
        lowAlarms: lowAlarms,
        mediumAlarms: mediumAlarms,
        highAlarms: highAlarms,
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
    const response = await ApiSegimed.get(`/profile`, headers);
    if (response.data) {
      dispatch(adduser(response.data));
    }
  };
  const getAlarms = async () => {
    try {
      const response = await ApiSegimed.get(`/alarms-by-patient/`);
      if (response.data) {
        const activeAlarms = response?.data?.filter((alarma) => !alarma.solved);
        dispatch(addAlarmsChatbot(activeAlarms));
      }
    } catch (error) {
      console.error("Error fetching alarms:", error);
    }
  };
  return {
    getActivesPacientesDoctor,
    getActivesAlarmsDoctor,
    getSchedulesDoctor,
    getDoctorNotifications,
    getPatientsDoctor,
    getUserDoctor,
    getAlarms,
  };
};

export default useDataFetching;
