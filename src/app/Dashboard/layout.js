import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { NextUIProvider } from "@nextui-org/react";

export default function RootLayout({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
