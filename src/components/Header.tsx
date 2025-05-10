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
          src="https://gimgs2.nohat.cc/thumb/f/350/image-file-formats-haikyuu-png-picture-png-download-630-450--comdlpng6951853.jpg" 
          alt="Volleyball" 
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 mr-3"
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
