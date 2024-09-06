import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import IconOptions from "../icons/IconOptions";
import { Link } from "@nextui-org/link";
// Ejemplo de uso con secciones/categorias
// const categories = [
//   {
//     title: "Acciones",
//     items: [
//       {
//         label: "Agendar Consulta",
//         onClick: () => console.log("Agendar Consulta"),
//         icon: <IconMiniCalendar />,
//       },
//       {
//         label: "Ver Geolocalización",
//         onClick: () => console.log("Ver Geolocalización"),
//         icon: <IconGeolocation />,
//       },
//     ],
//   },
//   {
//     title: "Información",
//     items: [
//       {
//         label: "Ver Historia Clínica",
//         href: "/historia-clinica",
//         icon: <IconClinicalHistory />,
//       },
//       {
//         label: "Ver datos Personales",
//         href: "/datos-personales",
//         icon: <IconPersonalData />,
//       },
//     ],
//   },
// ];
// Ejmplo de uso sin secciones/categorias
// const items = [
//     {
//       label: "Ver Mensajes",
//       href: "/mensajes",
//       icon: <IconMessages />,
//     },
//     {
//       label: "Configurar Perfil",
//       onClick: () => console.log("Configurar Perfil"),
//       icon: <IconPersonalData />,
//     },
//   ];

const MenuDropDown = ({
  icon,
  iconr,
  label,
  categories,
  items,
  className,
  classNameButton,
}) => {
  return (
    <Dropdown
      classNames={{
        trigger: `${className}`,
        content: "w-full p-0",
      }}>
      <DropdownTrigger
        className={`flex justify-center lg:px-4 font-Roboto font-bold py-2 text-white rounded-lg lg:gap-3 bg-[#487FFA] items-center cursor-pointer ${classNameButton}`}>
        <div className="flex items-center lg:gap-3">
          {icon && icon}
          <span className="hidden lg:block font-semibold">{label}</span>
          {iconr && iconr}
        </div>
      </DropdownTrigger>
      <DropdownMenu
        classNames={{
          base: "w-full p-0",
        }}>
        {categories && categories.length > 0
          ? categories.map((category, categoryIndex) => (
              <DropdownSection
                key={categoryIndex}
                icon={category.icon}
                title={
                  <div className="flex items-center gap-2 px-2 pt-3">
                    {category.icon && category.icon}
                    {category.title}
                    {category.icon && category.iconr}
                  </div>
                }
                classNames={{
                  heading: "text-sm font-bold p-0",
                  base: "p-0",
                  group: "p-0",
                }}
                showDivider={categoryIndex < categories.length - 1}>
                {category.items?.map((item, itemIndex) => (
                  <DropdownItem
                    key={itemIndex}
                    as={item.href && Link}
                    href={item.href && item.href}
                    onPress={item.onClick && item.onClick}
                    className="w-full flex items-center gap-2  text-sm cursor-pointer px-3 py-2 text-[#5F5F5F]"
                    startContent={item.icon}
                    endContent={item.iconr}
                    classNames={{
                      base: "w-full p-0",
                    }}>
                    {item.label}
                  </DropdownItem>
                ))}
              </DropdownSection>
            ))
          : items?.map((item, index) => (
              <DropdownItem
                key={index}
                as={item.href && Link}
                className="w-full  text-[#5F5F5F] flex items-center gap-2  text-sm cursor-pointer px-3 py-2"
                href={item.href && item.href}
                onClick={item.onClick && item.onClick}
                startContent={item.icon}
                classNames={{
                  base: "w-full p-0",
                  group: "p-0",
                  heading: "text-sm font-bold p-0",
                }}>
                {item.label}
              </DropdownItem>
            ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuDropDown;
