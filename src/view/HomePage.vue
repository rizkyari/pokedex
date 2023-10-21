<template>
    <div class="home">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-lg-5">
                    <img :src="PokemonLogo" alt="" style="width:65%" class="mb-3" @click="checkPokemon"/>
                    <search-input @handle-search="findPokemon" class="my-3"/>
                    <pokemon-badge :pokeTypes="pokeTypes" @handleTypeClick="clickType"/>
                </div>
            </div>
            <div v-if="pokemonStore.isLoading">
                <pokeball-spinner/>
            </div>
            <div v-else>
                <div class="my-5" v-if="pokemonStore.isSearchError">
                    <pokemon-error/>
                </div>
                <div class="my-5" v-else>
                    <div v-if="pokemonStore.filterPokemon.length <= 0" class="row">
                        <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="(item, index) in pokemonStore.pokemonList" :key="index">
                            <pokemon-card :pokemon="item" @show-details="showDetails" class="my-3"/>
                        </div>
                    </div>
                    <div v-else class="row">
                        <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="(item, index) in pokemonStore.filterPokemon" :key="index">
                            <pokemon-card :pokemon="item.pokemon" @show-details="showDetails" class="my-3"/>
                        </div>
                    </div>
                </div>
            </div>
            <pokemon-details :pokemonDetails="selectedPokemonDetails" v-if="modalDetail" @close="closeDetail"/>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {usePokemonStore} from '@/store/store.js';
import PokemonLogo from '@/assets/images/pokemon-logo.png';
import SearchInput from '@/components/SearchInput.vue';
import PokemonCard from '@/components/PokemonCard.vue';
import pokemonDetails from '@/components/PokemonDetails.vue';
import PokemonBadge from '@/components/PokemonBadge.vue';
import { pokeTypes } from '@/constants/types';
import PokemonError from '@/components/PokemonError.vue';
import PokeballSpinner from '@/components/PokeballSpinner.vue';

const pokemonStore = usePokemonStore();
const selectedPokemonDetails = ref(null);
const modalDetail = ref(false);

const showDetails = (pokemon) => {
    selectedPokemonDetails.value = pokemon;
    modalDetail.value = true;
    console.log(pokemon);
}

const closeDetail = () => {
    modalDetail.value = false;
}

const findPokemon = async (item) => {
    if(item === ''){
        pokemonStore.isSearchPokemon = false;
        pokemonStore.filterPokemon = [];
        await pokemonStore.populatePokemonList();
        await pokemonStore.populatePokemonDetails();
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
        await pokemonStore.populatePokemonDetails();
    } else {
        await pokemonStore.filterType(item);
        await pokemonStore.populatePokemonFilters();
    }
}

const checkPokemon = () => {
    console.log(pokemonStore.filterPokemon);
    console.log(pokemonStore.pokemonList);
}

onMounted(async() => {
    await pokemonStore.populatePokemonList();
    await pokemonStore.populatePokemonDetails();
})

</script>

<style scoped>
</style>