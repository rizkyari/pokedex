<template>
  <div class="card">
    <img v-if="pokemonImage" :src="pokemonImage" class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title" v-if="props.pokemon && props.pokemon.name">{{ props.pokemon.name }}</h5>
      <p class="card-text" v-if="props.pokemon">ID: {{ getId }}</p>
      <button class="btn btn-primary" @click="showDetails">Details</button>
    </div>
  </div>
</template>

<script setup>
import { computed, defineProps, defineEmits} from 'vue';
import {usePokemonStore} from '@/store/store.js';

const pokemonStore = usePokemonStore();
const emit = defineEmits(['show-details'])
const props = defineProps(['pokemon']);

const pokemonImage = computed(() => {
  const defaultImage = require('@/assets/images/pokeball.png');
  if(pokemonStore.isSearchPokemon){
    return props.pokemon?.sprites?.front_default || defaultImage
  } else {
    return props.pokemon?.details?.sprites?.front_default || defaultImage;
  }
});

const getId = computed(() => {
  if(pokemonStore.isSearchPokemon){
    return props.pokemon?.id;
  } else {
    return props.pokemon?.details?.id;
  }
});

function showDetails(){
  emit('show-details', props.pokemon)
}

</script>

<style scoped>

</style>
