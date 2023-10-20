<template>
  <div class="card">
    <img :src="pokemonImage"/>
    <div class="card-body">
      <h5 class="card-title" v-if="props.pokemon && props.pokemon.name">{{ props.pokemon.name }}</h5>
      <p class="card-text" v-if="props.pokemon && props.pokemon.id">ID: {{ props.pokemon.id }}</p>
      <button class="btn btn-primary" @click="showDetails">Details</button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits} from 'vue';
const defaultImage = require('@/assets/images/pokeball.png');

const emit = defineEmits(['show-details'])
const props = defineProps(['pokemon']);
const pokemonImage = ref( props.pokemon?.details?.sprites?.front_default || defaultImage);
function showDetails(){
  emit('show-details', props.pokemon)
}

</script>

<style scoped>

</style>
