export function extractMonthDay(dateStr) {
  // Dividimos la cadena de entrada por las barras
  const [month, day, year] = dateStr.split("/");

  // Aseguramos que el mes y el día tengan siempre dos dígitos
  const formattedMonth = month.padStart(2, "0");
  const formattedDay = day.padStart(2, "0");

  // Retornamos el formato deseado
  return `${formattedMonth}/${formattedDay}`;
}

export function extractHourMinutes(dateStr) {
  // Dividimos la cadena de entrada por espacio y por los dos puntos
  const [time, period] = dateStr.split(" ");
  const [hours, minutes] = time.split(":");

  // Retornamos el formato deseado sin los segundos y con el período en minúsculas
  return `${hours}:${minutes} ${period}`;
}
