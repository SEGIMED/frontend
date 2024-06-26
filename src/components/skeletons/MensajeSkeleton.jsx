"use client"
import {Skeleton} from "@nextui-org/react";

export default function MensajeSkeleton() {
  return (
    <div className=" w-full flex items-center gap-3">
      
      <div className="w-full flex flex-col gap-2">
        <Skeleton className="h-10 w-full rounded-lg"/>
        <Skeleton className="h-10 w-full rounded-lg"/>
        <Skeleton className="h-10 w-full rounded-lg"/>
        <Skeleton className="h-10 w-full rounded-lg"/>
        <Skeleton className="h-10 w-full rounded-lg"/> 
        <Skeleton className="h-10 w-full rounded-lg"/> 
        <Skeleton className="h-10 w-full rounded-lg"/>
        <Skeleton className="h-10 w-full rounded-lg"/>
        <Skeleton className="h-10 w-full rounded-lg"/> 
        <Skeleton className="h-10 w-full rounded-lg"/> 
        <Skeleton className="h-10 w-full rounded-lg"/>
        <Skeleton className="h-10 w-full rounded-lg"/>
        <Skeleton className="h-10 w-full rounded-lg"/>
        <Skeleton className="h-10 w-full rounded-lg"/> 
        <Skeleton className="h-10 w-full rounded-lg"/> 
        <Skeleton className="h-10 w-full rounded-lg"/>
      </div>
    </div>
  );
}
