"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface FormTooltipProps {
  message: string;
  type: "error" | "success";
  isVisible: boolean;
  position?: "top" | "bottom";
}

const FormTooltip = ({ message, type, isVisible, position = "top" }: FormTooltipProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: position === "top" ? 10 : -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: position === "top" ? 10 : -10, scale: 0.95 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`absolute z-50 ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          } left-0 right-0`}
        >
          <div
            className={`relative px-3 py-2 rounded-lg shadow-lg border backdrop-blur-sm ${
              type === "error"
                ? "bg-red-500/10 border-red-500/30 text-red-400"
                : "bg-green-500/10 border-green-500/30 text-green-400"
            }`}
          >
            {/* Arrow */}
            <div
              className={`absolute w-2 h-2 bg-inherit border-inherit transform rotate-45 ${
                position === "top"
                  ? "top-full -mt-1 left-4"
                  : "bottom-full -mb-1 left-4"
              }`}
              style={{
                borderTop: position === "top" ? "1px solid" : "none",
                borderLeft: position === "top" ? "1px solid" : "none",
                borderBottom: position === "bottom" ? "1px solid" : "none",
                borderRight: position === "bottom" ? "1px solid" : "none",
              }}
            />
            
            <div className="flex items-center space-x-2">
              {type === "error" ? (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              ) : (
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="text-sm font-medium">{message}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FormTooltip; 