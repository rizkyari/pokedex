import {defineStore} from 'pinia';
import {ref} from 'vue';
import { fetchPokemonList, fetchPokemonDetails, searchPokemonByName, filterTypes} from '@/utils/api';

export const usePokemonStore = defineStore('pokemon', () => {
    const pokemonList = ref([]);
    const filterPokemon = ref([]);
    const isLoading = ref(false);
    const isSearchPokemon = ref(false);
    const isSearchError = ref(false);

    async function populatePokemonList(){
        isLoading.value = true;
        isSearchError.value = false;
        try {
            pokemonList.value = await fetchPokemonList();
        } catch(error){
            console.error('Error fetching pokemon list:', error)
        }
    }

    async function populatePokemonDetails(){
        await Promise.all(
            pokemonList.value.map(async (pokemon) => {
                try {
                    const details = await fetchPokemonDetails(pokemon.url);
                    pokemon.details = details;
                    isLoading.value = false;
                } catch(err) {
                    console.error('Error fetching pokemon details: ', err)
                    isLoading.value = false;
                    isSearchError.value = true;
                }
            })
        )
    }

    async function searchPokemon(name) {
        isLoading.value = true;
        isSearchError.value = false;
        try {
          const searchResults = await searchPokemonByName(name);
          pokemonList.value = searchResults;
      
          if (searchResults.length === 0) {
            console.log('No matching Pokémon found');
          }
          isLoading.value = false;
        } catch (error) {
            console.error('Error searching for Pokémon: ', error);
            isLoading.value = false;
            isSearchError.value = true;
        }
    }      

    async function filterType(type){
        isLoading.value = true;
        isSearchError.value = false;
        try {
            const filterResult = await filterTypes(type);
            filterPokemon.value = filterResult.pokemon;
        } catch(err) {
            console.error('Error fro filter pokemon: ', err)
        }
    }

    async function populatePokemonFilters(){
        await Promise.all(
            filterPokemon.value.map(async (item) => {
                try {
                    const details = await fetchPokemonDetails(item.pokemon.url);
                    item.pokemon.details = details
                    isLoading.value = false;
                } catch(err) {
                    console.error('Error fetching pokemon details: ', err)
                    isLoading.value = false;
                    isSearchError.value = true;
                }
            })
        )
    }

    return {
        pokemonList,
        filterPokemon,
        isSearchPokemon,
        isLoading,
        isSearchError,
        populatePokemonList,
        populatePokemonDetails,
        searchPokemon,
        filterType,
        populatePokemonFilters,
    }
})