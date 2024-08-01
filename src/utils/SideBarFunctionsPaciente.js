

const getAllDoc = async (headers) => {
    const response = await ApiSegimed.get("/all-physicians", headers);
    if (response.data) {
        dispatch(getAllDoctores(response.data));
    }
};

const getUser = async (headers) => {
    const response1 = await ApiSegimed.get(
        `/patient-details?id=${id}`,
        headers
    );
    const response2 = await ApiSegimed.get(`/patient/${id}`, headers);
    const combinedData = {
        ...response1.data,
        ...response2.data,
    };
    dispatch(adduser(combinedData));
    console.log(combinedData);
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
    const lon = position.coords.longitude;
    setLatitud(lat);
    setLongitud(lon);
    enviarUbicacion(lat, lon); // Llama a la función para enviar la ubicación al servidor
};

const mostrarError = (error) => {
    console.error("Error al obtener la ubicación:", error);
};

const enviarUbicacion = async (lat, lon) => {
    try {
        const headers = { headers: { token: token } };
        const body = {
            geolocation: JSON.stringify([lat, lon]),
            patientId: Number(id),
        };

        const response = await ApiSegimed.patch(
            "/update-full-patient",
            body,
            headers
        );
    } catch (error) {
        console.error("Error de red:", error);
    }
};

const getSchedules = async (headers) => {
    const userId = Number(id);
    try {
        const response = await ApiSegimed.get(
            `/schedules?patientId=${userId}`,
            headers
        );

        if (response.data) {
            dispatch(addSchedules(response.data));
        }
    } catch (error) {
        console.error(error);
    }
};

const getPatientNotifications = async (headers) => {
    try {
        const response = await ApiSegimed.get(
            `/all-notifications-patient?patientId=` + id,
            headers
        );

        if (response.data) {
            dispatch(addNotifications(response.data));
        }
    } catch (error) {
        console.error(error);
    }
};

