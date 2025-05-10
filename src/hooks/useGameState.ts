import { useState, useEffect } from 'react';
import { Character, GameState, Guess } from '../types/game';
import { characters } from '../data/characters';
import { getRandomCharacter, evaluateGuess, isGameWon } from '../utils/gameLogic';

const DEFAULT_MAX_GUESSES = 6;

const initialStats = {
  played: 0,
  won: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: Array(DEFAULT_MAX_GUESSES).fill(0),
};

const useGameState = () => {
  const [state, setState] = useState<GameState>({
    targetCharacter: null,
    guesses: [],
    gameOver: false,
    won: false,
    maxGuesses: DEFAULT_MAX_GUESSES,
    seed: '',
    lastPlayedDate: null,
    tutorial: false,
    stats: initialStats,
  });

  // Load game state from localStorage on mount
  useEffect(() => {
    const loadGame = () => {
      const savedState = localStorage.getItem('haikyudle-state');
      if (savedState) {
        const parsedState = JSON.parse(savedState) as GameState;
        
        // Check if it's a new day
        const today = new Date().toLocaleDateString();
        if (parsedState.lastPlayedDate !== today) {
          // It's a new day, set up a new game
          const { character, seed } = getRandomCharacter(characters);
          setState({
            ...parsedState,
            targetCharacter: character,
            guesses: [],
            gameOver: false,
            won: false,
            seed: seed,
            lastPlayedDate: today,
            tutorial: parsedState.stats.played === 0, // Show tutorial for new players
          });
        } else {
          // Continue the current game
          setState(parsedState);
        }
      } else {
        // First time playing, set up a new game
        const { character, seed } = getRandomCharacter(characters);
        setState({
          ...state,
          targetCharacter: character,
          seed: seed,
          lastPlayedDate: new Date().toLocaleDateString(),
          tutorial: true, // Show tutorial for new players
        });
      }
    };

    loadGame();
  }, []);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (state.targetCharacter) {
      localStorage.setItem('haikyudle-state', JSON.stringify(state));
    }
  }, [state]);

  // Make a guess
  const makeGuess = (guessCharacter: Character) => {
    if (state.gameOver || !state.targetCharacter) return;
    
    // Check if this character has already been guessed
    const alreadyGuessed = state.guesses.some(
      guess => guess.character.id === guessCharacter.id
    );
    
    if (alreadyGuessed) return;
    
    const results = evaluateGuess(guessCharacter, state.targetCharacter);
    const newGuess: Guess = { character: guessCharacter, results };
    const newGuesses = [...state.guesses, newGuess];
    
    const won = isGameWon(newGuesses);
    const gameOver = won || newGuesses.length >= state.maxGuesses;
    
    // Update statistics if game is over
    let newStats = { ...state.stats };
    
    if (gameOver) {
      newStats.played++;
      
      if (won) {
        newStats.won++;
        newStats.currentStreak++;
        if (newStats.currentStreak > newStats.maxStreak) {
          newStats.maxStreak = newStats.currentStreak;
        }
        // Update guess distribution
        const guessCount = newGuesses.length;
        const newDistribution = [...newStats.guessDistribution];
        newDistribution[guessCount - 1]++;
        newStats.guessDistribution = newDistribution;
      } else {
        newStats.currentStreak = 0;
      }
    }
    
    setState({
      ...state,
      guesses: newGuesses,
      gameOver,
      won,
      stats: newStats,
    });
  };

  // Toggle tutorial visibility
  const toggleTutorial = (show?: boolean) => {
    setState(prev => ({
      ...prev,
      tutorial: show !== undefined ? show : !prev.tutorial,
    }));
  };

  return {
    state,
    makeGuess,
    toggleTutorial,
  };
};

export default useGameState;