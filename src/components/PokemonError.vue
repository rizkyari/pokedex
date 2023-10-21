<template>
    <div class="container error-message">
        <div class="error-text mb-5">Hmm... It look like we couldn't finde pokemon that you are looking for. click pokeball below to back to home.</div>
        <pokeball-button @handle-click="resetPokemon"/>
    </div>
</template>

<script setup>
import PokeballButton from './PokeballButton.vue';
import {usePokemonStore} from '@/store/store.js';

const pokemonStore = usePokemonStore();

const resetPokemon = (async() => {
    pokemonStore.isSearchPokemon = false;
    pokemonStore.isSearchError = false;
    pokemonStore.filterPokemon = [];
    await pokemonStore.populatePokemonList();
    await pokemonStore.populatePokemonDetails();
})
</script>

<style scoped>
.error-message {
  background-color: #fce4e4;
  border: 1px solid #fcc2c3;
  padding: 20px 30px;
  text-align: center;
}

.error-text {
  color: #cc0033;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  text-shadow: 1px 1px rgba(250,250,250,.3);
}
</style>