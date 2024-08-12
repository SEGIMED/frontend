import { formatNotificationMessage } from "@/utils/notificationMsg";
import { IconNotificaciones } from "./IconNotificaciones";
import { IconPoint } from "./IconPoint";

export const NotificacionElement = ({ notificacion, onClick }) => {
  const message = formatNotificationMessage(notificacion);
  console.log(notificacion);
  if (!message) return null;
  return (
    <div
      className="flex items-center w-full p-1 lg:p-2 cursor-pointer"
      onClick={onClick}>
      <div className="w-[10%]">
        <IconNotificaciones className="w-5 h-5 md:w-6 md:h-6" color="#487ffa" />
      </div>
      <div className="w-[80%]">
        <p className="text-lg w-full">{message}</p>
      </div>
      <div className="w-[10%]">
        <IconPoint className="w-2 h-2 md:w-3 md:h-3" color="#487ffa" />
      </div>
    </div>
  );
};
