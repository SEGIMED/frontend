import IconCloseBoton from "@/components/icons/IconCloseBoton";
import { NotificacionElement } from "./NotificacionElement";
import Elboton from "@/components/Buttons/Elboton";
import IconArrowPrev from "@/components/icons/IconArrowPrev";
import IconArrowLeft from "@/components/icons/IconArrowLeft";

const NotificacionesContainer = ({
  handleNotificationClick,
  unreadNotifications,
  pastNotifications,
  showUnreadNotifications,
  toggleNotificationView,
  handleNotificationElementClick,
}) => {
  const displayedNotifications = showUnreadNotifications
    ? unreadNotifications
    : pastNotifications;
  return (
    <div className="fixed flex flex-col w-[90%] lg:w-[35%] md:w-[50%] min-h-[20%] lg:min-h-fit max-h-[55%] md:max-h-[50%] shadow-lg bg-white rounded-2xl px-2 lg:px-4 z-50 top-[12%] lg:top-[10%] right-[5%] md:right-[2%]">
      <div className="flex justify-between items-center">
        <p className="text-2xl text-bluePrimary font-semibold py-2">
          Notificaciones
        </p>
        <button onClick={handleNotificationClick}>
          <IconCloseBoton
            className="h-6 w-6 cursor-pointer"
            color={"#487FFA"}
          />
        </button>
      </div>
      <div className="justify-start">
        <Elboton
          onPress={toggleNotificationView}
          className={"bg-white"}
          classNameText={`${
            showUnreadNotifications ? "text-[#B2B2B2]" : "text-bluePrimary"
          } font-Poppins`}
          icon={
            <IconArrowLeft
              iconColor={`${showUnreadNotifications ? "#B2B2B2" : "#487FFA"}`}
              className={"w-4"}
            />
          }
          nombre={showUnreadNotifications ? "Ver pasadas" : "Ver nuevas"}
        />
      </div>
      <div
        className={`w-full flex flex-col gap-2 ${
          unreadNotifications.length > 3 ? "max-h-[80%]" : "max-h-[20%]"
        } overflow-y-auto`}>
        {displayedNotifications && displayedNotifications.length > 0 ? (
          displayedNotifications
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((notificacion) => (
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
  );
};

export default NotificacionesContainer;
