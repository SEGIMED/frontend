"use client";
import SubNavbar from "@/components/NavDoc/subNavDoc";

export default function RootLayout({ children, params }) {
  return (
    <div className="flex flex-col w-full h-full px-0">
      <SubNavbar className="justify-start flex" id={params.userId} />
      <div className="h-screen w-full overflow-y-auto">{children}</div>
    </div>
  );
}
