export function healthCenterSwitch(caseNumber) {
  const switchCases = {
    1: "Centro Gallego",
  };

  return switchCases[caseNumber] || "Centro Desconocido";
}

const formatPatientName = (row) => {
  return `${row.patientUser.name} ${row.patientUser.lastname}`;
};
