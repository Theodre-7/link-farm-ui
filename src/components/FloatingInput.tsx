
import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  isValid?: boolean;
  className?: string;
}

const FloatingInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  onBlur,
  error, 
  isValid,
  className 
}: FloatingInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("floating-label-group w-full", className)}>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        placeholder=" "
        className={cn(
          "floating-input w-full px-4 py-3 border-2 rounded-xl bg-white transition-all duration-300 outline-none",
          isFocused ? "border-agri-green shadow-lg" : "border-gray-200",
          error && "border-red-400 animate-shake",
          isValid && "border-agri-green",
          "hover:border-agri-green/50"
        )}
      />
      <label className="floating-label">
        {label}
      </label>
      
      {/* Validation icons */}
      {isValid && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <Check className="w-5 h-5 text-agri-green animate-check" />
        </div>
      )}
      
      {error && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <X className="w-5 h-5 text-red-400" />
        </div>
      )}
      
      {/* Error message */}
      {error && (
        <p className="text-red-400 text-sm mt-1 animate-fade-up">
          {error}
        </p>
      )}
    </div>
  );
};

export default FloatingInput;
