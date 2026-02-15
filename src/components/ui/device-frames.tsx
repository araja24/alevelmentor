"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    glow?: boolean;
    glowColor?: string;
}

export function MacBookFrame({ children, className, glow = false, glowColor = "var(--accent-1)", style, ...props }: FrameProps) {
    return (
        <div
            className={cn("relative w-full aspect-[16/10]", className)}
            style={{
                ...style,
                ...(glow ? {
                    filter: `drop-shadow(0 0 80px color-mix(in srgb, ${glowColor} 15%, transparent)) drop-shadow(0 8px 60px rgba(0,0,0,0.6))`,
                } : {
                    filter: "drop-shadow(0 8px 40px rgba(0,0,0,0.5))",
                }),
            }}
            {...props}
        >
            {/* Glow layer */}
            {glow && (
                <div
                    className="absolute inset-0 z-0 rounded-[12px] animate-pulse-glow"
                    style={{
                        background: `radial-gradient(ellipse at 50% 60%, color-mix(in srgb, ${glowColor} 12%, transparent), transparent 70%)`,
                        filter: "blur(40px)",
                    }}
                />
            )}
            {/* Frame image */}
            <Image
                src="/devices/macbookframe.avif"
                alt=""
                fill
                className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
                unoptimized
            />
            {/* Screen content */}
            <div className="absolute inset-0 z-10 pt-[3.2%] pb-[5.8%] px-[11.2%]">
                <div className="w-full h-full overflow-hidden rounded-[3px] sm:rounded-[6px] flex flex-col" style={{ background: "var(--bg-primary)" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export function IPhoneFrame({ children, className, glow = false, glowColor = "var(--accent-2)", style, ...props }: FrameProps) {
    return (
        <div
            className={cn("relative w-full aspect-[9/19.2]", className)}
            style={{
                ...style,
                ...(glow ? {
                    filter: `drop-shadow(0 0 60px color-mix(in srgb, ${glowColor} 15%, transparent)) drop-shadow(0 6px 40px rgba(0,0,0,0.6))`,
                } : {
                    filter: "drop-shadow(0 6px 30px rgba(0,0,0,0.5))",
                }),
            }}
            {...props}
        >
            {glow && (
                <div
                    className="absolute inset-0 z-0 rounded-[16px] animate-pulse-glow"
                    style={{
                        background: `radial-gradient(ellipse at 50% 60%, color-mix(in srgb, ${glowColor} 12%, transparent), transparent 70%)`,
                        filter: "blur(30px)",
                    }}
                />
            )}
            <Image
                src="/devices/iphoneframe.avif"
                alt=""
                fill
                className="absolute inset-0 w-full h-full object-contain z-20 pointer-events-none"
                unoptimized
            />
            <div className="absolute inset-0 z-10 pt-[5%] pb-[5%] px-[6.5%]">
                <div className="w-full h-full overflow-hidden rounded-[10%] flex flex-col" style={{ background: "var(--bg-primary)" }}>
                    {children}
                </div>
            </div>
        </div>
    );
}
