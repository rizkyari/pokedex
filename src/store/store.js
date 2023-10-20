import {defineStore} from 'pinia';
import {ref} from 'vue';
import { fetchPokemonList, fetchPokemonDetails} from '@/utils/api';

export const usePokemonStore = defineStore('pokemon', () => {
    const pokemonList = ref([]);

    async function populatePokemonList(){
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
                } catch(err) {
                    console.error('Error fetching pokemon details: ', err)
                }
            })
        )
    }

    return {
        pokemonList,
        populatePokemonList,
        populatePokemonDetails
    }
})