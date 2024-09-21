"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { SideBarMod } from "@/components/Modularizaciones/SideBarMod";
import { NavBarMod } from "@/components/Modularizaciones/NavbarMod";
import { SegiBot } from "@/components/InicioPaciente/chatSegi/SegiBot";
import { buttonsPaciente } from "@/components/NavDoc/NavbarButtons";
import Joyride from "react-joyride";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setTourstate } from "@/redux/slices/user/tour";

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const runTour = useAppSelector((state) => state.tourstate);

  // joyride
  const [isClient, setIsClient] = useState(false);
  const [steps] = useState([
    ...buttonsPaciente.flatMap(section =>
      section.buttons.map(button => ({
        target: `#${button.id}`, // Usa el id como target
        content: button.content, // Usa el contenido del botón
        placementBeacon: "auto",
        disableBeacon: true,
      }))
    ),
    {
      target: '#chatsButton',
      content: 'Aquí puedes ver tus mensajes y conversaciones sin leer.',
      disableBeacon: true,
    },
    {
      target: '#notificationButton',
      content: 'Aquí puedes ver tus notificaciones y alertas.',
      disableBeacon: true,
    }
  ]);

  useEffect(() => {
    // Verifica que estamos en el cliente
    setIsClient(true);
  }, []);

  const handleJoyrideCallback = (data) => {
    if (data.status === 'finished' || data.status === 'skipped') {
      dispatch(setTourstate(false)); // Detiene el tour
      setIsOpen(false); // Cierra la barra lateral al finalizar el tour
      return;
    }

    if (runTour) {
      if (window?.innerWidth <= 768) {
        // Si el paso actual es el primero y se completa
        if (data.index < 9 && isOpen !== true) {
          setIsOpen(true); // Abre la barra lateral
        }
        console.log(data);

        // Si se llega al paso con índice 10
        if (data.index === 10) {
          setIsOpen(false); // Cierra la barra lateral
        }
      }
    }
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen md:h-screen max-w-screen overflow-y-scroll md:overflow-y-hidden">
      {/* Barra de navegación */}
      <SideBarMod
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
        buttons={buttonsPaciente}
      />

      <div className="flex flex-col w-full h-full">
        <NavBarMod search={true} toggleSidebar={toggleSidebar} />
        {/* Contenido principal */}
        <Suspense>
          <div className="h-[88%] w-full">{children}</div>
        </Suspense>
      </div>
      <SegiBot />

      {/* joyride */}
      {isClient && (
        <div className="inset-0 z-50 pointer-events-none">
          <Joyride
            run={runTour}
            steps={steps} // Usa los steps dinámicamente generados
            continuous={true}
            showSkipButton={true}
            showProgress={false}
            hideCloseButton={true}
            scrollToFirstStep={true}
            disableOverlayClose={true}
            disableScrolling={window?.innerWidth <= 768 ? true : false}
            callback={handleJoyrideCallback}
            styles={{
              options: {
                primaryColor: '#70c247',
                zIndex: 1000,
                padding: '0',
                beaconSize: 40,
              },
              tooltip: {
                zIndex: 2000,
              },
            }}
            locale={{
              back: "Atrás",
              close: "Cerrar",
              last: "Finalizar",
              next: "Siguiente",
              open: "Abrir",
              skip: "Finalizar",
              stop: "Detener",
            }}
          />
        </div>
      )}
    </div>
  );
}
