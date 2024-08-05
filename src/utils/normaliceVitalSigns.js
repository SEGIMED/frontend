export const IMC = (peso, tallaEnCm) => {
    if (peso && tallaEnCm) {
        const tallaEnMetros = tallaEnCm / 100; // Convertir altura de cm a metros
        return peso / (tallaEnMetros * tallaEnMetros); // Calcular IMC
    }
    return 0;
}