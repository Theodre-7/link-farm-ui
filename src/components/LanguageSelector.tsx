
import React, { useState } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' }
];

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:border-agri-green transition-colors"
      >
        <Globe className="w-4 h-4 text-agri-green" />
        <span className="text-sm">{selected.flag} {selected.name}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fade-up">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => {
                setSelected(language);
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-agri-cream transition-colors first:rounded-t-lg last:rounded-b-lg"
            >
              <span>{language.flag}</span>
              <span className="text-sm">{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
