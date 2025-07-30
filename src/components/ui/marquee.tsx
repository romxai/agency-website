import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  speed?: string;
  pauseOnHover?: boolean;
}

const Marquee = ({
  children,
  speed = "40s",
  pauseOnHover = true,
  className,
}: MarqueeProps) => {
  return (
    <div
      className={cn("group flex w-full overflow-hidden p-2", className)}
      style={{ "--duration": speed } as React.CSSProperties}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-around gap-12 animate-scroll-left",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {/* Render children twice for the seamless loop */}
        {children}
        {children}
      </div>
    </div>
  );
};

export default Marquee;
