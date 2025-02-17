import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Pokemon, PokemonListResponse } from "./types";
import { PokemonCard } from "./components/PokemonCard";
import { PokemonDetail } from "./components/PokemonDetail";
import { ThemeToggle } from "./components/ThemeToggle";
import { Filters } from "./components/Filters";
import { Pagination } from "./components/Pagination";
import { usePokemonFilters } from "./hooks/usePokemonFilters";

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);

  const {
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
  } = usePokemonFilters(pokemons);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data: PokemonListResponse = await response.json();

        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            return res.json();
          })
        );

        setPokemons(pokemonDetails);
      } catch (err) {
        setError("Failed to fetch Pokemon data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-red-50 dark:bg-red-900 text-red-500 dark:text-red-200 p-4 rounded-lg max-w-md text-center">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-6 text-gray-900 dark:text-gray-100">
      <style>{`::-webkit-scrollbar { display: none; }`}</style>
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold text-center mb-6">Pokémon</h1>
          <div className="relative  mx-auto mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Search Pokémon..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:text-white"
            />
          </div>

          {/* Flex container for filters and sorting */}
          <div className="flex flex-col lg:flex-row justify-between items-left mb-6">
            <div className="lg:w-1/2 mb-4 lg:mb-0">
              <Filters
                selectedTypes={selectedTypes}
                onTypeChange={toggleType}
                sortOption={sortOption}
                sortDirection={sortDirection}
                onSortChange={setSortOption}
                onDirectionChange={toggleSortDirection}
              />
            </div>
            {/* Placeholder for sorting component */}
            <div className="lg:w-1/2 mb-4 lg:mb-0">
           
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex items-center justify-center min-h-[5vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-50 border-blue-500 dark:border-blue-400 border-t-transparent transition-all duration-300 ease-in-out"></div>
          </div>
        ) : (
          <>
            {favorites.length > 0 && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Favorites</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
                  {filteredAndSortedPokemon
                    .filter((pokemon) => favorites.includes(pokemon.id))
                    .map((pokemon) => (
                      <PokemonCard
                        key={pokemon.id}
                        pokemon={pokemon}
                        onClick={() => setSelectedPokemon(pokemon)}
                        isFavorite={true}
                        onToggleFavorite={(e) => {
                          e.stopPropagation();
                          toggleFavorite(pokemon.id);
                        }}
                      />
                    ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {paginatedPokemon
                .filter((pokemon) => !favorites.includes(pokemon.id))
                .map((pokemon) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    onClick={() => setSelectedPokemon(pokemon)}
                    isFavorite={false}
                    onToggleFavorite={(e) => {
                      e.stopPropagation();
                      toggleFavorite(pokemon.id);
                    }}
                  />
                ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}

        {selectedPokemon && (
          <PokemonDetail
            pokemon={selectedPokemon}
            onClose={() => setSelectedPokemon(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
