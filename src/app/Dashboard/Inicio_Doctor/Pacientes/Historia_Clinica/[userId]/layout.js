"use client";
import SubNavbar from "@/components/NavDoc/subNavDoc";

export default function RootLayout({ children, params }) {
  return (
    <div className="flex flex-col w-full h-full">
      <SubNavbar className="justify-start" id={params.userId} />
      <div className="h-screen w-full overflow-y-auto">{children}</div>
    </div>
  );
}
