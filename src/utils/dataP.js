
const pacientes = [
    {
        id: 1,
        name: "Juan",
        lastname: "Pérez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "alto",
        last_login: "2024-05-05T08:30:00Z",
        Patologias: {
            "Alergias": "tiene",
            "Hospitalizacion Previa": "si",
            "Cirugias Previas": "ok",
        },
        noPatologias: {
            "Alergiassss": "tiene",
            "Hospitalizacionnn Previa": "si",
            "Cirugias Previasss": "ok",
        }
    },
    {
        id: 2,
        name: "María",
        lastname: "García",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "bajo",
        last_login: "2024-05-05T09:45:00Z"
    },
    {
        id: 3,
        name: "José",
        lastname: "Martínez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "medio",
        last_login: "2024-05-05T10:20:00Z"
    },
    {
        id: 4,
        name: "Ana",
        lastname: "Fernández",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "alto",
        last_login: "2024-05-05T10:55:00Z"
    },
    {
        id: 5,
        name: "Carlos",
        lastname: "López",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "bajo",
        last_login: "2024-05-05T11:30:00Z"
    },
    {
        id: 6,
        name: "Sofía",
        lastname: "Gómez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "alto",
        last_login: "2024-05-05T12:15:00Z"
    },
    {
        id: 7,
        name: "Pablo",
        lastname: "Rodríguez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "bajo",
        last_login: "2024-05-05T13:00:00Z"
    },
    {
        id: 8,
        name: "Laura",
        lastname: "Martín",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "medio",
        last_login: "2024-05-05T13:45:00Z"
    },
    {
        id: 9,
        name: "Diego",
        lastname: "Hernández",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "alto",
        last_login: "2024-05-05T14:30:00Z"
    },
    {
        id: 10,
        name: "Elena",
        lastname: "Díaz",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "bajo",
        last_login: "2024-05-05T15:15:00Z"
    },
    {
        id: 11,
        name: "Javier",
        lastname: "Sánchez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "medio",
        last_login: "2024-05-05T16:00:00Z"
    },
    {
        id: 12,
        name: "Paula",
        lastname: "Pérez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "alto",
        last_login: "2024-05-05T16:45:00Z"
    },
    {
        id: 13,
        name: "Alejandro",
        lastname: "García",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "bajo",
        last_login: "2024-05-05T17:30:00Z"
    },
    {
        id: 14,
        name: "Lucía",
        lastname: "Martínez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "medio",
        last_login: "2024-05-05T18:15:00Z"
    },
    {
        id: 15,
        name: "Manuel",
        lastname: "Fernández",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "alto",
        last_login: "2024-05-05T19:00:00Z"
    },
    {
        id: 16,
        name: "Carmen",
        lastname: "López",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "bajo",
        last_login: "2024-05-05T19:45:00Z"
    },
    {
        id: 17,
        name: "Gabriel",
        lastname: "Gómez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "medio",
        last_login: "2024-05-05T20:30:00Z"
    },
    {
        id: 18,
        name: "Sara",
        lastname: "Rodríguez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "alto",
        last_login: "2024-05-05T21:15:00Z"
    },
    {
        id: 19,
        name: "Daniel",
        lastname: "Martín",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "bajo",
        last_login: "2024-05-05T22:00:00Z"
    },
    {
        id: 20,
        name: "Eva",
        lastname: "Hernández",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "medio",
        last_login: "2024-05-05T22:45:00Z"
    },
    {
        id: 21,
        name: "Adrián",
        lastname: "Díaz",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "alto",
        last_login: "2024-05-05T23:30:00Z"
    },
    {
        id: 22,
        name: "Natalia",
        lastname: "Sánchez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "bajo",
        last_login: "2024-05-06T00:15:00Z"
    },
    {
        id: 23,
        name: "Miguel",
        lastname: "Pérez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "medio",
        last_login: "2024-05-06T01:00:00Z"
    },
    {
        id: 24,
        name: "Isabel",
        lastname: "García",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "alto",
        last_login: "2024-05-06T01:45:00Z"
    },
    {
        id: 25,
        name: "Hugo",
        lastname: "Martínez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "bajo",
        last_login: "2024-05-06T02:30:00Z"
    },
    {
        id: 26,
        name: "Valentina",
        lastname: "Fernández",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "medio",
        last_login: "2024-05-06T03:15:00Z"
    },
    {
        id: 27,
        name: "Luis",
        lastname: "López",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "alto",
        last_login: "2024-05-06T04:00:00Z"
    },
    {
        id: 28,
        name: "Camila",
        lastname: "Gómez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "bajo",
        last_login: "2024-05-06T04:45:00Z"
    },
    {
        id: 29,
        name: "Martín",
        lastname: "Rodríguez",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "medio",
        last_login: "2024-05-06T05:30:00Z"
    },
    {
        id: 30,
        name: "Lucía",
        lastname: "Martín",
        avatar: "https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg",
        risk: "alto",
        last_login: "2024-05-06T06:15:00Z"
    }
];



export default pacientes;
