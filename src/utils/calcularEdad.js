export default function CalcularEdad(fechaNacimiento) {
    let nacimiento;

    // Si la fecha llega en formato 'YYYY-MM-DD', la convertimos
    if (typeof fechaNacimiento === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(fechaNacimiento)) {
        const [year, month, day] = fechaNacimiento.split('-');
        nacimiento = new Date(year, month - 1, day); // 'month - 1' porque los meses en JavaScript van de 0 a 11
    } else {
        // Si es una fecha estándar, la convertimos directamente
        nacimiento = new Date(fechaNacimiento);
    }

    // Verificamos que la fecha sea válida
    if (isNaN(nacimiento.getTime())) {
        console.error("Fecha de nacimiento no válida:", fechaNacimiento);
        return ""; // Retornar vacío si la fecha no es válida
    }

    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    // Si el mes de nacimiento es mayor al mes actual o es el mismo mes pero el día de nacimiento es mayor al día actual, se resta un año
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }

    // Si la edad calculada es menor que 0 (caso de fechas futuras), retornar vacío
    return edad >= 0 ? edad : "";
}
