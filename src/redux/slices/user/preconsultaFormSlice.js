import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    questions: {
      lackOfAir: {
        title: "¿Tiene falta de aire (Disnea)?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: '',
        subquestions: {
          lackOfAirIncremented: {
            title: "Se ha incrementado en las últimas:",
            display: 'row',
            selectedOption: null,
            options: [
              { label: "Horas" },
              { label: "Días" },
              { label: "Semanas" },
            ],
          },
          lackOfAirClasification: {
            title: "Califique su falta de aire",
            selectedOption: null,
            orientation: "column",
            options: [
              {
                label: "Puedo caminar a paso rápido más de 10 cuadras sin parar.",
              },
              {
                label: "Puedo caminar a paso rápido menos de 5 cuadras sin parar.",
              },
              {
                label: "No puedo caminar más de 3 cuadras, solo realizo tareas domésticas, uso oxígeno eventualmente.",
              },
              {
                label: "No puedo caminar ni una cuadra, tampoco realizar tareas domésticas con normalidad, me hace falta el aire aunque esté en reposo, uso oxígeno todo el tiempo.",
              },
            ],
          },
        },
      },
      chestPainAtRest: {
        title: "¿Tiene dolor de pecho en reposo?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: '',
      },
      chestPainOnExertion: {
        title: "¿Tiene dolor de pecho al hacer esfuerzos físicos?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: '',
        subquestions: {
          chestPainOnExertionAmount: {
            selectedOption: null,
            options: [
              { label: "Con poco esfuerzo físico" },
              { label: "Con esfuerzo físico moderado" },
              { label: "Con esfuerzo físico intenso" },
            ],
          }
        }
      },
      edemaPresence: {
        title: "¿Ha notado edemas (hinchazón) o aumento del edema previo?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: '',
        subquestions: {
          edemaPresenceDescription: {
            selectedOption: null,
            options: [
              { label: "Hinchazón en los pies" },
              { label: "Hinchazón por debajo de las rodillas" },
              { label: "Hinchazón de las rodillas a la cadera" },
              { label: "Hinchazón general" },
            ],
          }
        }
      },
      feelings: {
        title: "¿Cómo se encuentra el día de hoy?",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showRowOptions: true,
        description: '',
        options: [
          { label: "Mal" },
          { label: "Regular" },
          { label: "Normal" },
          { label: "Bien" },
        ],
      },
      healthChanges: {
        title: "¿Ha notado algún cambio en su salud?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        showTextInput: true,
        description: '',
        // healthChangesDescription: ''
      },
      healthWorsened: {
        title: "Siente que su salud se ha empeorado en las últimas:",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showRowOptions: true,
        description: '',
        options: [
          { label: "Horas" },
          { label: "Días" },
          { label: "Semanas" },
          { label: "No empeoró" },
        ],
      },
      bodyPain: {
        title: "¿Tiene alguna dolencia en su cuerpo?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: '',
      },
      mentalHealthAffected: {
        title: "¿Su salud mental está afectada?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        showTextInput: true,
        description: '',
        // mentalHealthAffectedDescription: ''
      },
      energyStatus: {
        title: "Califique su estado de energía - Fatiga",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showSlider: true,
        description: '',
      },
      feed: {
        title: "Califique su alimentación",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showRowOptions: true,
        description: '',
        options: [
          { label: "Nada saludable" },
          { label: "Poco saludable" },
          { label: "Saludable" },
          { label: "Muy saludable" },
        ],
      },
      hydrationStatus: {
        title: "Califique su hidratación diaria (todos los líquidos ingeridos)",
        active: true,
        binaryOptions: false,
        selectedOption: null,
        description: '',
        options: [
          { label: "Poca ingesta < de 1.5 litros (menos de 5 vasos aprox.) " },
          { label: "Normal 1.5 a 2 litros (5 a 8 vasos aprox.)" },
          { label: "Mucha ingesta > a 2.5 litros (> de 8 vasos aprox.)" },
        ],
      },
      urineStatus: {
        title: "Califique su estado de orina (diuresis)",
        active: true,
        binaryOptions: false,
        selectedOption: null,
        description: '',
        options: [
          { label: "Orino normal (entre 500 ml y 1 litro al día)" },
          { label: "He notado una disminución del 50% o menos de 1 litro al día" },
          { label: "Orino poco (menos de medio litro o 500 ml al día)" },
          { label: "Casi nada (menos de 1 vaso al día)" },
          { label: "Nada" },
        ],
      },
      exerciseStatus: {
        title: "Califique su estado de ejercicio físico",
        active: true,
        binaryOptions: false,
        selectedOption: null,
        description: '',
        options: [
          { label: "Ninguno: no puedo, no quiero, no recomendado por el médico, contraindicado." },
          { label: "Bajo: camino poco, realizo tareas domésticas, trabajo con poca actividad física. Camino menos de 10 mil pasos al día o menos de 7.5 km día." },
          { label: "Moderado: Camino más de 10 mil pasos o 7.5 km al día. Al menos 150 minutos de actividad física a la semana (caminar, trotar, nadar, yoga, baile, pesas, bicicleta, etc.)" },
          { label: "Intenso: Más de 150 minutos a la semana de actividad intensa o más de 300 minutos de actividad moderada. (Deportista aficionado, bien entrenado o competidor)" },
        ],
      },
    },
    vitalSigns: {
      height: {
        cat: "antrophometric",
        medicalEventId: null,
        measureType: 4,
        measure: null,
        key: "Talla",
        label: "Estatura",
        unit: "cm",
        referenceValue: 180,
      },
      weight: {
        cat: "antrophometric",
        medicalEventId: null,
        measureType: 5,
        measure: null,
        key: "Peso",
        label: "Peso",
        unit: "kg",
        referenceValue: 76,
      },
      IMC: {
        cat: "antrophometric",
        key: "IMC",
        medicalEventId: null,
        measureType: 7,
        measure: null,
        label: "Índice de masa corporal",
        unit: "kg/m2",
        referenceValue: 24.69,
      },
      temperature: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 1,
        measure: null,
        key: "Temperatura",
        label: "Temperatura",
        unit: "°C",
        referenceValue: 37,
      },
      /* Abdominal_perimeter: {
        cat: "antrophometric",
        key: "Perimetro Abdominal",
        label: "Perímetro abdominal",
        unit: "cm",
        referenceValue: "",
      }, */
      Heart_Rate: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 7,
        measure: null,
        key: "Frecuencia Cardiaca",
        label: "Frecuencia cardíaca",
        unit: "lpm",
        referenceValue: 80,
      },
      Systolic_Blood_Pressure: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 2,
        measure: null,
        key: "Presion Arterial Sistolica",
        label: "Presión arterial sistólica",
        unit: "mmHg",
        referenceValue: 120,
      },
      Diastolic_Blood_Pressure: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 3,
        measure: null,
        key: "Presion Arterial Diastolica",
        label: "Presión arterial diastólica",
        unit: "mmHg",
        referenceValue: 80,
      },
      // Mean_arterial_pressure: {
      //   cat: "vitalSigns",
      //   key: "Presion Arterial Media",
      //   label: "Presión arterial media",
      //   unit: "mmHg",
      //   referenceValue: "",
      // },
      Breathing_frequency: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 5,
        measure: null,
        key: "Frecuencia Respiratoria",
        label: "Frecuencia respiratoria",
        unit: "rpm",
        referenceValue: 17,
      },
      Oxygen_saturation: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 6,
        measure: null,
        key: "Saturacion de Oxigeno",
        label: "Saturación de oxígeno",
        unit: "%",
        referenceValue: 80,
      },
      abnormalGlycemia: {
        label: "  Glicemia:  ¿Tuvo valores fuera del rango normal en el último tiempo? (+ 140 mg/dl y - 80 mg/dl)",
        binaryOptions: true,
        active: null,
        measure: 0,
        description: '',
        active: null,
      },
      lastAbnormalGlycemia: {
        label: "Escriba los últimos 4 valores mas anormales que tuvo.",
        selectedOption: null,
        active: null,
        measure: 0,
        description: '',
        referenceValue: 100,
        unit: 'mg/dl',
        options: {
          option0: '',
          option1: '',
          option2: '',
          option3: '',
        },
      },
    },
    tests: {
      laboratoryResults: {
        title: "Resultados de laboratorio",
        file: null,
        description: '',
        active: null,
      },
      electrocardiogram: {
        title: "Electrocardiograma",
        file: null,
        description: '',
        active: null,
      },
      rxThorax: {
        title: "RX de Torax",
        file: null,
        description: '',
        active: null,
      },
      echocardiogram: {
        title: "Ecocardiograma",
        file: null,
        description: '',
        active: null,
      },
      walkTest: {
        title: "Test de caminata",
        file: null,
        description: '',
        active: null,
      },
      respiratoryFunctional: {
        title: "Funcional respiratorio",
        file: null,
        description: '',
        active: null,
      },
      tomographies: {
        title: "Tomografías",
        file: null,
        description: '',
        active: null,
      },
      rightHeartCatheterization: {
        title: "Cateterismo cardiaco derecho",
        file: null,
        description: '',
        active: null,
      },
      ccg: {
        title: "CCG (Coronariografia)",
        file: null,
        description: '',
        active: null,
      },
      resonance: {
        title: "Resonancia",
        file: null,
        description: '',
        active: null,
      },
      leftHeartCatheterization: {
        title: "Cateterismo cardiaco izquierdo",
        file: null,
        description: '',
        active: null,
      },
      otherStudies: {
        title: "Otros estudios",
        file: null,
        description: "",
      },
      pendingStudies: {
        title: "Estudios pendientes",
        description: "",
      },
    },
    bodySection: {
      isTherePain: null,
      painDuration: null,
      painScale: 1,
      painType: null,
      painAreas: null,
      painFrequency: null,
      isTakingAnalgesic: null,
      doesAnalgesicWorks: null,
      isWorstPainEver: null,
      painOwner: null,
      scheduling: null,
      medicalEvent: null,
    },
    anamnesis: {
      consultationReason: {
        title: '¿Por qué solicitó la consulta?',
        description: ""
      },
      importantSymptoms: {
        title: 'Síntomas importantes',
        description: ""
      },
    },
    tratamiento: {
      currentMedications: {
        title: 'Medicamentos actuales',
        placeholder: 'Escriba el medicamento',
        file: '',
        selectedOptions: {
          item0: '',
        }
      },
    }
  },
  formDataReset: {
    questions: {
      lackOfAir: {
        title: "¿Tiene falta de aire (Disnea)?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: '',
        subquestions: {
          lackOfAirIncremented: {
            title: "Se ha incrementado en las últimas:",
            display: 'row',
            selectedOption: null,
            options: [
              { label: "Horas" },
              { label: "Días" },
              { label: "Semanas" },
            ],
          },
          lackOfAirClasification: {
            title: "Califique su falta de aire",
            selectedOption: null,
            orientation: "column",
            options: [
              {
                label: "Puedo caminar a paso rápido más de 10 cuadras sin parar.",
              },
              {
                label: "Puedo caminar a paso rápido menos de 5 cuadras sin parar.",
              },
              {
                label: "No puedo caminar más de 3 cuadras, solo realizo tareas domésticas, uso oxígeno eventualmente.",
              },
              {
                label: "No puedo caminar ni una cuadra, tampoco realizar tareas domésticas con normalidad, me hace falta el aire aunque esté en reposo, uso oxígeno todo el tiempo.",
              },
            ],
          },
        },
      },
      chestPainAtRest: {
        title: "¿Tiene dolor de pecho en reposo?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: '',
      },
      chestPainOnExertion: {
        title: "¿Tiene dolor de pecho al hacer esfuerzos físicos?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: '',
        subquestions: {
          chestPainOnExertionAmount: {
            selectedOption: null,
            options: [
              { label: "Con poco esfuerzo físico" },
              { label: "Con esfuerzo físico moderado" },
              { label: "Con esfuerzo físico intenso" },
            ],
          }
        }
      },
      edemaPresence: {
        title: "¿Ha notado edemas (hinchazón) o aumento del edema previo?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: '',
        subquestions: {
          edemaPresenceDescription: {
            selectedOption: null,
            options: [
              { label: "Hinchazón en los pies" },
              { label: "Hinchazón por debajo de las rodillas" },
              { label: "Hinchazón de las rodillas a la cadera" },
              { label: "Hinchazón general" },
            ],
          }
        }
      },
      feelings: {
        title: "¿Cómo se encuentra el día de hoy?",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showRowOptions: true,
        description: '',
        options: [
          { label: "Mal" },
          { label: "Regular" },
          { label: "Normal" },
          { label: "Bien" },
        ],
      },
      healthChanges: {
        title: "¿Ha notado algún cambio en su salud?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        showTextInput: true,
        description: '',
        // healthChangesDescription: ''
      },
      healthWorsened: {
        title: "Siente que su salud se ha empeorado en las últimas:",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showRowOptions: true,
        description: '',
        options: [
          { label: "Horas" },
          { label: "Días" },
          { label: "Semanas" },
          { label: "No empeoró" },
        ],
      },
      bodyPain: {
        title: "¿Tiene alguna dolencia en su cuerpo?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        description: '',
      },
      mentalHealthAffected: {
        title: "¿Su salud mental está afectada?",
        active: null,
        binaryOptions: true,
        selectedOption: null,
        showTextInput: true,
        description: '',
        // mentalHealthAffectedDescription: ''
      },
      energyStatus: {
        title: "Califique su estado de energía - Fatiga",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showSlider: true,
        description: '',
      },
      feed: {
        title: "Califique su alimentación",
        active: null,
        binaryOptions: false,
        selectedOption: null,
        showRowOptions: true,
        description: '',
        options: [
          { label: "Nada saludable" },
          { label: "Poco saludable" },
          { label: "Saludable" },
          { label: "Muy saludable" },
        ],
      },
      hydrationStatus: {
        title: "Califique su hidratación diaria (todos los líquidos ingeridos)",
        active: true,
        binaryOptions: false,
        selectedOption: null,
        description: '',
        options: [
          { label: "Poca ingesta < de 1.5 litros (menos de 5 vasos aprox.) " },
          { label: "Normal 1.5 a 2 litros (5 a 8 vasos aprox.)" },
          { label: "Mucha ingesta > a 2.5 litros (> de 8 vasos aprox.)" },
        ],
      },
      urineStatus: {
        title: "Califique su estado de orina (diuresis)",
        active: true,
        binaryOptions: false,
        selectedOption: null,
        description: '',
        options: [
          { label: "Orino normal (entre 500 ml y 1 litro al día)" },
          { label: "He notado una disminución del 50% o menos de 1 litro al día" },
          { label: "Orino poco (menos de medio litro o 500 ml al día)" },
          { label: "Casi nada (menos de 1 vaso al día)" },
          { label: "Nada" },
        ],
      },
      exerciseStatus: {
        title: "Califique su estado de ejercicio físico",
        active: true,
        binaryOptions: false,
        selectedOption: null,
        description: '',
        options: [
          { label: "Ninguno: no puedo, no quiero, no recomendado por el médico, contraindicado." },
          { label: "Bajo: camino poco, realizo tareas domésticas, trabajo con poca actividad física. Camino menos de 10 mil pasos al día o menos de 7.5 km día." },
          { label: "Moderado: Camino más de 10 mil pasos o 7.5 km al día. Al menos 150 minutos de actividad física a la semana (caminar, trotar, nadar, yoga, baile, pesas, bicicleta, etc.)" },
          { label: "Intenso: Más de 150 minutos a la semana de actividad intensa o más de 300 minutos de actividad moderada. (Deportista aficionado, bien entrenado o competidor)" },
        ],
      },
    },
    vitalSigns: {
      height: {
        cat: "antrophometric",
        medicalEventId: null,
        measureType: 4,
        measure: null,
        key: "Talla",
        label: "Estatura",
        unit: "cm",
        referenceValue: 180,
      },
      weight: {
        cat: "antrophometric",
        medicalEventId: null,
        measureType: 5,
        measure: null,
        key: "Peso",
        label: "Peso",
        unit: "kg",
        referenceValue: 76,
      },
      IMC: {
        cat: "antrophometric",
        key: "IMC",
        medicalEventId: null,
        measureType: 7,
        measure: null,
        label: "Índice de masa corporal",
        unit: "kg/m2",
        referenceValue: 24.69,
      },
      temperature: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 1,
        measure: null,
        key: "Temperatura",
        label: "Temperatura",
        unit: "°C",
        referenceValue: 37,
      },
      /* Abdominal_perimeter: {
        cat: "antrophometric",
        key: "Perimetro Abdominal",
        label: "Perímetro abdominal",
        unit: "cm",
        referenceValue: "",
      }, */
      Heart_Rate: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 7,
        measure: null,
        key: "Frecuencia Cardiaca",
        label: "Frecuencia cardíaca",
        unit: "lpm",
        referenceValue: 80,
      },
      Systolic_Blood_Pressure: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 2,
        measure: null,
        key: "Presion Arterial Sistolica",
        label: "Presión arterial sistólica",
        unit: "mmHg",
        referenceValue: 120,
      },
      Diastolic_Blood_Pressure: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 3,
        measure: null,
        key: "Presion Arterial Diastolica",
        label: "Presión arterial diastólica",
        unit: "mmHg",
        referenceValue: 80,
      },
      // Mean_arterial_pressure: {
      //   cat: "vitalSigns",
      //   key: "Presion Arterial Media",
      //   label: "Presión arterial media",
      //   unit: "mmHg",
      //   referenceValue: "",
      // },
      Breathing_frequency: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 5,
        measure: null,
        key: "Frecuencia Respiratoria",
        label: "Frecuencia respiratoria",
        unit: "rpm",
        referenceValue: 17,
      },
      Oxygen_saturation: {
        cat: "vitalSigns",
        medicalEventId: null,
        measureType: 6,
        measure: null,
        key: "Saturacion de Oxigeno",
        label: "Saturación de oxígeno",
        unit: "%",
        referenceValue: 80,
      },
      abnormalGlycemia: {
        label: "  Glicemia:  ¿Tuvo valores fuera del rango normal en el último tiempo? (+ 140 mg/dl y - 80 mg/dl)",
        binaryOptions: true,
        active: null,
        measure: 0,
        description: '',
        active: null,
      },
      lastAbnormalGlycemia: {
        label: "Escriba los últimos 4 valores mas anormales que tuvo.",
        selectedOption: null,
        active: null,
        measure: 0,
        description: '',
        referenceValue: 100,
        unit: 'mg/dl',
        options: {
          option0: '',
          option1: '',
          option2: '',
          option3: '',
        },
      },
    },
    tests: {
      laboratoryResults: {
        title: "Resultados de laboratorio",
        file: null,
        description: '',
        active: null,
      },
      electrocardiogram: {
        title: "Electrocardiograma",
        file: null,
        description: '',
        active: null,
      },
      rxThorax: {
        title: "RX de Torax",
        file: null,
        description: '',
        active: null,
      },
      echocardiogram: {
        title: "Ecocardiograma",
        file: null,
        description: '',
        active: null,
      },
      walkTest: {
        title: "Test de caminata",
        file: null,
        description: '',
        active: null,
      },
      respiratoryFunctional: {
        title: "Funcional respiratorio",
        file: null,
        description: '',
        active: null,
      },
      tomographies: {
        title: "Tomografías",
        file: null,
        description: '',
        active: null,
      },
      rightHeartCatheterization: {
        title: "Cateterismo cardiaco derecho",
        file: null,
        description: '',
        active: null,
      },
      ccg: {
        title: "CCG (Coronariografia)",
        file: null,
        description: '',
        active: null,
      },
      resonance: {
        title: "Resonancia",
        file: null,
        description: '',
        active: null,
      },
      leftHeartCatheterization: {
        title: "Cateterismo cardiaco izquierdo",
        file: null,
        description: '',
        active: null,
      },
      otherStudies: {
        title: "Otros estudios",
        file: null,
        description: "",
      },
      pendingStudies: {
        title: "Estudios pendientes",
        description: "",
      },
    },
    bodySection: {
      isTherePain: null,
      painDuration: null,
      painScale: 1,
      painType: null,
      painAreas: null,
      painFrequency: null,
      isTakingAnalgesic: null,
      doesAnalgesicWorks: null,
      isWorstPainEver: null,
      painOwner: null,
      scheduling: null,
      medicalEvent: null,
    },
    anamnesis: {
      consultationReason: {
        title: '¿Por qué solicitó la consulta?',
        description: ""
      },
      importantSymptoms: {
        title: 'Síntomas importantes',
        description: ""
      },
    },
    tratamiento: {
      currentMedications: {
        title: 'Medicamentos actuales',
        placeholder: 'Escriba el medicamento',
        file: '',
        selectedOptions: {
          item0: '',
        }
      },
    }
  },
};

