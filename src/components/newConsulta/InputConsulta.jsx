import IconTablillaTilde from "../icons/iconTablillaTilde";

const InputConsulta = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <IconTablillaTilde className={"w-3"} />
        <span>{label}</span>
      </div>
      <textarea
        value={value}
        onChange={onChange}
        className="w-full h-32 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 outline-[#a8a8a8]"
        placeholder="Ingrese aqui sus anotaciones"
      />
    </div>
  );
};

export default InputConsulta;
