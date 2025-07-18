
import { Sprout } from "lucide-react";

const AnimatedLogo = ({ size = 64 }: { size?: number }) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative">
        <div 
          className="animate-grow bg-gradient-to-tr from-agri-green to-agri-blue rounded-full p-4 shadow-2xl"
          style={{ width: size, height: size }}
        >
          <Sprout 
            size={size * 0.5} 
            className="text-white mx-auto animate-fade-up" 
            style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}
          />
        </div>
        {/* Growing effect circles */}
        <div className="absolute inset-0 rounded-full bg-agri-green opacity-20 animate-ping"></div>
        <div 
          className="absolute inset-0 rounded-full bg-agri-green opacity-10 animate-ping" 
          style={{ animationDelay: '0.3s' }}
        ></div>
      </div>
    </div>
  );
};

export default AnimatedLogo;
