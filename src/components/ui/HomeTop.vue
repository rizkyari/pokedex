<template>
    <div class="home-top">
        <div class="row justify-content-center">
            <div class="col-12 col-md-6 col-lg-5">
                <img :src="PokemonLogo" alt="" style="width:65%" class="mb-3"/>
                <search-input @handle-search="findPokemon" class="my-3"/>
                <pokemon-badge :pokeTypes="pokeTypes" @handleTypeClick="clickType"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import {usePokemonStore} from '@/store/store.js';
import PokemonLogo from '@/assets/images/pokemon-logo.png';
import SearchInput from '@/components/SearchInput.vue';
import PokemonBadge from '@/components/PokemonBadge.vue';
import { pokeTypes } from '@/constants/types';

const pokemonStore = usePokemonStore();

const findPokemon = async (item) => {
    if(item === ''){
        pokemonStore.isSearchPokemon = false;
        pokemonStore.filterPokemon = [];
        await pokemonStore.populatePokemonList();
        await pokemonStore.populatePokemons();
    } else {
        pokemonStore.isSearchPokemon = true;
        pokemonStore.filterPokemon = [];
        await pokemonStore.searchPokemon(item);
    }
    
}

const clickType = async (item) => {
    pokemonStore.isSearchPokemon = false;
    if(item === 0){
        pokemonStore.filterPokemon = [];
        await pokemonStore.populatePokemonList();
        await pokemonStore.populatePokemons();
    } else {
        await pokemonStore.filterType(item);
        await pokemonStore.populatePokemonFilters();
    }
}
</script>

<style scoped>
</style>