export default function LastLogin(lastLogin) {
  const date = new Date(lastLogin);

  // Verifica si la fecha es válida
  if (isNaN(date.getTime())) {
      return "Fecha inválida";
  }

  const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
  };

  return new Intl.DateTimeFormat('es-ES', options).format(date);
}
