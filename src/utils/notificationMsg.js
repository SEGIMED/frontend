export const formatNotificationMessage = (notification) => {
  const { content, sender } = notification;
  const notificationType = content?.notificationType;
  function formatTimeWithoutSeconds(timeString) {
    const [time, period] = timeString.split(" ");
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes} ${period}`;
  }

  switch (notificationType) {
    case "updatedAppointment":
      return `La cita ha sido actualizada. 
                Fecha anterior: ${
                  content.pastDate
                } a las ${formatTimeWithoutSeconds(content.pastHour)}. 
                Nueva fecha: ${
                  content.currentDate
                } a las ${formatTimeWithoutSeconds(content.currentHour)}.`;

    case "appointmentCreated":
      return `Se ha creado una nueva cita para el 
                ${content.date} a las ${formatTimeWithoutSeconds(
        content.hour
      )}.`;

    case "appointmentReminderOneDayBefore":
      return `Recordatorio: Tienes una cita programada para el 
                ${content.date} a las ${formatTimeWithoutSeconds(
        content.hour
      )}.`;
    case "appointmentCanceled":
      return `La cita programada para el 
                    ${content.date} a las ${formatTimeWithoutSeconds(
        content.hour
      )} ha sido cancelada.`;
    case "unreadMessage":
      return `Tienes un nuevo mensaje.`;

    default:
      return false;
  }
};
