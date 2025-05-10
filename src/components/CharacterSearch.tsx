import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Character } from '../types/game';

interface CharacterSearchProps {
  characters: Character[];
  onSelectCharacter: (character: Character) => void;
  disabled: boolean;
}

const CharacterSearch: React.FC<CharacterSearchProps> = ({ 
  characters, 
  onSelectCharacter,
  disabled
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCharacters([]);
      return;
    }

    const filtered = characters.filter(character =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase())
    ).slice(0, 8); // Limit to 8 suggestions
    
    setFilteredCharacters(filtered);
    setIsDropdownOpen(filtered.length > 0);
  }, [searchTerm, characters]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current && 
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectCharacter = (character: Character) => {
    onSelectCharacter(character);
    setSearchTerm('');
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={20} className="text-gray-400" />
        </div>
        <input
          ref={inputRef}
          type="text"
          className={`block w-full pl-10 pr-4 py-3 border ${disabled ? 'bg-gray-800' : 'bg-black'} border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent`}
          placeholder="Search for a character..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => searchTerm.trim() !== '' && setIsDropdownOpen(true)}
          disabled={disabled}
        />
      </div>
      
      {isDropdownOpen && (
        <div 
          ref={dropdownRef}
          className="absolute z-10 w-full mt-1 bg-black border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredCharacters.map(character => (
            <div
              key={character.id}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectCharacter(character)}
            >
              <img 
                src={character.image} 
                alt={character.name} 
                className="w-8 h-8 rounded-full object-cover mr-2"
              />
              <span>{character.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CharacterSearch;
