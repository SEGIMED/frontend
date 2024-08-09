const Evoluciones = ({ info }) => {
  return (
    <div className="p-5 bg-[#f5f4f4] border-b-[#cecece] border-b">
      <p className="w-full h-fit md:h-20 text-start text-[#686868] font-normal text-base leading-6 bg-[#FBFBFB] border border-[#DCDBDB] rounded-lg px-4 py-1">
        {info?.historyOfPresentIllness || "No hay evolución registrada"}
      </p>
    </div>
  );
};

export default Evoluciones;
