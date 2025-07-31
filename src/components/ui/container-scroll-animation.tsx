"use client";
import React, { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils"; // Assuming cn is for class utility

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.4], [30, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center  relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = {
    // Increased gradient sizes to cover corners better
    TOP: "radial-gradient(35% 65% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(28% 55% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM:
      "radial-gradient(35% 65% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT:
      "radial-gradient(28% 55% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  };

  const highlight =
    "radial-gradient(75% 181.15942028985506% at 50% 50%,rgb(206, 209, 167) 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        rotateX: rotate,
        scale,
        // Uniform glow added here
        boxShadow: "0 0 15px #ffffff22, 0 0 30px #ffffff11, 0 0 60px #ffffff05",
      }}
      className={cn(
        "max-w-5xl -mt-12 mx-auto h-[25rem] md:h-[35rem] w-full relative flex rounded-[30px] p-1 md:p-1 bg-transparent overflow-hidden"
      )}
    >
      {/* The inner black div now creates the background for the glass effect and defines the "border" */}
      <div className="bg-black absolute inset-0 rounded-[inherit]" />

      {/* This glow is now behind the inner black background but within the card container */}
      <motion.div
        className="flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: 1 }}
      />

      {/* Your content div, now filling the padded area */}
      <div className="h-full w-full overflow-hidden rounded-[inherit] relative z-20 bg-background dark:bg-zinc-900">
        {children}
      </div>
    </motion.div>
  );
};
