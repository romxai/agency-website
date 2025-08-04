import React, { ReactNode } from "react";

interface SimpleCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning";
  padding?: "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
  shadow = "md",
}) => {
  const variantStyles = {
    default: "bg-white border-gray-200 text-gray-800",
    primary: "bg-blue-50 border-blue-200 text-blue-800",
    secondary: "bg-purple-50 border-purple-200 text-purple-800",
    success: "bg-green-50 border-green-200 text-green-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  };

  const paddingStyles = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  const shadowStyles = {
    none: "",
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={`
        ${variantStyles[variant]}
        ${paddingStyles[padding]}
        ${shadowStyles[shadow]}
        border rounded-lg
        transition-all duration-200
        hover:shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export { SimpleCard };
