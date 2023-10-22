<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header" :style="{backgroundColor:pokemonColor}">
        <h2 class="modal-title">{{ props.pokemonDetails?.name }}</h2>
        <button class="modal-close" @click="closeModal">×</button>
      </div>
      <div class="modal-content">
        <div class="pokemon-details">
            <div class="row">
                <div class="pokemon-image col-12 col-md-7 col-lg-8" :style="{backgroundColor:pokemonColor}">
                    <img :src="pokemonImage" alt="Pokemon" class="pokemon-avatar" />
                </div>
                <div class="pokemon-info col-12 col-md-5 col-lg-4">
                    <div class="pokemon-stats">
                        <h3 class="text-start">Stats:</h3>
                        <table class="table table-striped">
                            <tr v-for="(stat, index) in getStats" :key="index">
                                <td class="text-start">{{ stat.stat.name }}:</td>
                                <td class="text-end">{{ stat.base_stat }}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div class="type-badges my-3">
                <span
                  v-for="(type, index) in getTypes"
                  :key="index"
                  class="type-badge badge"
                  :style="{backgroundColor:getPokemonColor(type.type.name)}"
                >
                  {{ type.type.name }}
                </span>
            </div>
            <div class="abilities my-3">
                <h3 class="text-start">Abilities:</h3>
                <ul class="ability-list list-group">
                    <li
                        v-for="(ability, index) in getAbilities"
                        :key="index"
                        class="list-group-item d-flex justify-content-between align-items-center"
                    >
                        {{ ability.ability.name }}
                        <span class="badge bg-primary rounded-pill">Ability</span>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import {computed, defineProps, defineEmits} from 'vue';
import {usePokemonStore} from '@/store/store.js';
import {pokeTypes} from '@/constants/types';

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

const getPokemonColor = (type) => {
  const typeData = pokeTypes.find((color) => color.type === type);
  return typeData ? typeData.hex : '#FFFFFF'; 
};

const pokemonColor = computed(() => {
  if (pokemonStore.isSearchPokemon) {
    return getPokemonColor(props.pokemonDetails?.types[0]?.type?.name);
    } else {
    return getPokemonColor(props.pokemonDetails?.details?.types[0]?.type?.name);
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

.modal-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  width: 50vw;
  height: 90%;
  overflow: scroll;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  color: #fff;
  border-bottom: 1px solid #0056b3;
  border-radius: 8px 8px 0 0;
}

.modal-title {
  font-size: 24px;
}

.modal-close {
  background: none;
  border: none;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}

.modal-content {
  padding: 2rem;
}

.pokemon-image {
  text-align: center;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pokemon-avatar{
    width: 25vw;
}

.pokemon-types {
  margin-top: 1rem;
}

.type-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.type-badge {
  font-size: 16px;
}

.pokemon-abilities,
.pokemon-stats {
  margin-top: 1.5rem;
}

.ability-list {
  list-style: none;
  padding: 0;
}

.ability-list .list-group-item {
  font-size: 16px;
  border: none;
  padding: 0.3rem 0;
}

@media only screen and (max-width: 576px){
    .pokemon-avatar{
        width: 100%;
    }

    .modal-container{
        width: 90vw;;
    }
}
</style>