import IconAlphabetic from "../icons/IconAlphabetic";
import IconFilter from "../icons/IconFilter";
import IconHooter from "../icons/IconHooter";
import IconTypeRisk from "../icons/IconTypeRisk";

const FiltrarPacientes = ({ onClickSort, onClickFilter }) => {
  return (
    <details className="relative">
      <summary className="flex items-center justify-center md:px-6 px-2 py-2 text-white bg-[#487FFA] rounded-lg gap-3 font-bold cursor-pointer">
        <IconFilter /> Filtrar
      </summary>

      <ul className="flex flex-col gap-4 absolute p-3 bg-white z-50 w-64 right-0 border-2 border-[#D7D7D7] rounded-lg shadow-lg mt-1">
        <span className="flex items-center gap-3 justify-start text-sm font-medium">
          <IconHooter /> Nivel de riesgo
        </span>

        <li
          className="flex items-center justify-start gap-4 pl-5 cursor-pointer"
          onClick={() => onClickFilter("alto")}>
          <IconTypeRisk iconColor="#E73F3F" />
          Alto
        </li>

        <li
          className="flex items-center justify-start gap-4 pl-5 cursor-pointer"
          onClick={() => onClickFilter("medio")}>
          <IconTypeRisk iconColor="#F5E400" />
          Medio
        </li>

        <li
          className="flex items-center justify-start gap-4 pl-5 cursor-pointer"
          onClick={() => onClickFilter("bajo")}>
          <IconTypeRisk iconColor="#70C247" />
          Bajo
        </li>

        <li
          className="flex items-center justify-start gap-3 text-sm font-medium cursor-pointer"
          onClick={() => {
            onClickSort();
            onClickFilter("");
          }}>
          <IconAlphabetic />
          Orden Alfabético
        </li>

        <li
          className="flex items-center justify-start gap-3 text-sm font-medium cursor-pointer"
          onClick={() => onClickFilter("")}>
          Ver Todos
        </li>
      </ul>
    </details>
  );
};

export default FiltrarPacientes;
