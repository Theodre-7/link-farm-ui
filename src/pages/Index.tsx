
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimatedLogo from "@/components/AnimatedLogo";

const Index = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show the logo first
    const timer1 = setTimeout(() => {
      setShowContent(true);
    }, 1000);

    // Navigate to role selection after animation
    const timer2 = setTimeout(() => {
      navigate('/role');
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-cream via-agri-blue/10 to-agri-green/10 flex items-center justify-center">
      <div className="text-center">
        <AnimatedLogo size={120} />
        
        {showContent && (
          <div className="mt-8 animate-fade-up" style={{ animationDelay: '0.5s', animationFillMode: 'backwards' }}>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-agri-green to-agri-brown bg-clip-text text-transparent mb-4">
              AgriLink
            </h1>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Connecting farmers and buyers directly for a sustainable future
            </p>
            
            {/* Loading indicator */}
            <div className="mt-8 flex justify-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-agri-green rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-agri-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-agri-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
