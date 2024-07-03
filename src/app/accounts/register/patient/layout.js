import { NavBarAcc } from "@/components/NavBar/navbarAcc";
import { Inter } from "next/font/google";
import { FooterAcc } from "@/components/footer/footerAcc";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <div className="relative">
      {/* Barra de navegación */}
      <div className="fixed top-0 left-0 z-50 w-full flex justify-start">
        <NavBarAcc />
      </div>
      {/* Contenido principal */}
      <div>
        {" "}
        {/* Agregar un margen superior para evitar que el contenido se solape con la barra de navegación */}
        {children}
      </div>
      {/* Pie de página */}
      <div className="fixed bottom-0 left-0 z-10 w-full flex justify-start">
        <FooterAcc />
      </div>
    </div>
  );
}
