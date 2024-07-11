export const Hora= (param)=>{
    const hora = new Date(param).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    return hora
}

export const Fecha= (param)=>{
    const fecha = new Date(param).toLocaleDateString('es-ES')
    return fecha
}