export const Hora= (param)=>{
    const hora = new Date(param).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    return hora
}

export const Fecha = (param) => {
    const options = { year: '2-digit', month: 'numeric', day: 'numeric' };
    const fecha = new Date(param).toLocaleDateString('es-ES', options);
    return fecha;
}