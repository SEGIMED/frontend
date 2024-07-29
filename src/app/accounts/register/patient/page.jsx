"use client";

import LogoSegimed from "@/components/logo/LogoSegimed";
import Link from "next/link";
import Form from "@/components/forms/Form";
import { FooterAccount } from "@/components/footer/footerAccount";
import IconArrowLeft from "@/components/icons/IconArrowLeft";

export default function DoctorForm() {
  return (
    <div className="flex justify-center h-screen">
      <div className="md:w-full bg-[#FBFBFB] w-1/2 h-full shadow-xl flex flex-col justify-between px-20">
        <div className="pt-5 px-20 flex items-center justify-between">
          <Link href="/">
            <LogoSegimed />
          </Link>
          <Link href="/">
            <button className="bg-[#487FFA] py-3 px-6 flex items-center justify-center rounded-lg text-white font-extrabold gap-2 hover:bg-[#70C247] transition duration-300 ease-in-out transform hover:scale-105 active:scale-100 active:translate-y-1">
              <IconArrowLeft iconColor="white" /> Regresar
            </button>
          </Link>
        </div>

        <div className="text-center">
          <p className="text-xl">Complete sus datos.</p>
        </div>
        <Form />
        <FooterAccount />
      </div>
    </div>
  );
}
