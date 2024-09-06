export function healthCenterSwitch(caseNumber) {
  const switchCases = {
    1: "Centro Gallego",
    2: "Sanatorio de la Trinidad Quilmes",
    3: "Sanatorio de la Trinidad Ramos Mejía",
    4: "Sanatorio Dupuytren",
    7: "Sanatorio Mater Dei",
    8: "Hospital Municipal de Rehabilitación Respiratoria María Ferrer"
  };

  return switchCases[caseNumber] || "Centro Desconocido";
}

const formatPatientName = (row) => {
  return `${row.patientUser.name} ${row.patientUser.lastname}`;
};
