import React from 'react';
import { X } from 'lucide-react';

interface StatisticsProps {
  isOpen: boolean;
  onClose: () => void;
  stats: {
    played: number;
    won: number;
    currentStreak: number;
    maxStreak: number;
    guessDistribution: number[];
  };
}

const Statistics: React.FC<StatisticsProps> = ({ isOpen, onClose, stats }) => {
  if (!isOpen) return null;

  const winPercentage = stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0;
  const maxGuessCount = Math.max(...stats.guessDistribution, 1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Statistics</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.played}</p>
              <p className="text-xs text-gray-600">Played</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{winPercentage}%</p>
              <p className="text-xs text-gray-600">Win %</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.currentStreak}</p>
              <p className="text-xs text-gray-600">Current Streak</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{stats.maxStreak}</p>
              <p className="text-xs text-gray-600">Max Streak</p>
            </div>
          </div>
          
          <h3 className="font-bold mb-2">Guess Distribution</h3>
          
          <div className="space-y-2">
            {stats.guessDistribution.map((count, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-4 text-right">{index + 1}</div>
                <div 
                  className={`h-6 flex items-center ${count > 0 ? 'bg-orange-500' : 'bg-gray-200'} rounded px-2 text-white text-sm font-medium transition-all duration-500 ease-out`}
                  style={{ 
                    width: count > 0 ? `${(count / maxGuessCount) * 100}%` : '24px',
                    minWidth: '24px'
                  }}
                >
                  {count}
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={onClose}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md font-semibold transition mt-6"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Statistics;