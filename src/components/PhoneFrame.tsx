import { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  landscape?: boolean;
}

const PhoneFrame = ({ children, className = "", landscape = false }: PhoneFrameProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Outer body */}
      <div
        className={`relative rounded-[3rem] bg-[hsl(220,20%,12%)] border-[2px] border-[hsl(220,15%,22%)] shadow-[0_0_40px_rgba(0,0,0,0.5)] ${
          landscape ? "w-[460px] h-[290px] p-[6px]" : "w-[300px] h-[600px] p-[6px]"
        }`}
      >
        {/* Side buttons - right */}
        {!landscape && (
          <>
            <div className="absolute -right-[4px] top-[100px] w-[3px] h-[40px] rounded-r-sm bg-[hsl(220,15%,18%)]" />
            <div className="absolute -right-[4px] top-[155px] w-[3px] h-[40px] rounded-r-sm bg-[hsl(220,15%,18%)]" />
            {/* Side button - left */}
            <div className="absolute -left-[4px] top-[120px] w-[3px] h-[55px] rounded-l-sm bg-[hsl(220,15%,18%)]" />
          </>
        )}

        {/* Inner screen bezel */}
        <div
          className={`relative w-full h-full rounded-[2.4rem] overflow-hidden bg-background`}
        >
          {/* Dynamic Island / Notch */}
          {!landscape && (
            <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
              <div className="w-20 h-[22px] bg-[hsl(220,25%,6%)] rounded-full flex items-center px-2">
                <div className="w-[10px] h-[10px] rounded-full bg-[hsl(220,15%,18%)] border border-[hsl(220,10%,25%)]" />
              </div>
            </div>
          )}

          {/* Screen content */}
          <div className="w-full h-full overflow-hidden phone-screen-content">
            {children}
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-muted-foreground/30 rounded-full z-20" />
        </div>
      </div>
    </div>
  );
};

export default PhoneFrame;
