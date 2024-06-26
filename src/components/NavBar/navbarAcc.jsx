import Link from "next/link";
import LogoSegimed from "../logo/LogoSegimed";

export function NavBarAcc() {
  return (
    <div className="p-4 bg-white  flex items-center justify-between fixed top-0 w-full md:w-1/2 z-10">
      <div className="w-32 md:w-[30%] px-2 md:pl-8">
        <Link href="/">
          <LogoSegimed className="w-48" />
        </Link>
      </div>

      <div className="flex justify-center gap-10 mr-10">
        <Link href="/accounts/register">
          <button className="bg-[#487FFA] text-white font-bold py-2 px-4 rounded-md hover:bg-[#70C247] transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
            Crear Cuenta
          </button>
        </Link>
      </div>
    </div>
  );
}
