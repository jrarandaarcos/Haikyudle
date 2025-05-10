import React from 'react';
import { X, ChevronUp, ChevronDown, Check } from 'lucide-react';

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">How to Play</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <p className="text-gray-800">
            Guess the Haikyuu character in 6 tries!
          </p>

          <div className="space-y-2">
            <p className="font-medium">Each guess must be a valid character from Haikyuu.</p>
            <p className="text-gray-700">After each guess, you'll get feedback on how close your guess was to the secret character.</p>
          </div>

          <div className="border-t pt-3">
            <h3 className="font-bold mb-2">Examples</h3>
            
            <div className="bg-green-100 p-2 rounded mb-2 flex items-center">
              <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full mr-2">
                <Check size={16} className="text-white" />
              </div>
              <p><span className="font-bold">Green</span> means the attribute is correct!</p>
            </div>
            
            <div className="bg-yellow-100 p-2 rounded mb-2 flex items-center">
              <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full mr-2">
                <Check size={16} className="text-black" />
              </div>
              <p><span className="font-bold">Yellow</span> means the attribute is close but not exact.</p>
            </div>
            
            <div className="bg-yellow-100 p-2 rounded mb-2 flex items-center">
              <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full mr-2">
                <ChevronUp size={16} className="text-black" />
              </div>
              <p>For height, an <span className="font-bold">up arrow</span> means the target character is taller.</p>
            </div>
            
            <div className="bg-yellow-100 p-2 rounded mb-2 flex items-center">
              <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full mr-2">
                <ChevronDown size={16} className="text-black" />
              </div>
              <p>For height, a <span className="font-bold">down arrow</span> means the target character is shorter.</p>
            </div>
            
            <div className="bg-red-100 p-2 rounded flex items-center">
              <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full mr-2">
                <X size={16} className="text-black" />
              </div>
              <p><span className="font-bold">Red</span> means the attribute is completely wrong.</p>
            </div>
          </div>

          <div className="border-t pt-3">
            <h3 className="font-bold mb-2">A new Haikyuu character is available each day!</h3>
          </div>
          
          <button 
            onClick={onClose}
            className="w-full bg-orange-500 hover:bg-orange-600 text-black py-2 rounded-md font-semibold transition"
          >
            Let's Play!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
