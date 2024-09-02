import { useRouter } from "next/navigation";
import Elboton from "../Buttons/Elboton";
import IconRegresar from "../icons/iconRegresar";
import Ordenar from "@/components/Buttons/Ordenar";

const TableToolBar = ({ title, showBackButton }) => {
  const router = useRouter();
  return (
    <div className="flex justify-between py-2 lg:px-4 px-2 items-center bg-[#FAFAFC] border-b-[1px] border-b-[#D7D7D7] ">
      {showBackButton ? (
        <button
          type="button"
          className="flex md:px-6 px-4 py-2 rounded-lg gap-1 items-center bg-[#487FFA]"
          onClick={() => {
            router.back();
          }}>
          <IconRegresar />
          <p className="text-start hidden md:block text-white font-bold text-base leading-5">
            {" "}
            Regresar
          </p>
        </button>
      ) : (
        <div></div>
      )}
      <h1 className="font-Poppins font-bold md:text-xl text-center ">
        {title}
      </h1>
      <Ordenar />
    </div>
  );
};

export default TableToolBar;
