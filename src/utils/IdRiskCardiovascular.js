const IdRiskCardiovascular = (riskText) => {
    switch (riskText) {
      case 'Bajo':
        return 1;
      case 'Moderado':
        return 2;
      case 'Alto':
        return 3;
      case 'Muy alto':
        return 4;
    }
  };

  export default IdRiskCardiovascular