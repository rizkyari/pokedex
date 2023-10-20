<template>
    <div class="home">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-6 col-lg-5">
                    <img :src="PokemonLogo" alt="" style="width:65%" class="mb-3"/>
                    <search-input/>
                </div>
            </div>
            <div class="row my-5">
                <div class="col-12 col-md-6 col-lg-4 col-xl-3" v-for="(item, index) in pokemonStore.pokemonList" :key="index">
                    <pokemon-card :pokemon="item" @show-details="showDetails" class="my-3"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted} from 'vue';
import {usePokemonStore} from '@/store/store.js';
import PokemonLogo from '@/assets/images/pokemon-logo.png';
import SearchInput from '@/components/SearchInput.vue';
import PokemonCard from '@/components/PokemonCard.vue';

const pokemonStore = usePokemonStore();

const showDetails = () => {
    console.log(pokemonStore.pokemonList)
}

onMounted(async() => {
    await pokemonStore.populatePokemonList();
    await pokemonStore.populatePokemonDetails();
})

</script>

<style scoped>
</style>