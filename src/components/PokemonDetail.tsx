import React from 'react';
import { X } from 'lucide-react';
import { Pokemon } from '../types';

interface PokemonDetailProps {
  pokemon: Pokemon;
  onClose: () => void;
}

export function PokemonDetail({ pokemon, onClose }: PokemonDetailProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-3xl font-bold capitalize dark:text-white">{pokemon.name}</h2>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
            >
              <X className="w-6 h-6 dark:text-gray-400" />
            </button>
          </div>
          
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-full h-64 object-contain mb-6"
          />
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Types</h3>
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
            <div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Abilities</h3>
              <div className="flex flex-wrap gap-2">
                {pokemon.abilities.map((ability) => (
                  <span
                    key={ability.ability.name}
                    className="px-3 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
                  >
                    {ability.ability.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2 dark:text-gray-200">Stats</h3>
            <div className="space-y-2">
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name}>
                  <div className="flex justify-between mb-1">
                    <span className="capitalize dark:text-gray-200">{stat.stat.name}</span>
                    <span className="dark:text-gray-200">{stat.base_stat}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 dark:bg-blue-400 rounded-full h-2"
                      style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Height</h3>
              <p className="dark:text-gray-300">{pokemon.height / 10} m</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 dark:text-gray-200">Weight</h3>
              <p className="dark:text-gray-300">{pokemon.weight / 10} kg</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}