import dayjs from "dayjs";
import "dayjs/locale/es";
export const minHour = new Date().setHours(8, 0, 0);
export const maxHour = new Date().setHours(21, 0, 0);
dayjs.locale("es");
export function mapSchedules(appointments) {
  const citas = appointments
    .filter((appointment) => {
      const startDateTime = dayjs(appointment.scheduledStartTimestamp).toDate();
      const endDateTime = dayjs(appointment.scheduledEndTimestamp).toDate();

      // Comprobar si las horas de inicio y fin están dentro del rango permitido
      const startTime =
        startDateTime.getHours() * 60 + startDateTime.getMinutes();
      const endTime = endDateTime.getHours() * 60 + endDateTime.getMinutes();

      const minTime =
        new Date(minHour).getHours() * 60 + new Date(minHour).getMinutes();
      const maxTime =
        new Date(maxHour).getHours() * 60 + new Date(maxHour).getMinutes();

      return startTime >= minTime && endTime <= maxTime;
    })
    .map((appointment) => ({
      id: appointment.id,
      start: dayjs(appointment.scheduledStartTimestamp).toDate(),
      end: dayjs(appointment.scheduledEndTimestamp).toDate(),
      title: `${appointment.patientUser.name} ${appointment.patientUser.lastname}`,
    }));

  return citas;
}

//Formato para fecha del día
export const dayFormat = (date, culture, localizer) => {
  const formattedDate = localizer.format(date, "D MMMM", culture);
  const [day, month] = formattedDate.split(" ");
  const firstLetter = month.charAt(0).toUpperCase();
  return `${day} ${firstLetter}${month.slice(1)}`;
};
export const weekdayFormat = (date, culture, localizer) => {
  const formattedDate = localizer.format(date, "dddd", culture);
  return `${formattedDate.charAt(0).toUpperCase()}${formattedDate.slice(1)}`;
};
