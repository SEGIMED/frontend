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

const MenuDropDown = ({ icon, label, categories, items }) => {
  return (
    <Dropdown
      classNames={{
        trigger:
          "relative w-[60%] md:w-fit place-self-center md:place-self-end",
      }}>
      <DropdownTrigger className="flex justify-center md:px-4 py-2 text-white rounded-xl md:gap-3 bg-[#487FFA] items-center cursor-pointer">
        <div className="flex items-center md:gap-3">
          {icon ? icon : <IconOptions color="#FFFFFF" />}
          <span className="hidden md:block font-semibold">{label}</span>
        </div>
      </DropdownTrigger>
      <DropdownMenu>
        {categories && categories.length > 0
          ? categories.map((category, categoryIndex) => (
              <DropdownSection
                key={categoryIndex}
                title={category.title}
                classNames={{
                  heading: "text-sm font-bold",
                }}
                showDivider={categoryIndex < categories.length - 1}>
                {category.items.map((item, itemIndex) => (
                  <DropdownItem key={itemIndex}>
                    {item.href && (
                      <Link
                        href={item.href}
                        className="w-full flex items-center gap-2  text-sm cursor-pointer">
                        {item.icon}
                        {item.label}
                      </Link>
                    )}
                    {item.onClick && (
                      <button
                        onClick={item.onClick}
                        className="w-full flex items-center gap-2  text-sm cursor-pointer">
                        {item.icon}
                        {item.label}
                      </button>
                    )}
                  </DropdownItem>
                ))}
              </DropdownSection>
            ))
          : items?.map((item, index) => (
              <DropdownItem key={index} startContent={item.icon}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="w-full flex items-center gap-2  text-sm cursor-pointer">
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="w-full flex items-center gap-2  text-sm cursor-pointer">
                    {item.label}
                  </button>
                )}
              </DropdownItem>
            ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuDropDown;
