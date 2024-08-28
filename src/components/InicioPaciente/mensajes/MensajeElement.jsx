import IconMail from "@/components/icons/iconMail";
import { IconPoint } from "../notificaciones/IconPoint";
import Avatars from "@/components/avatar/avatarChat";
import { Hora } from "@/utils/NormaliceFechayHora";

export const MensajeElement = ({
  message,
  sender,
  numberOfMessages,
  onClick,
  date,
  isMessageFromUser,
}) => {
  const formatMessage = (message, isMessageFromUser) => {
    return isMessageFromUser ? `Tu: ${message}` : message;
  };
  return (
    <div
      className="flex items-center w-full h-[35%] p-1 lg:p-2 cursor-pointer"
      onClick={onClick}>
      <div className="w-[11%]">
        <Avatars
          avatar1={
            sender?.avatar === null || sender?.avatar === undefined
              ? null
              : sender?.avatar
          }
        />
      </div>
      <div className="w-[80%] flex flex-col">
        <p className="text-lg w-full">{sender?.fullName}</p>
        <p className="line-clamp-1">
          {formatMessage(message, isMessageFromUser)}
        </p>
      </div>
      <div className="w-[10%] flex flex-col items-center justify-center text-sm">
        <p>{Hora(date)}</p>
        {numberOfMessages > 0 && (
          <p className="rounded-full bg-bluePrimary w-6 h-6 text-center p-1 text-white">
            {numberOfMessages}
          </p>
        )}
      </div>
    </div>
  );
};
