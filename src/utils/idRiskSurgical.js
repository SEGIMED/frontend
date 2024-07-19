const IdRiskSurgical = (riskText) => {
    switch (riskText) {
      case 'Bajo':
        return 2;
      case 'Moderado':
        return 3;
      case 'Alto':
        return 4;
    }
  };

  export default IdRiskSurgical