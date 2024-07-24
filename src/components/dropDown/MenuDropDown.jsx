import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@nextui-org/react";
import IconOptions from "../icons/IconOptions";
import Link from "next/link";
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

const MenuDropDown = ({ icon, iconr, label, categories, items }) => {
  return (
    <Dropdown
      classNames={{
        trigger:
          "relative w-[60%] md:w-fit place-self-center md:place-self-end",
        content: "w-full p-0",
      }}>
      <DropdownTrigger className="flex justify-center md:px-4 font-Roboto py-2 text-white rounded-xl md:gap-3 bg-[#487FFA] items-center cursor-pointer">
        <div className="flex items-center md:gap-3">
          {icon && icon}
          <span className="hidden md:block font-semibold">{label}</span>
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
                    classNames={{
                      base: "w-full p-0",
                    }}>
                    {item.href && (
                      <Link
                        href={item.href}
                        className="w-full flex items-center gap-2  text-sm cursor-pointer px-3 py-2">
                        {item.icon}
                        {item.label}
                        {item.iconr}
                      </Link>
                    )}
                    {item.onClick && (
                      <button
                        onClick={item.onClick}
                        className="w-full flex items-center gap-2  text-sm cursor-pointer px-3 py-2">
                        {item.icon}
                        {item.label}
                        {item.iconr}
                      </button>
                    )}
                  </DropdownItem>
                ))}
              </DropdownSection>
            ))
          : items?.map((item, index) => (
              <DropdownItem
                key={index}
                className="p-0"
                classNames={{
                  base: "w-full p-0",
                  group: "p-0",
                  heading: "text-sm font-bold p-0",
                }}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="w-full flex items-center gap-2  text-sm cursor-pointer px-4 py-3">
                    {item.icon}
                    {item.label}
                    {item.iconr}
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="w-full flex items-center gap-2  text-sm cursor-pointer px-4 py-3">
                    {item.icon}
                    {item.label}
                    {item.iconr}
                  </button>
                )}
              </DropdownItem>
            ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuDropDown;
