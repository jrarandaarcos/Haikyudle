export interface Character {
  id: number;
  name: string;
  image: string;
  team: string;
  position: string;
  number: number | null;
  year: number | null;
  height: number;
}

export type GuessResult = {
  attribute: keyof Omit<Character, 'id' | 'image'>;
  value: string | number | null;
  status: 'correct' | 'close' | 'incorrect';
  characterImage?: string;
};

export type Guess = {
  character: Character;
  results: GuessResult[];
};

export interface GameState {
  targetCharacter: Character | null;
  guesses: Guess[];
  gameOver: boolean;
  won: boolean;
  maxGuesses: number;
  seed: string;
  lastPlayedDate: string | null;
  tutorial: boolean;
  stats: {
    played: number;
    won: number;
    currentStreak: number;
    maxStreak: number;
    guessDistribution: number[];
  };
}