export const Hora = (param) => {
    // Verificar si 'param' es null o undefined
    if (param == null) return "-";
    
    // Crear un objeto Date y verificar si es una fecha válida
    const date = new Date(param);
    if (isNaN(date.getTime())) return "-";
    
    // Configuración de opciones para la hora
    const hora = date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    return hora;
}



export const Fecha = (param, num = 2) => {
    // Verificar si 'param' es null o undefined
    if (param == null) return "-";
    
    // Crear un objeto Date y verificar si es una fecha válida
    const date = new Date(param);
    if (isNaN(date.getTime())) return "-";
    
    // Configuración de opciones para la fecha
    const options = { 
        year: num === 2 ? '2-digit' : 'numeric', 
        month: 'numeric', 
        day: 'numeric' 
    };
    
    // Formatear la fecha
    const fecha = date.toLocaleDateString('es-ES', options);
    return fecha;
}
