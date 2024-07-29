import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/contexts/Auth";

export default function RootLayout({ children }) {
  return (
    <NextUIProvider>
      <AuthProvider>{children}</AuthProvider>
    </NextUIProvider>
  );
}
