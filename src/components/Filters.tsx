import React from 'react';
import { Filter, ArrowUpDown, ChevronDown } from 'lucide-react';
import { SortOption, SortDirection } from '../types';

const POKEMON_TYPES = [
  { name: 'normal', color: 'bg-gray-400' },
  { name: 'fire', color: 'bg-red-500' },
  { name: 'water', color: 'bg-blue-500' },
  { name: 'electric', color: 'bg-yellow-400' },
  { name: 'grass', color: 'bg-green-500' },
  { name: 'ice', color: 'bg-cyan-300' },
  { name: 'fighting', color: 'bg-red-700' },
  { name: 'poison', color: 'bg-purple-500' },
  { name: 'ground', color: 'bg-yellow-600' },
  { name: 'flying', color: 'bg-indigo-300' },
  { name: 'psychic', color: 'bg-pink-500' },
  { name: 'bug', color: 'bg-lime-500' },
  { name: 'rock', color: 'bg-yellow-800' },
  { name: 'ghost', color: 'bg-purple-700' },
  { name: 'dragon', color: 'bg-indigo-600' },
  { name: 'dark', color: 'bg-gray-700' },
  { name: 'steel', color: 'bg-gray-500' },
  { name: 'fairy', color: 'bg-pink-300' },
];

interface FiltersProps {
  selectedTypes: string[];
  onTypeChange: (type: string) => void;
  sortOption: SortOption;
  sortDirection: SortDirection;
  onSortChange: (option: SortOption) => void;
  onDirectionChange: () => void;
}

export function Filters({
  selectedTypes,
  onTypeChange,
  sortOption,
  sortDirection,
  onSortChange,
  onDirectionChange,
}: FiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="mb-6 space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            <span className="font-medium whitespace-nowrap">
              Filter by type:
            </span>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-20 sm:w-48 px-4 py-2 text-left bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-gray-700 dark:text-gray-200">
                {selectedTypes.length === 0
                  ? 'Select types...'
                  : `${selectedTypes.length} selected`}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isOpen && (
              <div className="absolute z-50 w-full mt-2 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {POKEMON_TYPES.map((type) => (
                  <div
                    key={type.name}
                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                    onClick={() => onTypeChange(type.name)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedTypes.includes(type.name)}
                      onChange={() => onTypeChange(type.name)}
                      className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <span className={`w-3 h-3 rounded-full ${type.color}`} />
                    <span className="capitalize text-gray-700 dark:text-gray-200">
                      {type.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedTypes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedTypes.map((type) => {
                const typeInfo = POKEMON_TYPES.find((t) => t.name === type);
                return (
                  <span
                    key={type}
                    className={`${typeInfo?.color} text-white px-2 py-1 rounded-full text-sm flex items-center gap-1`}
                  >
                    {type}
                    <button
                      onClick={() => onTypeChange(type)}
                      className="hover:bg-black/20 rounded-full p-1"
                    >
                      ×
                    </button>
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-5 h-5" />
          <span className="font-medium">Sort by:</span>
        </div>
        <select
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value as SortOption)}
          className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="id">ID</option>
          <option value="name">Name</option>
          <option value="height">Height</option>
          <option value="weight">Weight</option>
        </select>
        <button
          onClick={onDirectionChange}
          className="px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          {sortDirection === 'asc' ? '↑ Ascending' : '↓ Descending'}
        </button>
      </div>
    </div>
  );
}
