import { IconNotificaciones } from "./IconNotificaciones";
import { IconPoint } from "./IconPoint";

export const NotificacionElement = ({ notificacion }) => {
  const { _id, content } = notificacion;
  const handleClick = () => {
    console.log(`Notificación ${_id} clickeada`);
  };
  console.log(notificacion);
  return (
    <div
      className="flex gap-4 items-center w-full p-2 cursor-pointer"
      onClick={handleClick}>
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
