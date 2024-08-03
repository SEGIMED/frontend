export const mapBoolean = (obj) => {
    const mappedObj = {};
    for (const key in obj) {
        if (obj[key] === "Si") {
            mappedObj[key] = true;
        } else if (obj[key] === "No") {
            mappedObj[key] = false;
        } else {
            mappedObj[key] = obj[key];
        }
    }
    return mappedObj;
};

const reversePainAreaMap = {
    "Trapecio": 1,
    "Espalda Superior": 2,
    "Espalda Inferior": 3,
    "Pecho": 4,
    "Bíceps": 5,
    "Tríceps": 6,
    "Antebrazo": 7,
    "Deltoides Posterior": 8,
    "Deltoides Anterior": 9,
    "Abdominales": 10,
    "Oblicuos": 11,
    "Aductores": 12,
    "Isquiotibiales": 13,
    "Cuádriceps": 14,
    "Abductores": 15,
    "Pantorrillas": 16,
    "Glúteos": 17,
    "Rodillas": 18,
    "Sóleo Derecho": 19,
    "Sóleo Izquierdo": 20,
    "Cabeza": 21,
    "Cuello": 22
};

export const mapPainAreas = ({ data, formStateGlobal }) => {
    if (!Array.isArray(formStateGlobal.painAreas)) {
        return [{
            painArea: "",
            painNotes: ""
        }]
    }

    return formStateGlobal.painAreas.map(painAreaSpanish => {
        const painAreaId = reversePainAreaMap[painAreaSpanish];
        const painNotes = data[painAreaSpanish];

        return {
            painArea: painAreaId,
            painNotes: painNotes
        };
    });
};



