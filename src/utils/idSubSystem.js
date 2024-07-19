const IdSubSystem = (subSystemText) => {
    switch (subSystemText) {
      case 'Sistema Cardiovascular':
        return 1;
      case 'Sistema Respiratorio':
        return 2;
      case 'Sistema Neurológico':
        return 3;
      case 'Sistema Digestivo':
        return 4;
      case 'Sistema Osteomuscular':
        return 5;
      case 'Sistema Endocrino':
        return 6;
      case 'Sistema Reproductor y Urológico':
        return 7;
      case 'Sistema Oftalmológico':
        return 8;
      case 'ORL':
        return 9;
      case 'Piel y Faneras':
        return 10;
      case 'Otros':
        return 11;
      default:
        return 0;
    }
  };

  export default IdSubSystem
// 'Sistema Cardiovascular', 'Sistema Respiratorio', 'Sistema Neurológico', 'Sistema Digestivo', 'Sistema Osteomuscular', 'Sistema Endocrino', 'Sistema Reproductor y Urológico', 'Sistema Oftalmológico', 'ORL', 'Piel y Faneras', 'Otros'