import "./globals.css";
import StoreProvider from "./StoreProvider";
import { Providers } from "./providers";

export const metadata = {
  title: "Segimed App",
  description: "Segimed aplicación de telemedicina para médicos y pacientes",
  manifest: "/manifest.json",
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
      <body className="font-Poppins">
        <div className="w-full relative">
          <Providers>
            <StoreProvider>{children}</StoreProvider>
          </Providers>
        </div>
      </body>
    </html>
  );
}
