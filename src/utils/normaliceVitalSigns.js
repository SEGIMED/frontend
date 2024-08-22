export const IMC = (peso, tallaEnCm) => {
    if (peso > 0 && tallaEnCm > 0) {
      const tallaEnMetros = Number(tallaEnCm) / 100; // Convertir altura de cm a metros
      return (Number(peso) / (tallaEnMetros * tallaEnMetros)).toFixed(1); // Calcular IMC
    }
    return null; // Retornar null si los valores son inválidos
  };