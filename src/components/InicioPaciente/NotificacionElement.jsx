import { IconNotificaciones } from "./IconNotificaciones";
import { IconPoint } from "./IconPoint";

export const NotificacionElement = ({ notificacion, onClick }) => {
  const { content } = notificacion;
  return (
    <div
      className="flex gap-4 items-center w-full p-2 cursor-pointer"
      onClick={onClick}>
      <div className="w-[10%]">
        <IconNotificaciones className="w-5 h-5" color="#487ffa" />
      </div>
      <div className="w-[80%}">
        <p className="text-lg">{content.message}</p>
      </div>
      <div className="w-[10%]">
        <IconPoint className="w-2 h-2" color="#487ffa" />
      </div>
    </div>
  );
};
