import IconTablillaTilde from "@/components/icons/iconTablillaTilde";

const EvolucionesInfo = ({ evolucion, onEvolucionChange }) => {
  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <IconTablillaTilde className={"w-3"} />
        <span>Anotaciones sobre la consulta</span>
      </div>
      <textarea
        className="w-full h-32 text-start text-[#686868] font-normal text-base leading-6 bg-white border border-[#DCDBDB] rounded-lg px-6 py-3 outline-[#a8a8a8]"
        placeholder="Ingrese aqui sus anotaciones"
        value={evolucion}
        onChange={(e) => onEvolucionChange(e.target.value)}
      />
    </div>
  );
};

export default EvolucionesInfo;
