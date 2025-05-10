import React from 'react';
import { HelpCircle, Settings, BarChart3 } from 'lucide-react';

interface HeaderProps {
  onOpenTutorial: () => void;
  onOpenStats: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenTutorial, onOpenStats }) => {
  return (
    <header className="bg-black text-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <img 
          src="https://image.tmdb.org/t/p/original/4IcVSKtK0e5RIIpFnD29xU0P5mI.png" 
          alt="Volleyball" 
          className="w-10 h-10 mr-3"
        />
      </div>
      
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={onOpenTutorial} 
          className="text-gray-300 hover:text-orange-400 transition"
          aria-label="Help"
        >
          <HelpCircle size={24} />
        </button>
        <button 
          onClick={onOpenStats} 
          className="text-gray-300 hover:text-orange-400 transition"
          aria-label="Statistics"
        >
          <BarChart3 size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;
