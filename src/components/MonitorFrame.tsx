import { ReactNode } from "react";

interface MonitorFrameProps {
  children: ReactNode;
  className?: string;
}

const MonitorFrame = ({ children, className = "" }: MonitorFrameProps) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Monitor body */}
      <div className="relative w-full max-w-[560px] rounded-2xl bg-[hsl(220,20%,12%)] border-[3px] border-[hsl(220,15%,22%)] shadow-[0_0_40px_rgba(0,0,0,0.5)] p-[6px]">
        {/* Screen */}
        <div className="relative w-full h-[350px] rounded-xl overflow-hidden bg-background">
          {/* Webcam dot */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 z-20">
            <div className="w-2 h-2 rounded-full bg-[hsl(220,15%,18%)] border border-[hsl(220,10%,25%)]" />
          </div>

          {/* Screen content */}
          <div className="w-full h-full overflow-hidden phone-screen-content">
            {children}
          </div>
        </div>
      </div>

      {/* Stand neck */}
      <div className="w-16 h-6 bg-[hsl(220,15%,14%)] border-x-2 border-[hsl(220,15%,22%)]" />

      {/* Stand base */}
      <div className="w-32 h-3 rounded-b-xl bg-[hsl(220,15%,14%)] border-2 border-t-0 border-[hsl(220,15%,22%)] shadow-[0_4px_12px_rgba(0,0,0,0.3)]" />
    </div>
  );
};

export default MonitorFrame;
