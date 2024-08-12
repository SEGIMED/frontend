import IconCopyright from "../icons/iconCopyright";

export const FooterAcc = () => {
  return (
    <div className="relative lg:absolute bottom-0 px-4 w-full md:w-1/2 flex justify-center items-center py-6 bg-[#FFFFFF]">
      <span className="ml-2 mr-1">
        <IconCopyright />
      </span>
      <span className="font-inter text-base font-normal leading-5 tracking-normal text-left">
        2024 desarrollado por SEGIMED® | Todos los derechos reservados.
      </span>
    </div>
  );
};
