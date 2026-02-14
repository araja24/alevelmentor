/* eslint-disable @next/next/no-img-element */
import React from "react";
import { cn } from "@/lib/utils";

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Device Frame Components
   Composites a React UI "Screen" layer 
   underneath a high-res "Base" image layer.
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function MacBookFrame({ children, className, ...props }: FrameProps) {
    return (
        <div className={cn("relative w-full aspect-[16/10]", className)} {...props}>
            {/* 
        Base Layer (Z-20): The Frame Image 
        - pointer-events-none so clicks pass through to UI if needed,
          but usually the UI is for display.
        - The image has a transparent screen area. 
      */}
            <img
                src="/devices/macbookframe.avif"
                alt="MacBook Frame"
                className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
            />

            {/* 
        Screen Layer (Z-10): The React Content
        - Absolute positioning to fill the container.
        - Inset padding creates the "virtual bezel" to align with the image's screen hole.
        - Tweak these % values if the image aspect ratio differs.
      */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pt-[3.5%] pb-[5.5%] px-[11%]">
                <div className="w-full h-full bg-[#000] overflow-hidden rounded-[4px] sm:rounded-[8px]">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function iPhoneFrame({ children, className, ...props }: FrameProps) {
    return (
        <div className={cn("relative w-full aspect-[9/18]", className)} {...props}>
            {/*
          Base Layer (Z-20): The Frame Image
          - object-contain ensures it fits the aspect ratio box
        */}
            <img
                src="/devices/iphoneframe.avif"
                alt="iPhone Frame"
                className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
            />

            {/*
        Screen Layer (Z-10): The React Content
        - Inset padding tuned for iPhone bezel.
        - Border radius matches the screen curve.
      */}
            <div className="absolute inset-0 z-10 flex items-center justify-center py-[2.5%] px-[6%]">
                <div className="w-full h-full bg-[#000] overflow-hidden rounded-[24px] sm:rounded-[32px]">
                    {children}
                </div>
            </div>
        </div>
    );
}
