import React from 'react';
import { Heart } from 'lucide-react';
import { Pokemon } from '../types';

interface PokemonCardProps {
  pokemon: Pokemon; // The Pokémon object containing its details
  onClick: () => void; // Function to call when the card is clicked
  isFavorite: boolean; // Boolean indicating if the Pokémon is marked as a favorite
  onToggleFavorite: (e: React.MouseEvent) => void; // Function to toggle favorite status
}

export function PokemonCard({
  pokemon,
  onClick,
  isFavorite,
  onToggleFavorite,
}: PokemonCardProps) {
  return (
    <div
      onClick={onClick} 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-lg p-4 cursor-pointer transform transition-transform hover:scale-105 relative"
    >
      {/* Favorite Button */}
      <button
        onClick={onToggleFavorite} 
        className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-red-700 transition-colors z-10"
      >
        <Heart
          className={`w-5 h-5 ${
            isFavorite 
              ? 'fill-red-500 text-red-500'
              : 'text-gray-400 dark:text-gray-500'
          }`}
        />
      </button>
      
      {/* Pokémon Image */}
      <img
        src={pokemon.sprites.other['official-artwork'].front_default} 
        alt={pokemon.name} 
        className="w-full h-48 object-contain mb-4" 
      />
      
      {/* Pokémon Name and ID */}
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-xl font-bold capitalize dark:text-white">
          {pokemon.name} 
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          #{String(pokemon.id).padStart(3, '0')} 
        </span>
      </div>
      
      {/* Pokémon Types */}
      <div className="flex gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type.type.name} 
            className="px-3 py-1 rounded-full text-sm text-white bg-blue-500 dark:bg-blue-600"
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}