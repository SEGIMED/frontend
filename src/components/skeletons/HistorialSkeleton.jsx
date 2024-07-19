"use client";
import { Skeleton } from "@nextui-org/react";

export default function SkeletonList({ count }) {
    return (
        <div className="w-full flex flex-col gap-2">
            {Array.from({ length: count }).map((_, index) => (
                <Skeleton key={index} className="h-10 w-full rounded-lg" />
            ))}
        </div>
    );
}