const preconsultaFormSlice = createSlice({
  name: "preconsultaForm",
  initialState,
  reducers: {
    updateAllFormData(state, action) {
      const { draft } = action.payload;
      state.formData = draft;
    },
    updateField(state, action) {
      const { key, field, value } = action.payload;
      state.formData.questions[key][field] = value;
    },

    updateActive(state, action) {
      const { question, label, active } = action.payload;
      const currentSubquestions = state.formData.questions[question].subquestions;
      if (state.formData.questions[question].active === active) {
        state.formData.questions[question].active = null;
        if (currentSubquestions) { // limpiamos las opciones binarias, por lo tanto desactivamos y reseteamos los checkbox de las subpreguntas
          Object.keys(currentSubquestions).map((subquestion, index) => {
            state.formData.questions[question].subquestions[subquestion].selectedOption = null;
          });
        }
      }
      else {
        if (!active) {
          if (currentSubquestions) { // si decimos que no, entonces desactivamos y reseteamos los checkbox de las subpreguntas
            Object.keys(currentSubquestions).map((subquestion, index) => {
              state.formData.questions[question].subquestions[subquestion].selectedOption = null;
            });
          }
          state.formData.questions[question].active = active;
        }
        else state.formData.questions[question].active = active;
      }
    },
    subquestionSelectedOption(state, action) {
      const { question, subquestion, selectedOption } = action.payload;
      state.formData.questions[question].subquestions[subquestion].selectedOption = selectedOption;
    },
    questionSelectedOption(state, action) {
      const { question, selectedOption } = action.payload;
      state.formData.questions[question].selectedOption = selectedOption;
    },
    updateDescription(state, action) {
      const { question, description } = action.payload;
      state.formData.questions[question].description = description;
    },
    updateVitalSign(state, action) {
      const { vitalSign, value, patientId, schedulingId } = action.payload;
      state.formData.vitalSigns[vitalSign].measure = value;
      state.formData.vitalSigns[vitalSign].patientId = patientId;
      state.formData.vitalSigns[vitalSign].schedulingId = schedulingId;
    },
    updateAnamnesis(state, action) {
      const { field, description } = action.payload;
      state.formData.anamnesis[field].description = description;
    },
    updateTratamiento(state, action) {
      const { field, item, description } = action.payload;
      state.formData.tratamiento[field].selectedOptions[item] = description;
    },
    updateBodyPainLevel: (state, action) => {
      const { name, option } = action.payload;
      state.formData.bodySection[name] = option;
    },
    updateSubquestion(state, action) {
      const { sectionIndex, subquestionIndex, field, value } = action.payload;
      state.formData.questions[sectionIndex].subquestions[subquestionIndex][
        field
      ] = value;
    },
    updateGlycemia(state, action) {
      const { vitalSign, active } = action.payload;
      if (state.formData.vitalSigns[vitalSign].active === active) {
        console.log(active);
        state.formData.vitalSigns[vitalSign].active = null;
      }
      else {
        console.log(active);
        state.formData.vitalSigns[vitalSign].active = active
      }
    },
    updateLastGlycemia(state, action) {
      const { vitalSign, key, value } = action.payload;
      state.formData.vitalSigns[vitalSign].options[key] = value;
    },
    setFormData(state, action) {
      state.formData = action.payload;
    },
    resetForm(state) {
      state.formData = initialState.formData;
    },
    resetFormData(state) {
      state.formData = initialState.formDataReset;
    },

    updateFileUploaded(state, action) {
      const { test, file } = action.payload;
      state.formData.tests[test].file = file;
    },

    updateTestDescription(state, action) {
      const { test, testDescription } = action.payload;
      state.formData.tests[test].description = testDescription;
    },

    updateTestActive(state, action) {
      const { test, active } = action.payload;
      state.formData.tests[test].active = active;
    },

    updateTestSelectedOption(state, action) {
      const { test, value } = action.payload;
      state.formData.tests[test].selectedOption = value;
    },
  },
});

export const {
  resetFormData,
  updateAllFormData,
  updateField,
  updateActive,
  updateGlycemia,
  updateLastGlycemia,
  subquestionSelectedOption,
  questionSelectedOption,
  updateDescription,
  updateVitalSign,
  updateAnamnesis,
  updateTratamiento,
  updateBodyPainLevel,
  updateSubquestion,
  setFormData,
  resetForm,
  updateFileUploaded,
  updateTestDescription,
  updateTestActive,
  updateTestSelectedOption
} = preconsultaFormSlice.actions;
export default preconsultaFormSlice.reducer;
