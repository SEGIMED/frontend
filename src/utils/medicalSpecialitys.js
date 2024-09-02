export function specialitySwitch(caseNumber) {
  const switchCases = {
    1: "Cardiología",
    2: "Medicina Interna",
    3: "Medicina Familiar",
    4: "Neumología",
    5: "Cirugía de Tórax",
    6: "Cirugía Cardiovascular",
  };

  return switchCases[caseNumber] || "No hay especialización";
}
