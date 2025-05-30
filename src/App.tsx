import React, { useState, useEffect } from 'react';
import { characters } from './data/characters';
import Header from './components/Header';
import CharacterSearch from './components/CharacterSearch';
import GuessGrid from './components/GuessGrid';
import Tutorial from './components/Tutorial';
import GameOver from './components/GameOver';
import Statistics from './components/Statistics';
import useGameState from './hooks/useGameState';

function App() {
  const { state, makeGuess, toggleTutorial } = useGameState();
  const [showStats, setShowStats] = useState(false);
  const [nextGameTime, setNextGameTime] = useState('');
  const [shareMessage, setShareMessage] = useState('');
  const [showShareMessage, setShowShareMessage] = useState(false);

  useEffect(() => {
    const updateTimeRemaining = () => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      const diffMs = tomorrow.getTime() - now.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

      setNextGameTime(`${diffHrs}h ${diffMins}m ${diffSecs}s`);
    };

    updateTimeRemaining();
    const interval = setInterval(updateTimeRemaining, 1000);
    return () => clearInterval(interval);
  }, []);

  const generateShareText = () => {
    if (!state.targetCharacter) return '';
    const date = new Date().toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    });
    let shareText = `Haikyudle ${date}\n`;
    shareText += `${state.won ? state.guesses.length : 'X'}/${state.maxGuesses}\n\n`;
    state.guesses.forEach(() => {
      shareText += '🏐 ';
    });
    return shareText;
  };

  const handleShare = () => {
    const text = generateShareText();
    setShareMessage(text);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setShowShareMessage(true);
          setTimeout(() => setShowShareMessage(false), 2000);
        })
        .catch(() => {
          setShowShareMessage(true);
          setTimeout(() => setShowShareMessage(false), 2000);
        });
    } else {
      setShowShareMessage(true);
      setTimeout(() => setShowShareMessage(false), 2000);
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Fondo con wallpaper */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images4.alphacoders.com/831/831075.png')",
          filter: 'brightness(0.7)'
        }}
      />

      {/* Capa oscura + blur */}
      <div className="relative z-10 min-h-screen bg-black/40 backdrop-blur-md text-white">
        <Header 
          onOpenTutorial={() => toggleTutorial(true)} 
          onOpenStats={() => setShowStats(true)}
        />

        <main className="flex-1 container mx-auto max-w-2xl px-4 py-6">
          <div className="bg-gray-800 bg-opacity-70 p-4 mb-4 rounded-lg">
            <div className="mb-4">
              <CharacterSearch 
                characters={characters} 
                onSelectCharacter={makeGuess}
                disabled={state.gameOver} 
              />
            </div>
            <GuessGrid 
              guesses={state.guesses} 
              maxGuesses={state.maxGuesses} 
            />
          </div>

          {state.gameOver && state.targetCharacter && (
            <GameOver 
              won={state.won} 
              targetCharacter={state.targetCharacter}
              guesses={state.guesses}
              onShare={handleShare}
              nextGameTime={nextGameTime}
            />
          )}

          {showShareMessage && (
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded-md animate-fadeIn">
              Result copied to clipboard!
            </div>
          )}
        </main>

        <Tutorial 
          isOpen={state.tutorial} 
          onClose={() => toggleTutorial(false)} 
        />

        <Statistics 
          isOpen={showStats} 
          onClose={() => setShowStats(false)} 
          stats={state.stats} 
        />
      </div>
    </div>
  );
}

export default App;

