import { Character, Guess, GuessResult } from '../types/game';

/**
 * Compare a guess with the target character and generate results
 */
export const evaluateGuess = (guessCharacter: Character, targetCharacter: Character): GuessResult[] => {
  const results: GuessResult[] = [];

  // Helper function to determine if a numeric value is close (within 5%)
  const isClose = (value: number, target: number): boolean => {
    const diff = Math.abs(value - target);
    const percentage = (diff / target) * 100;
    return percentage <= 5;
  };

  // Compare name
  results.push({
    attribute: 'name',
    value: guessCharacter.name,
    status: guessCharacter.name === targetCharacter.name ? 'correct' : 'incorrect',
  });

  // Compare team
  results.push({
    attribute: 'team',
    value: guessCharacter.team,
    status: guessCharacter.team === targetCharacter.team ? 'correct' : 'incorrect',
  });

  // Compare position
  results.push({
    attribute: 'position',
    value: guessCharacter.position,
    status: guessCharacter.position === targetCharacter.position ? 'correct' : 'incorrect',
  });

  // Compare number
  if (guessCharacter.number !== null && targetCharacter.number !== null) {
    let numberStatus: 'correct' | 'close' | 'incorrect';
    if (guessCharacter.number === targetCharacter.number) {
      numberStatus = 'correct';
    } else if (Math.abs(guessCharacter.number - targetCharacter.number) <= 2) {
      numberStatus = 'close';
    } else {
      numberStatus = 'incorrect';
    }

    results.push({
      attribute: 'number',
      value: guessCharacter.number,
      status: numberStatus,
    });
  } else {
    results.push({
      attribute: 'number',
      value: guessCharacter.number,
      status: guessCharacter.number === targetCharacter.number ? 'correct' : 'incorrect',
    });
  }

  // Compare year
  if (guessCharacter.year !== null && targetCharacter.year !== null) {
    let yearStatus: 'correct' | 'close' | 'incorrect';
    if (guessCharacter.year === targetCharacter.year) {
      yearStatus = 'correct';
    } else {
      yearStatus = 'incorrect';
    }

    results.push({
      attribute: 'year',
      value: guessCharacter.year,
      status: yearStatus,
    });
  } else {
    results.push({
      attribute: 'year',
      value: guessCharacter.year,
      status: guessCharacter.year === targetCharacter.year ? 'correct' : 'incorrect',
    });
  }

  // Compare height
  if (guessCharacter.height && targetCharacter.height) {
    let heightStatus: 'correct' | 'close' | 'incorrect';
    if (guessCharacter.height === targetCharacter.height) {
      heightStatus = 'correct';
    } else if (isClose(guessCharacter.height, targetCharacter.height)) {
      heightStatus = 'close';
    } else {
      // Add arrows to indicate higher or lower
      heightStatus = 'incorrect';
    }

    results.push({
      attribute: 'height',
      value: guessCharacter.height,
      status: heightStatus,
    });
  }

  return results;
};

// Function to get a pseudorandom character based on the day
export const getRandomCharacter = (characters: Character[]): { character: Character, seed: string } => {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  let seed = 0;
  
  // Create a simple hash from the date string
  for (let i = 0; i < dateString.length; i++) {
    seed = ((seed << 5) - seed) + dateString.charCodeAt(i);
    seed = seed & seed; // Convert to 32bit integer
  }
  
  // Use the seed to get a character
  const index = Math.abs(seed) % characters.length;
  
  return { 
    character: characters[index], 
    seed: dateString 
  };
};

// Format a guess result for display
export const formatGuessResult = (result: GuessResult): string => {
  let displayValue = result.value;
  
  // Format based on attribute type
  switch (result.attribute) {
    case 'height':
      displayValue = `${result.value} cm`;
      break;
    case 'year':
      if (result.value === 1) displayValue = "1st Year";
      else if (result.value === 2) displayValue = "2nd Year";
      else if (result.value === 3) displayValue = "3rd Year";
      else displayValue = result.value === null ? "N/A" : `${result.value}`;
      break;
    case 'number':
      displayValue = result.value === null ? "N/A" : `#${result.value}`;
      break;
    default:
      displayValue = result.value === null ? "N/A" : `${result.value}`;
  }
  
  return `${displayValue}`;
};

// Check if the game is won
export const isGameWon = (guesses: Guess[]): boolean => {
  if (guesses.length === 0) return false;
  const latestGuess = guesses[guesses.length - 1];
  
  // Check if all attributes are correct
  return latestGuess.results.every(result => result.status === 'correct');
};