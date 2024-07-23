
export default function CalcularEdad(fechaNacimiento) {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    // Si el mes de nacimiento es mayor al mes actual o es el mismo mes pero el día de nacimiento es mayor al día actual, se resta un año
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    return edad ? edad : "registre su fecha de nacimiento";
}