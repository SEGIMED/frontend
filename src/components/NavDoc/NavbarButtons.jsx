import IconCube from "../icons/IconCube";
import IconDoctorNav from "../icons/IconDoctorNav";
import IconRecordNav from "../icons/IconRecordNav";
import IconMessageNav from "../icons/IconMessageNav";
import IconCalendarNav from "../icons/IconCalendarNav";
import Estadistica from "../icons/IconEstadistica";
import AlarmDash from "../icons/IconAlarmDash";
import IconPatientNav from "../icons/IconPatientNav";
import Sugerencias from "../icons/IconSugerencias";
import IconEducacion from "../icons/IconEducacion";
import IconPreConsulta from "../icons/iconPreconsulta";
import rutas from "@/utils/rutas";
import IconMedChat from "../icons/IconMedChat";
import IconClinicalHistory from "../icons/IconClinicalHistory";
import IconImportar from "../icons/IconImportar";
import Interconsulta from "../icons/IconInterconsulta";

export const buttonsDoc = [
  {
    buttons: [
      {
        name: "Tablero",
        path: rutas.Doctor,
        icon: IconCube,
      },
      {
        name: "Mi perfil",
        path: `${rutas.Doctor}${rutas.Mi_Perfil}`,
        icon: IconDoctorNav,
      },
      {
        name: "Consultas",
        path: `${rutas.Doctor}${rutas.Consultas}`,
        icon: IconRecordNav,
      },
      {
        name: "Chats",
        path: `${rutas.Doctor}${rutas.Mensajes}`,
        icon: IconMessageNav,
      },
      {
        name: "Mi Agenda",
        path: `${rutas.Doctor}${rutas.Mi_Agenda}`,
        icon: IconCalendarNav,
      },
      {
        name: "Estadísticas",
        path: `${rutas.Doctor}${rutas.Estadisticas}`,
        icon: Estadistica,
      },
      {
        name: "Alarmas",
        path: `${rutas.Doctor}${rutas.Alarm}`,
        icon: AlarmDash,
      },
      {
        name: "Interconsultas",
        path: `${rutas.Doctor}${rutas.Interconsultas}`,
        icon: Interconsulta,
      },
      {
        name: "Pacientes",
        path: `${rutas.Doctor}${rutas.Pacientes}`,
        icon: IconPatientNav,
      },
      {
        name: "Educación",
        path: `${rutas.Doctor}${rutas.Educacion}`,
        icon: IconEducacion,
      },
      {
        name: "Sugerencias",
        path: `${rutas.Doctor}${rutas.Sugerencias}`,
        icon: Sugerencias,
      },
    ],
  },
];

export const buttonsPaciente = [
  {
    buttons: [
      {
        name: "Tablero",
        path: rutas.PacienteDash,
        icon: IconCube,
      },
      {
        name: "Mi perfil",
        path: `${rutas.PacienteDash}${rutas.Mi_Perfil}`,
        icon: IconDoctorNav,
      },
      {
        name: "Preconsultas",
        path: `${rutas.PacienteDash}${rutas.Preconsulta}`,
        icon: IconPreConsulta,
      },
      {
        name: "Consultas",
        path: `${rutas.PacienteDash}${rutas.Historial}`,
        icon: IconRecordNav,
      },
      {
        name: "Chats",
        path: `${rutas.PacienteDash}${rutas.Mensajes}`,
        icon: IconMessageNav,
      },
      {
        name: "Mi Agenda",
        path: `${rutas.PacienteDash}${rutas.Citas}`,
        icon: IconCalendarNav,
      },
      {
        name: "Médicos",
        path: `${rutas.PacienteDash}${rutas.Doctores}`,
        icon: IconPatientNav,
      },
      {
        name: "Alarmas",
        path: `${rutas.PacienteDash}${rutas.Alarm}`,
        icon: AlarmDash,
      },
      {
        name: "Sugerencias",
        path: `${rutas.PacienteDash}${rutas.Sugerencias}`,
        icon: Sugerencias,
      },
    ],
  },
];

export const buttonsAdmin = [
  {
    buttons: [
      {
        name: "Tablero",
        path: rutas.Admin,
        icon: IconCube,
      },
      {
        name: "Estadísticas",
        path: `${rutas.Admin}${rutas.Estadisticas}`,
        icon: Estadistica,
      },
      {
        name: "Médicos",
        path: `${rutas.Admin}${rutas.Doctores}`,
        icon: IconMedChat,
      },
      {
        name: "Pacientes",
        path: `${rutas.Admin}${rutas.Pacientes}`,
        icon: IconDoctorNav,
      },
      {
        name: "Data Entries",
        path: `${rutas.Admin}${rutas.DataEntries}`,
        icon: IconPatientNav,
      },
      {
        name: "Errores",
        path: `${rutas.Admin}${rutas.Errores}`,
        icon: IconPreConsulta,
      },
      {
        name: "Sugerencias",
        path: `${rutas.Admin}${rutas.Sugerencias}`,
        icon: Sugerencias,
      },
    ],
  },
];

export const buttonsEntries = [
  {
    title: "Inicio",
    buttons: [
      {
        name: "Tablero",
        path: rutas.Entries,
        icon: IconCube,
      },
    ],
  },
  {
    title: "Usuarios",
    buttons: [
      {
        name: "Pacientes",
        path: `${rutas.Entries}${rutas.Pacientes}`,
        icon: IconDoctorNav,
      },
      {
        name: "Médicos",
        path: `${rutas.Entries}${rutas.Doctores}`,
        icon: IconMedChat,
      },
    ],
  },
  {
    title: "Otros",
    buttons: [
      {
        name: "Alarmas",
        path: `${rutas.Entries}${rutas.Alarm}`,
        icon: AlarmDash,
      },
      {
        name: "Importaciones",
        path: `${rutas.Entries}${rutas.Importaciones}`,
        icon: IconImportar,
      },
      {
        name: "Estudios",
        path: `${rutas.Entries}${rutas.Estudios}`,
        icon: IconClinicalHistory,
      },
    ],
  },
];
