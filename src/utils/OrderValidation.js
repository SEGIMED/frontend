// validacion de creacion de medicamentos
const validateDrug = (drug) => {
    const errors = {};


    if (!drug.drugName) errors.drugName = "El nombre del medicamento es requerido.";
    if (!drug.commercialDrugName) errors.commercialDrugName = "El nombre comercial del medicamento es requerido.";
    if (!drug.routeOfAdministrationId) errors.routeOfAdministrationId = "La ruta de administración es requerida.";
    if (!drug.presentationId) errors.presentationId = "La presentación es requerida.";
    if (isNaN(drug.dose) || drug.dose <= 0) errors.dose = "La dosis debe ser un número positivo.";
    if (!drug.measureUnitId) errors.measureUnitId = "La unidad de medida es requerida.";

    return errors;
};

export { validateDrug }