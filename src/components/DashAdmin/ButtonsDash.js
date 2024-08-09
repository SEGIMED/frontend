import IconAdminButtons from "../icons/iconDashAdminButtons";
import IconDashAgenda from "../icons/IconDashAgenda";
import IconHomeCitas from "../icons/inconDashHomeCitas";
import Estadistica from "../icons/IconEstadistica";
import rutas from "@/utils/rutas";
import IconDoctorNav from "../icons/IconDoctorNav";
import IconMedChat from "../icons/IconMedChat";

export const buttonsDashAdmin = [
    {
        href: `${rutas.Admin}${rutas.Estadisticas}`,
        icon: Estadistica,
        text: "Estadísticas",
    },
    {
        href: `${rutas.Admin}${rutas.Pacientes}`,
        icon: IconDoctorNav,
        text: "Pacientes",
    },
    {
        href: `${rutas.Admin}${rutas.Doctores}`,
        icon: IconMedChat,
        text: "Médicos"
    },
    {
        href: `${rutas.Admin}${rutas.DataEntries}`,
        icon: IconDashAgenda,
        text: "Data Entries",
    },

];
