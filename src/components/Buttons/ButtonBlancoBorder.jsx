
export default function ButtonBlancoBorde({ funcion, text, iconLeft, iconRight }) {
  return (
    <button
      onClick={funcion}
      className="flex px-2 md:px-6 py-2 bg-white rounded-lg gap-1 items-center border-solid border-2 border-[#487FFA]">
      {iconLeft}
      <p className="text-start text-[#487FFA] font-bold text-base font-Roboto leading-5">
        {text}
      </p>
      {iconRight}
    </button>
  );
}