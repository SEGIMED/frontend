const IdRiskSurgical = (riskText) => {
    switch (riskText) {
      case 'Bajo':
        return 1;
      case 'Moderado':
        return 2;
      case 'Alto':
        return 3;
    }
  };

  export default IdRiskSurgical