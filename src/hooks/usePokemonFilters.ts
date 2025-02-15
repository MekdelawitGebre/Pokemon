import { useState, useMemo } from 'react';
import { Pokemon, SortOption, SortDirection } from '../types';

const ITEMS_PER_PAGE = 12;

export function usePokemonFilters(pokemons: Pokemon[]) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('id');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favoritePokemon');
    return saved ? JSON.parse(saved) : [];
  });

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
    setCurrentPage(1); // Reset to first page when filters change
  };

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id)
        ? prev.filter(fid => fid !== id)
        : [...prev, id];
      localStorage.setItem('favoritePokemon', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const filteredAndSortedPokemon = useMemo(() => {
    let filtered = pokemons;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply type filters
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(type =>
          selectedTypes.includes(type.type.name)
        )
      );
    }

    // Sort pokemon
    return [...filtered].sort((a, b) => {
      let comparison = 0;
      
      switch (sortOption) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'id':
          comparison = a.id - b.id;
          break;
        case 'height':
          comparison = a.height - b.height;
          break;
        case 'weight':
          comparison = a.weight - b.weight;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [pokemons, selectedTypes, sortOption, sortDirection, searchTerm]);

  const paginatedPokemon = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedPokemon.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredAndSortedPokemon, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedPokemon.length / ITEMS_PER_PAGE);

  return {
    selectedTypes,
    sortOption,
    sortDirection,
    searchTerm,
    currentPage,
    totalPages,
    favorites,
    paginatedPokemon,
    filteredAndSortedPokemon,
    toggleType,
    setSortOption,
    toggleSortDirection,
    setSearchTerm,
    setCurrentPage,
    toggleFavorite,
  };
}