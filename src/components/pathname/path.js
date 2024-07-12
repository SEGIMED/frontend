"use client";


import { usePathname } from "next/navigation";

export const PathnameShow = () => {
    const pathname = usePathname();
    const lastSegmentText = pathname
        .substring(pathname.lastIndexOf("/") + 1)
        .replace(/_/g, " ");


    const lastSegmentTextToShow = `${lastSegmentText} | Segimed`

    return lastSegmentTextToShow
}