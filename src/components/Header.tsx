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
          src="https://i.imgur.com/K4cnSqn.png" 
          alt="Volleyball" 
          className="w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 h-auto flex item-center space-x-4"></img>
      </div>

<h1 className="text-2xl md:text-3xl font-bold text-center flex-grow text-orange-500">¡Guess the Hakyuu character!</h1>      
      
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
