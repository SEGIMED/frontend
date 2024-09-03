const IdRiskSurgical = (riskText) => {
  switch (riskText) {
    case 'Bajo':
      return 1;
    case 'Moderado':
      return 2;
    case 'Alto':
      return 3;
    default:
      return null; // Maneja valores no esperados
  }
};

export default IdRiskSurgical;
