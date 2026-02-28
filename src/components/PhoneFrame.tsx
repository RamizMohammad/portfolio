import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  landscape?: boolean;
}

const PhoneFrame = ({ children, className = "", landscape = false }: PhoneFrameProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      <div
        className={`relative rounded-[2.5rem] border-[3px] border-muted-foreground/20 bg-card overflow-hidden glow-sm ${
          landscape ? "w-[420px] h-[260px]" : "w-[280px] h-[560px]"
        }`}
      >
        {/* Notch */}
        {!landscape && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-background rounded-b-2xl z-10" />
        )}
        
        {/* Screen content */}
        <div className="w-full h-full overflow-hidden bg-background/50">
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-muted-foreground/30 rounded-full" />
      </div>
    </motion.div>
  );
};

export default PhoneFrame;
