import React from 'react';
import { Character, Guess } from '../types/game';
import { Share2 } from 'lucide-react';

interface GameOverProps {
  won: boolean;
  targetCharacter: Character;
  guesses: Guess[];
  onShare: () => void;
  nextGameTime: string;
}

const GameOver: React.FC<GameOverProps> = ({ 
  won, 
  targetCharacter, 
  guesses, 
  onShare,
  nextGameTime
}) => {
  return (
    <div className="mt-4 p-4 bg-gray-900 rounded-lg shadow-lg animate-fadeIn">
      <h2 className="text-xl font-bold text-center mb-4">
        {won ? '🎉 You won! 🎉' : '😔 Better luck next time!'}
      </h2>
      
      <div className="flex flex-col items-center mb-6">
        <img 
          src={targetCharacter.image} 
          alt={targetCharacter.name} 
          className="w-20 h-20 rounded-full object-cover mb-2"
        />
        <h3 className="text-lg font-semibold text-center">
          {targetCharacter.name}
        </h3>
        <p className="text-gray-600 text-center">
          {targetCharacter.team} • {targetCharacter.position} • 
          {targetCharacter.number ? ` #${targetCharacter.number}` : ' No Number'} • 
          {targetCharacter.year ? ` ${targetCharacter.year}${getYearSuffix(targetCharacter.year)} Year` : ' Staff'} • 
          {targetCharacter.height} cm
        </p>
      </div>
      
      <div className="text-center mb-4">
        <p className="text-gray-700">
          {won 
            ? `You found the character in ${guesses.length} ${guesses.length === 1 ? 'guess' : 'guesses'}!` 
            : `You used all ${guesses.length} guesses. The character was ${targetCharacter.name}.`}
        </p>
      </div>
      
      <button
        onClick={onShare}
        className="w-full flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-semibold transition mb-4"
      >
        <Share2 size={18} className="mr-2" />
        Share Result
      </button>
      
      <div className="text-center text-gray-600 mt-2">
        <p>Next Haikyudle in</p>
        <p className="font-semibold">{nextGameTime}</p>
      </div>
    </div>
  );
};

// Helper function for ordinal suffixes
const getYearSuffix = (year: number): string => {
  if (year === 1) return 'st';
  if (year === 2) return 'nd';
  if (year === 3) return 'rd';
  return 'th';
};

export default GameOver;
