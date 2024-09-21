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
import { IconAntecedentes } from "../InicioPaciente/IconAntecedentes";

export const buttonsDoc = [
  {
    buttons: [
      {
        id: "dashboard",
        name: "Tablero",
        path: rutas.Doctor,
        icon: IconCube,
        content: "Este es el Tablero donde puedes ver un resumen general de tu actividad y notificaciones importantes."
      },
      {
        id: "profile",
        name: "Mi perfil",
        path: `${rutas.Doctor}${rutas.Mi_Perfil}`,
        icon: IconDoctorNav,
        content: "Aquí puedes ver y editar tu perfil, incluyendo tus datos personales."
      },
      {
        id: "consultations",
        name: "Consultas",
        path: `${rutas.Doctor}${rutas.Consultas}`,
        icon: IconRecordNav,
        content: "En esta sección podrás gestionar y revisar tus consultas programadas."
      },
      {
        id: "chats",
        name: "Chats",
        path: `${rutas.Doctor}${rutas.Mensajes}`,
        icon: IconMessageNav,
        content: "Aquí puedes comunicarte con tus pacientes y otros medicos a través de mensajes y mantener un registro de tus conversaciones."
      },
      {
        id: "agenda",
        name: "Mi Agenda",
        path: `${rutas.Doctor}${rutas.Mi_Agenda}`,
        icon: IconCalendarNav,
        content: "Consulta y gestiona tu agenda para ver y organizar tus citas."
      },
      {
        id: "statistics",
        name: "Estadísticas",
        path: `${rutas.Doctor}${rutas.Estadisticas}`,
        icon: Estadistica,
        content: "Revisa las estadísticas generales y otras métricas relevantes para tu práctica."
      },
      {
        id: "alerts",
        name: "Alarmas",
        path: `${rutas.Doctor}${rutas.Alarm}`,
        icon: AlarmDash,
        content: "Aquí puedes ver y gestionar las alarmas creadas por los pacientes."
      },
      {
        id: "interconsultations",
        name: "Interconsultas",
        path: `${rutas.Doctor}${rutas.Interconsultas}`,
        icon: Interconsulta,
        content: "Gestiona y revisa las interconsultas que has realizado o recibido."
      },
      {
        id: "patients",
        name: "Pacientes",
        path: `${rutas.Doctor}${rutas.Pacientes}`,
        icon: IconPatientNav,
        content: "En esta sección encontrarás la información detallada de tus pacientes y su historial médico."
      },
      {
        id: "education",
        name: "Educación",
        path: `${rutas.Doctor}${rutas.Educacion}`,
        icon: IconEducacion,
        content: "Accede a recursos educativos y materiales de formación para mejorar tus conocimientos y habilidades."
      },
      {
        id: "suggestions",
        name: "Sugerencias",
        path: `${rutas.Doctor}${rutas.Sugerencias}`,
        icon: Sugerencias,
        content: "Aquí puedes enviarnos sugerencias y comentarios para mejorar nuestro servicio."
      },
    ],
  },
];


export const buttonsPaciente = [
  {
    buttons: [
      {
        id: "dashboard",
        name: "Tablero",
        path: rutas.PacienteDash,
        icon: IconCube,
        content: "Este es el Tablero donde puedes ver un resumen general de tu actividad."
      },
      {
        id: "profile",
        name: "Mi perfil",
        path: `${rutas.PacienteDash}${rutas.Mi_Perfil}`,
        icon: IconDoctorNav,
        content: "Aquí puedes ver y editar tu perfil, incluyendo tus datos personales."
      },
      {
        id: "clinical-history",
        name: "Historia Clinica",
        path: `${rutas.PacienteDash}${rutas.Antecedentes}`,
        icon: IconAntecedentes,
        content: "Consulta tu historial clínico para revisar tus antecedentes médicos y otra información relevante."
      },
      {
        id: "pre-consultations",
        name: "Preconsultas",
        path: `${rutas.PacienteDash}${rutas.Preconsulta}`,
        icon: IconPreConsulta,
        content: "En esta sección puedes revisar y gestionar las preconsultas que has realizado."
      },
      {
        id: "consultations",
        name: "Consultas",
        path: `${rutas.PacienteDash}${rutas.Historial}`,
        icon: IconRecordNav,
        content: "Aquí puedes gestionar y revisar tu historial de consultas médicas."
      },
      {
        id: "chats",
        name: "Chats",
        path: `${rutas.PacienteDash}${rutas.Mensajes}`,
        icon: IconMessageNav,
        content: "Comunícate con tus médicos a través de mensajes y mantén un registro de tus conversaciones."
      },
      {
        id: "agenda",
        name: "Mi Agenda",
        path: `${rutas.PacienteDash}${rutas.Citas}`,
        icon: IconCalendarNav,
        content: "Consulta y organiza tus citas y compromisos médicos en tu agenda."
      },
      {
        id: "doctors",
        name: "Médicos",
        path: `${rutas.PacienteDash}${rutas.Doctores}`,
        icon: IconPatientNav,
        content: "Encuentra y revisa la información de los médicos disponibles para ti para gestionar una consulta."
      },
      {
        id: "alerts",
        name: "Alarmas",
        path: `${rutas.PacienteDash}${rutas.Alarm}`,
        icon: AlarmDash,
        content: "Aquí puedes ver y gestionar las alarmas y notificaciones relacionadas con tu actividad."
      },
      {
        id: "suggestions",
        name: "Sugerencias",
        path: `${rutas.PacienteDash}${rutas.Sugerencias}`,
        icon: Sugerencias,
        content: "Envía tus sugerencias y comentarios para mejorar nuestro servicio."
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
