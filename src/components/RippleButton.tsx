
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface RippleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'farmer' | 'buyer';
}

const RippleButton = ({ children, onClick, className, variant = 'farmer' }: RippleButtonProps) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      id: Date.now(),
      x,
      y
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
    
    onClick?.();
  };

  const baseClasses = "relative overflow-hidden w-64 h-64 rounded-full font-semibold text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl active:scale-95";
  
  const variantClasses = {
    farmer: "bg-gradient-to-br from-agri-green to-agri-blue text-white border-4 border-agri-green/30",
    buyer: "bg-gradient-to-br from-agri-orange to-agri-brown text-white border-4 border-agri-orange/30"
  };

  return (
    <button
      className={cn(baseClasses, variantClasses[variant], className)}
      onClick={handleClick}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x - 2,
            top: ripple.y - 2,
            width: 4,
            height: 4,
          }}
        />
      ))}
    </button>
  );
};

export default RippleButton;
