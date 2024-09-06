import { ApiSegimed } from "@/Api/ApiSegimed";

let catalog = {}; // Variable global para almacenar el catálogo

// Función para obtener el catálogo
const getCatalog = async () => {
  try {
    const response = await ApiSegimed.get("/catalog/get-catalog?catalogName=center_att");
    if (response.data) {
      catalog = response.data.reduce((acc, item) => {
        acc[item.id] = item.name;
        return acc;
      }, {});
    }
  } catch (error) {
    console.error(error);
  }
};

// Función para obtener el nombre del centro de salud
export function healthCenterSwitch(caseNumber) {
  if (Object.keys(catalog).length === 0) {
    throw new Error("Catalog not loaded yet");
  }
  return catalog[caseNumber] || "Centro Desconocido";
}

const formatPatientName = (row) => {
  return `${row.patientUser.name} ${row.patientUser.lastname}`;
}

// Llamar a getCatalog para asegurarse de que el catálogo está cargado
getCatalog();