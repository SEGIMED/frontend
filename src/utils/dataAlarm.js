const anthropometricDetails = [
    {
        "measure": "165",
        "measureDate": "2024-05-21T22:26:59.045Z",
        "measureSource": "Juan Perez",
        "measureType": "Talla",
        "measureUnit": "Cm"
    },
    {
        "measure": "70",
        "measureDate": "2024-05-21T22:26:59.045Z",
        "measureSource": "Juan Perez",
        "measureType": "Peso",
        "measureUnit": "Kg"
    },
    {
        "measure": "98",
        "measureDate": "2024-05-21T22:26:59.045Z",
        "measureSource": "Juan Perez",
        "measureType": "Perímetro Abdominal",
        "measureUnit": "Cm"
    },
    {
        "measure": "30",
        "measureDate": "2024-05-28T00:50:59.000Z",
        "measureSource": "Nataly Revelo",
        "measureType": "IMC",
        "measureUnit": "Kg/m²"
    }
];

const vitalSigns = [
    {
        "measure": "37.5",
        "measureSource": "Juan Perez",
        "measureType": "Temperatura",
        "measureUnit": "°C",
        "measureTimestamp": "2024-05-26T23:15:39.339Z"
    },
    {
        "measure": "126",
        "measureSource": "Juan Perez",
        "measureType": "Presión Arterial Sistólica",
        "measureUnit": "mmHg",
        "measureTimestamp": "2024-05-21T23:15:39.339Z"
    },
    {
        "measure": "88",
        "measureSource": "Juan Perez",
        "measureType": "Presión Arterial Diastólica",
        "measureUnit": "mmHg",
        "measureTimestamp": "2024-05-21T23:15:39.339Z"
    },
    {
        "measure": "20",
        "measureSource": "Juan Perez",
        "measureType": "Frecuencia Respiratoria",
        "measureUnit": "rpm",
        "measureTimestamp": "2024-05-21T23:15:39.339Z"
    },
    {
        "measure": "93",
        "measureSource": "Nataly Revelo",
        "measureType": "Saturación de Oxígeno",
        "measureUnit": "%",
        "measureTimestamp": "2024-06-14T17:13:29.000Z"
    },
    {
        "measure": "68",
        "measureSource": "Nataly Revelo",
        "measureType": "Frecuencia Cardiaca",
        "measureUnit": "bpm",
        "measureTimestamp": "2024-06-14T17:13:29.000Z"
    }
];

