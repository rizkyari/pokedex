<template>
    <div class="modal-overlay">
        <div class="bg-white p-3 rounded-md modal-width">
            <div class="text-end">
                <button type="button" @click="closeModal" class="btn btn-danger">X</button>
            </div>
            <div class="modal-content">
                <div class="pokemon-details">
                    <h2 class="text-center">{{ props.pokemonDetails?.name }}</h2>
                    <div class="types text-center my-3">
                        <span v-for="(type, index) in getTypes" :key="index" class="type-badge badge bg-primary me-2">{{ type.type.name }}</span>
                    </div>
                    <div class="abilities my-3">
                        <h3>Abilities:</h3>
                        <ul class="list-group">
                            <li class="list-group-item" v-for="(ability, index) in getAbilities" :key="index">{{ ability.ability.name }}</li>
                        </ul>
                    </div>
                    <div class="stats my-3">
                        <h3>Stats:</h3>
                        <table class="table">
                            <tr v-for="(stat, index) in getStats" :key="index">
                                <td>{{ stat.stat.name }}:</td>
                                <td>{{ stat.base_stat }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="text-center">
                        <img :src="pokemonImage" alt="Pokemon" class="img-fluid"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import {computed, defineProps, defineEmits} from 'vue';
import {usePokemonStore} from '@/store/store.js';

const pokemonStore = usePokemonStore();
const emit = defineEmits(['close'])
const closeModal = () => emit('close');
const props = defineProps(['pokemonDetails'])

const pokemonImage = computed(() => {
  const defaultImage = require('@/assets/images/pokeball.png');
  if(pokemonStore.isSearchPokemon){
    return props.pokemonDetails?.sprites?.front_default || defaultImage
  } else {
    return props.pokemonDetails?.details?.sprites?.front_default || defaultImage;
  }
});

const getAbilities = computed(() => {
    if (pokemonStore.isSearchPokemon) {
        return props.pokemonDetails?.abilities || [];
    } else {
        return props.pokemonDetails?.details?.abilities || [];
    }
});

const getStats = computed(() => {
    if (pokemonStore.isSearchPokemon) {
        return props.pokemonDetails?.stats || [];
    } else {
        return props.pokemonDetails?.details?.stats || [];
    }
});

const getTypes = computed(() => {
    if (pokemonStore.isSearchPokemon) {
        return props.pokemonDetails?.types || [];
    } else {
        return props.pokemonDetails?.details?.types || [];
    }
});
</script>
  
<style scoped>
.modal-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}

.modal-width{
  width: 50vw;
  height: 90%;
  overflow: scroll;
}

@media only screen and (max-width: 576px){
  .modal-width{
    width: 90vw;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 20; 
  }
}
</style>
  