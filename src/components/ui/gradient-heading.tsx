import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const headingVariants = cva("tracking-tight bg-clip-text text-transparent", {
  variants: {
    variant: {
      // MODIFIED: All variants now use HEX codes
      default: "bg-gradient-to-t from-[#342f1c] from-1% to-[#fff6ce]",
      pink: "bg-gradient-to-t from-[#18181B] from-35% to-[#FFFFFF]",
      light: "bg-gradient-to-t from-[#E5E5E5] to-[#D4D4D4]",
      accent1:
        "bg-gradient-to-t from-[#713F12] from-30% via-[#EAB3084D] via-10% to-[#FFFFFF]",
      accent2: "bg-gradient-to-tl from-[#e7c95c] to-[#FFF4CF] from-20%",
      accent3: "bg-gradient-to-b from-[#FFF4CF] to-[#e7c034]",
      secondary:
        "bg-gradient-to-t from-[#737373] to-[#525252] dark:from-[#E7E5E4] dark:to-[#E5E5E5]",
    },
    size: {
      default: "text-2xl sm:text-3xl lg:text-4xl",
      xxs: "text-base sm:text-lg lg:text-lg",
      xxxs: "text-sm sm:text-base lg:text-base",
      xs: "text-lg sm:text-xl lg:text-2xl",
      sm: "text-xl sm:text-2xl lg:text-3xl",
      md: "text-2xl sm:text-3xl lg:text-4xl",
      lg: "text-[3rem] sm:text-[4rem] md:text-[4rem] lg:text-[4rem]",
      xl: "text-4xl sm:text-5xl lg:text-6xl",
      xll: "text-5xl sm:text-6xl lg:text-[5.4rem] lg:leading-[0.5rem]",
      xxl: "text-5xl sm:text-6xl lg:text-[6rem]",
      xxxl: "text-[4rem] sm:text-[6rem] md:text-[6rem] lg:text-[7rem]",
    },
    weight: {
      default: "font-regular",
      thin: "font-thin",
      base: "font-base",
      semi: "font-semibold",
      bold: "font-bold",
      black: "font-black",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    weight: "default",
  },
});

export interface HeadingProps extends VariantProps<typeof headingVariants> {
  asChild?: boolean;
  children: React.ReactNode;
  className?: string;
}

const GradientHeading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ asChild, variant, weight, size, className, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "h3"; // default to 'h3' if not a child

    const renderLines = () => {
      if (typeof children !== "string") {
        return (
          <span className={cn(headingVariants({ variant, size, weight }))}>
            {children}
          </span>
        );
      }

      return children.split(/(\n|<br\s*\/?>)/g).map((part, index) => {
        if (part.match(/(\n|<br\s*\/?>)/)) {
          return <br key={`br-${index}`} />;
        }
        if (part) {
          return (
            <span
              key={`line-${index}`}
              className={cn(headingVariants({ variant, size, weight }))}
            >
              {part}
            </span>
          );
        }
        return null;
      });
    };

    return (
      <Comp ref={ref} {...props} className={className}>
        {renderLines()}
      </Comp>
    );
  }
);

GradientHeading.displayName = "GradientHeading";

// Manually define the variant types for external use if needed
export type Variant =
  | "default"
  | "pink"
  | "light"
  | "accent1"
  | "accent2"
  | "accent3"
  | "secondary";
export type Size =
  | "default"
  | "xxs"
  | "xxxs"
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "xll"
  | "xxl"
  | "xxxl";
export type Weight = "default" | "thin" | "base" | "semi" | "bold" | "black";

export { GradientHeading, headingVariants };
