const IdRiskCardiovascular = (riskText) => {
    switch (riskText) {
      case 'Bajo':
        return 1;
      case 'Moderado':
        return 2;
      case 'Alto':
        return 3;
      case 'Muy Alto':
        return 4;
    }
  };

  export default IdRiskCardiovascular