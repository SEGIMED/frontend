import IconCloseBoton from "@/components/icons/IconCloseBoton";
import { NotificacionElement } from "./NotificacionElement";

const NotificacionesContainer = ({
  handleNotificationClick,
  unreadNotifications,
  handleNotificationElementClick,
}) => {
  return (
    <div
      onClick={handleNotificationClick}
      className="fixed top-0 left-0 w-screen h-screen z-40">
      <div className="fixed flex flex-col gap-2 bg-red w-[90%] lg:w-[35%] md:w-[50%] h-fit max-h-[55%] md:max-h-[50%] shadow-lg bg-white rounded-2xl px-2 lg:px-4 z-50 top-[10%] right-[5%] md:right-[2%]">
        <div className="flex justify-between items-center">
          <p className="text-2xl text-bluePrimary font-semibold py-2">
            Notificaciones
          </p>
          <IconCloseBoton
            onClick={handleNotificationClick}
            className="h-6 w-6 cursor-pointer"
            color={"#487FFA"}
          />
        </div>
        <div className="w-full flex flex-col gap-4 max-h-[80%] overflow-y-auto">
          {unreadNotifications && unreadNotifications.length > 0 ? (
            unreadNotifications.map((notificacion) => (
              <NotificacionElement
                key={notificacion._id}
                notificacion={notificacion}
                onClick={() => handleNotificationElementClick(notificacion._id)}
              />
            ))
          ) : (
            <p className="text-lg text-[#5F5F5F] text-center py-2">
              No hay notificaciones por leer
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificacionesContainer;
