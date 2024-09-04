import { formatNotificationMessage } from "@/utils/notificationMsg";
import { IconNotificaciones } from "./IconNotificaciones";
import { IconPoint } from "./IconPoint";
import TimeAgo from "./TimeAgo";

export const NotificacionElement = ({ notificacion, onClick }) => {
  const message = formatNotificationMessage(notificacion);

  const calculateTimeAgo = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInSeconds = Math.floor((now - date) / 1000);
    if (diffInSeconds < 60) {
      return `hace ${diffInSeconds} segundos`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `hace ${minutes} minuto${minutes !== 1 ? "s" : ""}`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `hace ${hours} hora${hours !== 1 ? "s" : ""}`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `hace ${days} día${days !== 1 ? "s" : ""}`;
    }
  };

  return (
    <div
      className="flex items-center w-full cursor-pointer p-1 lg:p-2"
      onClick={onClick}>
      <div className="w-[10%]">
        <IconNotificaciones className="w-5 h-5 md:w-6 md:h-6" color="#487ffa" />
      </div>
      <div className="w-[80%] px-1 flex flex-col">
        <p className="text-lg w-full">{message}</p>
        <span>{calculateTimeAgo(notificacion?.date)}</span>
      </div>
      <div className="w-[5%]">
        <IconPoint className="w-2 h-2 md:w-3 md:h-3" color="#487ffa" />
      </div>
    </div>
  );
};
