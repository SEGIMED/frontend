
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button, cn} from "@nextui-org/react";
import IconOptions from "../icons/IconOptions";

import IconMiniCalendar from "../icons/IconMiniCalendar";
import IconPersonalData from "../icons/IconPersonalData";
import IconMessages from "../icons/IconMessages";

const dropdownItemStyle = {
  fontSize: '4px', // Tamaño de fuente más pequeño para los items
};


export default function App({ 
  onDetailClick, 
  id, 
  onConsultationClick, 
  toggleOptions
} ) {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          size="md" color="primary" >
          <IconOptions  color="#FFFFFF"/> Opciones
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with icons" title="Acciones">
        Informacion
        <DropdownItem
          key="new"
          startContent={<IconMiniCalendar className={iconClasses} />}
          onClick={onConsultationClick}
        >
          Solicitar Consulta
        </DropdownItem>
        <DropdownItem
          key="copy"
          
          startContent={<IconPersonalData className={iconClasses} />}
          onClick={onDetailClick}
        >
          Ver Detalles
        </DropdownItem>
        {/* <Link href={`${rutas.PacienteDash}${rutas.Mensajes}`}> */}
        <DropdownItem
          key="edit"
          
          startContent={<IconMessages className={iconClasses} />}
        >
          Ver Mensajes
        </DropdownItem>
        {/* </Link> */}
      </DropdownMenu>
    </Dropdown>
  );
}
