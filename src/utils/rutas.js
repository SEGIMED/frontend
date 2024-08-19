// // const Dash="/Dashboard"
const Inicio = (role) => {
  if (role === "Paciente") {
    return "/Dashboard/Inicio_Paciente";
  } else {
    return "/Dashboard/Inicio_Doctor";
  }
};

const Doctor = "/Dashboard/Inicio_Doctor";
const PacienteDash = "/Dashboard/Inicio_Paciente";
const Admin = "/Dashboard/Inicio_Admin";
const PacienteDash2 = "/Dashboard/Inicio_Paciente2";
const Entries = "/Dashboard/Inicio_Entries";

const Educacion = "/Educacion";
const Alarm = "/Alarmas";
const Mi_Agenda = "/Mi_Agenda";
const Consultas = "/Consultas";
const Estadisticas = "/Estadisticas";
const Historial = "/Consultas";
const Interconsultas = "/Interconsultas";
const Mensajes = "/Mensajes";
const Mi_Perfil = "/Mi_perfil";
const Pacientes = "/Pacientes";
const Soporte_tecnico = "/Soporte_tecnico";
const Sugerencias = "/Sugerencias";
const Historia_Clinica = "/Historia_Clinica";
const Doctores = "/Doctores";
const Tratamientos = "/Tratamientos";
const Configuracion = "/Configuracion";
const resueltas = "/Resueltas";
const Preconsulta = "/Preconsulta";
const Anamnesis = "/Anamnesis";
const Evaluacion = "/Evaluacion";
const Evoluciones = "/Evoluciones";
const Datos = "/Datos";
const Teleconsulta = "/Teleconsulta";
const SignosVitales = "/Signos_Vitales";
const ExamenFisico = "/Examen_Fisico";
const Diagnostico = "/Diagnostico";
const Mis_turnos = "/Mis_turnos";
const Pasadas = "/Pasadas";
const Ordenes = "/Ordenes_Medicas";
const Generar = "/Generar_Orden";
const Antecedentes = "/Antecedentes";
const CrearMensaje = "/crearMensaje";
const Pendientes = "/Pendientes";
const DataEntries = "/Data_Entries";
const Errores = "/Errores";
const Estudios = "/Estudios";
const Importaciones = "/Importaciones";
const Agenda_General = "/Agenda_General";
const rutas = {
  Estudios,
  Importaciones,
  Educacion,
  Inicio,
  Agenda_General,
  Errores,
  DataEntries,
  Pendientes,
  Antecedentes,
  Diagnostico,
  ExamenFisico,
  SignosVitales,
  Datos,
  Anamnesis,
  Evaluacion,
  Generar,
  Ordenes,
  Evoluciones,
  resueltas,
  Doctor,
  PacienteDash,
  PacienteDash2,
  Admin,
  Alarm,
  Mi_Agenda,
  Consultas,
  Estadisticas,
  Historial,
  Interconsultas,
  Mensajes,
  Mi_Perfil,
  Pacientes,
  Soporte_tecnico,
  Sugerencias,
  Historia_Clinica,
  Doctores,
  Tratamientos,
  Configuracion,
  Preconsulta,
  Teleconsulta,
  Mis_turnos,
  Pasadas,
  CrearMensaje,
  Entries,
};

export default rutas;
