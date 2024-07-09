import "./globals.css";
import { Inter } from "next/font/google";
import StoreProvider from "./StoreProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Segimed App",
  description: "Segimed aplicación de telemedicina para médicos y pacientes",
};

export async function generateViewport() {
  return {
    width: "device-width",
    height: "device-height",
    initialScale: 1.0,
    minimumScale: 1.0,
    targetDensityDpi: "device-dpi",
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full relative">
          <StoreProvider>{children}</StoreProvider>
        </div>
      </body>
    </html>
  );
}