const pacientesAlarm = [
    {
        id: 1,
        status: 'activo',
        name: 'Ana',
        lastname: 'García',
        motivo: 'Consulta general',
        fecha: '2024-06-13',
        hora: '10:00',
        prioridad: 'Alta',
        HTP: 3,
        lugar: 'Centro Médico ABC',
        medico: 'Dr. José Pérez',
        descripcion: 'Consulta inicial para evaluar el estado de salud general.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 2,
        status: 'inactivo',
        name: 'Juan',
        lastname: 'López',
        motivo: 'Examen físico anual',
        fecha: '2024-06-14',
        hora: '11:30',
        prioridad: 'Media',
        HTP: 1,
        lugar: 'Hospital General XYZ',
        medico: 'Dra. María González',
        descripcion: 'Examen físico rutinario para verificar signos vitales y condición física.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 3,
        status: 'inactivo',
        name: 'María',
        lastname: 'Martínez',
        motivo: 'Control de presión arterial',
        fecha: '2024-06-14',
        hora: '15:00',
        prioridad: 'Baja',
        HTP: 2,
        lugar: 'Clínica San José',
        medico: 'Dr. Carlos López',
        descripcion: 'Seguimiento de los niveles de presión arterial y ajustes en medicación.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 4,
        status: 'inactivo',
        name: 'Pedro',
        lastname: 'Sánchez',
        motivo: 'Vacunación',
        fecha: '2024-06-15',
        hora: '09:30',
        prioridad: 'Alta',
        HTP: 4,
        lugar: 'Hospital del Norte',
        medico: 'Dra. Ana Ruiz',
        descripcion: 'Administración de vacuna según el calendario de vacunación.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 5,
        status: 'inactivo',
        name: 'Laura',
        lastname: 'Hernández',
        motivo: 'Consulta por dolor abdominal',
        fecha: '2024-06-15',
        hora: '14:00',
        prioridad: 'Media',
        HTP: 5,
        lugar: 'Centro de Salud Santa María',
        medico: 'Dr. Juan Martínez',
        descripcion: 'Evaluación de dolor abdominal persistente y posible diagnóstico.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 6,
        status: 'inactivo',
        name: 'Carlos',
        lastname: 'Gómez',
        motivo: 'Control de diabetes',
        fecha: '2024-06-16',
        hora: '10:30',
        prioridad: 'Baja',
        HTP: 2,
        lugar: 'Clínica Los Ángeles',
        medico: 'Dra. Laura Sánchez',
        descripcion: 'Revisión de niveles de glucosa y ajustes en el plan de tratamiento.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 7,
        status: 'activo',
        name: 'Lucía',
        lastname: 'Rodríguez',
        motivo: 'Revisión de tratamiento',
        fecha: '2024-06-16',
        hora: '16:00',
        prioridad: 'Alta',
        HTP: 1,
        lugar: 'Centro Médico del Sur',
        medico: 'Dr. Fernando Ortega',
        descripcion: 'Evaluación de la efectividad del tratamiento actual y posibles cambios.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 8,
        status: 'activo',
        name: 'Jorge',
        lastname: 'Pérez',
        motivo: 'Consulta odontológica',
        fecha: '2024-06-17',
        hora: '08:45',
        prioridad: 'Media',
        HTP: 3,
        lugar: 'Hospital Universitario',
        medico: 'Dra. Isabel Torres',
        descripcion: 'Revisión dental de rutina y limpieza profesional.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 9,
        status: 'activo',
        name: 'Marina',
        lastname: 'Díaz',
        motivo: 'Control de embarazo',
        fecha: '2024-06-17',
        hora: '12:15',
        prioridad: 'Baja',
        HTP: 4,
        lugar: 'Clínica La Esperanza',
        medico: 'Dr. Pablo Romero',
        descripcion: 'Seguimiento prenatal para monitorear el desarrollo del embarazo.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 10,
        status: 'activo',
        name: 'Miguel',
        lastname: 'Fernández',
        motivo: 'Consulta pediátrica',
        fecha: '2024-06-18',
        hora: '11:00',
        prioridad: 'Alta',
        HTP: 5,
        lugar: 'Centro de Especialidades Médicas',
        medico: 'Dra. Patricia García',
        descripcion: 'Evaluación de la salud general del niño y asesoramiento a los padres.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 11,
        status: 'activo',
        name: 'Sofía',
        lastname: 'González',
        motivo: 'Examen de laboratorio',
        fecha: '2024-06-18',
        hora: '15:30',
        prioridad: 'Media',
        HTP: 2,
        lugar: 'Hospital Regional',
        medico: 'Dr. Jorge Fernández',
        descripcion: 'Realización de análisis de sangre y otros exámenes de laboratorio.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 12,
        status: 'activo',
        name: 'Alejandro',
        lastname: 'Ramírez',
        motivo: 'Consulta de dermatología',
        fecha: '2024-06-19',
        hora: '09:00',
        prioridad: 'Baja',
        HTP: 1,
        lugar: 'Clínica Familiar',
        medico: 'Dra. Silvia Moreno',
        descripcion: 'Evaluación y tratamiento de problemas de la piel.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 13,
        status: 'inactivo',
        name: 'Valentina',
        lastname: 'Silva',
        motivo: 'Seguimiento de fractura',
        fecha: '2024-06-19',
        hora: '13:45',
        prioridad: 'Alta',
        HTP: 4,
        lugar: 'Centro de Salud Integral',
        medico: 'Dr. Eduardo Herrera',
        descripcion: 'Revisión de la recuperación de la fractura y terapia física.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 14,
        status: 'activo',
        name: 'Diego',
        lastname: 'Torres',
        motivo: 'Consulta psicológica',
        fecha: '2024-06-20',
        hora: '10:45',
        prioridad: 'Media',
        HTP: 3,
        lugar: 'Clínica Buen Samaritano',
        medico: 'Dra. Marta López',
        descripcion: 'Sesión de terapia psicológica para tratar ansiedad y estrés.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    },
    {
        id: 15,
        status: 'activo',
        name: 'Carmen',
        lastname: 'Ortega',
        motivo: 'Control de hipertensión',
        fecha: '2024-06-20',
        hora: '14:15',
        prioridad: 'Baja',
        HTP: 5,
        lugar: 'Hospital de la Ciudad',
        medico: 'Dr. Luis Martínez',
        descripcion: 'Monitoreo de la presión arterial y ajuste de medicación.',
        anthropometricDetails: anthropometricDetails,
        vitalSigns: vitalSigns
    }
];

export default pacientesAlarm;