
import { useNavigate } from "react-router-dom";
import { Tractor, ShoppingCart } from "lucide-react";
import RippleButton from "@/components/RippleButton";
import AnimatedLogo from "@/components/AnimatedLogo";
import LanguageSelector from "@/components/LanguageSelector";

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-agri-cream via-agri-blue/10 to-agri-green/10">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <AnimatedLogo size={48} />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-agri-green to-agri-brown bg-clip-text text-transparent">
            AgriLink
          </h1>
        </div>
        <LanguageSelector />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose Your Role
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select how you'd like to use AgriLink to connect with our community
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
          {/* Farmer Button */}
          <div className="text-center animate-fade-up" style={{ animationDelay: '0.2s', animationFillMode: 'backwards' }}>
            <RippleButton
              variant="farmer"
              onClick={() => navigate('/signup')}
              className="mb-4"
            >
              <div className="flex flex-col items-center">
                <Tractor className="w-16 h-16 mb-3" />
                <span>I'm a Farmer</span>
              </div>
            </RippleButton>
            <p className="text-gray-600 max-w-xs">
              Sell your produce directly to buyers and get better prices
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-32 bg-gray-300"></div>
          <div className="md:hidden w-32 h-px bg-gray-300"></div>

          {/* Buyer Button */}
          <div className="text-center animate-fade-up" style={{ animationDelay: '0.4s', animationFillMode: 'backwards' }}>
            <RippleButton
              variant="buyer"
              onClick={() => navigate('/signup')}
              className="mb-4"
            >
              <div className="flex flex-col items-center">
                <ShoppingCart className="w-16 h-16 mb-3" />
                <span>I'm a Buyer</span>
              </div>
            </RippleButton>
            <p className="text-gray-600 max-w-xs">
              Source fresh produce directly from farmers at competitive prices
            </p>
          </div>
        </div>

        {/* Already have account */}
        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}>
          <p className="text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-agri-green font-semibold hover:text-agri-green/80 transition-colors underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
