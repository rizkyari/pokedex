<template>
    <div class="home-content">
            <div v-if="pokemonStore.isLoading">
                <pokeball-spinner/>
            </div>
            <div v-else>
                <div class="my-5" v-if="pokemonStore.isSearchError">
                    <pokemon-error/>
                </div>
                <div class="my-5" v-else>
                    <div v-if="pokemonStore.filterPokemon.length <= 0" >
                        <div>
                            <div v-if=" pokemonStore.isSearchPokemon">
                                <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="(item, index) in pokemonStore.pokemonList" :key="index">
                                    <pokemon-card :pokemon="item" @show-details="showDetails" class="poke-card my-3" :id="index"/>
                                </div>
                            </div>
                            <div v-else>
                                <infinite-scroll @infinite="loadMore" class="row">
                                    <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="(item, index) in pokemonStore.pokemonList" :key="index">
                                        <pokemon-card :pokemon="item" @show-details="showDetails" class="poke-card my-3" :id="index"/>
                                    </div>
                                </infinite-scroll>
                            </div>
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
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {usePokemonStore} from '@/store/store.js';
import PokemonCard from '@/components/PokemonCard.vue';
import pokemonDetails from '@/components/PokemonDetails.vue';
import PokemonError from '@/components/PokemonError.vue';
import PokeballSpinner from '@/components/PokeballSpinner.vue';
import InfiniteScroll from '@/components/InfiniteScroll.vue';

const pokemonStore = usePokemonStore();
const selectedPokemonDetails = ref(null);
const modalDetail = ref(false);

const loadMore = async() => {
    pokemonStore.isLoadingMore = true;
    await pokemonStore.loadMorePokemon();
    await pokemonStore.populatePokemonDetails();
}

const showDetails = (pokemon) => {
    selectedPokemonDetails.value = pokemon;
    modalDetail.value = true;
    console.log(pokemon);
}

const closeDetail = () => {
    modalDetail.value = false;
}

onMounted(async() => {
    await pokemonStore.populatePokemonList();
    await pokemonStore.populatePokemonDetails();
})
</script>

<style scoped>
</style>