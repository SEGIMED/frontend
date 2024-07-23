import Elboton from "../Buttons/Elboton";
import IconArrowRight from "../icons/iconArrowRight";
import IconRegister from "../icons/IconRegister";

const AsociarMedico = () => {
  return (
    <div className="h-full flex flex-col lg:flex-row items-center py-10 lg:justify-center gap-8">
      <IconRegister className="w-3/4 lg:w-[400px]" />
      <div className="space-y-7 w-3/4 lg:w-1/2">
        <h2 className="text-[#70C247] font-semibold text-xl lg:text-[40px]">
          ¡Asociate con tu médico!
        </h2>
        <p className="text-lg lg:text-[24px] text-[#808080]">
          Asociate con tu médico tratante para poder chatear haciendo click en
          el botón de abajo.
        </p>
        <Elboton nombre="Asociarme" icon2={<IconArrowRight />} />
      </div>
    </div>
  );
};

export default AsociarMedico;
