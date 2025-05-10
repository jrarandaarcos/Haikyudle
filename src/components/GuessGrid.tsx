import React from 'react';
import { ChevronUp, ChevronDown, Check, X } from 'lucide-react';
import { Guess, GuessResult } from '../types/game';
import { formatGuessResult } from '../utils/gameLogic';

interface GuessGridProps {
  guesses: Guess[];
  maxGuesses: number;
}

const GuessGrid: React.FC<GuessGridProps> = ({ guesses, maxGuesses }) => {
  // Create empty guesses to fill up to maxGuesses
  const emptyGuesses = maxGuesses - guesses.length;
  
  const renderStatus = (result: GuessResult) => {
    if (result.status === 'correct') {
      return <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full"><Check size={16} className="text-white" /></div>;
    } else if (result.status === 'close') {
      if (result.attribute === 'height') {
        // Show up/down arrow for height
        const value = result.value as number;
        const target = guesses[0].character.height; // Use any character as reference
        
        return value > target ? 
          <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full"><ChevronDown size={16} className="text-white" /></div> :
          <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full"><ChevronUp size={16} className="text-white" /></div>;
      }
      return <div className="flex items-center justify-center w-6 h-6 bg-yellow-500 rounded-full"><Check size={16} className="text-white" /></div>;
    } else {
      return <div className="flex items-center justify-center w-6 h-6 bg-red-500 rounded-full"><X size={16} className="text-white" /></div>;
    }
  };

  const renderHeaderCell = (label: string) => (
    <th className="px-2 py-1 text-xs md:text-sm font-medium text-gray-700 bg-gray-100">{label}</th>
  );

  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="px-2 py-1 text-xs md:text-sm font-medium text-gray-700 bg-gray-100">Character</th>
            <th className="px-2 py-1 text-xs md:text-sm font-medium text-gray-700 bg-gray-100">Team</th>
            <th className="px-2 py-1 text-xs md:text-sm font-medium text-gray-700 bg-gray-100">Position</th>
            <th className="px-2 py-1 text-xs md:text-sm font-medium text-gray-700 bg-gray-100">Number</th>
            <th className="px-2 py-1 text-xs md:text-sm font-medium text-gray-700 bg-gray-100">Year</th>
            <th className="px-2 py-1 text-xs md:text-sm font-medium text-gray-700 bg-gray-100">Height</th>
          </tr>
        </thead>
        <tbody>
          {guesses.map((guess, index) => (
            <tr key={index} className="animate-fadeIn">
              <td className="border px-1 py-1">
                <div className="flex items-center space-x-2">
                  <img 
                    src={guess.character.image} 
                    alt={guess.character.name}
                    className="w-8 h-8 rounded-full object-cover" 
                  />
                  <div className="flex flex-col">
                    <span className="text-xs md:text-sm font-medium">{guess.character.name}</span>
                    {renderStatus(guess.results.find(r => r.attribute === 'name')!)}
                  </div>
                </div>
              </td>
              {['team', 'position', 'number', 'year', 'height'].map(attr => {
                const result = guess.results.find(r => r.attribute === attr)!;
                return (
                  <td key={attr} className={`border px-1 py-1 text-center ${result.status === 'correct' ? 'bg-green-100' : result.status === 'close' ? 'bg-yellow-100' : ''}`}>
                    <div className="flex flex-col items-center">
                      <span className="text-xs md:text-sm">{formatGuessResult(result)}</span>
                      {renderStatus(result)}
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
          
          {/* Empty rows for remaining guesses */}
          {Array.from({ length: emptyGuesses }).map((_, index) => (
            <tr key={`empty-${index}`}>
              <td className="border px-1 py-3"></td>
              <td className="border px-1 py-3"></td>
              <td className="border px-1 py-3"></td>
              <td className="border px-1 py-3"></td>
              <td className="border px-1 py-3"></td>
              <td className="border px-1 py-3"></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GuessGrid;