export default function LastLogin(lastLogin) {
  const date = new Date(lastLogin);

  // Verifica si la fecha es válida
  if (isNaN(date.getTime())) {
    return "Fecha inválida";
  }

  // Opciones para el formato de la fecha
  const optionsTime = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const optionsDate = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  // Formatear la hora y la fecha por separado
  const time = new Intl.DateTimeFormat("es-ES", optionsTime).format(date);
  const formattedDate = new Intl.DateTimeFormat("es-ES", optionsDate).format(date);

  // Retornar la hora y la fecha en el formato deseado
  return `${time} - ${formattedDate}`;
}

