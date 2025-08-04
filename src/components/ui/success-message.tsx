"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { GradientHeading } from "@/components/ui/gradient-heading";

interface SuccessMessageProps {
  message: string;
  onClose?: () => void;
}

const SuccessMessage = ({ message, onClose }: SuccessMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative overflow-hidden"
    >
      {/* Background with gradient border */}
      <div className="bg-black/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-zinc-800 relative">
        {/* Gold fading border */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[#FFED99]/50 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#FFED99]/50 to-transparent"></div>
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[#FFED99]/50 to-transparent"></div>
        

        {/* Content */}
        <div className="relative z-10 text-center space-y-4 sm:space-y-6">
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30"
          >
            <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
          </motion.div>

          {/* Success Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GradientHeading
              size="md"
              weight="semi"
              variant="accent2"
              className="font-monesta-semibold text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3"
            >
              Message Sent Successfully
            </GradientHeading>
          </motion.div>

          {/* Success Message */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-400 text-sm sm:text-base font-red-hat-display max-w-md mx-auto leading-relaxed"
          >
            {message}
          </motion.p>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xs sm:text-sm text-zinc-500 font-red-hat-display"
          >
            We'll get back to you within 24 hours
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default SuccessMessage; 